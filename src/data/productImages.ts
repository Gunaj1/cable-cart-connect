// /src/data/productImages.ts
// Safe, Vite + React SWC friendly. No indexOf/includes at module eval. Pure data + null-safe helpers.

// Types
type ProductSpec = Record<string, string>;
type ProductDetails = {
  images: string[];
  title: string;
  description: string;
  specifications: ProductSpec;
  applications: string[];
  features: string[];
};

// Utility: immutable empty fallbacks to avoid accidental undefined access
const EMPTY_DETAILS: ProductDetails = Object.freeze({
  images: [],
  title: '',
  description: '',
  specifications: {},
  applications: [],
  features: [],
});

// Validator to ensure each entry conforms and prevents undefined traps
function normalizeDetails(input: Partial<ProductDetails> | undefined | null): ProductDetails {
  if (!input || typeof input !== 'object') return EMPTY_DETAILS;
  const images = Array.isArray(input.images) ? input.images.filter(Boolean) : [];
  return {
    images,
    title: typeof input.title === 'string' ? input.title : '',
    description: typeof input.description === 'string' ? input.description : '',
    specifications: (input.specifications && typeof input.specifications === 'object') ? input.specifications as ProductSpec : {},
    applications: Array.isArray(input.applications) ? input.applications.filter(Boolean) : [],
    features: Array.isArray(input.features) ? input.features.filter(Boolean) : [],
  };
}

