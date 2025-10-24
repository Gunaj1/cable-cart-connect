// Product content mapping based on provided specifications
export const productContentMap: Record<string, {
  overview: string;
  applications: string[];
  specifications: { [key: string]: string };
  features: string[];
}> = {
  // Patchcords
  'cat-6-stp': {
    overview: 'Professional CAT 6 STP (Shielded Twisted Pair) patchcord designed for high-performance networking applications. Features advanced shielding technology and copper conductors for reliable data transmission.',
    applications: [
      'LAN NETWORK SYSTEM',
      'COMPUTER NETWORK DISTRIBUTING SYSTEM', 
      'TELECOMMUNICATION NETWORK SYSTEM',
      'TESTING EQUIPMENT SYSTEM',
      'CATV SYSTEM'
    ],
    specifications: {
      'Type': 'STP TYPE',
      'Connector': 'RJ45 PLUG',
      'Jacket': 'PVC JACKET',
      'Configuration': '4 TWISTED PAIR',
      'Conductor': 'COPPER CONDUCTOR',
      'Construction': '4 TWISTED PAIRS CABLE AROUND A CROSS SHAPED CENTRAL FILLER',
      'Material': 'BARE COPPER OR TINNED COPPER OR CCA',
      'Gauge': '23/24/25/26AWG OR CUSTOMIZED',
      'Lengths': 'ALL LENGTHS AVAILABLE',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIER',
      'CUSTOMIZATION AVAILABLE',
      'Professional Grade Construction',
      'High-Performance Shielding',
      'Multiple Gauge Options',
      'Custom Length Manufacturing'
    ]
  },
  'cat-6-ftp': {
    overview: 'CAT 6 FTP (Foiled Twisted Pair) patchcord with aluminum foil shielding for enhanced protection against EMI. Ideal for data centers and enterprise networks.',
    applications: [
      'DATA CENTERS',
      'ENTERPRISE NETWORKS',
      'PROFESSIONAL INSTALLATIONS',
      'HIGH-FREQUENCY APPLICATIONS'
    ],
    specifications: {
      'Frequency': 'UP TO 600MHZ',
      'Impedance': '100 ±15Ω',
      'Shield': 'ALUMINUM FOIL SUPPORTED',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH',
      'Connectors': 'RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED',
      'Packing': 'PE BAG OR CUSTOMIZED'
    },
    features: [
      'PASSED FLUKE TEST',
      'CUSTOMIZED LENGTHS AND COLORS ACCEPTED',
      'High Frequency Performance',
      'EMI Protection',
      'Premium Gold-Plated Connectors',
      'Professional Testing Certified'
    ]
  },
  'cat-6-utp': {
    overview: 'CAT 6 UTP (Unshielded Twisted Pair) patchcord offering excellent performance for standard networking applications. Cost-effective solution for office and educational environments.',
    applications: [
      'OFFICE ENVIRONMENTS',
      'SCHOOLS',
      'RESIDENTIAL NETWORKS',
      'STANDARD DATA APPLICATIONS'
    ],
    specifications: {
      'Frequency': 'UP TO 600MHZ',
      'Impedance': '100 ±15Ω',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH',
      'Connectors': 'RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED',
      'Packing': 'PE BAG OR CUSTOMIZED'
    },
    features: [
      'OEM SUPPLIERS',
      'PASSED FLUKE TEST',
      'CUSTOMIZED LENGTHS AND COLORS ACCEPTED',
      'Cost-Effective Solution',
      'Reliable Performance',
      'Standard Compliance'
    ]
  },
  'cat-5e-stp': {
    overview: 'CAT 5e STP patchcord with enhanced shielding for superior performance. Features LSZH jacket option for reduced toxic gas emission during combustion.',
    applications: [
      'NETWORK ADAPTERS',
      'HUBS AND SWITCHES',
      'ROUTER CONNECTIONS',
      'PROFESSIONAL INSTALLATIONS'
    ],
    specifications: {
      'Frequency': 'UP TO 600MHZ',
      'Length': '0.1 MTR TO 100 MTR',
      'Connector': 'RJ45, 8P8C, 2 FORK 50µ GOLD PLATED CONTACTS',
      'Jacket': 'LSZH AVAILABLE',
      'Testing': '100% FACTORY TESTED',
      'Colors': '5 DIFFERENT JACKET COLORS AVAILABLE'
    },
    features: [
      'LSZH JACKET - REDUCED TOXIC GASES DURING COMBUSTION',
      'SHIELDED PLUG BOOT CABLE ASSEMBLIES',
      'BETTER MECHANICAL PROPERTIES',
      'CUSTOMIZATION AVAILABLE',
      'Factory Tested Quality',
      'Multiple Color Options'
    ]
  },
  'cat-5e-ftp': {
    overview: 'CAT 5e FTP patchcord with aluminum foil shielding providing excellent EMI protection for reliable data transmission in challenging environments.',
    applications: [
      'DATA TRANSMISSION',
      'NETWORK CONNECTIONS',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL NETWORKING'
    ],
    specifications: {
      'Frequency': 'UP TO 600MHZ',
      'Impedance': '100 ±15Ω',
      'Shield': 'ALUMINUM FOIL SUPPORTED',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH',
      'Connectors': 'RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED',
      'Packing': 'PE BAG OR CUSTOMIZED'
    },
    features: [
      'PASSED FLUKE TEST',
      'CUSTOMIZED LENGTHS AND COLORS ACCEPTED',
      'EMI Shielding Protection',
      'Professional Grade Quality',
      'Flexible Configuration Options',
      'Quality Assured Testing'
    ]
  },
  'cat-5e-utp': {
    overview: 'CAT 5e UTP patchcord designed for network connections with enhanced performance capabilities. Suitable for various networking applications with reliable connectivity.',
    applications: [
      'NETWORK CONNECTION',
      'ETHERNET APPLICATIONS',
      'OFFICE NETWORKING',
      'DATA TRANSMISSION'
    ],
    specifications: {
      'Frequency': 'UP TO 600MHZ',
      'Product': '8P8C RJ45 SNAGLESS CAT5E PATCH CABLE UTP',
      'Jacket': 'PVC/PE/LSZH',
      'Plug Type': 'RJ45 8P8C PLUG',
      'Length': '0.1 MTR TO 100 MTR',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'Snagless Design',
      'Multiple Jacket Options',
      'Full Length Range',
      'Color Customization'
    ]
  },

  // CAT 6 LAN Cables
  'cat3': {
    overview: 'NO.1 QUALITY FOR STP CAT 6 CABLES. CAT 6 STP (Shielded Twisted Pair) LAN cable with 80 wire aloe shielding and 42 micron aluminum foil. Features weather and temperature proof outer LD PVC jacket with DCM and Fluke testing certification for superior electromagnetic interference protection.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL INSTALLATIONS',
      'INDUSTRIAL NETWORKING',
      'DATA CENTERS',
      'HIGH-SPEED DATA TRANSMISSION',
      'ENTERPRISE NETWORKING',
      'TELECOMMUNICATIONS',
      'BROADCAST FACILITIES',
      'MEDICAL EQUIPMENT NETWORKS'
    ],
    specifications: {
      'Type': 'CAT 6 STP (SHIELDED TWISTED PAIR)',
      'Shielding': '80 WIRE ALOE SHIELDED',
      'Foil': '42 MICRON ALUMINIUM FOIL',
      'Jacket': 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
      'Testing': 'DCM TESTED, FLUKE TESTED',
      'Material': 'F.R FRESH HIGH QUALITY PVC',
      'Conductor': '23/24/25/26 AWG COPPER/CCA',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      '80 WIRE ALOE SHIELDED FOR MAXIMUM EMI PROTECTION',
      '42 MICRON ALUMINIUM FOIL SHIELDING',
      'WEATHER AND TEMPERATURE PROOF CONSTRUCTION',
      'DCM TESTED FOR QUALITY ASSURANCE',
      'FLUKE TESTED FOR PERFORMANCE VERIFICATION',
      'SUPERIOR SIGNAL INTEGRITY',
      'REDUCED CROSSTALK AND INTERFERENCE',
      'ENHANCED DATA TRANSMISSION RELIABILITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'FIRE RETARDANT PVC',
      'LONG-TERM DURABILITY',
      'INDUSTRIAL GRADE CONSTRUCTION'
    ]
  },
  'cat4': {
    overview: 'GET BEST QUALITY CAT 6 FTP CABLE FOR YOUR PURPOSE. Best quality CAT 6 FTP (Foiled Twisted Pair) cable with weather proof double jacket and 42 micron aluminum foil shielding. Features international standard twisting with DCM and Fluke testing for reliable high-speed networking.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'DATA CENTERS',
      'ENTERPRISE NETWORKING',
      'PROFESSIONAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'OFFICE NETWORKS',
      'INDUSTRIAL FACILITIES',
      'EDUCATIONAL INSTITUTIONS',
      'HEALTHCARE FACILITIES',
      'GOVERNMENT BUILDINGS',
      'FINANCIAL INSTITUTIONS'
    ],
    specifications: {
      'Type': 'CAT 6 FTP (FOILED TWISTED PAIR)',
      'Jacket': 'WEATHER PROOF DOUBLE JACKET',
      'Conductor': '23/24/25/26 EC GRADE COPPER/CCA',
      'Foil': '42 MICRON ALUMINIUM FOIL',
      'Twisting': 'INTERNATIONAL STANDARD TWISTING',
      'Testing': 'DCM TESTED, FLUKE TESTED',
      'Material': 'F.R FRESH HIGH QUALITY PVC',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'WEATHER PROOF DOUBLE JACKET FOR ENHANCED PROTECTION',
      '23/24/25/26 EC GRADE COPPER/CCA CONDUCTORS',
      '42 MICRON ALUMINIUM FOIL SHIELDING',
      'INTERNATIONAL STANDARD TWISTING FOR OPTIMAL PERFORMANCE',
      'DCM TESTED FOR QUALITY STANDARDS',
      'FLUKE TESTED FOR PERFORMANCE VERIFICATION',
      'ENHANCED EMI PROTECTION',
      'SUPERIOR DATA TRANSMISSION',
      'REDUCED SIGNAL LOSS',
      'HIGH-QUALITY FIRE RETARDANT PVC',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'LONG-LASTING DURABILITY'
    ]
  },
  'cat5': {
    overview: 'CAT 6 UTP (Unshielded Twisted Pair) LAN cable from our premium range, specifically designed to deliver maximum performance for video and data applications. Features twisted pairs to reduce transmission losses and ensure true signal transmission with reliable connectivity.',
    applications: [
      'VIDEO APPLICATIONS',
      'DATA APPLICATIONS',
      'NETWORK INFRASTRUCTURE',
      'OFFICE NETWORKING',
      'RESIDENTIAL NETWORKS',
      'SMALL BUSINESS NETWORKS',
      'EDUCATIONAL FACILITIES',
      'RETAIL ESTABLISHMENTS',
      'IP SURVEILLANCE SYSTEMS',
      'VOIP SYSTEMS',
      'CLOUD COMPUTING NETWORKS'
    ],
    specifications: {
      'Type': 'CAT 6 UTP LAN CABLES RANGE',
      'Conductor': '23/24/25/26 AWG, COPPER/CCA WIRE',
      'Design': 'TWISTED PAIRS TO REDUCE TRANSMISSION LOSSES',
      'Performance': 'MAXIMUM PERFORMANCE FOR VIDEO & DATA APPLICATIONS',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Insulation': 'HIGH-QUALITY HDPE',
      'Jacket': 'PVC/LSZH OPTIONS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'DESIGNED TO DELIVER MAXIMUM PERFORMANCE',
      'TWISTED PAIRS HELP TRANSMIT TRUE SIGNALS',
      'HELP REDUCE TRANSMISSION LOSSES',
      'COST-EFFECTIVE SOLUTION',
      'EASY INSTALLATION',
      'RELIABLE CONNECTIVITY',
      'HIGH-SPEED DATA TRANSMISSION',
      'EXCELLENT SIGNAL INTEGRITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'MEETS INDUSTRY STANDARDS',
      'SUITABLE FOR POE APPLICATIONS'
    ]
  },
  'cat6': {
    overview: 'CHHAJER CABLE IS A LEADING MANUFACTURER AND SUPPLIER OF CAT6 OUTDOOR NETWORK CABLE. Leading manufacturer and supplier of CAT6 Outdoor Network Cable. Safe to use and provides required utility to network systems with LDPE sheath facilitating indoor/outdoor applications. Weather-resistant and UV-protected for reliable outdoor installations.',
    applications: [
      '10 BASE T',
      '100 BASE T',
      '1000 BASE-TX',
      'TP-PMD',
      '100 MBPS CDDI',
      'ATM 155',
      '4/16 MBPS TOKEN RING',
      'SUITABLE FOR OUTDOOR APPLICATION',
      'INDOOR/OUTDOOR APPLICATIONS',
      'OUTDOOR SURVEILLANCE SYSTEMS',
      'CAMPUS NETWORKS',
      'BUILDING-TO-BUILDING CONNECTIONS',
      'OUTDOOR WIRELESS ACCESS POINTS'
    ],
    specifications: {
      'Type': 'CAT 6 OUTDOOR LAN CABLE',
      'Sheath': 'LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS',
      'Protection': 'UV-PROTECTED, WEATHER-RESISTANT',
      'Conductor': '23/24/25/26 AWG COPPER/CCA',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-40°C TO +75°C',
      'Water Resistance': 'MOISTURE RESISTANT'
    },
    features: [
      'OEM SUPPLIERS',
      'SUITABLE FOR OUTDOOR APPLICATION',
      'LDPE SHEATH FOR INDOOR/OUTDOOR USE',
      'MULTIPLE PROTOCOL SUPPORT',
      'UV-PROTECTED FOR SUN EXPOSURE',
      'WEATHER-RESISTANT CONSTRUCTION',
      'MOISTURE RESISTANT DESIGN',
      'EXTREME TEMPERATURE TOLERANCE',
      'DURABLE OUTDOOR CONSTRUCTION',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'SAFE AND RELIABLE',
      'LONG-TERM OUTDOOR PERFORMANCE'
    ]
  },
  'cat-6-flat': {
    overview: 'CAT 6 Flat cable with ultra-thin design perfect for lift and elevator applications. Features unbreakable outer jacket and excellent signal characteristics.',
    applications: [
      'LIFT/ELEVATOR INSTALLATIONS',
      'CCTV SURVEILLANCE IN ELEVATORS',
      'VERTICAL CABLE RUNS',
      'SPACE-CONSTRAINED INSTALLATIONS'
    ],
    specifications: {
      'Construction': 'UNBREAKABLE OUTER JACKET',
      'Conductor': '7/36 EC GRADE COPPER',
      'Inner Core': 'HEAT PROOF INNER CORE',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'EXCELLENT SIGNAL CHARACTERISTICS',
      'CUSTOMIZATION AVAILABLE',
      'Ultra-Thin Flat Design',
      'Heat Resistant Construction',
      'High-Speed Performance'
    ]
  },
  'cat-6-armored': {
    overview: 'Heavy-duty CAT 6 Armored cable designed for harsh environments. Features aluminum rod reinforcement and weather-resistant outer jacket.',
    applications: [
      'OUTDOOR INSTALLATIONS',
      'INDUSTRIAL ENVIRONMENTS',
      'HARSH WEATHER CONDITIONS',
      'UNDERGROUND INSTALLATIONS'
    ],
    specifications: {
      'Conductor': 'HEAVY 23/24/25/26 COPPER GAUGE / CCA WIRES',
      'Grade': 'EC GRADE COPPER',
      'Reinforcement': '0.8 MM ALUMINIUM ROD',
      'Twisting': 'INTERNATIONAL STANDARD TWISTING',
      'Jacket': 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'DCM TESTED',
      'FLUKE TESTED',
      'F.R FRESH HIGH QUALITY PVC',
      'CUSTOMIZATION AVAILABLE',
      'Weather and Temperature Proof'
    ]
  },
  'cat-6-stp-lan': {
    overview: 'NO.1 QUALITY FOR STP CAT 6 CABLES. CAT 6 STP (Shielded Twisted Pair) LAN cable with 80 wire aloe shielding and 42 micron aluminum foil. Features weather and temperature proof outer LD PVC jacket with DCM and Fluke testing certification for superior electromagnetic interference protection.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL INSTALLATIONS',
      'INDUSTRIAL NETWORKING',
      'DATA CENTERS',
      'HIGH-SPEED DATA TRANSMISSION',
      'ENTERPRISE NETWORKING',
      'TELECOMMUNICATIONS',
      'BROADCAST FACILITIES',
      'MEDICAL EQUIPMENT NETWORKS'
    ],
    specifications: {
      'Type': 'CAT 6 STP (SHIELDED TWISTED PAIR)',
      'Shielding': '80 WIRE ALOE SHIELDED',
      'Foil': '42 MICRON ALUMINIUM FOIL',
      'Jacket': 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
      'Testing': 'DCM TESTED, FLUKE TESTED',
      'Material': 'F.R FRESH HIGH QUALITY PVC',
      'Conductor': '23/24/25/26 AWG COPPER/CCA',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      '80 WIRE ALOE SHIELDED FOR MAXIMUM EMI PROTECTION',
      '42 MICRON ALUMINIUM FOIL SHIELDING',
      'WEATHER AND TEMPERATURE PROOF CONSTRUCTION',
      'DCM TESTED FOR QUALITY ASSURANCE',
      'FLUKE TESTED FOR PERFORMANCE VERIFICATION',
      'SUPERIOR SIGNAL INTEGRITY',
      'REDUCED CROSSTALK AND INTERFERENCE',
      'ENHANCED DATA TRANSMISSION RELIABILITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'FIRE RETARDANT PVC',
      'LONG-TERM DURABILITY',
      'INDUSTRIAL GRADE CONSTRUCTION'
    ]
  },
  'cat-6-ftp-lan': {
    overview: 'GET BEST QUALITY CAT 6 FTP CABLE FOR YOUR PURPOSE. Best quality CAT 6 FTP (Foiled Twisted Pair) cable with weather proof double jacket and 42 micron aluminum foil shielding. Features international standard twisting with DCM and Fluke testing for reliable high-speed networking.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'DATA CENTERS',
      'ENTERPRISE NETWORKING',
      'PROFESSIONAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'OFFICE NETWORKS',
      'INDUSTRIAL FACILITIES',
      'EDUCATIONAL INSTITUTIONS',
      'HEALTHCARE FACILITIES',
      'GOVERNMENT BUILDINGS',
      'FINANCIAL INSTITUTIONS'
    ],
    specifications: {
      'Type': 'CAT 6 FTP (FOILED TWISTED PAIR)',
      'Jacket': 'WEATHER PROOF DOUBLE JACKET',
      'Conductor': '23/24/25/26 EC GRADE COPPER/CCA',
      'Foil': '42 MICRON ALUMINIUM FOIL',
      'Twisting': 'INTERNATIONAL STANDARD TWISTING',
      'Testing': 'DCM TESTED, FLUKE TESTED',
      'Material': 'F.R FRESH HIGH QUALITY PVC',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'WEATHER PROOF DOUBLE JACKET FOR ENHANCED PROTECTION',
      '23/24/25/26 EC GRADE COPPER/CCA CONDUCTORS',
      '42 MICRON ALUMINIUM FOIL SHIELDING',
      'INTERNATIONAL STANDARD TWISTING FOR OPTIMAL PERFORMANCE',
      'DCM TESTED FOR QUALITY STANDARDS',
      'FLUKE TESTED FOR PERFORMANCE VERIFICATION',
      'ENHANCED EMI PROTECTION',
      'SUPERIOR DATA TRANSMISSION',
      'REDUCED SIGNAL LOSS',
      'HIGH-QUALITY FIRE RETARDANT PVC',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'LONG-LASTING DURABILITY'
    ]
  },
  'cat-6-utp-lan': {
    overview: 'CAT 6 UTP (Unshielded Twisted Pair) LAN cable from our premium range, specifically designed to deliver maximum performance for video and data applications. Features twisted pairs to reduce transmission losses and ensure true signal transmission with reliable connectivity.',
    applications: [
      'VIDEO APPLICATIONS',
      'DATA APPLICATIONS',
      'NETWORK INFRASTRUCTURE',
      'OFFICE NETWORKING',
      'RESIDENTIAL NETWORKS',
      'SMALL BUSINESS NETWORKS',
      'EDUCATIONAL FACILITIES',
      'RETAIL ESTABLISHMENTS',
      'IP SURVEILLANCE SYSTEMS',
      'VOIP SYSTEMS',
      'CLOUD COMPUTING NETWORKS'
    ],
    specifications: {
      'Type': 'CAT 6 UTP LAN CABLES RANGE',
      'Conductor': '23/24/25/26 AWG, COPPER/CCA WIRE',
      'Design': 'TWISTED PAIRS TO REDUCE TRANSMISSION LOSSES',
      'Performance': 'MAXIMUM PERFORMANCE FOR VIDEO & DATA APPLICATIONS',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Insulation': 'HIGH-QUALITY HDPE',
      'Jacket': 'PVC/LSZH OPTIONS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'DESIGNED TO DELIVER MAXIMUM PERFORMANCE',
      'TWISTED PAIRS HELP TRANSMIT TRUE SIGNALS',
      'HELP REDUCE TRANSMISSION LOSSES',
      'COST-EFFECTIVE SOLUTION',
      'EASY INSTALLATION',
      'RELIABLE CONNECTIVITY',
      'HIGH-SPEED DATA TRANSMISSION',
      'EXCELLENT SIGNAL INTEGRITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'MEETS INDUSTRY STANDARDS',
      'SUITABLE FOR POE APPLICATIONS'
    ]
  },
  'cat-6-outdoor': {
    overview: 'CHHAJER CABLE IS A LEADING MANUFACTURER AND SUPPLIER OF CAT6 OUTDOOR NETWORK CABLE. Leading manufacturer and supplier of CAT6 Outdoor Network Cable. Safe to use and provides required utility to network systems with LDPE sheath facilitating indoor/outdoor applications. Weather-resistant and UV-protected for reliable outdoor installations.',
    applications: [
      '10 BASE T',
      '100 BASE T',
      '1000 BASE-TX',
      'TP-PMD',
      '100 MBPS CDDI',
      'ATM 155',
      '4/16 MBPS TOKEN RING',
      'SUITABLE FOR OUTDOOR APPLICATION',
      'INDOOR/OUTDOOR APPLICATIONS',
      'OUTDOOR SURVEILLANCE SYSTEMS',
      'CAMPUS NETWORKS',
      'BUILDING-TO-BUILDING CONNECTIONS',
      'OUTDOOR WIRELESS ACCESS POINTS'
    ],
    specifications: {
      'Type': 'CAT 6 OUTDOOR LAN CABLE',
      'Sheath': 'LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS',
      'Protection': 'UV-PROTECTED, WEATHER-RESISTANT',
      'Conductor': '23/24/25/26 AWG COPPER/CCA',
      'Frequency': 'UP TO 250 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '250 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-40°C TO +75°C',
      'Water Resistance': 'MOISTURE RESISTANT'
    },
    features: [
      'OEM SUPPLIERS',
      'SUITABLE FOR OUTDOOR APPLICATION',
      'LDPE SHEATH FOR INDOOR/OUTDOOR USE',
      'MULTIPLE PROTOCOL SUPPORT',
      'UV-PROTECTED FOR SUN EXPOSURE',
      'WEATHER-RESISTANT CONSTRUCTION',
      'MOISTURE RESISTANT DESIGN',
      'EXTREME TEMPERATURE TOLERANCE',
      'DURABLE OUTDOOR CONSTRUCTION',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'SAFE AND RELIABLE',
      'LONG-TERM OUTDOOR PERFORMANCE'
    ]
  },

  // CAT 5e LAN Cables
  'lan5': {
    overview: 'OEM SUPPLIERS. Cat 5e STP (Shielded Twisted Pair) LAN cable designed for network adapters, hubs, switches, routers, DSL/cable modems, and patch panels. Features FTP shielded twist pair construction with CM type PVC jacket for reliable computer networking applications.',
    applications: [
      'NETWORK ADAPTERS',
      'HUBS AND SWITCHES',
      'ROUTERS',
      'DSL/CABLE MODEMS',
      'PATCH PANELS',
      'COMPUTER NETWORKING APPLICATIONS',
      'ETHERNET NETWORKS',
      'TELECOMMUNICATIONS',
      'STRUCTURED CABLING SYSTEMS',
      'DATA TRANSMISSION',
      'BUILDING AUTOMATION SYSTEMS'
    ],
    specifications: {
      'Type': 'CAT 5E STP (SHIELDED TWISTED PAIR)',
      'Shielding': 'FTP SHIELDED TWIST PAIR',
      'Jacket': 'CM TYPE PVC JACKET',
      'Conductor': '23/24/25/26 AWG 4-PAIR STRANDED COPPER/CCA WIRE',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '100 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'DESIGNED FOR NETWORK ADAPTERS, HUBS, SWITCHES, ROUTERS',
      'FTP SHIELDED TWIST PAIR CONSTRUCTION',
      'CM TYPE PVC JACKET FOR FIRE SAFETY',
      'EMI/RFI INTERFERENCE PROTECTION',
      'RELIABLE DATA TRANSMISSION',
      'HIGH-SPEED PERFORMANCE',
      'DURABLE CONSTRUCTION',
      'PROFESSIONAL GRADE QUALITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'COST-EFFECTIVE SOLUTION'
    ]
  },
  'lan4': {
    overview: 'OEM SUPPLIERS. CAT 5e FTP (Foiled Twisted Pair) LAN cable with aluminum foil shielding for enhanced EMI protection and reliable data transmission. Features frequency range of 1 to 500MHz with professional grade quality. Passed Fluke test for performance verification.',
    applications: [
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'INDUSTRIAL FACILITIES',
      'TELECOMMUNICATIONS SYSTEMS',
      'ENTERPRISE NETWORKS',
      'STRUCTURED CABLING',
      'HIGH-INTERFERENCE AREAS'
    ],
    specifications: {
      'Type': 'CAT 5E FTP (FOILED TWISTED PAIR)',
      'Frequency': '1 TO 500MHZ',
      'Impedance': '100 ±15Ω',
      'Shield': 'ALUMINUM FOIL SUPPORTED',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH OPTIONS',
      'Packing': 'PE BAG OR CUSTOMIZED',
      'Bandwidth': '100 MHZ',
      'Speed': '1000 MBPS (1 GBPS)',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'FREQUENCY RANGE: 1 TO 500MHZ',
      'PASSED FLUKE TEST FOR QUALITY ASSURANCE',
      'ALUMINUM FOIL SHIELDING FOR EMI PROTECTION',
      'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
      'HIGH-FREQUENCY PERFORMANCE',
      'RELIABLE DATA TRANSMISSION',
      'PROFESSIONAL GRADE CONSTRUCTION',
      'EMI/RFI PROTECTION',
      'LSZH JACKET OPTION AVAILABLE',
      'FLEXIBLE INSTALLATION',
      'DURABLE AND LONG-LASTING'
    ]
  },
  'lan6': {
    overview: 'OEM SUPPLIERS. Cat 5e UTP LAN cable compliant with Enhanced Category 5 Ethernet standard, achieving transmission speeds of 1,000 Mbps (1 Gbps). Ultra-ribbon flat cable design with 1.4mm thickness and 8mm width offering excellent performance and space-saving installation.',
    applications: [
      'ETHERNET STANDARD (1000 BASE-T)',
      'GIGABIT NETWORKING',
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE',
      'OFFICE NETWORKING',
      'HOME NETWORKS',
      'RESIDENTIAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'SMALL BUSINESS NETWORKS',
      'UNDER-CARPET INSTALLATIONS',
      'FLAT SURFACE ROUTING'
    ],
    specifications: {
      'Type': 'CAT 5E UTP (UNSHIELDED TWISTED PAIR)',
      'Speed': '1000 MBPS (1 GBPS)',
      'Standard': 'ENHANCED CATEGORY 5 (1000 BASE-T)',
      'Design': 'FLAT TYPE ULTRA-RIBBON',
      'Thickness': '1.4 MM',
      'Width': '8 MM',
      'Structure': 'STRANDED WIRE TWISTED PAIR, STRAIGHT-THROUGH',
      'Pairs': 'ALL 4 PAIRS OF WIRES',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Conductor': '23/24/25/26 AWG STRANDED COPPER/CCA',
      'Length': '100MTR/305MTR',
      'Temperature Rating': '-20°C TO +60°C',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'COMPLIANT WITH ETHERNET STANDARD',
      'FLAT TYPE ENHANCED CATEGORY 5 DESIGN',
      'ULTRA-RIBBON CABLE 1.4MM THICKNESS',
      'SPACE-SAVING INSTALLATION',
      'UNDER-CARPET FRIENDLY',
      'EASY TO ROUTE AND INSTALL',
      'GIGABIT ETHERNET SUPPORT',
      'HIGH-SPEED DATA TRANSMISSION',
      'COST-EFFECTIVE SOLUTION',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'CABLE STRUCTURE USES ALL 4 PAIRS'
    ]
  },
  'lan7': {
    overview: 'OEM SUPPLIERS. CAT 5e OUTDOOR LAN cable specifically designed for outdoor installations. Features overall aluminum foil shield (F/UTP) and supports PoE++ (802.3bt) 4PPoe up to 90W for outdoor networking needs with bandwidth tested up to 600 MHz.',
    applications: [
      'OUTDOOR INSTALLATIONS',
      'POE++ APPLICATIONS',
      'NETWORK INFRASTRUCTURE',
      'OUTDOOR SURVEILLANCE SYSTEMS',
      'INDUSTRIAL ENVIRONMENTS',
      'CAMPUS NETWORKS',
      'OUTDOOR WIRELESS ACCESS POINTS',
      'IP SECURITY CAMERAS',
      'BUILDING-TO-BUILDING CONNECTIONS',
      'OUTDOOR NETWORKING EQUIPMENT'
    ],
    specifications: {
      'Type': 'CAT 5E OUTDOOR LAN CABLE',
      'Conductor': '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER/CCA WIRE',
      'Shield': 'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'Bandwidth': 'TESTED UP TO 600 MHZ',
      'PoE Support': 'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W',
      'Installation': 'NOT RATED FOR DIRECT BURIAL',
      'Protection': 'UV-RESISTANT, WEATHER-PROOF',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Temperature Rating': '-40°C TO +75°C'
    },
    features: [
      'OEM SUPPLIERS',
      '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER/CCA WIRE',
      'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'BANDWIDTH TESTED UP TO 600 MHZ',
      'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W',
      'HIGH-POWER POE DEVICES SUPPORT',
      'UV-RESISTANT FOR SUN EXPOSURE',
      'WEATHER-PROOF CONSTRUCTION',
      'OUTDOOR RATED',
      'EMI/RFI PROTECTION',
      'RELIABLE OUTDOOR PERFORMANCE',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE'
    ]
  },
  'cat-5e-flat-lan': {
    overview: 'CAT 5e Flat cable with excellent electrical characteristics and wide application support for high-speed networking applications.',
    applications: [
      '1000 BASE T GIGABIT',
      '100 MBPS',
      '100 BASE-TX',
      'TPDDI',
      '155 MBPS ATM'
    ],
    specifications: {
      'Impedance': '100Ω±15% (1 TO 100 MHZ)',
      'Speed': '≥0,69',
      'Resistance': '149 Ω/KM ± 5% AT 20ºC',
      'Max Voltage': 'AC 49 V',
      'Frequency': 'UP TO 600 MHZ',
      'Length': '100MTR/305MTR'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'High-Speed Performance',
      'Precise Electrical Characteristics',
      'Multiple Application Support'
    ]
  },
  'cat-5e-2pair': {
    overview: 'CAT 5e 2 Pair LAN cable with special shielding configuration and high-quality insulation materials for reliable performance.',
    applications: [
      'NETWORK CONNECTIONS',
      'DATA TRANSMISSION',
      'TELECOMMUNICATIONS',
      'LIMITED PAIR APPLICATIONS'
    ],
    specifications: {
      'Jacket': 'PVC, LLDPE',
      'Insulation': 'SPECIAL PE POLYOLEFIN, WHGN/GN, WHOG/OG',
      'Shielding': 'SF/UTP (OVERALL TINNED COPPER BRAID SHIELD)',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'Tinned Copper Braid Shield',
      'Special Insulation Materials',
      'Compact 2-Pair Design'
    ]
  },
  'cat-5e-armored-lan': {
    overview: 'Heavy-duty CAT 5e Armored cable with aluminum rod reinforcement for harsh environment installations.',
    applications: [
      'INDUSTRIAL INSTALLATIONS',
      'OUTDOOR NETWORKING',
      'HARSH ENVIRONMENTS',
      'UNDERGROUND INSTALLATIONS'
    ],
    specifications: {
      'Conductor': 'HEAVY 23/24/25/26 COPPER & CCA GAUGE',
      'Grade': 'EC GRADE COPPER',
      'Reinforcement': '0.8 MM ALUMINIUM ROD',
      'Twisting': 'INTERNATIONAL STANDARD TWISTING',
      'Jacket': 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS'
    },
    features: [
      'OEM SUPPLIERS',
      'DCM TESTED',
      'FLUKE TESTED',
      'F.R FRESH HIGH QUALITY PVC',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE'
    ]
  },
  'cat-5e-stp-lan': {
    overview: 'OEM SUPPLIERS. Cat 5e STP (Shielded Twisted Pair) LAN cable designed for network adapters, hubs, switches, routers, DSL/cable modems, and patch panels. Features FTP shielded twist pair construction with CM type PVC jacket for reliable computer networking applications.',
    applications: [
      'NETWORK ADAPTERS',
      'HUBS AND SWITCHES',
      'ROUTERS',
      'DSL/CABLE MODEMS',
      'PATCH PANELS',
      'COMPUTER NETWORKING APPLICATIONS',
      'ETHERNET NETWORKS',
      'TELECOMMUNICATIONS',
      'STRUCTURED CABLING SYSTEMS',
      'DATA TRANSMISSION',
      'BUILDING AUTOMATION SYSTEMS'
    ],
    specifications: {
      'Type': 'CAT 5E STP (SHIELDED TWISTED PAIR)',
      'Shielding': 'FTP SHIELDED TWIST PAIR',
      'Jacket': 'CM TYPE PVC JACKET',
      'Conductor': '23/24/25/26 AWG 4-PAIR STRANDED COPPER/CCA WIRE',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Bandwidth': '100 MHZ',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'DESIGNED FOR NETWORK ADAPTERS, HUBS, SWITCHES, ROUTERS',
      'FTP SHIELDED TWIST PAIR CONSTRUCTION',
      'CM TYPE PVC JACKET FOR FIRE SAFETY',
      'EMI/RFI INTERFERENCE PROTECTION',
      'RELIABLE DATA TRANSMISSION',
      'HIGH-SPEED PERFORMANCE',
      'DURABLE CONSTRUCTION',
      'PROFESSIONAL GRADE QUALITY',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'COST-EFFECTIVE SOLUTION'
    ]
  },
  'cat-5e-ftp-lan': {
    overview: 'OEM SUPPLIERS. CAT 5e FTP (Foiled Twisted Pair) LAN cable with aluminum foil shielding for enhanced EMI protection and reliable data transmission. Features frequency range of 1 to 500MHz with professional grade quality. Passed Fluke test for performance verification.',
    applications: [
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'INDUSTRIAL FACILITIES',
      'TELECOMMUNICATIONS SYSTEMS',
      'ENTERPRISE NETWORKS',
      'STRUCTURED CABLING',
      'HIGH-INTERFERENCE AREAS'
    ],
    specifications: {
      'Type': 'CAT 5E FTP (FOILED TWISTED PAIR)',
      'Frequency': '1 TO 500MHZ',
      'Impedance': '100 ±15Ω',
      'Shield': 'ALUMINUM FOIL SUPPORTED',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH OPTIONS',
      'Packing': 'PE BAG OR CUSTOMIZED',
      'Bandwidth': '100 MHZ',
      'Speed': '1000 MBPS (1 GBPS)',
      'Pairs': '4 TWISTED PAIRS',
      'Temperature Rating': '-20°C TO +60°C'
    },
    features: [
      'OEM SUPPLIERS',
      'FREQUENCY RANGE: 1 TO 500MHZ',
      'PASSED FLUKE TEST FOR QUALITY ASSURANCE',
      'ALUMINUM FOIL SHIELDING FOR EMI PROTECTION',
      'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
      'HIGH-FREQUENCY PERFORMANCE',
      'RELIABLE DATA TRANSMISSION',
      'PROFESSIONAL GRADE CONSTRUCTION',
      'EMI/RFI PROTECTION',
      'LSZH JACKET OPTION AVAILABLE',
      'FLEXIBLE INSTALLATION',
      'DURABLE AND LONG-LASTING'
    ]
  },
  'cat-5e-utp-lan': {
    overview: 'OEM SUPPLIERS. Cat 5e UTP LAN cable compliant with Enhanced Category 5 Ethernet standard, achieving transmission speeds of 1,000 Mbps (1 Gbps). Ultra-ribbon flat cable design with 1.4mm thickness and 8mm width offering excellent performance and space-saving installation.',
    applications: [
      'ETHERNET STANDARD (1000 BASE-T)',
      'GIGABIT NETWORKING',
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE',
      'OFFICE NETWORKING',
      'HOME NETWORKS',
      'RESIDENTIAL INSTALLATIONS',
      'COMMERCIAL BUILDINGS',
      'SMALL BUSINESS NETWORKS',
      'UNDER-CARPET INSTALLATIONS',
      'FLAT SURFACE ROUTING'
    ],
    specifications: {
      'Type': 'CAT 5E UTP (UNSHIELDED TWISTED PAIR)',
      'Speed': '1000 MBPS (1 GBPS)',
      'Standard': 'ENHANCED CATEGORY 5 (1000 BASE-T)',
      'Design': 'FLAT TYPE ULTRA-RIBBON',
      'Thickness': '1.4 MM',
      'Width': '8 MM',
      'Structure': 'STRANDED WIRE TWISTED PAIR, STRAIGHT-THROUGH',
      'Pairs': 'ALL 4 PAIRS OF WIRES',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Conductor': '23/24/25/26 AWG STRANDED COPPER/CCA',
      'Length': '100MTR/305MTR',
      'Temperature Rating': '-20°C TO +60°C',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'COMPLIANT WITH ETHERNET STANDARD',
      'FLAT TYPE ENHANCED CATEGORY 5 DESIGN',
      'ULTRA-RIBBON CABLE 1.4MM THICKNESS',
      'SPACE-SAVING INSTALLATION',
      'UNDER-CARPET FRIENDLY',
      'EASY TO ROUTE AND INSTALL',
      'GIGABIT ETHERNET SUPPORT',
      'HIGH-SPEED DATA TRANSMISSION',
      'COST-EFFECTIVE SOLUTION',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'CABLE STRUCTURE USES ALL 4 PAIRS'
    ]
  },
  'cat-5e-outdoor-lan': {
    overview: 'OEM SUPPLIERS. CAT 5e OUTDOOR LAN cable specifically designed for outdoor installations. Features overall aluminum foil shield (F/UTP) and supports PoE++ (802.3bt) 4PPoe up to 90W for outdoor networking needs with bandwidth tested up to 600 MHz.',
    applications: [
      'OUTDOOR INSTALLATIONS',
      'POE++ APPLICATIONS',
      'NETWORK INFRASTRUCTURE',
      'OUTDOOR SURVEILLANCE SYSTEMS',
      'INDUSTRIAL ENVIRONMENTS',
      'CAMPUS NETWORKS',
      'OUTDOOR WIRELESS ACCESS POINTS',
      'IP SECURITY CAMERAS',
      'BUILDING-TO-BUILDING CONNECTIONS',
      'OUTDOOR NETWORKING EQUIPMENT'
    ],
    specifications: {
      'Type': 'CAT 5E OUTDOOR LAN CABLE',
      'Conductor': '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER/CCA WIRE',
      'Shield': 'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'Bandwidth': 'TESTED UP TO 600 MHZ',
      'PoE Support': 'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W',
      'Installation': 'NOT RATED FOR DIRECT BURIAL',
      'Protection': 'UV-RESISTANT, WEATHER-PROOF',
      'Frequency': 'UP TO 100 MHZ',
      'Impedance': '100 ±15Ω',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS (1 GBPS)',
      'Temperature Rating': '-40°C TO +75°C'
    },
    features: [
      'OEM SUPPLIERS',
      '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER/CCA WIRE',
      'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'BANDWIDTH TESTED UP TO 600 MHZ',
      'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W',
      'HIGH-POWER POE DEVICES SUPPORT',
      'UV-RESISTANT FOR SUN EXPOSURE',
      'WEATHER-PROOF CONSTRUCTION',
      'OUTDOOR RATED',
      'EMI/RFI PROTECTION',
      'RELIABLE OUTDOOR PERFORMANCE',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE'
    ]
  },

  // CCTV Cables
  'cctv-3plus1': {
    overview: 'CCTV Cables 3+1 manufactured using exceptional quality raw materials. These durable cables are widely used in connecting CCTV surveillance cameras to DVR and NVR systems.',
    applications: [
      'CCTV SURVEILLANCE CAMERAS',
      'DVR CONNECTION',
      'NVR CONNECTION',
      'PC BASED SYSTEMS',
      'SECURITY INSTALLATIONS'
    ],
    specifications: {
      'Copper Size of Video': '018, 020',
      'Core Size': '7X38, 14X40, 14X42, 14X43',
      'Braiding': '36 X 0.115 MM ALLOY WITH ALUMINUM FOIL',
      'Length': '90M/180M',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'CUSTOMIZATION AVAILABLE',
      'HIGHLY SHOCK-PROOF',
      'HIGH TENSILE STRENGTH',
      'GREAT PICTURE AND VIDEO QUALITY',
      'QUALITY RAW MATERIALS',
      'Exceptional Durability'
    ]
  },
  'cctv-4plus1': {
    overview: 'CCTV Cables 4+1 manufactured using exceptional quality raw materials. These durable cables are widely used in connecting CCTV surveillance cameras to DVR and NVR systems.',
    applications: [
      'CCTV SURVEILLANCE CAMERAS',
      'DVR CONNECTION',
      'NVR CONNECTION',
      'PC BASED SYSTEMS',
      'SECURITY INSTALLATIONS'
    ],
    specifications: {
      'Copper Size of Video': '018, 020',
      'Core Size': '7X38, 14X40, 14X42, 14X43',
      'Braiding': '36 X 0.115 MM ALLOY WITH ALUMINUM FOIL',
      'Length': '90M/180M',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'CUSTOMIZATION AVAILABLE',
      'HIGHLY SHOCK-PROOF',
      'HIGH TENSILE STRENGTH',
      'GREAT PICTURE AND VIDEO QUALITY',
      'QUALITY RAW MATERIALS',
      'Enhanced Signal Quality'
    ]
  },

  // Computer Cords
  'desktop-power-cord': {
    overview: 'Computer Desktop CPU Power Cord designed to supply power to computer systems and various other devices with 3-pin connectivity.',
    applications: [
      'COMPUTER SYSTEMS',
      'MONITORS',
      'PRINTERS',
      'SCANNERS',
      'ELECTRONIC GADGETS'
    ],
    specifications: {
      'Configuration': '3 PIN COMPUTER POWER CORD CABLE',
      'Female End': '3-PIN FEMALE PLUG FOR ELECTRONIC GADGETS',
      'Male End': '3-PRONG GROUNDED MALE PLUG FOR WALL OUTLETS',
      'Connection': 'STANDARD WALL OUTLETS TO DEVICES',
      'Applications': 'PCs, MONITORS, PRINTERS, SCANNERS'
    },
    features: [
      'Standard 3-Pin Configuration',
      'Direct Device Connection',
      'Grounded Male Plug',
      'Universal Compatibility',
      'Reliable Power Supply',
      'Safety Certified Construction'
    ]
  },
  'laptop-adapter-cord': {
    overview: 'Computer Laptop Notebook Adaptor Power Cord designed to connect wall socket to laptop/notebook power brick with polarized configuration.',
    applications: [
      'LAPTOP COMPUTERS',
      'VIDEO GAMES',
      'NOTEBOOKS',
      'PRINTERS',
      'LCD TFT CRT MONITORS',
      'AUDIO EQUIPMENT & AMPS'
    ],
    specifications: {
      'Design': 'POLARISED POWER CABLE',
      'Connection': 'WALL SOCKET TO LAPTOP/NOTEBOOK POWER BRICK',
      'Protection': 'OVERLOAD PROTECTION WITH ADVANCED WIRES',
      'Feature': 'ANTI-INTERFERENCE WITH BETTER ISOLATION',
      'Texture': 'RUBBERISED TEXTURE CORD',
      'Compatibility': 'HP, DELL, LENOVO, SONY VAIO, TOSHIBA, WIPRO, LG, ASUS, SAMSUNG, IBM, ACER'
    },
    features: [
      'Overload Protection',
      'Anti-Interference Feature',
      'Better Isolation Materials',
      'Rubberised Texture Cord',
      'Universal Brand Compatibility',
      'Professional Grade Quality'
    ]
  },

  // Telephone Cables
  'telephone-cable': {
    overview: 'Standard Telephone Cable/Multi Pair Cable processed by high-speed state-of-the-art machinery with pure electrolytic grade copper conductors.',
    applications: [
      'TELEPHONE SWITCHING EXCHANGES',
      'SWITCH BOARD & TELEPHONE WIRING (MDF, SDH, DWDM, DSLAM)',
      'PULSE CODE MODULATION SYSTEMS',
      'RS-232 COMMUNICATION'
    ],
    specifications: {
      'Conductor': 'PURE ELECTROLYTIC GRADE, SUPER ANNEALED, TINNED COPPER',
      'Insulation': 'GOOD QUALITY PVC',
      'Operating Voltage': 'SUITABLE FOR 250 VOLTS',
      'Temperature': '70°C, 85°C & 105°C AVAILABLE ON REQUEST',
      'Pairs': '1-50 PAIR CABLE AVAILABLE',
      'Length': 'CUSTOMIZABLE AS PER REQUIREMENT'
    },
    features: [
      'ALL COLORS AVAILABLE',
      'High-Speed Manufacturing Process',
      'Superior Copper Quality',
      'Fire Retardant Options Available',
      'Fire Retardant Low Smoke Available',
      'Zero Halogen Low Smoke Options'
    ]
  },

  // Speaker Cables
  'speaker-cable': {
    overview: 'Standard Speaker Cable offering wide range of high-quality speaker cables for establishing connections between speakers and amplifier sources.',
    applications: [
      'SPEAKER RANGES, HOME THEATER OR AUDIO SYSTEM',
      'CONNECTING POWER AMPLIFIER AND BROADCASTING SYSTEMS',
      'TRANSMITTING AUDIO SIGNALS AMPLIFIED BY THE AMPLIFIER'
    ],
    specifications: {
      'Conductor': 'MULTI-STRANDED/FLEXIBLE OFC, COPPER, TINNED-COPPER WIRE',
      'Standard': 'ROHS STANDARD PVC',
      'Certification': 'CE, SGS, ISO9001 STANDARD',
      'Length': 'FULL 100M',
      'Rated Voltage': '300/300V',
      'Operating Temperature': 'KEEP WORKING UNDER 70°C FOR LONG PERIOD'
    },
    features: [
      'Reliable Connection',
      'Multi-Stranded Flexible Design',
      'International Standards Compliance',
      'Long-Term High Temperature Operation',
      '3 Key Electrical Properties: Resistance, Capacitance, Inductance',
      'Professional Audio Quality'
    ]
  },

  // Lift Cables
  'lift-cable': {
    overview: 'Standard Lift Cable with bare copper conductor and extra fine wire construction for high flexibility in lift and elevator applications.',
    applications: [
      'LIFT INSTALLATIONS',
      'ELEVATOR SYSTEMS',
      'VERTICAL TRANSPORTATION',
      'CARRIAGE APPLICATIONS'
    ],
    specifications: {
      'Conductor': 'BARE COPPER CONDUCTOR, EXTRA FINE WIRE',
      'Flexibility': 'HIGH FLEXIBLE',
      'Core Insulation': 'PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
      'Core Identification': 'BLACK CORES WITH CONTINUOUS WHITE NUMBERING',
      'Earth Conductor': 'GN-YE CONDUCTOR',
      'Outer Sheath': 'SPECIAL PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'CUSTOMIZABLE AVAILABLE',
      'Sheath UV-Resistant',
      'Special Support in Carriage Version',
      'PUR Sheath Particularly Resistant to Wear',
      'Oil and Hydrolysis Resistant',
      'Microbial Attack Resistant'
    ]
  }
};