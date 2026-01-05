import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
}

const stages: Stage[] = [
  { id: 1, title: "Raw Material Arrival", subtitle: "High-Purity Copper & Premium PVC" },
  { id: 2, title: "Wire Drawing", subtitle: "Precision Manufacturing" },
  { id: 3, title: "Insulation Process", subtitle: "PVC Coating Excellence" },
  { id: 4, title: "Cable Assembly", subtitle: "Twisting & Shielding" },
  { id: 5, title: "Quality Control", subtitle: "Testing & Verification" },
  { id: 6, title: "Packaging & Dispatch", subtitle: "Ready for Delivery" },
];

// SVG Worker Component
const Worker = ({ x, y, scale = 1, flip = false, animation = "working" }: { 
  x: number; 
  y: number; 
  scale?: number; 
  flip?: boolean;
  animation?: string;
}) => (
  <motion.g 
    transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}
    animate={animation === "working" ? { y: [0, -3, 0] } : {}}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Hard hat */}
    <ellipse cx="0" cy="-45" rx="12" ry="6" fill="#f59e0b" />
    <rect x="-10" y="-50" width="20" height="8" rx="2" fill="#f59e0b" />
    {/* Head */}
    <circle cx="0" cy="-35" r="10" fill="#fcd9b6" />
    {/* Body */}
    <rect x="-12" y="-25" width="24" height="30" rx="3" fill="#1e40af" />
    {/* CCI Badge */}
    <rect x="-8" y="-20" width="16" height="8" rx="1" fill="#fbbf24" />
    <text x="0" y="-14" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">CCI</text>
    {/* Arms */}
    <motion.rect 
      x="12" y="-22" width="8" height="20" rx="3" fill="#fcd9b6"
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      style={{ originX: 0.5, originY: 0 }}
    />
    <motion.rect 
      x="-20" y="-22" width="8" height="20" rx="3" fill="#fcd9b6"
      animate={{ rotate: [10, -10, 10] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      style={{ originX: 0.5, originY: 0 }}
    />
    {/* Legs */}
    <rect x="-10" y="5" width="8" height="20" rx="2" fill="#374151" />
    <rect x="2" y="5" width="8" height="20" rx="2" fill="#374151" />
    {/* Safety boots */}
    <rect x="-12" y="23" width="12" height="5" rx="2" fill="#1f2937" />
    <rect x="0" y="23" width="12" height="5" rx="2" fill="#1f2937" />
  </motion.g>
);

// Wire Drawing Machine
const WireDrawingMachine = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Machine base */}
    <rect x="0" y="40" width="120" height="60" rx="5" fill="#4b5563" />
    <rect x="5" y="45" width="110" height="50" rx="3" fill="#374151" />
    
    {/* Control panel */}
    <rect x="10" y="50" width="30" height="40" rx="2" fill="#1f2937" />
    <motion.circle 
      cx="20" cy="60" r="4" fill="#22c55e"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    <motion.circle 
      cx="30" cy="60" r="4" fill="#ef4444"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <rect x="15" y="70" width="20" height="15" rx="1" fill="#0f172a" />
    <motion.text 
      x="25" y="81" textAnchor="middle" fontSize="8" fill="#22c55e" fontFamily="monospace"
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    >
      OK
    </motion.text>
    
    {/* Rollers */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
      <circle cx="60" cy="65" r="15" fill="#6b7280" stroke="#9ca3af" strokeWidth="3" />
      <line x1="60" y1="55" x2="60" y2="75" stroke="#4b5563" strokeWidth="2" />
      <line x1="50" y1="65" x2="70" y2="65" stroke="#4b5563" strokeWidth="2" />
    </motion.g>
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
      <circle cx="95" cy="65" r="15" fill="#6b7280" stroke="#9ca3af" strokeWidth="3" />
      <line x1="95" y1="55" x2="95" y2="75" stroke="#4b5563" strokeWidth="2" />
      <line x1="85" y1="65" x2="105" y2="65" stroke="#4b5563" strokeWidth="2" />
    </motion.g>
    
    {/* Wire passing through */}
    <motion.line 
      x1="45" y1="65" x2="110" y2="65" 
      stroke="#b87333" strokeWidth="3"
      animate={{ strokeDashoffset: [0, -20] }}
      strokeDasharray="5,5"
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Machine top */}
    <rect x="5" y="30" width="110" height="15" rx="3" fill="#6b7280" />
    <text x="60" y="42" textAnchor="middle" fontSize="8" fill="#e5e7eb" fontWeight="bold">WIRE DRAW-01</text>
  </g>
);

