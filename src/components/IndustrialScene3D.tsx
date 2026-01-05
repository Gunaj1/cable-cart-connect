import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Text, 
  MeshReflectorMaterial,
  PerspectiveCamera,
  useTexture,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Scene stage interface
interface SceneStage {
  id: number;
  title: string;
  subtitle: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  duration: number;
}

// Manufacturing stages
const stages: SceneStage[] = [
  { id: 1, title: "Raw Material Arrival", subtitle: "High-Purity Copper & Premium PVC", cameraPosition: [8, 4, 12], cameraTarget: [0, 0, 0], duration: 4000 },
  { id: 2, title: "Material Preparation", subtitle: "Wire Drawing Precision", cameraPosition: [5, 2, 8], cameraTarget: [-2, 0, 0], duration: 3500 },
  { id: 3, title: "Annealing Process", subtitle: "Strength Conditioning", cameraPosition: [0, 3, 6], cameraTarget: [0, 1, 0], duration: 3500 },
  { id: 4, title: "Insulation & Sheathing", subtitle: "PVC Extrusion Coating", cameraPosition: [-5, 2, 8], cameraTarget: [0, 0, 2], duration: 4000 },
  { id: 5, title: "Cable Construction", subtitle: "Twisting, Pairing & Shielding", cameraPosition: [-8, 4, 6], cameraTarget: [0, 0, 0], duration: 4000 },
  { id: 6, title: "Quality Monitoring", subtitle: "Real-Time Testing", cameraPosition: [0, 5, 10], cameraTarget: [0, 0, 0], duration: 3500 },
  { id: 7, title: "Laboratory Testing", subtitle: "Tensile & Resistance Verification", cameraPosition: [6, 3, 8], cameraTarget: [2, 0, 0], duration: 4000 },
  { id: 8, title: "Branding & Marking", subtitle: "IS/IEC Standards Printing", cameraPosition: [3, 2, 5], cameraTarget: [0, 0, 0], duration: 3500 },
  { id: 9, title: "Automated Coiling", subtitle: "Precision Spooling", cameraPosition: [-4, 4, 8], cameraTarget: [-2, 0, 0], duration: 3500 },
  { id: 10, title: "Packaging", subtitle: "Quality Sealed & Labeled", cameraPosition: [0, 3, 8], cameraTarget: [0, 0, 0], duration: 3500 },
  { id: 11, title: "Logistics & Dispatch", subtitle: "Nationwide Delivery", cameraPosition: [10, 6, 15], cameraTarget: [0, 0, 0], duration: 4000 },
  { id: 12, title: "Chhajer Cable Industries", subtitle: "Excellence in Every Connection", cameraPosition: [0, 8, 20], cameraTarget: [0, 0, 0], duration: 5000 }
];

// Copper Material Component
function CopperRod({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.15, 0.15, 4, 32]} />
      <meshStandardMaterial 
        color="#b87333" 
        metalness={0.9} 
        roughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Cable Spool Component
function CableSpool({ position, color = "#1a365d" }: { position: [number, number, number]; color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Spool sides */}
      <mesh position={[0, 0, -0.3]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Cable wrapped */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>
    </group>
  );
}

// Wire Drawing Machine Component
function WireDrawingMachine({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const rollerRef1 = useRef<THREE.Mesh>(null);
  const rollerRef2 = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (rollerRef1.current) rollerRef1.current.rotation.x += 0.05;
    if (rollerRef2.current) rollerRef2.current.rotation.x -= 0.05;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Machine base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 1, 2]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rollers */}
      <mesh ref={rollerRef1} position={[0, 0.5, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 2.5, 16]} />
        <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={rollerRef2} position={[0, 0.5, -0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 2.5, 16]} />
        <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wire passing through */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.1} emissive="#ff6b00" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Quality Control Station
function QualityStation({ position }: { position: [number, number, number] }) {
  const screenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Monitor stand */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 1, 0.1]}>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#1a202c" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      {/* Desk */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#4a5568" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Packaging Box Component
function PackagingBox({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[1, 0.8, 0.6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        {/* CCI Logo stripe */}
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[0.8, 0.2, 0.01]} />
          <meshStandardMaterial color="#1a365d" />
        </mesh>
      </group>
    </Float>
  );
}

