import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DraggableButton({
  children,
  variant = "primary",
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

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
    },
    secondary: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#ffffff",
    },
    outline: {
      background: "transparent",
      color: "#667eea",
      border: "2px solid #667eea",
    },
  };

  return (
    <motion.button
      drag
      dragElastic={0.2}
      dragMomentum={true}
      dragConstraints={constraints}
      initial={{
        x: initialX,
        y: initialY,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: 1,
        scale: 1,
      }}
      whileDrag={{
        scale: 1.15,
        rotate: 10,
        cursor: "grabbing",
        zIndex: 1000,
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        setPosition({ x: info.point.x, y: info.point.y });
        if (onDragEnd) {
          onDragEnd(id, info);
        }
      }}
      className="absolute cursor-grab rounded-xl px-8 py-4 font-semibold shadow-lg select-none"
      style={{
        ...variants[variant],
        touchAction: "none",
      }}
    >
      {/* Estela de arrastre */}
      {isDragging && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-xl"
              style={{
                ...variants[variant],
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.08,
              }}
            />
          ))}
        </>
      )}

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isDragging && "👋 "}
        {children || "Drag Me!"}
        {!isDragging && (
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🎯
          </motion.span>
        )}
      </span>

      {/* Indicador de velocidad */}
      {isDragging && (
        <motion.div
          className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        >
          ⚡
        </motion.div>
      )}
    </motion.button>
  );
}