// Cable Spool
const CableSpool = ({ x, y, color = "#1e40af" }: { x: number; y: number; color?: string }) => (
  <motion.g 
    transform={`translate(${x}, ${y})`}
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  >
    {/* Spool sides */}
    <ellipse cx="0" cy="0" rx="35" ry="10" fill="#4b5563" />
    <rect x="-35" y="0" width="70" height="40" fill="#6b7280" />
    <ellipse cx="0" cy="40" rx="35" ry="10" fill="#4b5563" />
    
    {/* Cable wound */}
    <ellipse cx="0" cy="20" rx="28" ry="7" fill={color} />
    <rect x="-28" y="13" width="56" height="14" fill={color} />
    <ellipse cx="0" cy="13" rx="28" ry="7" fill={color} opacity="0.8" />
    
    {/* Center hub */}
    <ellipse cx="0" cy="20" rx="10" ry="3" fill="#374151" />
  </motion.g>
);

// Conveyor Belt
const ConveyorBelt = ({ x, y, width }: { x: number; y: number; width: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Belt structure */}
    <rect x="0" y="0" width={width} height="20" fill="#374151" rx="3" />
    <rect x="5" y="3" width={width - 10} height="14" fill="#1f2937" rx="2" />
    
    {/* Moving belt lines */}
    {Array.from({ length: Math.floor(width / 30) }).map((_, i) => (
      <motion.line
        key={i}
        x1={15 + i * 30}
        y1="5"
        x2={15 + i * 30}
        y2="15"
        stroke="#4b5563"
        strokeWidth="2"
        animate={{ x: [0, 30] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    ))}
    
    {/* Rollers at ends */}
    <circle cx="10" cy="10" r="8" fill="#6b7280" stroke="#9ca3af" strokeWidth="2" />
    <circle cx={width - 10} cy="10" r="8" fill="#6b7280" stroke="#9ca3af" strokeWidth="2" />
  </g>
);

// Copper Rod Stack
const CopperRodStack = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {[0, 1, 2, 3, 4].map((row) => (
      <g key={row}>
        {[0, 1, 2, 3, 4 - row].map((col) => (
          <motion.ellipse
            key={`${row}-${col}`}
            cx={col * 18 + row * 9}
            cy={-row * 15}
            rx="8"
            ry="25"
            fill="#b87333"
            stroke="#d4a574"
            strokeWidth="1"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, delay: col * 0.1, repeat: Infinity }}
          />
        ))}
      </g>
    ))}
  </g>
);

// Quality Control Station
const QualityStation = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Desk */}
    <rect x="0" y="50" width="100" height="10" fill="#4b5563" rx="2" />
    <rect x="5" y="60" width="10" height="30" fill="#374151" />
    <rect x="85" y="60" width="10" height="30" fill="#374151" />
    
    {/* Monitor */}
    <rect x="30" y="10" width="50" height="40" rx="3" fill="#1f2937" />
    <rect x="33" y="13" width="44" height="30" rx="2" fill="#0f172a" />
    
    {/* Screen content */}
    <motion.g animate={{ opacity: [1, 0.8, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
      <rect x="36" y="16" width="38" height="4" fill="#22c55e" rx="1" />
      <rect x="36" y="22" width="30" height="4" fill="#22c55e" rx="1" />
      <rect x="36" y="28" width="35" height="4" fill="#22c55e" rx="1" />
      <text x="55" y="40" textAnchor="middle" fontSize="6" fill="#22c55e">PASS</text>
    </motion.g>
    
    {/* Monitor stand */}
    <rect x="50" y="43" width="10" height="10" fill="#6b7280" />
    
    {/* Testing equipment */}
    <rect x="5" y="35" width="20" height="15" fill="#374151" rx="2" />
    <motion.circle 
      cx="15" cy="42" r="5" 
      fill="#3b82f6"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </g>
);

// Packaging Area
const PackagingArea = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Boxes */}
    {[0, 1, 2].map((i) => (
      <motion.g 
        key={i}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
      >
        <rect x={i * 45} y={50 - i * 5} width="40" height="30" fill="#e5e7eb" rx="2" />
        <rect x={i * 45 + 5} y={55 - i * 5} width="30" height="8" fill="#1e40af" rx="1" />
        <text x={i * 45 + 20} y={62 - i * 5} textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">CCI</text>
        {/* Tape */}
        <rect x={i * 45 + 15} y={50 - i * 5} width="10" height="30" fill="#fbbf24" opacity="0.8" />
      </motion.g>
    ))}
    
    {/* Pallet */}
    <rect x="-5" y="80" width="150" height="10" fill="#92400e" rx="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={i * 30} y="85" width="25" height="5" fill="#78350f" rx="1" />
    ))}
  </g>
);