// Delivery Truck Component
function DeliveryTruck({ position }: { position: [number, number, number] }) {
  const truckRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  return (
    <group ref={truckRef} position={position}>
      {/* Cabin */}
      <mesh position={[0.8, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1.2]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Container */}
      <mesh position={[-0.7, 0.6, 0]}>
        <boxGeometry args={[2, 1.2, 1.4]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      {/* CCI branding on truck */}
      <mesh position={[-0.7, 0.6, 0.71]}>
        <boxGeometry args={[1.5, 0.3, 0.01]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.6, -0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.6, -0.1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1.2, -0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1.2, -0.1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

// Factory Floor Component
function FactoryFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={0.8}
        mixStrength={15}
        roughness={0.9}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#1a202c"
        metalness={0.5}
        mirror={0.2}
      />
    </mesh>
  );
}

// Animated Cable Component - shows cable cross-section
function AnimatedCable({ position }: { position: [number, number, number] }) {
  const cableGroupRef = useRef<THREE.Group>(null);
  const [exploded, setExploded] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setExploded(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (cableGroupRef.current) {
      cableGroupRef.current.rotation.y += 0.005;
    }
  });

  const layerOffset = exploded ? 0.5 : 0;

  return (
    <group ref={cableGroupRef} position={position}>
      {/* Outer jacket */}
      <mesh position={[0, layerOffset * 4, 0]}>
        <torusGeometry args={[1.2, 0.15, 16, 64]} />
        <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} transparent opacity={0.9} />
      </mesh>
      {/* Inner PVC layer */}
      <mesh position={[0, layerOffset * 3, 0]}>
        <torusGeometry args={[1, 0.12, 16, 64]} />
        <meshStandardMaterial color="#4a5568" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Shielding layer */}
      <mesh position={[0, layerOffset * 2, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 64]} />
        <meshStandardMaterial color="#a0aec0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Insulation */}
      <mesh position={[0, layerOffset, 0]}>
        <torusGeometry args={[0.6, 0.08, 16, 64]} />
        <meshStandardMaterial color="#3182ce" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Copper conductor */}
      <mesh>
        <torusGeometry args={[0.4, 0.15, 16, 64]} />
        <meshStandardMaterial color="#b87333" metalness={0.95} roughness={0.05} envMapIntensity={2} />
      </mesh>
    </group>
  );
}

// Camera Controller
function CameraController({ stage }: { stage: SceneStage }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...stage.cameraPosition));
  const targetLook = useRef(new THREE.Vector3(...stage.cameraTarget));

  useEffect(() => {
    targetPos.current.set(...stage.cameraPosition);
    targetLook.current.set(...stage.cameraTarget);
  }, [stage]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.02);
    const lookAtPos = new THREE.Vector3();
    lookAtPos.lerp(targetLook.current, 0.02);
    camera.lookAt(targetLook.current);
  });

  return null;
}

// Main Scene Content
function SceneContent({ currentStage }: { currentStage: number }) {
  const stage = stages[currentStage];

  return (
    <>
      <CameraController stage={stage} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#f59e0b" />
      <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.6} penumbra={0.5} castShadow />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Factory Floor */}
      <FactoryFloor />
      
      {/* Factory elements based on stage */}
      
      {/* Raw Materials - Copper Rods */}
      <CopperRod position={[-4, 1, -2]} rotation={[0.3, 0, 0.5]} />
      <CopperRod position={[-3, 1.5, -3]} rotation={[0.1, 0.2, 0.3]} />
      <CopperRod position={[-5, 0.8, -1]} rotation={[-0.2, 0.1, 0.4]} />
      
      {/* Wire Drawing Machines */}
      <WireDrawingMachine position={[-2, 0, 0]} />
      <WireDrawingMachine position={[2, 0, 2]} />
      
      {/* Cable Spools */}
      <CableSpool position={[4, 0.5, -2]} color="#1a365d" />
      <CableSpool position={[5, 0.5, 0]} color="#2563eb" />
      <CableSpool position={[3, 0.5, 1]} color="#3b82f6" />
      
      {/* Quality Station */}
      <QualityStation position={[0, 0, 4]} />
      <QualityStation position={[-4, 0, 4]} />
      
      {/* Animated Cable Cross-Section */}
      <AnimatedCable position={[0, 2, 0]} />
      
      {/* Packaging Boxes */}
      <PackagingBox position={[6, 0, 4]} scale={0.8} />
      <PackagingBox position={[7, 0, 3]} scale={0.6} />
      <PackagingBox position={[6.5, 0.6, 3.5]} scale={0.5} />
      
      {/* Delivery Truck */}
      <DeliveryTruck position={[8, 0, -4]} />
      
      {/* Factory pillars */}
      {[-10, 0, 10].map((x, i) => (
        <mesh key={i} position={[x, 4, -8]}>
          <boxGeometry args={[0.5, 10, 0.5]} />
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Ceiling beams */}
      <mesh position={[0, 8, -8]} rotation={[0, 0, 0]}>
        <boxGeometry args={[25, 0.3, 0.5]} />
        <meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.3} />
      </mesh>
    </>
  );
}

// Main Component
const IndustrialScene3D: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadTimer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const stageDuration = stages[currentStage].duration;
    
    const timer = setTimeout(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, stageDuration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  const stage = stages[currentStage];

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">Loading CCI Factory...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas shadows dpr={[1, 2]} className="w-full h-full">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[8, 4, 12]} fov={60} />
          <SceneContent currentStage={currentStage} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Progress Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl">
          <div className="flex justify-between mb-2">
            {stages.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ scale: 0.6, opacity: 0.3 }}
                animate={{ 
                  scale: idx === currentStage ? 1 : 0.6,
                  opacity: idx === currentStage ? 1 : idx < currentStage ? 0.7 : 0.3
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
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
            className="absolute bottom-20 left-0 right-0 text-center px-4"
          >
            <div className="inline-block bg-black/40 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10">
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

        {/* CCI Branding - Always visible */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CCI</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-sm font-semibold">Chhajer Cable Industries</p>
              <p className="text-blue-200 text-xs">Quality Cables Since 1997</p>
            </div>
          </div>
        </div>

        {/* Quality Indicators */}
        <div className="absolute top-20 right-4 space-y-2 hidden lg:block">
          {['ISO 9001', 'BIS Certified', 'RoHS Compliant'].map((cert, idx) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/80 font-medium"
            >
              ✓ {cert}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustrialScene3D;
