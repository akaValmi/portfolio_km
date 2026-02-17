import {
  motion,
  useMotionValue,
  useAnimationFrame,
  animate,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function CollisionCard({
  title,
  description,
  icon,
  initialX = 0,
  initialY = 0,
  id,
  resetTrigger = 0,
  onPositionUpdate,
  otherCards = [],
  hasGravity = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [constraints, setConstraints] = useState({
    top: -500,
    left: -500,
    right: 500,
    bottom: 500,
  });

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const cardRef = useRef(null);

  const CARD_WIDTH = 256;
  const CARD_HEIGHT = 200;
  const GRAVITY = 0.5; // Fuerza de gravedad
  const GROUND_Y = 150; // Nivel del "suelo" donde están las letras

  useEffect(() => {
    if (typeof window !== "undefined") {
      setConstraints({
        top: -window.innerHeight / 2,
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      });
    }
  }, []);

  // Reset a posición inicial con animación
  useEffect(() => {
    if (resetTrigger > 0) {
      velocityX.current = 0;
      velocityY.current = 0;
      setHasLanded(false);

      animate(x, initialX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
      });

      animate(y, initialY, {
        type: "spring",
        stiffness: 200,
        damping: 20,
      });
    }
  }, [resetTrigger, initialX, initialY, x, y]);

  // Informar posición a otros componentes
  useEffect(() => {
    const updatePosition = () => {
      if (onPositionUpdate) {
        onPositionUpdate(id, {
          id,
          x: x.get(),
          y: y.get(),
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          velocityX: velocityX.current,
          velocityY: velocityY.current,
        });
      }
    };

    const unsubscribeX = x.on("change", updatePosition);
    const unsubscribeY = y.on("change", updatePosition);

    // Actualización inicial
    updatePosition();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [id, onPositionUpdate, x, y]);

  // Detección y respuesta de colisiones
  useAnimationFrame(() => {
    if (isDragging) return;

    const currentX = x.get();
    const currentY = y.get();
    let collisionDetected = false;

    // Obtener las dimensiones de la ventana
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : 1000;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;

    // Límites de la pantalla (considerando el tamaño de la card)
    const maxX = windowWidth / 2 - CARD_WIDTH / 2;
    const minX = -windowWidth / 2 + CARD_WIDTH / 2;
    const maxY = windowHeight / 2 - CARD_HEIGHT / 2;
    const minY = -windowHeight / 2 + CARD_HEIGHT / 2;

    // Aplicar gravedad si está habilitada Y no ha aterrizando
    if (hasGravity && !hasLanded) {
      velocityY.current += GRAVITY;
    }

    // Verificar colisión con el suelo - solo si aún hay gravedad
    if (hasGravity && !hasLanded && currentY >= GROUND_Y) {
      y.set(GROUND_Y);
      if (velocityY.current > 0) {
        velocityY.current = -velocityY.current * 0.6; // Rebote con el suelo
        if (Math.abs(velocityY.current) < 1) {
          velocityY.current = 0;
          setHasLanded(true); // Una vez aterriza, desactiva la gravedad
        }
      }
    }

    // Rebote en los bordes de la ventana
    let newX = currentX;
    let newY = currentY;
    let borderCollision = false;

    // Rebote en bordes horizontales
    if (currentX > maxX) {
      newX = maxX;
      velocityX.current = -Math.abs(velocityX.current) * 0.7;
      borderCollision = true;
    } else if (currentX < minX) {
      newX = minX;
      velocityX.current = Math.abs(velocityX.current) * 0.7;
      borderCollision = true;
    }

    // Rebote en bordes verticales (solo si no está en el suelo)
    if (!hasLanded) {
      if (currentY > maxY) {
        newY = maxY;
        velocityY.current = -Math.abs(velocityY.current) * 0.7;
        borderCollision = true;
      } else if (currentY < minY) {
        newY = minY;
        velocityY.current = Math.abs(velocityY.current) * 0.7;
        borderCollision = true;
      }
    }

    if (newX !== currentX) x.set(newX);
    if (newY !== currentY) y.set(newY);

    // Verificar colisiones con otras cards
    otherCards.forEach((other) => {
      if (other.id === id || !other.x || !other.y) return;

      const dx = currentX - other.x;
      const dy = currentY - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (CARD_WIDTH + (other.width || CARD_WIDTH)) / 2.5;

      if (distance < minDistance && distance > 0) {
        collisionDetected = true;

        // Normalizar vector de colisión
        const nx = dx / distance;
        const ny = dy / distance;

        // Calcular overlap
        const overlap = minDistance - distance;

        // Separar las cards
        const separationX = nx * overlap * 0.6;
        const separationY = ny * overlap * 0.6;

        x.set(currentX + separationX);
        y.set(currentY + separationY);

        // Aplicar rebote
        const bounce = 3;
        velocityX.current += nx * bounce;
        velocityY.current += ny * bounce;
      }
    });

    // Aplicar fricción - menos fricción cuando ha aterrizando para permitir movimiento libre
    const friction = borderCollision ? 0.92 : collisionDetected ? 0.9 : 0.96;
    const groundFriction = hasLanded ? 0.98 : 1; // Menor fricción en el suelo para movimiento libre
    velocityX.current *= friction * groundFriction;
    velocityY.current *= friction * groundFriction;

    // Aplicar velocidad
    const threshold = 0.05;
    if (
      Math.abs(velocityX.current) > threshold ||
      Math.abs(velocityY.current) > threshold
    ) {
      const nextX = currentX + velocityX.current;
      const nextY = currentY + velocityY.current;
      x.set(nextX);
      y.set(nextY);
    } else if (hasLanded) {
      // Detener completamente si está en el suelo y la velocidad es muy baja
      velocityX.current = 0;
      velocityY.current = 0;
    }
  });

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    // No reseteo hasLanded - una vez que aterriza, permanece en esa posición
    // Convertir velocidad de Framer Motion a velocidad del sistema
    velocityX.current = info.velocity.x / 50;
    velocityY.current = info.velocity.y / 50;
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragElastic={0.1}
      dragMomentum={false}
      dragConstraints={constraints}
      style={{ x, y, touchAction: "none" }}
      initial={{
        opacity: 0,
        scale: 0.5,
        rotate: Math.random() * 20 - 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 5,
        cursor: "grabbing",
        zIndex: 1000,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab w-64 rounded-2xl bg-white p-6 shadow-xl select-none"
    >
      {/* Indicador de colisión */}
      <motion.div
        className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold"
        animate={{
          scale: isDragging ? [1, 1.2, 1] : 1,
          rotate: isDragging ? 360 : 0,
        }}
        transition={{
          duration: isDragging ? 0.5 : 0.2,
          repeat: isDragging ? Infinity : 0,
        }}
      >
        ✋
      </motion.div>

      {/* Icono */}
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-3xl"
        animate={{
          rotate: isDragging ? [0, -10, 10, -10, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isDragging ? Infinity : 0,
        }}
      >
        {icon || "🎯"}
      </motion.div>

      {/* Título */}
      <h3 className="mb-2 text-xl font-bold text-gray-800">
        {title || "Draggable Card"}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-600">
        {description || "¡Arrástralo por la pantalla!"}
      </p>

      {/* Partículas de arrastre */}
      {isDragging && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-purple-400"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 - 30,
                opacity: 0,
                scale: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
