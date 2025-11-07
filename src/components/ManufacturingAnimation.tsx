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
  Award
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
      icon: <Factory size={80} strokeWidth={1.5} />,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      particles: 20
    },
    {
      id: 2,
      title: "Wire Drawing & Insulation",
      subtitle: "Precision Coating Process",
      icon: <Cable size={80} strokeWidth={1.5} />,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      particles: 25
    },
    {
      id: 3,
      title: "Twisting & Bundling",
      subtitle: "4-Pair Precision Assembly",
      icon: <Settings size={80} strokeWidth={1.5} />,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      particles: 30
    },
    {
      id: 4,
      title: "RJ45 Integration",
      subtitle: "T568B Standard Crimping",
      icon: <Zap size={80} strokeWidth={1.5} />,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      particles: 35
    },
    {
      id: 5,
      title: "Quality Control",
      subtitle: "Advanced Testing & Verification",
      icon: <CheckCircle size={80} strokeWidth={1.5} />,
      gradient: "from-indigo-500 via-blue-500 to-cyan-500",
      particles: 28
    },
    {
      id: 6,
      title: "Packaging",
      subtitle: "Professional Spooling & Boxing",
      icon: <Package size={80} strokeWidth={1.5} />,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      particles: 22
    },
    {
      id: 7,
      title: "Distribution",
      subtitle: "Nationwide Delivery Network",
      icon: <Truck size={80} strokeWidth={1.5} />,
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      particles: 18
    }
  ];

  useEffect(() => {
    const stageDuration = 3500;
    const companyNameDuration = 4000;

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
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      <AnimatePresence>
        {!showCompanyName && Array.from({ length: stage?.particles || 20 }).map((_, i) => (
          <motion.div
            key={`${currentStage}-${i}`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: -20,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: Math.random() * window.innerWidth
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              filter: 'blur(1px)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showCompanyName ? (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Progress Bar */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4/5 max-w-2xl">
              <div className="flex justify-between mb-2">
                {stages.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ 
                      scale: idx === currentStage ? 1.2 : 0.8,
                      opacity: idx === currentStage ? 1 : 0.5
                    }}
                    className={`w-3 h-3 rounded-full ${
                      idx <= currentStage ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-white to-blue-300 rounded-full"
                />
              </div>
            </div>

            {/* Icon with Gradient Background */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative mb-8`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stage?.gradient} rounded-full blur-3xl opacity-50 scale-150`} />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-full border-4 border-white/30">
                <div className="text-white">
                  {stage?.icon}
                </div>
              </div>
            </motion.div>

            {/* Stage Title */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center max-w-2xl px-8"
            >
              <div className="mb-4">
                <span className="text-blue-300 text-sm font-semibold tracking-wider uppercase">
                  Step {currentStage + 1} of {stages.length}
                </span>
              </div>
              <h2 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${stage?.gradient} bg-clip-text text-transparent`}>
                {stage?.title}
              </h2>
              <p className="text-xl text-blue-100 font-light">
                {stage?.subtitle}
              </p>
            </motion.div>

            {/* Animated Connection Lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </motion.div>
        ) : (
          <motion.div
            key="company-name"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Company Logo with Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full blur-3xl opacity-60 scale-150" />
              <div className="relative bg-white/10 backdrop-blur-xl p-12 rounded-full border-4 border-white/40">
                <Award size={100} className="text-white" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center px-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Chhajer Cable Industries
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-blue-200 font-light"
              >
                Quality Cables Since 1997
              </motion.p>
              
              {/* CCI Acronym */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-8 flex justify-center gap-6"
              >
                {[
                  { letter: 'C', word: 'Committed' },
                  { letter: 'C', word: 'Credible' },
                  { letter: 'I', word: 'Innovators' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: idx * 0.2
                    }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-blue-300 mb-1">{item.letter}</div>
                    <div className="text-sm text-blue-100">{item.word}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gridMove {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }
        `
      }} />
    </div>
  );
};

export default ManufacturingAnimation;
