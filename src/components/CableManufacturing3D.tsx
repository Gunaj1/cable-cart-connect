import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Manufacturing Stage Components
const CopperSpool = ({ position, scale }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#cd7f32" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.35, 32]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
};

const TwistedWires = ({ position, scale, colors }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {colors.map((color: string, i: number) => {
        const angle = (i / colors.length) * Math.PI * 2;
        const radius = 0.15;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.03, 3, 16]} />
            <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

const RJ45Connector = ({ position, scale, exploded }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !exploded) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const wireColors = [
    '#FF6B35', '#FFA500', '#4CAF50', '#2196F3',
    '#9C27B0', '#FFEB3B', '#795548', '#E91E63'
  ];

  return (
    <group position={position} scale={scale}>
      {/* Connector body */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.6]} />
        <meshStandardMaterial 
          color="#E8E8E8" 
          transparent 
          opacity={exploded ? 0.3 : 0.9}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>
      
      {/* 8 wires inside */}
      {wireColors.map((color, i) => {
        const xOffset = (i - 3.5) * 0.04;
        const explodeOffset = exploded ? i * 0.15 - 0.5 : 0;
        return (
          <mesh
            key={i}
            position={[xOffset + explodeOffset, exploded ? 0.5 : 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.015, 0.015, exploded ? 1 : 0.5, 8]} />
            <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

const CableReel = ({ position, scale }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} castShadow>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial color="#1976D2" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#424242" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};

const DeliveryTruck = ({ position, scale }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Truck body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.6]} />
        <meshStandardMaterial color="#1976D2" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Truck cabin */}
      <mesh position={[-0.9, 0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.6]} />
        <meshStandardMaterial color="#0D47A1" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#212121" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const CompanyLogo3D = ({ position, scale }: any) => {
  return (
    <group position={position} scale={scale}>
      {/* CCI Letters in 3D boxes */}
      {['C', 'C', 'I'].map((letter, i) => (
        <group key={i} position={[(i - 1) * 1.2, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.8, 0.3]} />
            <meshStandardMaterial color="#1976D2" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[0.6, 0.6]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Main Scene Component
const ManufacturingScene = () => {
  const [stage, setStage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const stages = [
    { name: 'Raw Materials', duration: 3000 },
    { name: 'Wire Drawing', duration: 3000 },
    { name: 'Twisting', duration: 3000 },
    { name: 'RJ45 Assembly', duration: 4000 },
    { name: 'Quality Control', duration: 3000 },
    { name: 'Packaging', duration: 3000 },
    { name: 'Company Logo', duration: 3000 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => {
        const next = (prev + 1) % stages.length;
        setShowLogo(next === 6);
        return next;
      });
    }, stages[stage].duration);

    return () => clearInterval(timer);
  }, [stage]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={stage !== 3}
        autoRotateSpeed={stage === 6 ? 0 : 1}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4FC3F7" />
      <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.5} penumbra={0.5} castShadow />
      
      <Environment preset="warehouse" />

      {/* Stage 1: Raw Materials */}
      {stage === 0 && (
        <>
          <CopperSpool position={[-1.5, 0, 0]} scale={1} />
          <mesh position={[1.5, 0, 0]} castShadow>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#EFEFEF" roughness={0.5} />
          </mesh>
        </>
      )}

      {/* Stage 2: Wire Drawing */}
      {stage === 1 && (
        <>
          <TwistedWires 
            position={[0, 0, 0]} 
            scale={0.8} 
            colors={['#FF6B35', '#FFA500']}
          />
          <mesh position={[0, 0, -1.5]} castShadow>
            <boxGeometry args={[1.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#424242" metalness={0.8} roughness={0.2} />
          </mesh>
        </>
      )}

      {/* Stage 3: Twisting */}
      {stage === 2 && (
        <TwistedWires 
          position={[0, 0, 0]} 
          scale={1.2} 
          colors={['#FF6B35', '#FFA500', '#4CAF50', '#2196F3', '#9C27B0', '#FFEB3B', '#795548', '#E91E63']}
        />
      )}

      {/* Stage 4: RJ45 Assembly */}
      {stage === 3 && (
        <RJ45Connector position={[0, 0, 0]} scale={2} exploded={true} />
      )}

      {/* Stage 5: Quality Control & Spooling */}
      {stage === 4 && (
        <>
          <CableReel position={[0, 0, 0]} scale={1.5} />
          <mesh position={[0, 0, 0]} castShadow>
            <torusGeometry args={[0.5, 0.05, 16, 32]} />
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}

      {/* Stage 6: Packaging */}
      {stage === 5 && (
        <DeliveryTruck position={[0, 0, 0]} scale={1.2} />
      )}

      {/* Stage 7: Company Logo */}
      {showLogo && (
        <CompanyLogo3D position={[0, 0, 0]} scale={1} />
      )}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.8} />
      </mesh>
    </>
  );
};

// Main Component Export
const CableManufacturing3D = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Canvas shadows>
        <ManufacturingScene />
      </Canvas>
      
      {/* Company Name Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 mb-4">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Chhajer Cable Industries
          </h1>
          <p className="text-blue-200 text-sm mt-2">Quality Cables Since 1997</p>
        </div>
        <p className="text-white/70 text-xs">3D Manufacturing Process Animation</p>
      </div>
    </div>
  );
};

export default CableManufacturing3D;
