import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cable, 
  Zap, 
  Settings, 
  CheckCircle, 
  Package, 
  Truck,
  Factory,
  Award,
  Sparkles
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  particles: number;
}

const ManufacturingAnimation = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showCompanyName, setShowCompanyName] = useState(false);

  const stages: Stage[] = [
    {
      id: 1,
      title: "Raw Materials",
      subtitle: "Premium Copper & PVC Selection",
      icon: <Factory size={90} strokeWidth={1} />,
      gradient: "from-amber-400 via-orange-500 to-red-500",
      particles: 25
    },
    {
      id: 2,
      title: "Wire Drawing",
      subtitle: "Precision Coating Process",
      icon: <Cable size={90} strokeWidth={1} />,
      gradient: "from-blue-400 via-cyan-500 to-teal-400",
      particles: 30
    },
    {
      id: 3,
      title: "Twisting & Bundling",
      subtitle: "4-Pair Precision Assembly",
      icon: <Settings size={90} strokeWidth={1} />,
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
      particles: 35
    },
    {
      id: 4,
      title: "RJ45 Integration",
      subtitle: "T568B Standard Crimping",
      icon: <Zap size={90} strokeWidth={1} />,
      gradient: "from-emerald-400 via-green-500 to-teal-500",
      particles: 40
    },
    {
      id: 5,
      title: "Quality Control",
      subtitle: "12-Point Testing Protocol",
      icon: <CheckCircle size={90} strokeWidth={1} />,
      gradient: "from-sky-400 via-blue-500 to-indigo-500",
      particles: 32
    },
    {
      id: 6,
      title: "Packaging",
      subtitle: "Professional Spooling & Boxing",
      icon: <Package size={90} strokeWidth={1} />,
      gradient: "from-rose-400 via-pink-500 to-purple-500",
      particles: 28
    },
    {
      id: 7,
      title: "Distribution",
      subtitle: "Pan-India Delivery Network",
      icon: <Truck size={90} strokeWidth={1} />,
      gradient: "from-cyan-400 via-blue-500 to-violet-500",
      particles: 24
    }
  ];

  useEffect(() => {
    const stageDuration = 3500;
    const companyNameDuration = 4500;

    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev === stages.length - 1) {
          setShowCompanyName(true);
          setTimeout(() => {
            setShowCompanyName(false);
            setCurrentStage(0);
          }, companyNameDuration);
          return prev;
        }
        return prev + 1;
      });
    }, stageDuration);

    return () => clearInterval(timer);
  }, []);

  const stage = stages[currentStage];

  return (
    <div className="relative w-full h-[100vh] min-h-[700px] bg-[#0a0a0f] overflow-hidden">
      {/* Premium animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        <motion.div
          animate={{
            background: showCompanyName 
              ? 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15), transparent 70%)'
              : `radial-gradient(ellipse at center, rgba(${currentStage % 2 === 0 ? '59, 130, 246' : '147, 51, 234'}, 0.1), transparent 70%)`
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        />
      </div>

      {/* Animated grid with parallax effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div 
          animate={{ y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"
      />

      {/* Floating Particles */}
      <AnimatePresence>
        {!showCompanyName && Array.from({ length: stage?.particles || 20 }).map((_, i) => (
          <motion.div
            key={`${currentStage}-${i}`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: (typeof window !== 'undefined' ? window.innerHeight : 700) + 20,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: -20,
              opacity: [0, 0.8, 0.8, 0],
              scale: [0, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white/80 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showCompanyName ? (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* Progress Indicator */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-8">
              <div className="flex justify-between items-center mb-4">
                {stages.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ scale: 0.6, opacity: 0.3 }}
                    animate={{ 
                      scale: idx === currentStage ? 1 : 0.6,
                      opacity: idx === currentStage ? 1 : idx < currentStage ? 0.6 : 0.3
                    }}
                    className="relative"
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx <= currentStage 
                        ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                        : 'bg-white/20'
                    }`} />
                    {idx === currentStage && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-white"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>

            {/* Icon with Enhanced Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              {/* Multi-layer glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stage?.gradient} rounded-full blur-[80px] opacity-40 scale-150`} />
              <div className={`absolute inset-0 bg-gradient-to-r ${stage?.gradient} rounded-full blur-[40px] opacity-30 scale-125`} />
              
              {/* Icon container */}
              <motion.div 
                animate={{ 
                  boxShadow: [
                    '0 0 60px rgba(255,255,255,0.1)',
                    '0 0 80px rgba(255,255,255,0.2)',
                    '0 0 60px rgba(255,255,255,0.1)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative bg-white/5 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/10"
              >
                <div className="text-white">
                  {stage?.icon}
                </div>
              </motion.div>
            </motion.div>

            {/* Stage Info */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center max-w-3xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300 tracking-wider">
                  Step {currentStage + 1} of {stages.length}
                </span>
              </motion.div>
              
              <h2 className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r ${stage?.gradient} bg-clip-text text-transparent leading-tight`}>
                {stage?.title}
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 font-light">
                {stage?.subtitle}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="company-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* Company Logo with Premium Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              {/* Animated glow rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full blur-[60px] scale-150"
              />
              <motion.div
                animate={{ 
                  scale: [1.1, 1.4, 1.1],
                  opacity: [0.2, 0.05, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 rounded-full blur-[80px] scale-175"
              />
              
              <motion.div 
                animate={{ 
                  boxShadow: [
                    '0 0 60px rgba(59,130,246,0.3)',
                    '0 0 100px rgba(59,130,246,0.5)',
                    '0 0 60px rgba(59,130,246,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-14 rounded-[3rem] border border-white/20"
              >
                <Award size={110} className="text-white" strokeWidth={1} />
              </motion.div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                Chhajer Cable
              </h1>
              <h1 className="text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Industries
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-slate-400 font-light mb-12"
              >
                Quality Cables Since 1997
              </motion.p>

              {/* CCI Acronym */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex justify-center gap-8 md:gap-12"
              >
                {[
                  { letter: 'C', word: 'Committed', gradient: 'from-blue-400 to-cyan-400' },
                  { letter: 'C', word: 'Credible', gradient: 'from-cyan-400 to-teal-400' },
                  { letter: 'I', word: 'Innovators', gradient: 'from-teal-400 to-emerald-400' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3
                    }}
                    className="text-center"
                  >
                    <div className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-b ${item.gradient} bg-clip-text text-transparent`}>
                      {item.letter}
                    </div>
                    <div className="text-sm md:text-base text-slate-500 font-medium tracking-wider uppercase">
                      {item.word}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  );
};

export default ManufacturingAnimation;
