import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import CollisionCard from "./CollisionCard.jsx";
import DraggableButton from "./DraggableButton.jsx";

export default function PhysicsPlayground() {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [cardPositions, setCardPositions] = useState({});

  // Callback para actualizar posiciones de las cards
  const handlePositionUpdate = useCallback((id, position) => {
    setCardPositions((prev) => ({
      ...prev,
      [id]: position,
    }));
  }, []);

  const handleReset = () => {
    setIsResetting(true);
    setResetTrigger((prev) => prev + 1);

    // Confetti effect
    setTimeout(() => {
      setIsResetting(false);
    }, 1000);
  };

  const cards = [
    {
      id: "card-1",
      title: "Diseño Web 🎨",
      description: "¡Arrástralo!",
      icon: "🎨",
      x: -200,
      y: -400,
    },
    {
      id: "card-2",
      title: "Desarrollo ⚡",
      description: "¡Momentum!",
      icon: "⚡",
      x: 50,
      y: -450,
    },
    {
      id: "card-3",
      title: "Animaciones ✨",
      description: "¡Físicas!",
      icon: "✨",
      x: -100,
      y: -500,
    },
    {
      id: "card-4",
      title: "Performance 🚀",
      description: "¡Suave!",
      icon: "🚀",
      x: 200,
      y: -420,
    },
    {
      id: "card-5",
      title: "UX/UI 💎",
      description: "¡Táctil!",
      icon: "💎",
      x: 0,
      y: -550,
    },
  ];

  const buttons = [
    { id: "btn-1", variant: "primary", text: "Proyectos", x: -150, y: -600 },
    { id: "btn-2", variant: "secondary", text: "Contacto", x: 150, y: -650 },
    { id: "btn-3", variant: "outline", text: "CV", x: 0, y: -700 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>

      {/* Nombre grande en el centro - Kevin Miranda */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[8vw] md:text-[12vw] lg:text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-400/30 to-pink-400/30 select-none leading-none tracking-tighter"
          style={{
            WebkitTextStroke: "2px rgba(147, 51, 234, 0.3)",
            textShadow: "0 0 80px rgba(168, 85, 247, 0.3)",
          }}
        >
          KEVIN
          <br />
          MIRANDA
        </motion.h1>
      </div>

      {/* Área de juego */}
      <div className="relative h-screen w-full flex items-center justify-center">
        {/* Cards arrastrables con colisiones */}
        {cards.map((card) => (
          <CollisionCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            initialX={card.x}
            initialY={card.y}
            resetTrigger={resetTrigger}
            onPositionUpdate={handlePositionUpdate}
            otherCards={Object.values(cardPositions)}
            hasGravity={true}
          />
        ))}

        {/* Botones arrastrables */}
        {buttons.map((btn) => (
          <DraggableButton
            key={btn.id}
            id={btn.id}
            variant={btn.variant}
            initialX={btn.x}
            initialY={btn.y}
            resetTrigger={resetTrigger}
          >
            {btn.text}
          </DraggableButton>
        ))}
      </div>

      {/* Botón de reset */}
      <motion.button
        onClick={handleReset}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-50 flex items-center gap-3"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 20px 60px rgba(168, 85, 247, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: isResetting ? [0, -10, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <motion.span
          animate={{
            rotate: isResetting ? 360 : 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          🔄
        </motion.span>
        Reset Posiciones
      </motion.button>

      {/* Confetti effect on reset */}
      {isResetting && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-3 h-3 rounded-full z-40"
              style={{
                left: "50%",
                bottom: "100px",
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 600,
                y: -Math.random() * 400 - 200,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Instrucciones */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm pointer-events-none z-50">
        <span className="animate-pulse">🎮</span> Arrastra las cards y observa
        cómo caen con gravedad
      </div>
    </div>
  );
}
