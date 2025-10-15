// productDataUpdated.ts

// Complete safe rewrite of productImages.ts for Chhajer Cable Industry
// Purpose: Fix missing Quick View content for CAT5e and CAT6 LAN cable variants
// All other products remain untouched and compatible

// --- Typing & Header Section ---
export interface ProductSpecs {
  [key: string]: string;
}

export interface ProductDetails {
  images: string[];
  title: string;
  description: string;
  specifications: ProductSpecs;
  features: string[];
  applications: string[];
}

export interface ProductImageCollection {
  [key: string]: ProductDetails;
}

export const productDataUpdated: ProductImageCollection = {
  // --- CAT5e LAN CABLES ---
  'cat5e-stp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 5e STP LAN Cable',
    description: 'Premium Cat 5e STP cable with superior shielding for professional-grade data transfer. OEM supplier standard product with guaranteed quality and performance.',
    specifications: {
      'Frequency': 'Up to 350MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Full Braided + Aluminum Foil Shield',
      'Conductor': 'Pure Copper or CCA',
      'Gauge': '23/24/25/26 AWG Stranded',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC/LSZH',
      'Speed': 'Up to 1Gbps',
      'Length Options': '100MTR / 305MTR',
      'Testing': 'Fluke Tested',
      'Customization': 'All Colors Available'
    },
    features: [
      'OEM Supplier Grade',
      'Stable Gigabit Transmission',
      'Excellent Crosstalk Protection',
      'Supports Power Over Ethernet (PoE)',
      'Fluke Certified Quality',
      'Customizable Colors & Lengths'
    ],
    applications: [
      'Network Adapters & Switches',
      'Routers & Modems',
      'Patch Panels',
      'Data Centers',
      'Professional Installations'
    ]
  },

  'cat5e-ftp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 5e FTP LAN Cable',
    description: 'High-quality Cat 5e FTP LAN cable with foil shielding for interference reduction. Designed for robust commercial and residential networking applications.',
    specifications: {
      'Frequency': 'Up to 350MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Aluminum Foil Shielded Twisted Pair',
      'Conductor': 'CCA / Pure Copper',
      'Gauge': '23/24/25/26 AWG',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC or LSZH',
      'Speed': 'Up to 1Gbps',
      'Length': '100MTR / 305MTR',
      'Testing': 'Passed Fluke Test'
    },
    features: [
      'OEM Supplier Grade',
      'Foil Shielded Twisted Pair',
      'Stable Gigabit Performance',
      'Available in Multiple Colors',
      'Fluke Tested & Verified',
      'Long Durability for Outdoor/Indoor Use'
    ],
    applications: [
      'LAN Systems',
      'Data Centers',
      'Network Infrastructure',
      'Enterprise Offices',
      'Patch Panels and Routers'
    ]
  },

  'cat5e-utp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 5e UTP LAN Cable',
    description: 'Unshielded twisted pair Cat 5e LAN cable offering high-speed, interference-free networking for home, business, and industrial setups.',
    specifications: {
      'Frequency': 'Up to 350MHz',
      'Impedance': '100 ±15Ω',
      'Conductor': 'Pure Copper / CCA',
      'Pairs': '4 Twisted Pairs',
      'Jacket': 'PVC/LSZH',
      'Speed': 'Up to 1Gbps',
      'Length': '100MTR / 305MTR',
      'Testing': 'Fluke Tested',
      'Customization': 'Available in Multiple Colors'
    },
    features: [
      'Unshielded Twisted Pair Design',
      'Reliable 1Gbps Speed',
      'Strong Jacket for Durability',
      'OEM Grade Copper Conductors',
      'Flexible & Easy Installation'
    ],
    applications: [
      'LAN Network Systems',
      'Home and Office Networks',
      'Data Transmission',
      'Switches and Hubs',
      'Routers and Patch Panels'
    ]
  },

  'cat5e-outdoor-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 5e Outdoor LAN Cable',
    description: 'UV-protected and water-resistant Cat 5e outdoor cable engineered for stable performance in harsh conditions. Suitable for long-distance runs.',
    specifications: {
      'Frequency': 'Up to 350MHz',
      'Shield': 'UV Resistant Black PE Jacket',
      'Conductor': 'CCA / Copper',
      'Pairs': '4 Shielded Twisted Pairs',
      'Speed': 'Up to 1Gbps',
      'Length': '100MTR / 305MTR',
      'Testing': 'Fluke Tested',
      'Weather Resistance': 'UV & Moisture Proof'
    },
    features: [
      'Outdoor-Grade UV Jacket',
      'High-Speed Stable Performance',
      'Waterproof PE Jacket',
      'Suitable for Long Runs',
      'OEM Supplier Certified'
    ],
    applications: [
      'Outdoor Network Installations',
      'CCTV Connectivity',
      'Wi-Fi Access Points',
      'Building-to-Building Links',
      'Industrial Networking'
    ]
  },

  // --- CAT6 LAN CABLES ---
  'cat6-stp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 6 STP LAN Cable',
    description: 'Superior Cat 6 STP LAN cable designed with advanced shielding for minimal interference and maximum performance up to 10Gbps.',
    specifications: {
      'Frequency': 'Up to 550MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Foil + Braided Shield',
      'Conductor': 'Pure Copper / CCA',
      'Gauge': '23 AWG',
      'Speed': 'Up to 10Gbps',
      'Jacket': 'PVC/LSZH',
      'Length': '100MTR / 305MTR',
      'Testing': 'Fluke Tested'
    },
    features: [
      'Enhanced Crosstalk Protection',
      'Stable 10Gbps Data Rate',
      'OEM Supplier Standard',
      'PoE Compatible',
      'Durable Shielded Build',
      'Customizable Colors & Lengths'
    ],
    applications: [
      'Data Centers',
      'High-Speed LAN Systems',
      'Enterprise Networks',
      'Industrial Automation',
      'Server Installations'
    ]
  },

  'cat6-ftp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 6 FTP LAN Cable',
    description: 'Cat 6 FTP LAN cable built with foil shielding for consistent data integrity and reduced electromagnetic interference. Ideal for commercial networks.',
    specifications: {
      'Frequency': 'Up to 550MHz',
      'Impedance': '100 ±15Ω',
      'Shield': 'Aluminum Foil Shielded',
      'Conductor': 'CCA / Pure Copper',
      'Gauge': '23 AWG',
      'Speed': 'Up to 10Gbps',
      'Length': '100MTR / 305MTR',
      'Jacket': 'PVC or LSZH',
      'Testing': 'Passed Fluke Test'
    },
    features: [
      'OEM Quality',
      'Foil Shielding for EMI Protection',
      'Stable Gigabit to 10Gbps Speed',
      'Available in Multiple Colors',
      'Customizable Lengths'
    ],
    applications: [
      'LAN Networks',
      'Patch Panels',
      'Switches and Routers',
      'Professional IT Setups',
      'Commercial Buildings'
    ]
  },

  'cat6-utp-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 6 UTP LAN Cable',
    description: 'Unshielded Cat 6 cable engineered for high-speed transmission with minimal interference. Designed for modern enterprise networking systems.',
    specifications: {
      'Frequency': 'Up to 550MHz',
      'Impedance': '100 ±15Ω',
      'Conductor': '23 AWG Solid Copper / CCA',
      'Pairs': '4 Twisted Pairs',
      'Speed': 'Up to 10Gbps',
      'Jacket': 'PVC/LSZH',
      'Testing': 'Fluke Certified'
    },
    features: [
      'High Bandwidth Support',
      'Ideal for Gigabit Networks',
      'Durable PVC/LSZH Jacket',
      'OEM Supplier Grade',
      'Custom Lengths & Colors'
    ],
    applications: [
      'LAN and WAN Networks',
      'Office Setups',
      'Data Transfer and Communication',
      'Switches and Hubs',
      'Networking Equipment'
    ]
  },

  'cat6-outdoor-lan-cable': {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    title: 'Cat 6 Outdoor LAN Cable',
    description: 'Outdoor-rated Cat 6 LAN cable designed with waterproof and UV-resistant materials for robust networking performance in harsh conditions.',
    specifications: {
      'Frequency': 'Up to 550MHz',
      'Shield': 'UV Resistant PE Outer Jacket',
      'Conductor': 'Pure Copper or CCA',
      'Speed': 'Up to 10Gbps',
      'Length': '100MTR / 305MTR',
      'Testing': 'Fluke Tested',
      'Weather Resistance': 'UV and Moisture Proof'
    },
    features: [
      'Outdoor-Grade Weatherproof Cable',
      'Stable Data Transmission',
      'UV-Protected PE Jacket',
      'OEM Supplier Quality',
      'Ideal for Long Outdoor Runs'
    ],
    applications: [
      'Outdoor Networking',
      'CCTV Systems',
      'Industrial Connections',
      'Wi-Fi Access Points',
      'Inter-building Links'
    ]
  }
};
