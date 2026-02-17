import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function DraggableCard({
  title,
  description,
  icon,
  initialX = 0,
  initialY = 0,
  onDragEnd,
  id,
  resetTrigger = 0,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [constraints, setConstraints] = useState({
    top: -500,
    left: -500,
    right: 500,
    bottom: 500,
  });
  const constraintsRef = useRef(null);

  useEffect(() => {
    // Solo en el cliente
    if (typeof window !== "undefined") {
      setConstraints({
        top: -window.innerHeight / 2,
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      });
    }
  }, []);

  // Reset a posición inicial cuando cambia resetTrigger
  useEffect(() => {
    if (resetTrigger > 0) {
      setPosition({ x: initialX, y: initialY });
    }
  }, [resetTrigger, initialX, initialY]);

  return (
    <motion.div
      drag
      dragElastic={0.1}
      dragMomentum={true}
      dragConstraints={constraints}
      initial={{
        x: initialX,
        y: initialY,
        opacity: 0,
        scale: 0.5,
        rotate: Math.random() * 20 - 10,
      }}
      animate={{
        x: position.x,
        y: position.y,
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
      onDragEnd={(event, info) => {
        setIsDragging(false);
        setPosition({ x: info.point.x, y: info.point.y });
        if (onDragEnd) {
          onDragEnd(id, info);
        }
      }}
      className="absolute cursor-grab w-64 rounded-2xl bg-white p-6 shadow-xl select-none"
      style={{
        touchAction: "none",
      }}
    >
      {/* Indicador de arrastre */}
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
