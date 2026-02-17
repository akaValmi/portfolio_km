import { motion } from "framer-motion";
import { useState } from "react";

export default function PhysicsCard({ title, description, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        z: 50,
      }}
      whileTap={{
        scale: 0.95,
        rotateY: 0,
        rotateX: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Efecto de brillo que sigue al cursor */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), transparent 70%)",
        }}
      />

      {/* Icono con física de rebote */}
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-3xl"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {icon || "🚀"}
      </motion.div>

      {/* Título con animación de entrada */}
      <motion.h3
        className="mb-2 text-xl font-bold text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title || "Card Title"}
      </motion.h3>

      {/* Descripción */}
      <motion.p
        className="text-gray-600"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description || "Card description with physics animations"}
      </motion.p>

      {/* Partículas flotantes de fondo */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-purple-300"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            y: isHovered ? [-10, 10, -10] : [0, 0, 0],
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
