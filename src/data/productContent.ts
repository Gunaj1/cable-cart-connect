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
    overview: 'CAT 6 STP OUTDOOR COPPER CABLE 305M with superior shielding protection. Features 80 wire aloe shielded construction and weather-resistant outer jacket.',
    applications: [
      'OUTDOOR NETWORK INSTALLATIONS',
      'WEATHER-EXPOSED ENVIRONMENTS', 
      'PROFESSIONAL NETWORKING',
      'INDUSTRIAL APPLICATIONS'
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
      'CUSTOMIZATION AVAILABLE'
    ]
  },
  'cat-6-ftp-lan': {
    overview: 'GET BEST QUALITY CAT 6 FTP CABLE FOR YOUR PURPOSE. Features weather-proof double jacket construction with aluminum foil shielding.',
    applications: [
      'NETWORK INFRASTRUCTURE',
      'DATA CENTER CONNECTIONS',
      'ENTERPRISE NETWORKING',
      'PROFESSIONAL INSTALLATIONS'
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
      'WEATHER PROOF DOUBLE JACKET',
      'DCM TESTED',
      'FLUKE TESTED',
      'F.R FRESH HIGH QUALITY PVC',
      'CUSTOMIZATION AVAILABLE'
    ]
  },
  'cat-6-utp-lan': {
    overview: 'CAT 6 UTP IS OUR LAN CABLES RANGE. These cables are specifically designed to deliver maximum performance for video & data applications.',
    applications: [
      'VIDEO APPLICATIONS',
      'DATA APPLICATIONS', 
      'NETWORK INFRASTRUCTURE',
      'PROFESSIONAL INSTALLATIONS'
    ],
    specifications: {
      'Conductor': '23/24/25/26 AWG, COPPER/CCA WIRE',
      'Design': 'TWISTED PAIRS HELP TRANSMIT TRUE SIGNALS',
      'Performance': 'MAXIMUM PERFORMANCE FOR VIDEO & DATA APPLICATIONS',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'TWISTED PAIRS HELP REDUCE TRANSMISSION LOSSES',
      'CUSTOMIZATION AVAILABLE',
      'TRUE SIGNAL TRANSMISSION',
      'PROFESSIONAL GRADE QUALITY'
    ]
  },
  'cat-6-outdoor': {
    overview: 'CHHAJER CABLE IS A LEADING MANUFACTURER AND SUPPLIER OF CAT6 OUTDOOR NETWORK CABLE. The cable is safe to use and provides the required utility to the network system.',
    applications: [
      '10 BASE T',
      '100 BASE T', 
      '1000 BASE-TX',
      'TP-PMD',
      '100 MBPS CDDI',
      'ATM 155',
      '4/16 MBPS TOKEN RING',
      'SUITABLE FOR OUTDOOR APPLICATION'
    ],
    specifications: {
      'Sheath': 'LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Colors': 'ALL COLORS AVAILABLE'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS',
      'MULTIPLE PROTOCOL SUPPORT',
      'WEATHER RESISTANT'
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
    overview: 'Cat 5e STP Cable designed for network adapters, hubs, switches, routers, DSL/cable modems, patch panels and other computer networking applications.',
    applications: [
      'NETWORK ADAPTERS',
      'HUBS',
      'SWITCHES',
      'ROUTERS', 
      'DSL/CABLE MODEMS',
      'PATCH PANELS',
      'OTHER COMPUTER NETWORKING APPLICATIONS'
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
      'FTP SHIELDED TWIST PAIR',
      'CM TYPE PVC JACKET',
      'ALL COLORS AVAILABLE',
      'CUSTOMIZATION AVAILABLE'
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
    overview: 'Cat 5e UTP Lan Cable compliant with the Ethernet standard that achieves a transmission speed of 1,000 Mbps (1 Gbps). An ultra-ribbon cable with excellent performance.',
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
      'Structure': 'STRANDED WIRE TWISTED PAIR, STRAIGHT-THROUGH CABLE',
      'Pairs': 'ALL 4 PAIRS OF WIRES',
      'Length': '100MTR/305MTR'
    },
    features: [
      'OEM SUPPLIERS',
      'COMPLIANT WITH ETHERNET STANDARD',
      'FLAT TYPE COMPLIANT WITH ENHANCED CATEGORY 5',
      'ULTRA-RIBBON CABLE WITH THICKNESS OF 1.4 MM',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE'
    ]
  },
  'cat-5e-outdoor-lan': {
    overview: 'Cat 5e Outdoor Cable with solid bare copper conductors and aluminum foil shield. Features bandwidth tested up to 600 MHz and supports POE++ applications.',
    applications: [
      'OUTDOOR INSTALLATIONS',
      'POE++ APPLICATIONS (802.3BT)',
      'POWER DELIVERY (UP TO 90W)',
      'OUTDOOR NETWORKING'
    ],
    specifications: {
      'Conductor': '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER CONDUCTORS/ CCA WIRE',
      'Shield': 'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
      'Bandwidth': 'BANDWIDTH TESTED UP TO 600 MHZ',
      'POE Support': 'POE++ (802.3BT) 4PPOE, UP TO 90W',
      'Length': '100MTR/305MTR',
      'Speed': '1000 MBPS',
      'Installation': 'NOT RATED FOR DIRECT BURIAL'
    },
    features: [
      'OEM SUPPLIERS',
      'CUSTOMIZATION AVAILABLE',
      'ALL COLORS AVAILABLE',
      'High Bandwidth Performance',
      'Power over Ethernet Support',
      'Weather Resistant Design'
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