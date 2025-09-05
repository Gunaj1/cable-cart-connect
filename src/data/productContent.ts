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
    overview: 'Premium CAT 6 STP outdoor cable with superior shielding protection. Features 80 wire aloe shielding and weather-resistant construction.',
    applications: [
      'OUTDOOR NETWORK INSTALLATIONS',
      'WEATHER-EXPOSED ENVIRONMENTS',
      'PROFESSIONAL NETWORKING',
      'LONG-DISTANCE DATA TRANSMISSION'
    ],
    specifications: {
      'Shielding': '80 WIRE ALOE SHIELDED',
      'Foil': '42 MICRON ALUMINIUM FOIL',
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
      'Superior Shielding Protection'
    ]
  },
  'cat-6-ftp-lan': {
    overview: 'High-quality CAT 6 FTP cable with weather-proof double jacket construction. Designed for maximum performance in various environmental conditions.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'DATA CENTER CONNECTIONS',
      'ENTERPRISE NETWORKING',
      'OUTDOOR INSTALLATIONS'
    ],
    specifications: {
      'Jacket': 'WEATHER PROOF DOUBLE JACKET',
      'Conductor': '23/24/25/26 EC GRADE COPPER/ CCA',
      'Foil': '42 MICRON ALUMINIUM FOIL',
      'Twisting': 'INTERNATIONAL STANDARD TWISTING',
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
      'Weather Proof Construction'
    ]
  },
  'cat-6-utp-lan': {
    overview: 'Professional CAT 6 UTP cable specifically designed for maximum performance in video and data applications with twisted pair technology.',
    applications: [
      'VIDEO APPLICATIONS',
      'DATA APPLICATIONS',
      'NETWORK INFRASTRUCTURE',
      'PROFESSIONAL INSTALLATIONS'
    ],
    specifications: {
      'Conductor': '23/24/25/26 AWG, COPPER/CCA WIRE',
      'Design': 'TWISTED PAIRS FOR TRUE SIGNALS',
      'Performance': 'MAXIMUM PERFORMANCE FOR VIDEO & DATA',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'Reduced Transmission Losses',
      'True Signal Transmission',
      'Professional Grade Quality',
      'Versatile Applications'
    ]
  },
  'cat-6-outdoor': {
    overview: 'CAT 6 Outdoor cable designed for safe network system applications with LDPE sheath for indoor/outdoor versatility.',
    applications: [
      '10 BASE T',
      '100 BASE T',
      '1000 BASE-TX',
      'TP-PMD',
      '100 MBPS CDDI',
      'ATM 155',
      '4/16 MBPS TOKEN RING',
      'OUTDOOR INSTALLATIONS'
    ],
    specifications: {
      'Sheath': 'LDPE SHEATH FOR INDOOR/OUTDOOR',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE',
      'Applications': 'SUITABLE FOR OUTDOOR APPLICATION'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'Indoor/Outdoor Versatility',
      'Multiple Protocol Support',
      'Weather Resistant',
      'Professional Networking Grade'
    ]
  },

  // CAT 5e LAN Cables
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
    overview: 'CAT 5e STP cable designed for network adapters, hubs, switches, and routers with FTP shielded twist pair technology.',
    applications: [
      'NETWORK ADAPTERS',
      'HUBS',
      'SWITCHES', 
      'ROUTERS',
      'DSL/CABLE MODEMS',
      'PATCH PANELS',
      'COMPUTER NETWORKING'
    ],
    specifications: {
      'Type': 'FTP SHIELDED TWIST PAIR',
      'Jacket': 'CM TYPE PVC JACKET',
      'Conductor': '23/24/25/26 AWG 4PAIR STRANDED COPPER WIRE/ CCA WIRE',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS'
    },
    features: [
      'OEM SUPPLIERS',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE',
      'Professional Networking Applications',
      'Shielded Twist Pair Technology',
      'Multi-Device Compatibility'
    ]
  },
  'cat-5e-ftp-lan': {
    overview: 'CAT 5e FTP cable with aluminum foil shielding for enhanced EMI protection and reliable data transmission.',
    applications: [
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE',
      'EMI-SENSITIVE ENVIRONMENTS',
      'PROFESSIONAL INSTALLATIONS'
    ],
    specifications: {
      'Frequency': '1 TO 500MHZ',
      'Impedance': '100 ±15Ω',
      'Shield': 'ALUMINUM FOIL SUPPORTED',
      'Specification': '23/24/25/26 AWG STRANDED',
      'Conductor': 'CCA OR PURE COPPER',
      'Insulation': 'LLDPE',
      'Jacket': 'PVC AND LSZH',
      'Packing': 'PE BAG OR CUSTOMIZED'
    },
    features: [
      'OEM SUPPLIERS',
      'PASSED FLUKE TEST',
      'CUSTOMIZED LENGTHS AND COLORS ACCEPTED',
      'EMI Protection',
      'Wide Frequency Range',
      'Professional Grade Quality'
    ]
  },
  'cat-5e-utp-lan': {
    overview: 'CAT 5e UTP flat cable compliant with Enhanced Category 5 standard achieving 1,000 Mbps transmission speed.',
    applications: [
      'ETHERNET STANDARD (1000 BASE-T)',
      'GIGABIT NETWORKING',
      'DATA TRANSMISSION',
      'NETWORK INFRASTRUCTURE'
    ],
    specifications: {
      'Speed': '1000 MBPS (1 GBPS)',
      'Standard': 'ENHANCED CATEGORY 5 (1,000 BASE-T)',
      'Type': 'FLAT TYPE',
      'Thickness': '1.4 MM',
      'Width': '8 MM',
      'Structure': 'STRANDED WIRE TWISTED PAIR, STRAIGHT-THROUGH',
      'Pairs': 'ALL 4 PAIRS OF WIRES',
      'Length': '100MTR/305MTR'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'Ultra-Ribbon Cable Design',
      'Gigabit Speed Capability',
      'Compact Flat Profile'
    ]
  },
  'cat-5e-outdoor-lan': {
    overview: 'CAT 5e Outdoor cable with solid bare copper conductors and aluminum foil shield, supporting Power over Ethernet applications.',
    applications: [
      'OUTDOOR INSTALLATIONS',
      'POE++ APPLICATIONS (802.3BT)',
      'POWER DELIVERY (UP TO 90W)',
      'OUTDOOR NETWORKING'
    ],
    specifications: {
      'Conductor': '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER/ CCA WIRE',
      'Shield': 'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'Bandwidth': 'TESTED UP TO 600 MHZ',
      'POE Support': 'POE++ (802.3BT) 4PPOE, UP TO 90W',
      'Installation': 'NOT RATED FOR DIRECT BURIAL',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'High Power POE Support',
      'Wide Bandwidth Testing',
      'Outdoor Environment Ready'
    ]
  },

  // CCTV Cables
  'cctv-3plus1': {
    overview: 'Premium CCTV Cable 3+1 manufactured using exceptional quality raw materials for connecting CCTV surveillance cameras to DVR, NVR and PC-based systems.',
    applications: [
      'CCTV SURVEILLANCE CAMERAS',
      'DVR CONNECTIONS',
      'NVR CONNECTIONS',
      'PC BASED SYSTEMS',
      'SECURITY INSTALLATIONS'
    ],
    specifications: {
      'Video Copper Size': '018, 020',
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
      'Professional Security Grade'
    ]
  },
  'cctv-4plus1': {
    overview: 'High-quality CCTV Cable 4+1 designed for professional surveillance systems with superior picture and video quality transmission.',
    applications: [
      'CCTV SURVEILLANCE CAMERAS',
      'DVR CONNECTIONS',
      'NVR CONNECTIONS', 
      'PC BASED SYSTEMS',
      'PROFESSIONAL SECURITY SYSTEMS'
    ],
    specifications: {
      'Video Copper Size': '018, 020',
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
      'Enhanced 4+1 Configuration'
    ]
  },

  // Computer Cords
  'desktop-power-cord': {
    overview: 'Professional 3 Pin Computer Power Cord Cable for desktop CPUs and various electronic devices with grounded male plug for wall outlets.',
    applications: [
      'DESKTOP COMPUTERS',
      'PC SYSTEMS',
      'MONITORS',
      'PRINTERS',
      'SCANNERS',
      'ELECTRONIC DEVICES WITH 3-PIN POWER'
    ],
    specifications: {
      'Configuration': '3 PIN COMPUTER POWER CORD',
      'Female End': '3-PIN FEMALE PLUG FOR DEVICES',
      'Male End': '3-PRONG GROUNDED MALE PLUG FOR WALL',
      'Safety': 'OVERLOAD PROTECTION',
      'Construction': 'ADVANCED WIRES WITH GROUNDING'
    },
    features: [
      'OVERLOAD PROTECTION',
      'ANTI-INTERFERENCE FEATURE',
      'BETTER ISOLATION MATERIALS',
      'RUBBERISED TEXTURE CORD',
      'Standard Wall Outlet Compatible',
      'Device Safety Assured'
    ]
  },
  'laptop-adapter-cord': {
    overview: 'Polarised power cable designed for laptop/notebook power bricks with advanced safety features and wide device compatibility.',
    applications: [
      'LAPTOP COMPUTERS',
      'NOTEBOOK POWER BRICKS',
      'VIDEO GAMES',
      'PRINTERS',
      'LCD/TFT/CRT MONITORS',
      'AUDIO EQUIPMENT & AMPS'
    ],
    specifications: {
      'Design': 'POLARISED POWER CABLE',
      'Connection': 'WALL SOCKET TO LAPTOP POWER BRICK',
      'Safety': 'OVERLOAD PROTECTION',
      'Construction': 'ANTI-INTERFERENCE WITH ISOLATION MATERIALS',
      'Texture': 'RUBBERISED TEXTURE CORD'
    },
    features: [
      'WIDE DEVICE COMPATIBILITY',
      'HP, DELL, LENOVO, SONY VAIO, TOSHIBA COMPATIBLE',
      'WIPRO, LG, ASUS, SAMSUNG, IBM, ACER COMPATIBLE',
      'Advanced Safety Features',
      'Professional Grade Construction',
      'Universal Application Support'
    ]
  },

  // Telephone Cables
  'telephone-cable': {
    overview: 'Professional telephonic cables processed by high-speed state-of-the-art machinery with pure electrolytic grade copper conductors and quality PVC insulation.',
    applications: [
      'TELEPHONE SWITCHING EXCHANGES',
      'SWITCH BOARD & TELEPHONE WIRING',
      'MDF, SDH, DWDM, DSLAM SYSTEMS',
      'PULSE CODE MODULATION SYSTEMS',
      'RS-232 COMMUNICATION'
    ],
    specifications: {
      'Voltage Rating': 'SUITABLE FOR 250 VOLTS OPERATION',
      'Temperature': 'CONDUCTOR OPERATING TEMP 70°C, 85°C & 105°C',
      'Pairs': '1-50 PAIR CABLE AVAILABLE',
      'Length': 'CUSTOMIZABLE AS PER REQUIREMENT',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'PURE ELECTROLYTIC GRADE COPPER',
      'SUPER ANNEALED, TINNED COPPER',
      'FIRE RETARDANT/FIRE RETARDANT LOW SMOKE',
      'ZERO HALOGEN LOW SMOKE OPTIONS',
      'HIGH-SPEED MACHINERY PROCESSING',
      'Multiple Temperature Ratings'
    ]
  },

  // Speaker Cables
  'speaker-cable': {
    overview: 'Professional speaker cables for establishing connections between speakers and amplifier sources with optimized electrical properties for audio applications.',
    applications: [
      'SPEAKER RANGES',
      'HOME THEATER SYSTEMS',
      'AUDIO SYSTEMS',
      'POWER AMPLIFIER CONNECTIONS',
      'BROADCASTING SYSTEMS',
      'AUDIO SIGNAL TRANSMISSION'
    ],
    specifications: {
      'Conductor': 'MULTI-STRANDED/FLEXIBLE OFC, COPPER, TINNED-COPPER',
      'Jacket': 'ROHS STANDARD PVC',
      'Standards': 'CE, SGS, ISO9001 STANDARD',
      'Length': 'FULL 100M',
      'Rated Voltage': '300/300V',
      'Temperature': 'WORKING UNDER 70°C FOR LONG PERIOD'
    },
    features: [
      'RELIABLE CONNECTION',
      'OPTIMIZED ELECTRICAL PROPERTIES',
      'RESISTANCE, CAPACITANCE AND INDUCTANCE',
      'LONG PERIOD OPERATION CAPABILITY',
      'Professional Audio Grade',
      'International Standards Compliance'
    ]
  },

  // Lift Cables
  'lift-cable': {
    overview: 'Professional lift cables with bare copper conductor and special plastic construction designed for elevator applications with enhanced flexibility and durability.',
    applications: [
      'ELEVATOR SYSTEMS',
      'LIFT INSTALLATIONS',
      'VERTICAL TRANSPORTATION',
      'LIFT CARRIAGE CONNECTIONS',
      'ELEVATOR CONTROL SYSTEMS'
    ],
    specifications: {
      'Conductor': 'BARE COPPER CONDUCTOR, EXTRA FINE WIRE',
      'Flexibility': 'HIGH FLEXIBLE',
      'Insulation': 'PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
      'Identification': 'BLACK CORES WITH CONTINUOUS WHITE NUMBERING',
      'Ground': 'GN-YE CONDUCTOR',
      'Sheath': 'SPECIAL PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'SHEATH UV-RESISTANT',
      'SPECIAL SUPPORT FOR CARRIAGE VERSION',
      'BRAIDING WITH PUR SHEATH',
      'WEAR, OIL, HYDROLYSIS RESISTANT',
      'MICROBIAL ATTACK RESISTANT',
      'CUSTOMIZABLE AVAILABLE'
    ]
  }
};