// Pure data: keep as provided (content preserved). Ensure object commas and structure are valid.
export const productImageCollections: Record<string, ProductDetails> = {
  // Patchcords
  pc1: { // Cat 6 STP
    images: [
      '/src/assets/CAT 6 STP Patchcord 1.png',
      '/src/assets/CAT 6 STP Patchcord 2.png',
      '/src/assets/CAT 6 STP Patchcord 3.png',
      '/src/assets/CAT 6 STP Patchcord 4.png',
      '/src/assets/CAT 6 STP Patchcord 5.png'
    ],
    title: 'Cat 6 STP Patchcord',
    description: 'Premium Shielded Twisted Pair Cat6 patchcord engineered for high-performance networking environments. Features enhanced EMI protection and supports speeds up to 10Gbps with superior signal integrity.',
    specifications: {
      'Cable Type': 'STP (Shielded Twisted Pair)',
      'Category': 'Cat 6',
      'Conductor': '23/24/25/26 AWG Bare Copper or Tinned Copper',
      'Impedance': '100 ±15Ω',
      'Frequency': 'Up to 600MHz',
      'Connector': 'RJ45 8P8C Gold Plated',
      'Jacket': 'PVC/LSZH Available',
      'Shield': 'Overall Aluminum Foil + Drain Wire',
      'Length Options': '0.5m to 100m (Customizable)',
      'Operating Temperature': '-20°C to +75°C'
    },
    applications: [
      'LAN Network Systems',
      'Computer Network Distribution',
      'Telecommunication Networks',
      'Testing Equipment Systems',
      'CATV Systems',
      'Data Centers',
      'Enterprise Networks',
      'Industrial Environments'
    ],
    features: [
      'Enhanced EMI/RFI Protection',
      'Fluke Test Passed Certification',
      'OEM Supplier Quality',
      'Customizable Lengths Available',
      'Multiple Color Options',
      'LSZH Fire Retardant Option',
      'Gold Plated Connectors',
      'Lifetime Warranty'
    ]
  },
  pc2: { // Cat 6 FTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 6 FTP Patchcord',
    description: 'Professional Foiled Twisted Pair Cat6 patchcord offering excellent noise protection and signal integrity. Ideal for data centers and enterprise networks requiring reliable high-speed connectivity.',
    specifications: {
      'Cable Type': 'FTP (Foiled Twisted Pair)',
      'Category': 'Cat 6',
      'Frequency': 'Up to 600MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Aluminum Foil Overall',
      'Conductor': '23/24/25/26 AWG Stranded',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC and LSZH Options',
      'Connectors': 'RJ45 8P8C Nickel/Gold Plated',
      'Length Options': 'Custom Lengths Available'
    },
    applications: [
      'Data Centers',
      'Enterprise Networks',
      'High-Speed Network Applications',
      'Industrial Environments',
      'Commercial Buildings',
      'Server Rooms',
      'Network Infrastructure',
      'Professional Installations'
    ],
    features: [
      'Fluke Test Passed',
      'DCM Tested Certification',
      'Custom Lengths & Colors',
      'Professional Grade Quality',
      'Enhanced Noise Protection',
      'High-Speed Performance',
      'Durable Construction',
      'Industry Standard Compliance'
    ]
  },
  pc3: { // Cat 6 UTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 6 UTP Patchcord',
    description: 'Cost-effective Unshielded Twisted Pair Cat6 patchcord perfect for standard office networking needs. Delivers reliable performance for everyday business applications.',
    specifications: {
      'Cable Type': 'UTP (Unshielded Twisted Pair)',
      'Category': 'Cat 6',
      'Frequency': 'Up to 600MHz',
      'Impedance': '100 ±15Ω',
      'Conductor': '23/24/25/26 AWG Stranded',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC and LSZH Options',
      'Connectors': 'RJ45 8P8C Nickel/Gold Plated',
      'Length Options': 'Standard and Custom Lengths',
      'Compliance': 'TIA/EIA-568-B Standards'
    },
    applications: [
      'Office Environments',
      'Commercial Buildings',
      'Educational Institutions',
      'Small to Medium Businesses',
      'Residential Networks',
      'Workstation Connections',
      'Switch to Device Links',
      'General Networking'
    ],
    features: [
      'OEM Supplier Quality',
      'Fluke Test Passed',
      'Custom Lengths & Colors',
      'Cost-Effective Solution',
      'Reliable Performance',
      'Easy Installation',
      'Standard Compliance',
      'Professional Grade'
    ]
  },
  pc4: { // Cat 5e STP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 5e STP Patchcord',
    description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Engineered for enterprise networks and industrial environments requiring stable 1Gbps connectivity.',
    specifications: {
      'Cable Type': 'STP (Shielded Twisted Pair)',
      'Category': 'Cat 5e Enhanced',
      'Frequency': 'Up to 600MHz',
      'Length Range': '0.1m to 100m',
      'Connector': 'RJ45 8P8C Gold Plated (50µ")',
      'Shield': 'Overall Aluminum Foil + Drain Wire',
      'Jacket': 'PVC/LSZH Available',
      'Colors': '5 Different Options',
      'Temperature': '-20°C to +75°C',
      'Compliance': 'TIA/EIA Standards'
    },
    applications: [
      'Enterprise Networks',
      'Data Centers',
      'Industrial Environments',
      'High-Interference Areas',
      'Professional Installations',
      'Network Infrastructure',
      'Commercial Buildings',
      'Critical Data Links'
    ],
    features: [
      'LSZH Fire Retardant Option',
      '100% Factory Tested',
      'Enhanced Mechanical Properties',
      'Multiple Jacket Colors',
      'Customization Available',
      'EMI/RFI Protection',
      'Professional Grade Quality',
      'Lifetime Warranty'
    ]
  },
  pc5: { // Cat5e FTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat5e FTP Patchcord',
    description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Perfect for small business networks and educational institutions requiring reliable connectivity.',
    specifications: {
      'Cable Type': 'FTP (Foiled Twisted Pair)',
      'Category': 'Cat 5e Enhanced',
      'Frequency': 'Up to 600MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Aluminum Foil Overall',
      'Conductor': '23/24/25/26 AWG Stranded',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC and LSZH Options',
      'Connectors': 'RJ45 8P8C Nickel/Gold Plated',
      'Length': 'Custom Available'
    },
    applications: [
      'Small Business Networks',
      'Educational Institutions',
      'Office Environments',
      'Medium-Interference Areas',
      'Commercial Buildings',
      'Network Closets',
      'Workstation Connections',
      'Professional Installations'
    ],
    features: [
      'Noise Reduction Shield',
      'Custom Lengths & Colors',
      'Fluke Test Passed',
      'Professional Packaging',
      'Cost-Effective Solution',
      'Reliable Performance',
      'Easy Installation',
      'Quality Assured'
    ]
  },
  pc6: { // Cat5e UTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat5e UTP Patchcord',
    description: 'Standard Cat5e patchcord for basic networking needs. Cost-effective solution perfect for home networks and small office environments requiring reliable data transmission.',
    specifications: {
      'Cable Type': 'UTP (Unshielded Twisted Pair)',
      'Category': 'Cat 5e Enhanced',
      'Frequency': 'Up to 600MHz',
      'Length Range': '0.1m to 100m',
      'Connector': 'RJ45 8P8C Gold Plated (50µ")',
      'Jacket': 'PVC/LSZH Available',
      'Colors': '5 Different Options',
      'Speed': '1000 Mbps (1 Gbps)',
      'Temperature': '-20°C to +75°C',
      'Compliance': 'Enhanced Category 5'
    },
    applications: [
      'Home Networks',
      'Small Office Networks',
      'Basic Data Transmission',
      'General Networking',
      'Residential Wiring',
      'SOHO Applications',
      'Educational Use',
      'Standard Connectivity'
    ],
    features: [
      'LSZH Fire Retardant Option',
      '100% Factory Tested',
      'Enhanced Mechanical Properties',
      'Multiple Jacket Colors',
      'Customization Available',
      'Cost-Effective Solution',
      'Reliable Performance',
      'Easy Installation'
    ]
  },

  // Cat5e LAN Cables
  lan2: { // Cat5e 2 pair
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat5e 2 Pair LAN Cable',
    description: 'Economical 2-pair solution for voice and basic data applications. Ideal for telephone systems and cost-effective network solutions requiring reliable connectivity.',
    specifications: {
      'Configuration': '2 Pair (4 Conductors)',
      'Category': 'Cat 5e Enhanced',
      'Jacket': 'PVC, LLDPE Options',
      'Insulation': 'Special PE Polyolefin',
      'Shielding': 'SF/UTP Available',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Colors': 'Multiple Options',
      'Temperature': '-20°C to +75°C',
      'Applications': 'Voice & Data'
    },
    applications: [
      'Voice Communication Systems',
      'Basic Data Applications',
      'Telephone Systems',
      'Economical Network Solutions',
      'PoE Applications',
      'Small Office Networks',
      'Residential Wiring',
      'Cost-Effective Installations'
    ],
    features: [
      'OEM Supplier Quality',
      'Customization Available',
      'All Colors Available',
      'Cost-Effective Solution',
      'Reliable Performance',
      'Easy Installation',
      'Voice & Data Support',
      'Professional Grade'
    ]
  },
  lan3: { // Cat 5e Armored
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 5e Armored LAN Cable',
    description: 'Heavy-duty armored cable for underground and outdoor installations. Features excellent rodent protection and weather resistance for demanding environments.',
    specifications: {
      'Construction': 'Armored Design',
      'Category': 'Cat 5e Enhanced',
      'Conductor': '23/24/25/26 AWG Copper & CCA',
      'Grade': 'EC Grade Copper',
      'Armor': '0.8mm Aluminum Rod',
      'Twisting': 'International Standard',
      'Jacket': 'LD PVC Weather Proof',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Protection': 'Rodent Resistant'
    },
    applications: [
      'Underground Installations',
      'Outdoor Applications',
      'Industrial Environments',
      'Direct Burial Applications',
      'Rodent Protection Areas',
      'Harsh Environments',
      'Campus Networks',
      'Infrastructure Projects'
    ],
    features: [
      'OEM Supplier Quality',
      'DCM Tested Certification',
      'Fluke Test Passed',
      'Fire Retardant PVC',
      'All Colors Available',
      'Customization Available',
      'Weather Resistant',
      'Rodent Protection'
    ]
  },

  // Cat 6 LAN Cables
  cat1: { // Cat 6 Flat
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 6 Flat LAN Cable',
    description: 'Low-profile flat design Cat6 cable for discrete installations. Supports 10Gbps up to 55 meters with superior signal characteristics and aesthetic appeal.',
    specifications: {
      'Design': 'Flat Profile',
      'Category': 'Cat 6',
      'Jacket': 'Unbreakable Outer PVC',
      'Conductor': '7/36 EC Grade Copper',
      'Core': 'Heat Proof Inner Core',
      'Signal': 'Excellent Characteristics',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Profile': 'Low-profile Design',
      'Installation': 'Discrete Routing'
    },
    applications: [
      'Discrete Installations',
      'Under Carpet Wiring',
      'Along Wall Routing',
      'High-Speed Data Transmission',
      'Office Environments',
      'Commercial Buildings',
      'Clean Installations',
      'Professional Networks'
    ],
    features: [
      'OEM Supplier Quality',
      'All Colors Available',
      'Customization Available',
      'Superior Signal Quality',
      'Durable Construction',
      'Aesthetic Design',
      'Easy Installation',
      'Professional Grade'
    ]
  },
  cat2: { // Cat 6 Armored
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 6 Armored LAN Cable',
    description: 'Double-jacketed armored Cat6 cable for harsh environments. Provides superior physical protection while maintaining high-speed performance capabilities.',
    specifications: {
      'Construction': 'Double-Jacketed Armored',
      'Category': 'Cat 6',
      'Conductor': '23/24/25/26 AWG Copper/CCA',
      'Grade': 'EC Grade Copper',
      'Armor': '0.8mm Aluminum Rod',
      'Twisting': 'International Standard',
      'Jacket': 'LD PVC Weather & Temperature Proof',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Protection': 'Superior Physical Protection'
    },
    applications: [
      'Harsh Environments',
      'Outdoor Installations',
      'Industrial Applications',
      'Underground Installations',
      'Direct Burial',
      'Mining Operations',
      'Construction Sites',
      'Heavy-Duty Networks'
    ],
    features: [
      'OEM Supplier Quality',
      'DCM Tested Certification',
      'Fluke Test Passed',
      'Fire Retardant PVC',
      'All Colors Available',
      'Customization Available',
      'Superior Protection',
      'Weather Resistant'
    ]
  },

  // CCTV Cable 4+1
  cctv2: {
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'CCTV Cable 4+1',
    description: 'Premium CCTV cable with 4 power conductors and 1 coaxial core. Ideal for PTZ cameras and long-distance installations requiring enhanced power delivery.',
    specifications: {
      'Configuration': '4+1 (4 Power + 1 Video)',
      'Video Core': 'Coaxial RG59 Type',
      'Power Conductors': '4 x Copper Wire',
      'Video Conductor': '0.18mm/0.20mm Copper',
      'Core Size': '7x38, 14x40, 14x42, 14x43',
      'Shielding': '36 x 0.115mm Alloy + Aluminum Foil',
      'Jacket': 'PVC Weather Resistant',
      'Length': '90m/180m Standard',
      'Power Capacity': 'Enhanced for PTZ',
      'Quality': 'Exceptional Raw Materials'
    },
    applications: [
      'PTZ Camera Systems',
      'Long-Distance Installations',
      'CCTV Surveillance Cameras',
      'DVR and NVR Connections',
      'PC-based Security Systems',
      'Professional Surveillance',
      'Commercial Security',
      'High-Power Camera Systems'
    ],
    features: [
      'Enhanced Power Delivery',
      'All Colors Available',
      'Customization Available',
      'Highly Shock-proof',
      'High Tensile Strength',
      'Superior Picture Quality',
      'Quality Raw Materials',
      'Professional Installation'
    ]
  },

  // Telephone Cable
  tel1: {
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Standard Telephone Cable',
    description: 'Multi-pair telephone cable for voice communication systems. Suitable for internal and external telephone wiring with superior signal quality and durability.',
    specifications: {
      'Type': 'Multi-pair Telephone Cable',
      'Conductor': 'Pure Electrolytic Grade Copper',
      'Treatment': 'Super Annealed, Tinned',
      'Insulation': 'High Quality PVC',
      'Voltage Rating': '250 Volts',
      'Temperature': '70°C, 85°C & 105°C',
      'Pairs': '1-50 Pair Available',
      'Machinery': 'High-Speed State-of-Art',
      'Quality': 'Professional Grade',
      'Customization': 'Length as Required'
    },
    applications: [
      'Telephone Switching Exchanges',
      'Switch Board & Telephone Wiring',
      'MDF, SDH, DWDM, DSLAM Systems',
      'Pulse Code Modulation Systems',
      'RS-232 Communication',
      'Voice Communication',
      'Telecommunication Networks',
      'Professional Phone Systems'
    ],
    features: [
      'Customizable Length',
      'All Colors Available',
      'Fire Retardant/Low Smoke',
      'Zero Halogen Low Smoke',
      'High Quality Construction',
      'Professional Installation',
      'Reliable Performance',
      'Industry Standard'
    ]
  },

  // Computer Cord 2
  cc2: {
    images: [
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Laptop Notebook Adaptor Power Cord',
    description: 'Universal laptop power cord compatible with most notebook adapters. Features strain relief, durable construction, and wide brand compatibility.',
    specifications: {
      'Type': 'Polarized Power Cable',
      'Female End': 'Device Connection',
      'Male End': 'Standard Outlet',
      'Protection': 'Advanced Overload Protection',
      'Feature': 'Anti-Interference',
      'Isolation': 'Better Isolation Materials',
      'Texture': 'Rubberized Cord',
      'Compatibility': 'Universal Laptop Support',
      'Safety': 'Multiple Protection Features',
      'Quality': 'Professional Grade'
    },
    applications: [
      'Laptop Computers',
      'Video Game Consoles',
      'Notebook Computers',
      'Printers & Scanners',
      'LCD/TFT/CRT Monitors',
      'Audio Equipment & Amps',
      'Electronics with 3-Prong Power',
      'Professional Equipment'
    ],
    features: [
      'HP, Dell, Lenovo Compatible',
      'Sony Vaio, Toshiba Compatible',
      'Wipro, LG, Asus Compatible',
      'Samsung, IBM, Acer Compatible',
      'Overload Protection',
      'Anti-Interference Design',
      'Universal Compatibility',
      'Professional Quality'
    ]
  },

  // Lift Cable
  lift1: {
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Standard Lift Cable',
    description: 'Professional lift cable with enhanced flexibility and durability for elevator systems. Designed for reliable operation in demanding vertical transportation environments.',
    specifications: {
      'Conductor': 'Bare Copper, Extra Fine Wire',
      'Flexibility': 'High Flexible Design',
      'Insulation': 'Plastic, Low Temperature Flexible',
      'Identification': 'Black Cores with White Numbering',
      'Ground': 'GN-YE Conductor',
      'Sheath': 'Special Plastic, Low Temp Flexible',
      'Colors': 'All Colors Available',
      'Support': 'Special Carriage Support',
      'Resistance': 'UV-Resistant Sheath',
      'Quality': 'Professional Grade'
    },
    applications: [
      'Elevator Systems',
      'Lift Installations',
      'Vertical Transportation',
      'Carriage Systems',
      'Industrial Lifting Equipment',
      'Building Infrastructure',
      'Commercial Elevators',
      'Residential Lifts'
    ],
    features: [
      'UV-Resistant Sheath',
      'Special Carriage Support',
      'PUR Sheath Available',
      'Wear Resistant',
      'Oil Resistant',
      'Hydrolysis Resistant',
      'Microbial Attack Resistant',
      'Customizable Available'
    ]
  },

  // Speaker Cable
  speaker1: {
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Standard Speaker Cable',
    description: 'High-quality speaker cable for audio applications. Features multi-stranded copper conductors and reliable connections for optimal sound transmission and clarity.',
    specifications: {
      'Application': 'Speaker & Audio Systems',
      'Connection': 'Amplifier to Speaker',
      'Properties': 'Resistance, Capacitance, Inductance',
      'Voltage Rating': '300/300V',
      'Length': 'Full 100m Available',
      'Conductor': 'Multi-stranded OFC/Copper/Tinned',
      'Standard': 'RoHS PVC',
      'Certification': 'CE, SGS, ISO9001',
      'Temperature': '70°C Long Period Operation'
    },
    applications: [
      'Speaker Range Systems',
      'Home Theater Systems',
      'Audio System Connections',
      'Power Amplifier Connections',
      'Broadcasting Systems',
      'Audio Signal Transmission',
      'Professional Sound Equipment',
      'Home Audio Systems'
    ],
    features: [
      'Multi-stranded Flexible Conductor',
      'OFC/Copper/Tinned Options',
      'Reliable Audio Connection',
      'RoHS Standard PVC',
      'CE, SGS, ISO9001 Certified',
      'Long Period Operation (70°C)',
      'Professional Audio Quality',
      'High-Quality Construction'
    ]
  },

  // Cat5e LAN Cables
  lan1: { // Cat 5e Flat
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Cat 5e Flat LAN Cable',
    description: 'Ultra-thin flat design Cat5e cable perfect for discrete installations under carpets and along walls. Maintains excellent performance while offering superior aesthetics.',
    specifications: {
      'Cable Type': 'UTP Flat Design',
      'Category': 'Cat 5e Enhanced',
      'Profile': 'Ultra-thin 1.4mm thickness',
      'Width': '8mm ribbon design',
      'Frequency': 'Up to 600MHz',
      'Speed': '1000 Mbps (1 Gbps)',
      'Conductor': 'Stranded Copper/CCA',
      'Impedance': '100 ±15Ω',
      'Jacket': 'PVC Flat Profile',
      'Length': '100m/305m Standard'
    },
    applications: [
      'Under Carpet Installation',
      'Wall-mounted Routing',
      'Home Networks',
      'Office Environments',
      'Discrete Cable Management',
      'Residential Wiring',
      'Commercial Buildings',
      'Clean Installations'
    ],
    features: [
      'Ultra-thin Flat Design',
      'Easy Under-carpet Installation',
      '1000 Mbps Speed Support',
      'Customizable Lengths',
      'Multiple Color Options',
      'Professional Aesthetics',
      'Space-saving Design',
      'Flexible Routing'
    ]
  },

  // CCTV Cables
  cctv1: { // CCTV Cable 3+1
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'CCTV Cable 3+1',
    description: 'Professional CCTV cable combining power and video transmission in a single cable. Features 3 copper power conductors and 1 coaxial video core for reliable surveillance system connections.',
    specifications: {
      'Configuration': '3+1 (3 Power + 1 Video)',
      'Video Core': 'Coaxial RG59 Type',
      'Power Conductors': '3 x Copper Wire',
      'Video Conductor': '0.18mm/0.20mm Copper',
      'Core Size': '7x38, 14x40, 14x42, 14x43',
      'Shielding': '36 x 0.115mm Alloy + Aluminum Foil',
      'Jacket': 'PVC Weather Resistant',
      'Length': '90m/180m Standard',
      'Operating Voltage': '12V DC Power'
    },
    applications: [
      'CCTV Surveillance Cameras',
      'DVR and NVR Connections',
      'PC-based Security Systems',
      'Analog Camera Systems',
      'Security Installations',
      'Monitoring Systems',
      'Commercial Surveillance',
      'Residential Security'
    ],
    features: [
      'Combined Power & Video',
      'High Tensile Strength',
      'Shock-proof Construction',
      'Superior Picture Quality',
      'Weather Resistant',
      'All Colors Available',
      'Customizable Lengths',
      'Professional Grade Quality'
    ]
  },

  // Computer Cords
  cc1: { // Desktop CPU Power Cord
    images: [
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    title: 'Desktop CPU Power Cord',
    description: 'Standard 3-pin power cord designed for desktop computers, monitors, and electronic devices. Features safety certification and durable construction for reliable power delivery.',
    specifications: {
      'Connector Type': '3-Pin Grounded Male Plug',
      'Female End': 'IEC C13 Socket',
      'Wire Gauge': '18 AWG',
      'Voltage Rating': '250V AC',
      'Current Rating': '10A',
      'Length Options': '1m, 1.5m, 2m, 3m',
      'Jacket': 'PVC Black',
      'Safety': 'CE, RoHS Compliant',
      'Temperature': '-10°C to +70°C'
    },
    applications: [
      'Desktop Computer Systems',
      'LCD/LED Monitors',
      'Printers and Scanners',
      'Network Equipment',
      'Audio Equipment',
      'Electronic Devices',
      'Office Equipment',
      'Server Systems'
    ],
    features: [
      'Universal Compatibility',
      'Safety Certified',
      'Overload Protection',
      'Durable Construction',
      'Standard Wall Outlet Compatible',
      'High Quality Materials',
      'Strain Relief Design',
      'Professional Grade'
    ]
  }
};

// Safe getter with normalized fallback
export const getProductDetails = (productId: string): ProductDetails => {
  const key = typeof productId === 'string' ? productId : '';
  const raw = key ? productImageCollections[key] : undefined;
  const normalized = normalizeDetails(raw);

  // If not found, return your default content (preserved)
  if (normalized === EMPTY_DETAILS) {
    return {
      images: [
        'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      title: 'Professional Cable Product',
      description: 'High-quality cable product from Chhajer Cable Industries.',
      specifications: {},
      applications: [],
      features: []
    };
  }

  return normalized;
};
