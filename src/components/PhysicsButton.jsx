import { motion } from "framer-motion";
import { useState } from "react";

export default function PhysicsButton({
  children,
  onClick,
  variant = "primary",
}) {
  const [isPressed, setIsPressed] = useState(false);

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
      className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold shadow-lg"
      style={variants[variant]}
      onClick={onClick}
      // Animación de entrada
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      // Hover con efecto de elevación
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      }}
      // Tap con efecto de presión
      whileTap={{
        scale: 0.95,
        y: 0,
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
      }}
      // Física de resorte
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      {/* Efecto de onda al hacer clic */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: isPressed ? 2 : 0,
          opacity: isPressed ? 0 : 0.5,
        }}
        transition={{ duration: 0.6 }}
        style={{
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Partículas decorativas */}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${25 * (i + 1)}%`,
            top: "50%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            repeatDelay: 1,
          }}
        />
      ))}

      {/* Contenido del botón */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {children || "Click Me!"}

        {/* Flecha animada */}
        <motion.span
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          →
        </motion.span>
      </motion.span>

      {/* Brillo superior */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-white opacity-50"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.button>
  );
}