// Factory Background
const FactoryBackground = () => (
  <g>
    {/* Sky gradient simulation */}
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect x="0" y="0" width="100%" height="100%" fill="url(#skyGradient)" />
    
    {/* Factory wall */}
    <rect x="0" y="50" width="100%" height="350" fill="url(#wallGradient)" />
    
    {/* Windows with light */}
    {[100, 300, 500, 700, 900].map((wx, i) => (
      <g key={i}>
        <rect x={wx} y="80" width="80" height="100" fill="#1e3a8a" rx="3" />
        <motion.rect 
          x={wx + 5} y="85" width="70" height="90" fill="#60a5fa" rx="2"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
        {/* Window frame */}
        <line x1={wx + 40} y1="85" x2={wx + 40} y2="175" stroke="#1e3a8a" strokeWidth="3" />
        <line x1={wx + 5} y1="130" x2={wx + 75} y2="130" stroke="#1e3a8a" strokeWidth="3" />
      </g>
    ))}
    
    {/* Factory floor */}
    <rect x="0" y="380" width="100%" height="120" fill="url(#floorGradient)" />
    
    {/* Floor markings */}
    {[0, 200, 400, 600, 800].map((fx, i) => (
      <rect key={i} x={fx} y="400" width="150" height="5" fill="#fbbf24" opacity="0.5" rx="2" />
    ))}
    
    {/* Ceiling beams */}
    {[0, 250, 500, 750, 1000].map((bx, i) => (
      <g key={i}>
        <rect x={bx} y="50" width="20" height="330" fill="#374151" />
        <rect x={bx - 30} y="50" width="80" height="15" fill="#4b5563" />
      </g>
    ))}
    
    {/* Hanging lights */}
    {[150, 400, 650, 900].map((lx, i) => (
      <g key={i}>
        <line x1={lx} y1="50" x2={lx} y2="90" stroke="#6b7280" strokeWidth="2" />
        <motion.ellipse 
          cx={lx} cy="95" rx="25" ry="10" fill="#fbbf24"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
        <motion.ellipse 
          cx={lx} cy="120" rx="60" ry="30" fill="#fbbf24" opacity="0.1"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      </g>
    ))}
    
    {/* CCI Banner */}
    <rect x="350" y="200" width="300" height="60" fill="#1e40af" rx="5" />
    <text x="500" y="240" textAnchor="middle" fontSize="28" fill="#ffffff" fontWeight="bold">
      CHHAJER CABLE INDUSTRIES
    </text>
    
    {/* Safety signs */}
    <g transform="translate(50, 280)">
      <rect x="0" y="0" width="60" height="40" fill="#fbbf24" rx="3" />
      <text x="30" y="20" textAnchor="middle" fontSize="8" fill="#000" fontWeight="bold">⚠ SAFETY</text>
      <text x="30" y="32" textAnchor="middle" fontSize="6" fill="#000">FIRST</text>
    </g>
  </g>
);

