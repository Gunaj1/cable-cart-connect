// Professional Product Images and Unified Descriptions
// Single source of truth for all product information

export interface ProductDetails {
  images: string[];
  title: string;
  description: string;
  specifications: Record<string, string>;
  applications: string[];
  features: string[];
}

// Professional high-resolution product images (5 per product)
export const productImageCollections: Record<string, ProductDetails> = {
  // ========================
  // PATCHCORDS
  // ========================
  
  pc1: { // Cat 6 STP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200', // Front view
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200', // 45° angled view
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200', // Close-up detail
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200', // Top/flat lay
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'  // Application shot
    ],
    title: 'Cat 6 STP Patchcord',
    description: 'Premium Shielded Twisted Pair Cat6 patchcord engineered for high-performance networking environments. Features enhanced EMI protection with aluminum foil shielding and supports speeds up to 10Gbps with superior signal integrity. Ideal for data centers, enterprise networks, and industrial applications requiring maximum interference protection.',
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

  pc2: { // Cat 6 FTP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 FTP Patchcord',
    description: 'Professional Foiled Twisted Pair Cat6 patchcord offering excellent noise protection and signal integrity. Features overall aluminum foil shielding for enhanced performance in moderate interference environments. Ideal for data centers and enterprise networks requiring reliable high-speed connectivity up to 10Gbps.',
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

  pc3: { // Cat 6 UTP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 UTP Patchcord',
    description: 'Cost-effective Unshielded Twisted Pair Cat6 patchcord perfect for standard office networking needs. Delivers reliable performance for everyday business applications with support for speeds up to 10Gbps over shorter distances. Ideal for clean electrical environments with minimal interference.',
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

  pc4: { // Cat 5e STP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e STP Patchcord',
    description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Engineered for enterprise networks and industrial environments requiring stable 1Gbps connectivity with enhanced protection against electromagnetic interference.',
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

  pc5: { // Cat 5e FTP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e FTP Patchcord',
    description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Perfect for small business networks and educational institutions requiring reliable connectivity with moderate interference protection. Supports 1Gbps speeds with enhanced signal quality.',
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

  pc6: { // Cat 5e UTP Patchcord
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e UTP Patchcord',
    description: 'Standard Cat5e patchcord for basic networking needs. Cost-effective solution perfect for home networks and small office environments requiring reliable data transmission up to 1Gbps. Features durable construction and professional-grade connectors.',
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

  // ========================
  // CAT 5e LAN CABLES
  // ========================

  lan1: { // Cat 5e Flat
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e Flat LAN Cable',
    description: 'Ultra-thin flat design Cat5e cable perfect for discrete installations under carpets and along walls. Maintains excellent performance while offering superior aesthetics. Features 1.4mm thickness and 8mm width for seamless integration into any environment.',
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

  lan2: { // Cat 5e 2 pair
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e 2 Pair LAN Cable',
    description: 'Economical 2-pair solution for voice and basic data applications. Ideal for telephone systems and cost-effective network solutions requiring reliable connectivity. Features special PE polyolefin insulation for enhanced performance.',
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
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e Armored LAN Cable',
    description: 'Heavy-duty armored cable for underground and outdoor installations. Features excellent rodent protection and weather resistance for demanding environments. Built with 0.8mm aluminum rod armor for maximum physical protection.',
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

  lan4: { // Cat 5e FTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e FTP LAN Cable',
    description: 'Foiled cable with overall shield for superior noise immunity. Perfect for industrial environments and commercial buildings requiring enhanced protection against electromagnetic interference while maintaining cost-effectiveness.',
    specifications: {
      'Cable Type': 'FTP (Foiled Twisted Pair)',
      'Category': 'Cat 5e Enhanced',
      'Frequency': '1 to 500MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Aluminum Foil Supported',
      'Conductor': '23/24/25/26 AWG Stranded',
      'Material': 'CCA or Pure Copper',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC and LSZH',
      'Length': '100m/305m Standard'
    },
    applications: [
      'Industrial Environments',
      'EMI Sensitive Areas',
      'Commercial Buildings',
      'High-Interference Locations',
      'Professional Networks',
      'Manufacturing Facilities',
      'Electrical Environments',
      'Network Infrastructure'
    ],
    features: [
      'OEM Suppliers',
      'Customized Lengths and Colors',
      'Passed Fluke Test',
      'Professional Packaging',
      'Superior Noise Immunity',
      'Enhanced Signal Quality',
      'Durable Construction',
      'Industry Compliance'
    ]
  },

  lan5: { // Cat 5e STP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e STP LAN Cable',
    description: 'Individually shielded pairs for maximum protection against crosstalk and interference. Designed specifically for network adapters, hubs, switches, and routers requiring superior signal integrity and performance.',
    specifications: {
      'Cable Type': 'STP (Shielded Twisted Pair)',
      'Category': 'Cat 5e Enhanced',
      'Construction': 'FTP Shielded Twist Pair',
      'Jacket': 'CM Type PVC',
      'Conductor': '23/24/25/26 AWG 4-Pair Stranded',
      'Material': 'Copper Wire/CCA Wire',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Shield': 'Individual Pair Shielding',
      'Applications': 'Network Equipment'
    },
    applications: [
      'Network Adapters',
      'Hubs, Switches, Routers',
      'DSL/Cable Modems',
      'Patch Panels',
      'Computer Networking Applications',
      'Data Centers',
      'Enterprise Networks',
      'Professional Installations'
    ],
    features: [
      'OEM Suppliers',
      'Designed for Network Adapters',
      'All Colors Available',
      'Customization Available',
      'Maximum Crosstalk Protection',
      'Superior Signal Integrity',
      'Professional Grade Quality',
      'Enhanced Performance'
    ]
  },

  lan6: { // Cat 5e UTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e UTP LAN Cable',
    description: 'Standard unshielded cable for general networking needs. Cost-effective solution for office installations compliant with Enhanced Category 5 Ethernet standards. Features ultra-ribbon design with 1.4mm thickness for versatile installations.',
    specifications: {
      'Cable Type': 'UTP (Unshielded Twisted Pair)',
      'Category': 'Enhanced Category 5',
      'Design': 'Ultra-ribbon Cable',
      'Thickness': '1.4mm',
      'Width': '8mm',
      'Construction': 'Stranded Wire Twisted Pair',
      'Speed': '1000 Mbps (1 Gbps)',
      'Compliance': 'Ethernet Standard',
      'Length': '100m/305m Standard',
      'Pairs': 'All 4 Pairs Utilized'
    },
    applications: [
      'General Networking',
      'Office Installations',
      'Enhanced Category 5 (1000 BASE-T)',
      'Ethernet Standard Applications',
      'Commercial Buildings',
      'Workstation Connections',
      'Network Infrastructure',
      'Professional Installations'
    ],
    features: [
      'OEM Suppliers',
      'Straight-through Cable Using All 4 Pairs',
      'Customization Available',
      'Speed: 1000 Mbps',
      'All Colors Available',
      'Ultra-thin Design',
      'Professional Grade',
      'Easy Installation'
    ]
  },

  lan7: { // Cat 5e Outdoor
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 5e Outdoor LAN Cable',
    description: 'UV-resistant and waterproof design for outdoor installations. Features overall aluminum foil shield and supports PoE++ up to 90W. Bandwidth tested up to 600MHz for reliable outdoor networking applications.',
    specifications: {
      'Construction': 'Outdoor Rated',
      'Category': 'Cat 5e Enhanced',
      'Conductor': '23/24/25/26 AWG 4-Pair Solid',
      'Material': 'Bare Copper/CCA Wire',
      'Shield': 'Overall Aluminum Foil (F/UTP)',
      'Bandwidth': 'Tested up to 600MHz',
      'PoE Support': 'PoE++ (802.3bt) up to 90W',
      'Length': '100m/305m Standard',
      'Rating': 'Outdoor Applications',
      'UV Protection': 'Enhanced UV Resistance'
    },
    applications: [
      'Outdoor Installations',
      'Direct Burial Applications',
      'Weather-Resistant Networking',
      'Campus Networks',
      'Outdoor Security Systems',
      'Building-to-Building Links',
      'Harsh Environment Networks',
      'Infrastructure Projects'
    ],
    features: [
      'OEM Suppliers',
      'Speed: 1000 Mbps',
      'Customization Available',
      'All Colors Available',
      'UV-Resistant Design',
      'Waterproof Construction',
      'PoE++ Support',
      'Weather Resistant'
    ]
  },

  // ========================
  // CAT 6 LAN CABLES
  // ========================

  cat1: { // Cat 6 Flat
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 Flat LAN Cable',
    description: 'Low-profile flat design Cat6 cable for discrete installations. Supports 10Gbps up to 55 meters with superior signal characteristics. Features unbreakable outer jacket and heat-proof inner core for maximum durability and performance.',
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
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 Armored LAN Cable',
    description: 'Double-jacketed armored Cat6 cable for harsh environments. Provides superior physical protection while maintaining high-speed performance capabilities. Features 0.8mm aluminum rod armor and weather-proof outer jacket.',
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

  cat3: { // Cat 6 STP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 STP LAN Cable',
    description: 'Shielded Cat6 cable with individual pair shielding for maximum EMI protection. Excellent for high-speed data centers and industrial environments requiring superior signal integrity and performance up to 10Gbps.',
    specifications: {
      'Cable Type': 'STP (Shielded Twisted Pair)',
      'Category': 'Cat 6',
      'Shield': '80 Wire Aloe Shielded',
      'Foil': '42 Micron Aluminum Foil',
      'Jacket': 'LD PVC Weather & Temperature Proof',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Protection': 'Maximum EMI Protection',
      'Grade': 'Professional Grade',
      'Testing': 'DCM & Fluke Tested'
    },
    applications: [
      'High-Speed Data Centers',
      'Industrial Environments',
      'EMI Sensitive Areas',
      'Professional Networks',
      'Critical Data Applications',
      'Server Rooms',
      'Network Infrastructure',
      'Enterprise Networks'
    ],
    features: [
      'OEM Suppliers',
      'DCM Tested',
      'Fluke Tested',
      'Fire Retardant High Quality PVC',
      'All Colors Available',
      'Customization Available',
      'Maximum EMI Protection',
      'Professional Grade Quality'
    ]
  },

  cat4: { // Cat 6 FTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 FTP LAN Cable',
    description: 'Foiled Cat6 cable with overall shield for commercial and industrial applications. Features weather-proof double jacket construction with EC grade copper conductors and 42 micron aluminum foil shielding for enhanced performance.',
    specifications: {
      'Cable Type': 'FTP (Foiled Twisted Pair)',
      'Category': 'Cat 6',
      'Construction': 'Weather Proof Double Jacket',
      'Conductor': '23/24/25/26 EC Grade Copper/CCA',
      'Foil': '42 Micron Aluminum Foil',
      'Twisting': 'International Standard',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Protection': 'Weather & Temperature Proof',
      'Testing': 'DCM & Fluke Tested'
    },
    applications: [
      'Commercial Applications',
      'Industrial Environments',
      'Office Networks',
      'Data Transmission',
      'Professional Networks',
      'Building Infrastructure',
      'Network Installations',
      'Enterprise Applications'
    ],
    features: [
      'OEM Suppliers',
      'DCM Tested',
      'Fluke Tested',
      'Fire Retardant High Quality PVC',
      'All Colors Available',
      'Customization Available',
      'Weather Protection',
      'Professional Grade'
    ]
  },

  cat5: { // Cat 6 UTP
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 UTP LAN Cable',
    description: 'Standard Cat6 unshielded cable perfect for modern office networks requiring higher bandwidth. Designed to deliver maximum performance for video and data applications with twisted pairs that help transmit true signals and reduce transmission losses.',
    specifications: {
      'Cable Type': 'UTP (Unshielded Twisted Pair)',
      'Category': 'Cat 6',
      'Conductor': '23/24/25/26 AWG Copper/CCA Wire',
      'Design': 'Twisted Pair Configuration',
      'Performance': 'Maximum Video & Data Performance',
      'Signal': 'True Signal Transmission',
      'Loss': 'Reduced Transmission Losses',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Applications': 'Video & Data'
    },
    applications: [
      'Office Networks',
      'Video & Data Applications',
      'Commercial Buildings',
      'General Networking',
      'Professional Installations',
      'Network Infrastructure',
      'Enterprise Networks',
      'High-Bandwidth Applications'
    ],
    features: [
      'OEM Suppliers',
      'All Colors Available',
      'Customization Available',
      'Maximum Performance',
      'Reduced Transmission Losses',
      'True Signal Transmission',
      'Professional Grade',
      'Reliable Performance'
    ]
  },

  cat6: { // Cat 6 Outdoor
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Cat 6 Outdoor LAN Cable',
    description: 'Weather-resistant Cat6 cable for outdoor installations. Features UV-protected LDPE sheath facilitating both indoor and outdoor applications. Supports multiple network standards including 10BASE-T, 100BASE-T, and 1000BASE-TX.',
    specifications: {
      'Construction': 'Outdoor Rated',
      'Category': 'Cat 6',
      'Sheath': 'LDPE UV-Protected',
      'Applications': 'Indoor/Outdoor',
      'Standards': '10BASE-T, 100BASE-T, 1000BASE-TX',
      'Protocols': 'TP-PMD, 100 Mbps CDDI, ATM 155',
      'Token Ring': '4/16 Mbps Support',
      'Length': '100m/305m Standard',
      'Speed': '1000 Mbps',
      'Protection': 'UV & Weather Resistant'
    },
    applications: [
      '10BASE-T Networks',
      '100BASE-T Applications',
      '1000BASE-TX High-Speed',
      'TP-PMD Connections',
      '100 Mbps CDDI',
      'ATM 155 Applications',
      'Token Ring Networks',
      'Outdoor Installations'
    ],
    features: [
      'OEM Suppliers',
      'All Colors Available',
      'Customization Available',
      'Weather Resistant',
      'UV Protected',
      'Indoor/Outdoor Use',
      'Multiple Standards Support',
      'Professional Grade'
    ]
  },

  // ========================
  // CCTV CABLES
  // ========================

  cctv1: { // CCTV Cable 3+1
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'CCTV Cable 3+1',
    description: 'Professional CCTV cable combining power and video transmission in a single cable. Features 3 copper power conductors and 1 coaxial video core for reliable surveillance system connections. Manufactured using exceptional quality raw materials with superior picture quality.',
    specifications: {
      'Configuration': '3+1 (3 Power + 1 Video)',
      'Video Core': 'Coaxial RG59 Type',
      'Power Conductors': '3 x Copper Wire',
      'Video Conductor': '0.18mm/0.20mm Copper',
      'Core Size': '7x38, 14x40, 14x42, 14x43',
      'Shielding': '36 x 0.115mm Alloy + Aluminum Foil',
      'Jacket': 'PVC Weather Resistant',
      'Length': '90m/180m Standard',
      'Operating Voltage': '12V DC Power',
      'Quality': 'Exceptional Raw Materials'
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

  cctv2: { // CCTV Cable 4+1
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'CCTV Cable 4+1',
    description: 'Premium CCTV cable with 4 power conductors and 1 coaxial core for enhanced power delivery. Ideal for PTZ cameras and long-distance installations requiring superior power capacity and video quality. Features exceptional raw materials and professional construction.',
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

  // ========================
  // TELEPHONE CABLES
  // ========================

  tel1: { // Standard Telephone Cable
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Standard Telephone Cable',
    description: 'Multi-pair telephone cable for voice communication systems. Features pure electrolytic grade copper conductors with high-quality PVC insulation. Suitable for internal and external telephone wiring with superior signal quality and durability. Available in 1-50 pair configurations.',
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

  // ========================
  // COMPUTER CORDS
  // ========================

  cc1: { // Desktop CPU Power Cord
    images: [
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Desktop CPU Power Cord',
    description: 'Standard 3-pin power cord designed for desktop computers, monitors, and electronic devices. Features safety certification, overload protection, and durable construction for reliable power delivery. Compatible with standard wall outlets and electronic gadgets.',
    specifications: {
      'Connector Type': '3-Pin Grounded Male Plug',
      'Female End': 'IEC C13 Socket',
      'Wire Gauge': '18 AWG',
      'Voltage Rating': '250V AC',
      'Current Rating': '10A',
      'Length Options': '1m, 1.5m, 2m, 3m',
      'Jacket': 'PVC Black',
      'Safety': 'CE, RoHS Compliant',
      'Temperature': '-10°C to +70°C',
      'Protection': 'Overload Protection'
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
  },

  cc2: { // Laptop Notebook Adapter Power Cord
    images: [
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Laptop Notebook Adapter Power Cord',
    description: 'Universal laptop power cord compatible with most notebook adapters. Features advanced overload protection, anti-interference design, and better isolation materials. Compatible with major brands including HP, Dell, Lenovo, Sony, Toshiba, and more.',
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

  // ========================
  // LIFT CABLES
  // ========================

  lift1: { // Standard Lift Cable
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Standard Lift Cable',
    description: 'Professional lift cable with enhanced flexibility and durability for elevator systems. Features bare copper extra fine wire conductors with high flexible design. Designed for reliable operation in demanding vertical transportation environments with special carriage support.',
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

  // ========================
  // SPEAKER CABLES
  // ========================

  speaker1: { // Standard Speaker Cable
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    title: 'Standard Speaker Cable',
    description: 'High-quality speaker cable for audio applications. Features multi-stranded copper conductors and reliable connections for optimal sound transmission and clarity. Designed for establishing connections between speakers and amplifier sources with superior audio quality.',
    specifications: {
      'Application': 'Speaker & Audio Systems',
      'Connection': 'Amplifier to Speaker',
      'Properties': 'Resistance, Capacitance, Inductance',
      'Voltage Rating': '300/300V',
      'Length': 'Full 100m Available',
      'Conductor': 'Multi-stranded OFC/Copper/Tinned',
      'Standard': 'RoHS PVC',
      'Certification': 'CE, SGS, ISO9001',
      'Temperature': '70°C Long Period Operation',
      'Quality': 'Professional Audio Grade'
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
  }
};

// Safe getter with normalized fallback
export const getProductDetails = (productId: string): ProductDetails => {
  const key = typeof productId === 'string' ? productId : '';
  const details = key ? productImageCollections[key] : undefined;

  // If not found, return default content
  if (!details) {
    return {
      images: [
        'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      title: 'Professional Cable Product',
      description: 'High-quality cable product from Chhajer Cable Industries. Engineered for professional applications with superior performance and reliability.',
      specifications: {
        'Quality': 'Professional Grade',
        'Manufacturer': 'Chhajer Cable Industries',
        'Certification': 'Industry Standard'
      },
      applications: [
        'Professional Applications',
        'Network Infrastructure',
        'Commercial Use'
      ],
      features: [
        'Professional Grade Quality',
        'Reliable Performance',
        'Industry Standard'
      ]
    };
  }

  return details;
};

// Unified description component for consistent rendering
export const getUnifiedProductDescription = (productId: string) => {
  return getProductDetails(productId);
};