// Main Animation Component
const FactoryAnimation2D: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stage = stages[currentStage];

  return (
    <div className="relative w-full h-[700px] overflow-hidden bg-slate-900">
      {/* Main SVG Scene */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Factory Background */}
        <FactoryBackground />
        
        {/* Production Line Elements */}
        
        {/* Conveyor Belts */}
        <ConveyorBelt x={50} y={420} width={400} />
        <ConveyorBelt x={550} y={420} width={400} />
        
        {/* Copper Rod Stack - Raw Materials */}
        <CopperRodStack x={80} y={380} />
        
        {/* Wire Drawing Machine */}
        <WireDrawingMachine x={200} y={300} />
        
        {/* Cable Spools */}
        <CableSpool x={450} y={340} color="#1e40af" />
        <CableSpool x={520} y={355} color="#2563eb" />
        <CableSpool x={590} y={340} color="#3b82f6" />
        
        {/* Quality Control Station */}
        <QualityStation x={680} y={300} />
        
        {/* Packaging Area */}
        <PackagingArea x={820} y={310} />
        
        {/* Workers */}
        <Worker x={170} y={380} scale={0.8} />
        <Worker x={350} y={375} scale={0.75} flip />
        <Worker x={480} y={380} scale={0.8} />
        <Worker x={650} y={375} scale={0.75} flip />
        <Worker x={780} y={380} scale={0.8} />
        <Worker x={900} y={375} scale={0.75} />
        
        {/* Forklift */}
        <motion.g 
          animate={{ x: [-50, 100, -50] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="translate(50, 430)">
            {/* Forklift body */}
            <rect x="0" y="0" width="60" height="35" fill="#f59e0b" rx="3" />
            <rect x="50" y="5" width="15" height="20" fill="#fbbf24" rx="2" />
            {/* Forks */}
            <rect x="-30" y="30" width="35" height="5" fill="#6b7280" />
            <rect x="-30" y="20" width="5" height="15" fill="#6b7280" />
            {/* Wheels */}
            <circle cx="15" cy="40" r="8" fill="#1f2937" />
            <circle cx="50" cy="40" r="8" fill="#1f2937" />
            {/* Driver silhouette */}
            <circle cx="35" cy="-5" r="8" fill="#374151" />
          </g>
        </motion.g>
        
        {/* Moving cables on conveyor */}
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            animate={{ x: [0, 850] }}
            transition={{ duration: 15, delay: i * 5, repeat: Infinity, ease: "linear" }}
          >
            <g transform={`translate(${100 + i * 50}, 410)`}>
              <rect x="0" y="0" width="30" height="8" fill="#1e40af" rx="2" />
              <rect x="5" y="2" width="20" height="4" fill="#3b82f6" rx="1" />
            </g>
          </motion.g>
        ))}
        
        {/* Sparks/Particles near machines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={280 + Math.random() * 40}
            cy={340 + Math.random() * 20}
            r="2"
            fill="#fbbf24"
            animate={{ 
              opacity: [0, 1, 0],
              y: [-10, -30],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.2, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </svg>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Progress Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl z-10">
          <div className="flex justify-between mb-2">
            {stages.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ scale: 0.6, opacity: 0.3 }}
                animate={{ 
                  scale: idx === currentStage ? 1.2 : 0.8,
                  opacity: idx === currentStage ? 1 : idx < currentStage ? 0.7 : 0.3
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx <= currentStage ? 'bg-blue-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* Stage Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-24 left-0 right-0 text-center px-4"
          >
            <div className="inline-block bg-black/50 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10">
              <span className="text-blue-300 text-sm font-medium tracking-wider uppercase block mb-2">
                Stage {currentStage + 1} / {stages.length}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {stage.title}
              </h2>
              <p className="text-lg md:text-xl text-blue-100/80">
                {stage.subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CCI Branding */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CCI</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-sm font-semibold">Chhajer Cable Industries</p>
              <p className="text-blue-200 text-xs">Quality Cables Since 1997</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="absolute top-20 right-4 space-y-2 hidden lg:block">
          {['ISO 9001', 'BIS Certified', 'RoHS Compliant'].map((cert, idx) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90 font-medium"
            >
              ✓ {cert}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactoryAnimation2D;
