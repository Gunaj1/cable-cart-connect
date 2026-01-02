import { Product } from '@/types/Product';

// Import product images
import cat6StpPatchcord from '../assets/cat6-stp-patchcord-3.png';
import cat6FtpPatchcord from '../assets/cat6-ftp-patchcord.jpg';
import cat6UtpPatchcord from '../assets/cat6-utp-patchcord.jpg';
import cat5eStpPatchcord from '../assets/cat5e-stp-patchcord.jpg';
import cat5eFtpPatchcord from '../assets/cat5e-ftp-patchcord.jpg';
import cat5eUtpPatchcord from '../assets/cat5e-utp-patchcord.jpg';
import cat5eFlatLan from '../assets/cat5e-flat-lan.jpg';
import cat5e2pairLan from '../assets/cat5e-2pair-lan.jpg';
import cat5eArmoredLan from '../assets/cat5e-armored-lan.jpg';
import cat5eFtpLan from '../assets/cat5e-ftp-lan.jpg';
import cat5eStpLan from '../assets/cat5e-stp-lan.jpg';
import cat5eUtpLan from '../assets/cat5e-utp-lan.jpg';
import cat5eOutdoorLan from '../assets/cat5e-outdoor-lan.jpg';
import cat6FlatLan from '../assets/cat6-flat-lan.jpg';
import cat6ArmoredLan from '../assets/cat6-armored-lan.jpg';
import cat6StpLan from '../assets/cat6-stp-lan.jpg';
import cat6FtpLan from '../assets/cat6-ftp-lan.jpg';
import cat6UtpLan from '../assets/cat6-utp-lan.jpg';
import cat6OutdoorLan from '../assets/cat6-outdoor-lan.jpg';
import cctv3plus1Cable from '../assets/cctv-3plus1-cable.jpg';
import cctv4plus1Cable from '../assets/cctv-4plus1-cable.jpg';
import telephoneCable from '../assets/telephone-cable.jpg';
import desktopPowerCord from '../assets/desktop-power-cord.jpg';
import laptopAdapterCord from '../assets/laptop-adapter-cord.jpg';
import liftCable from '../assets/lift-cable.jpg';
import speakerCable from '../assets/speaker-cable.jpg';

// Helper function to create URL-friendly slug from product name
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const categories = [
  {
    id: 1,
    name: 'Patchcords',
    description: 'Premium networking patchcords for high-speed connectivity',
    products: [
      {
        id: createSlug('CAT 6 STP Patchcord'),
        name: 'CAT 6 STP Patchcord',
        price: 29.99,
        image: cat6StpPatchcord,
        category: 'Patchcords',
        description: 'Shielded Twisted Pair Cat6 patchcord with enhanced EMI protection, ideal for high-interference environments. Supports speeds up to 10Gbps.',
        speed: '10Gbps',
        stock: 50,
        detailedDescription: {
          applications: ['LAN NETWORK SYSTEM', 'COMPUTER NETWORK DISTRIBUTING SYSTEM', 'TELECOMMUNICATION NETWORK SYSTEM', 'TESTING EQUIPMENT SYSTEM', 'CATV SYSTEM'],
          specifications: ['STP TYPE', 'RJ45 PLUG', 'PVC JACKET', '4 TWISTED PAIR', 'COPPER CONDUCTOR', 'MATERIAL OF CONDUCTOR: BARE COPPER OR TINNED COPPER OR CCA', 'GAUGE: 23/24/25/26AWG OR CUSTOMIZED'],
          features: ['4 TWISTED PAIRS CABLE AROUND A CROSS SHAPED CENTRAL FILLER INTO THE CABLE CORE', 'OEM SUPPLIER', 'LENGTHS: ALL LENGTHS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 6 FTP Patchcord'),
        name: 'CAT 6 FTP Patchcord',
        price: 27.99,
        image: cat6FtpPatchcord,
        category: 'Patchcords',
        description: 'Foiled Twisted Pair Cat6 patchcord offering excellent noise protection. Perfect for data centers and enterprise networks.',
        speed: '10Gbps',
        stock: 45,
        detailedDescription: {
          applications: ['DATA CENTERS', 'ENTERPRISE NETWORKS', 'HIGH-SPEED NETWORK APPLICATIONS', 'INDUSTRIAL ENVIRONMENTS'],
          specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100 ±15Ω', 'SHIELD: ALUMINUM FOIL SUPPORTED', 'SPECIFICATION: 23/24/25/26 AWG STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
          features: ['PASSED FLUKE TEST', 'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PACKING: PE BAG OR CUSTOMIZED']
        }
      },
      {
        id: createSlug('CAT 6 UTP Patchcord'),
        name: 'CAT 6 UTP Patchcord',
        price: 25.99,
        image: cat6UtpPatchcord,
        category: 'Patchcords',
        description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs. Cost-effective solution for office environments.',
        speed: '10Gbps',
        stock: 60,
        detailedDescription: {
          applications: ['OFFICE ENVIRONMENTS', 'COMMERCIAL BUILDINGS', 'EDUCATIONAL INSTITUTIONS', 'SMALL TO MEDIUM BUSINESSES'],
          specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100, ±15Ω', 'SPECIFICATION: 23/24/25/26 AWG, STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
          features: ['OEM SUPPLIERS', 'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PASSED FLUKE TEST', 'PACKING: PE BAG OR CUSTOMIZED']
        }
      },
      {
        id: createSlug('CAT 5e STP Patchcord'),
        name: 'CAT 5e STP Patchcord',
        price: 24.99,
        image: cat5eStpPatchcord,
        category: 'Patchcords',
        description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Supports speeds up to 1Gbps.',
        speed: '1Gbps',
        stock: 55,
        detailedDescription: {
          applications: ['ENTERPRISE NETWORKS', 'DATA CENTERS', 'INDUSTRIAL ENVIRONMENTS', 'HIGH-INTERFERENCE AREAS'],
          specifications: ['FREQUENCY: UPTO 600MHZ', 'LENGTH: 0.1 MTR TO 100 MTR', 'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS', 'SHIELDED PLUG BOOT CABLE ASSEMBLIES'],
          features: ['AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION', '100% FACTORY TESTED', 'PROVIDES BETTER MECHANICAL PROPERTIES', 'AVAILABLE IN 5 DIFFERENT JACKET COLORS', 'CUSTOMIZATION AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 5e FTP Patchcord'),
        name: 'CAT 5e FTP Patchcord',
        price: 22.99,
        image: cat5eFtpPatchcord,
        category: 'Patchcords',
        description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Ideal for small business networks.',
        speed: '1Gbps',
        stock: 50,
        detailedDescription: {
          applications: ['SMALL BUSINESS NETWORKS', 'EDUCATIONAL INSTITUTIONS', 'OFFICE ENVIRONMENTS', 'MEDIUM-INTERFERENCE AREAS'],
          specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100 ±15Ω', 'SHIELD: ALUMINUM FOIL SUPPORTED', 'SPECIFICATION: 23/24/25/26 AWG STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
          features: ['CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PASSED FLUKE TEST', 'PACKING: PE BAG OR CUSTOMIZED']
        }
      },
      {
        id: createSlug('CAT 5e UTP Patchcord'),
        name: 'CAT 5e UTP Patchcord',
        price: 20.99,
        image: cat5eUtpPatchcord,
        category: 'Patchcords',
        description: 'Standard Cat5e patchcord for basic networking needs. Perfect for home and small office use.',
        speed: '1Gbps',
        stock: 70,
        detailedDescription: {
          applications: ['HOME NETWORKS', 'SMALL OFFICE NETWORKS', 'BASIC DATA TRANSMISSION', 'GENERAL NETWORKING'],
          specifications: ['FREQUENCY: UPTO 600MHZ', 'LENGTH: 0.1 MTR TO 100 MTR', 'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS', 'SHIELDED PLUG BOOT CABLE ASSEMBLIES'],
          features: ['AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION', '100% FACTORY TESTED', 'PROVIDES BETTER MECHANICAL PROPERTIES', 'AVAILABLE IN 5 DIFFERENT JACKET COLORS', 'CUSTOMIZATION AVAILABLE']
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Cat5e LAN Cables',
    description: 'High-quality Cat5e cables for reliable network infrastructure',
    products: [
      {
        id: createSlug('CAT 5e FTP Cable'),
        name: 'CAT 5e FTP Cable',
        price: 45.99,
        image: cat5eFtpLan,
        category: 'Cat5e LAN Cables',
        description: 'Premium Cat 5e FTP cable with aluminum foil shielding for industrial environments.',
        speed: '1Gbps',
        stock: 40,
        detailedDescription: {
          applications: ['INDUSTRIAL ENVIRONMENTS', 'EMI SENSITIVE AREAS', 'COMMERCIAL BUILDINGS', 'HIGH-INTERFERENCE LOCATIONS', 'PROFESSIONAL NETWORKS'],
          specifications: ['FREQUENCY: 1 TO 500MHZ', 'IMPEDANCE: 100 ±15Ω', 'SHIELD: ALUMINUM FOIL SUPPORTED', 'SPECIFICATION: 23/24/25/26 AWG STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH'],
          features: ['OEM SUPPLIERS', 'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PASSED FLUKE TEST', 'PACKING: PE BAG OR CUSTOMIZED', 'SUPERIOR NOISE IMMUNITY']
        }
      },
      {
        id: createSlug('CAT 5e STP Cable'),
        name: 'CAT 5e STP Cable',
        price: 48.99,
        image: cat5eStpLan,
        category: 'Cat5e LAN Cables',
        description: 'Designed for network adapters, hubs, switches, and routers.',
        speed: '1Gbps',
        stock: 35,
        detailedDescription: {
          applications: ['NETWORK ADAPTERS', 'HUBS, SWITCHES, ROUTERS', 'DSL/CABLE MODEMS', 'PATCH PANELS', 'COMPUTER NETWORKING APPLICATIONS'],
          specifications: ['FTP SHIELDED TWIST PAIR', 'CM TYPE PVC JACKET', '23/24/25/26 AWG 4PAIR STRANDED COPPER WIRE/ CCA WIRE', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'DESIGNED FOR NETWORK ADAPTERS', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'MAXIMUM CROSSTALK PROTECTION']
        }
      },
      {
        id: createSlug('CAT 5e UTP Cable'),
        name: 'CAT 5e UTP Cable',
        price: 42.99,
        image: cat5eUtpLan,
        category: 'Cat5e LAN Cables',
        description: 'Ethernet standard achieving 1,000 Mbps transmission speed.',
        speed: '1Gbps',
        stock: 55,
        detailedDescription: {
          applications: ['GENERAL NETWORKING', 'OFFICE INSTALLATIONS', 'ENHANCED CATEGORY 5 (1,000 BASE-T)', 'ETHERNET STANDARD APPLICATIONS', 'COMMERCIAL BUILDINGS'],
          specifications: ['COMPLIANT WITH ETHERNET STANDARD', 'TRANSMISSION SPEED OF 1,000 MBPS (1 GBPS)', 'FLAT TYPE COMPLIANT WITH ENHANCED CATEGORY 5', 'ULTRA-RIBBON CABLE WITH THICKNESS OF 1.4 MM AND WIDTH OF 8 MM', 'CABLE STRUCTURE: STRANDED WIRE TWISTED PAIR', 'LENGTH: 100MTR/305MTR'],
          features: ['OEM SUPPLIERS', 'STRAIGHT-THROUGH CABLE USING ALL 4 PAIRS OF WIRES', 'CUSTOMIZATION AVAILABLE', 'SPEED: 1000 MBPS', 'ALL COLORS AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 5e Flat Cable'),
        name: 'CAT 5e Flat Cable',
        price: 39.99,
        image: cat5eFlatLan,
        category: 'Cat5e LAN Cables',
        description: 'Ultra-thin flat design for discreet installations under carpets and along walls.',
        speed: '1Gbps',
        stock: 45,
        detailedDescription: {
          applications: ['1000 BASE T GIGABIT 100 MBPS', '100 BASE-TX', 'TPDDI. 155 MBPS ATM', 'HOME AND OFFICE NETWORKS', 'UNDER CARPET INSTALLATIONS'],
          specifications: ['FREQUENCY: UPTO 600 MHZ', 'CHARACTERISTIC IMPEDANCE: 1 TO 100 MHZ: 100Ω±15%', 'F. SPEED: ≥0,69', 'CONDUCTOR RESISTANCE AT 20ºC: 149 Ω/KM ± 5%', 'MAXIMUM VOLTAGE: AC 49 V', 'LENGTH: 100MTR/305MTR'],
          features: ['OEM SUPPLIERS', 'ELECTRICAL FEATURES OPTIMIZED', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE', 'SPEED: 1000 MBPS']
        }
      },
      {
        id: createSlug('CAT 5e 2 Pair Cable'),
        name: 'CAT 5e 2 Pair Cable',
        price: 35.99,
        image: cat5e2pairLan,
        category: 'Cat5e LAN Cables',
        description: 'Cost-effective 2-pair cable for basic voice and data applications.',
        speed: '100Mbps',
        stock: 60,
        detailedDescription: {
          applications: ['VOICE COMMUNICATION SYSTEMS', 'BASIC DATA APPLICATIONS', 'TELEPHONE SYSTEMS', 'ECONOMICAL NETWORK SOLUTIONS', 'POE APPLICATIONS'],
          specifications: ['JACKET: PVC, LLDPE', 'INSULATION: SPECIAL PE POLYOLEFIN, WHGN/GN, WHOG/OG', 'SHIELDING: SF/UTP (OVERALL TINNED COPPER BRAID SHIELD, UNSHIELDED TWISTED PAIR)', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE', 'COST-EFFECTIVE SOLUTION', 'RELIABLE PERFORMANCE']
        }
      },
      {
        id: createSlug('CAT 5e Armored Cable'),
        name: 'CAT 5e Armored Cable',
        price: 55.99,
        image: cat5eArmoredLan,
        category: 'Cat5e LAN Cables',
        description: 'Heavy-duty armored cable for underground and harsh environments.',
        speed: '1Gbps',
        stock: 30,
        detailedDescription: {
          applications: ['UNDERGROUND INSTALLATIONS', 'OUTDOOR APPLICATIONS', 'INDUSTRIAL ENVIRONMENTS', 'DIRECT BURIAL APPLICATIONS', 'RODENT PROTECTION AREAS'],
          specifications: ['HEAVY 23/24/25/26 COPPER & CCA GAUGE', 'EC GRADE COPPER', '0.8 MM ALUMINIUM ROD', 'INTERNATIONAL STANDARD TWISTING', 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)', 'LENGTH: 100MTR/305MTR'],
          features: ['OEM SUPPLIERS', 'DCM TESTED', 'FLUKE TESTED', 'F.R FRESH HIGH QUALITY PVC', 'SPEED: 1000 MBPS', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 5e Outdoor Cable'),
        name: 'CAT 5e Outdoor Cable',
        price: 52.99,
        image: cat5eOutdoorLan,
        category: 'Cat5e LAN Cables',
        description: 'Weather-resistant cable for outdoor installations.',
        speed: '1Gbps',
        stock: 40,
        detailedDescription: {
          applications: ['OUTDOOR INSTALLATIONS', 'DIRECT BURIAL APPLICATIONS', 'WEATHER-RESISTANT NETWORKING', 'CAMPUS NETWORKS', 'OUTDOOR SECURITY SYSTEMS'],
          specifications: ['23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER CONDUCTORS/ CCA WIRE', 'OVERALL ALUMINUM FOIL SHIELD – F/UTP', 'BANDWIDTH TESTED UP TO 600 MHZ', 'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W', 'NOT RATED FOR DIRECT BURIAL', 'LENGTH: 100MTR/305MTR'],
          features: ['OEM SUPPLIERS', 'SPEED: 1000 MBPS', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE', 'UV-RESISTANT DESIGN', 'WATERPROOF CONSTRUCTION']
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Cat 6 LAN Cable',
    description: 'Premium Cat6 cables for high-performance networking',
    products: [
      {
        id: createSlug('CAT 6 Flat Cable'),
        name: 'CAT 6 Flat Cable',
        price: 49.99,
        image: cat6FlatLan,
        category: 'Cat 6 LAN Cable',
        description: 'Low-profile flat design Cat6 cable for discrete installations.',
        speed: '10Gbps',
        stock: 45,
        detailedDescription: {
          applications: ['DISCRETE INSTALLATIONS', 'UNDER CARPET WIRING', 'ALONG WALLS', 'HIGH-SPEED DATA TRANSMISSION'],
          specifications: ['UNBREAKABLE OUTER JACKET', '7/36 EC GRADE COPPER', 'HEAT PROOF INNER CORE', 'EXCELLENT SIGNAL CHARACTERISTICS', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'SUPERIOR SIGNAL QUALITY', 'DURABLE CONSTRUCTION']
        }
      },
      {
        id: createSlug('CAT 6 Armored Cable'),
        name: 'CAT 6 Armored Cable',
        price: 65.99,
        image: cat6ArmoredLan,
        category: 'Cat 6 LAN Cable',
        description: 'Double-jacketed armored cable for harsh environments.',
        speed: '10Gbps',
        stock: 30,
        detailedDescription: {
          applications: ['HARSH ENVIRONMENTS', 'OUTDOOR INSTALLATIONS', 'INDUSTRIAL APPLICATIONS', 'UNDERGROUND INSTALLATIONS'],
          specifications: ['HEAVY 23/24/25/26 COPPER GAUGE / CCA WIRES', 'EC GRADE COPPER', '0.8 MM ALUMINIUM ROD', 'INTERNATIONAL STANDARD TWISTING', 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'DCM TESTED', 'FLUKE TESTED', 'F.R FRESH HIGH QUALITY PVC', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 6 STP Cable'),
        name: 'CAT 6 STP Cable',
        price: 58.99,
        image: cat6StpLan,
        category: 'Cat 6 LAN Cable',
        description: 'NO.1 QUALITY - 80 wire aloe shielded with 42 micron aluminum foil.',
        speed: '10Gbps',
        stock: 40,
        detailedDescription: {
          applications: ['HIGH-SPEED DATA CENTERS', 'INDUSTRIAL ENVIRONMENTS', 'EMI SENSITIVE AREAS', 'PROFESSIONAL NETWORKS'],
          specifications: ['80 WIRE ALOE SHIELDED', '42 MICRON ALUMINIUM FOIL', 'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'DCM TESTED', 'FLUKE TESTED', 'F.R FRESH HIGH QUALITY PVC', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 6 FTP Cable'),
        name: 'CAT 6 FTP Cable',
        price: 55.99,
        image: cat6FtpLan,
        category: 'Cat 6 LAN Cable',
        description: 'Weather proof double jacket with international standard twisting.',
        speed: '10Gbps',
        stock: 35,
        detailedDescription: {
          applications: ['COMMERCIAL APPLICATIONS', 'INDUSTRIAL ENVIRONMENTS', 'OFFICE NETWORKS', 'DATA TRANSMISSION'],
          specifications: ['WEATHER PROOF DOUBLE JACKET', '23/24/25/26 EC GRADE COPPER/ CCA', '42 MICRON ALUMINIUM FOIL', 'INTERNATIONAL STANDARD TWISTING', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'DCM TESTED', 'FLUKE TESTED', 'F.R FRESH HIGH QUALITY PVC', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE']
        }
      },
      {
        id: createSlug('CAT 6 UTP Cable'),
        name: 'CAT 6 UTP Cable',
        price: 52.99,
        image: cat6UtpLan,
        category: 'Cat 6 LAN Cable',
        description: 'Maximum performance for video & data applications.',
        speed: '10Gbps',
        stock: 50,
        detailedDescription: {
          applications: ['OFFICE NETWORKS', 'VIDEO & DATA APPLICATIONS', 'COMMERCIAL BUILDINGS', 'GENERAL NETWORKING'],
          specifications: ['CAT 6 UTP IS OUR LAN CABLES RANGE', '23/24/25/26 AWG, COPPER/CCA WIRE', 'DESIGNED TO DELIVER MAXIMUM PERFORMANCE FOR VIDEO & DATA APPLICATIONS', 'TWISTED PAIRS HELP TRANSMIT TRUE SIGNALS & REDUCE TRANSMISSION LOSSES', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'MAXIMUM PERFORMANCE', 'REDUCED TRANSMISSION LOSSES']
        }
      },
      {
        id: createSlug('CAT 6 Outdoor Cable'),
        name: 'CAT 6 Outdoor Cable',
        price: 62.99,
        image: cat6OutdoorLan,
        category: 'Cat 6 LAN Cable',
        description: 'LDPE sheath for indoor/outdoor applications.',
        speed: '10Gbps',
        stock: 40,
        detailedDescription: {
          applications: ['10 BASE T', '100 BASE T', '1000 BASE-TX', 'TP-PMD', '100 MBPS CDDI', 'ATM 155', '4/16 MBPS TOKEN RING', 'SUITABLE FOR OUTDOOR APPLICATION', 'INDOOR /OUTDOOR APPLICATIONS'],
          specifications: ['LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS', 'LENGTH: 100MTR/305MTR', 'SPEED: 1000 MBPS'],
          features: ['OEM SUPPLIERS', 'ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'WEATHER RESISTANT', 'UV PROTECTED']
        }
      }
    ]
  },
  {
    id: 4,
    name: 'CCTV Cable',
    description: 'Professional CCTV cables for surveillance systems',
    products: [
      {
        id: createSlug('CCTV 3+1 Cable'),
        name: 'CCTV 3+1 Cable',
        price: 35.99,
        image: cctv3plus1Cable,
        category: 'CCTV Cable',
        description: 'Siamese cable with 3 power conductors and 1 coaxial core for analog CCTV systems.',
        speed: 'HD Video',
        stock: 55,
        detailedDescription: {
          applications: ['CCTV SURVEILLANCE CAMERAS', 'DVR AND NVR CONNECTIONS', 'PC BASED SYSTEMS', 'SECURITY SYSTEMS'],
          specifications: ['COPPER SIZE OF VIDEO: 018, 020', 'CORE SIZE: 7X38, 14X40, 14X42, 14X43', 'BRAIDING WITH 36 X 0.115 MM ALLOY WITH ALUMINUM FOIL', 'LENGTH: 90M/180M', 'MANUFACTURED USING EXCEPTIONAL QUALITY RAW MATERIALS'],
          features: ['COLORS: ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'HIGHLY SHOCK-PROOF', 'HIGH TENSILE STRENGTH', 'GREAT PICTURE AND VIDEO QUALITY', 'WIRES ARE MADE OF QUALITY RAW MATERIALS']
        }
      },
      {
        id: createSlug('CCTV 4+1 Cable'),
        name: 'CCTV 4+1 Cable',
        price: 42.99,
        image: cctv4plus1Cable,
        category: 'CCTV Cable',
        description: 'Premium cable with 4 power conductors for PTZ cameras and long-distance installations.',
        speed: 'HD Video',
        stock: 45,
        detailedDescription: {
          applications: ['CCTV SURVEILLANCE CAMERAS', 'DVR AND NVR CONNECTIONS', 'PC BASED SYSTEMS', 'PTZ CAMERAS', 'LONG-DISTANCE INSTALLATIONS'],
          specifications: ['COPPER SIZE OF VIDEO: 018, 020', 'CORE SIZE: 7X38, 14X40, 14X42, 14X43', 'BRAIDING WITH 36 X 0.115 MM ALLOY WITH ALUMINUM FOIL', 'LENGTH: 90M/180M', 'MANUFACTURED USING EXCEPTIONAL QUALITY RAW MATERIALS'],
          features: ['COLORS: ALL COLORS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'HIGHLY SHOCK-PROOF', 'HIGH TENSILE STRENGTH', 'GREAT PICTURE AND VIDEO QUALITY', 'WIRES ARE MADE OF QUALITY RAW MATERIALS']
        }
      }
    ]
  },
  {
    id: 5,
    name: 'Telephone Cable',
    description: 'Quality telephone cables for communication systems',
    products: [
      {
        id: createSlug('Telephone Cable'),
        name: 'Telephone Cable',
        price: 25.99,
        image: telephoneCable,
        category: 'Telephone Cable',
        description: 'Multi-pair telephone cable for voice communication and switching systems.',
        speed: 'Voice',
        stock: 60,
        detailedDescription: {
          applications: ['TELEPHONE SWITCHING EXCHANGES', 'SWITCH BOARD & TELEPHONE WIRING (MDF, SDH, DWDM, DSLAM ETC.)', 'PULSE CODE MODULATION SYSTEMS', 'RS-232 COMMUNICATION'],
          specifications: ['HIGH-SPEED STATE-OF-THE-ART MACHINERY', 'PURE ELECTROLYTIC GRADE, SUPER ANNEALED, TINNED COPPER CONDUCTOR', 'GOOD QUALITY PVC INSULATION', 'SUITABLE FOR OPERATION AT VOLTAGE OF 250 VOLTS', 'CONDUCTOR OPERATING TEMPERATURE 70°C, 85°C & 105°C', '1-50 PAIR CABLE AVAILABLE'],
          features: ['LENGTH IS CUSTOMIZABLE AS PER REQUIREMENT', 'ALL COLORS AVAILABLE', 'FIRE RETARDANT/FIRE RETARDANT LOW SMOKE', 'ZERO HALOGEN LOW SMOKE & SHEATH MATERIAL', 'HIGH QUALITY CONSTRUCTION']
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Computer Cords',
    description: 'Power cords for computers and laptops',
    products: [
      {
        id: createSlug('Desktop Power Cord'),
        name: 'Desktop Power Cord',
        price: 15.99,
        image: desktopPowerCord,
        category: 'Computer Cords',
        description: 'Standard 3-pin power cord for desktop computers and monitors.',
        speed: 'Power',
        stock: 80,
        detailedDescription: {
          applications: ['COMPUTER SYSTEMS', 'MONITORS', 'PRINTERS', 'SCANNERS', 'ELECTRONIC DEVICES WITH 3-PIN POWER PLUG'],
          specifications: ['CHHAJER CABLE INDUSTRIES - LEADING MANUFACTURER IN DELHI', '3 PIN COMPUTER POWER CORD CABLE', 'FEMALE CONNECTOR FOR ELECTRONIC GADGETS', '3-PRONG GROUNDED MALE PLUG FOR WALL OUTLETS', 'STANDARD OUTLET COMPATIBLE'],
          features: ['SUPPLY POWER TO COMPUTER SYSTEM AND VARIOUS DEVICES', 'DIRECT INSERTION INTO ELECTRONIC GADGETS', 'STANDARD WALL OUTLET CONNECTION', 'OVERLOAD PROTECTION', 'HIGH QUALITY CONSTRUCTION']
        }
      },
      {
        id: createSlug('Laptop Adapter Cord'),
        name: 'Laptop Adapter Cord',
        price: 12.99,
        image: laptopAdapterCord,
        category: 'Computer Cords',
        description: 'Universal laptop power cord for notebook adapters and chargers.',
        speed: 'Power',
        stock: 75,
        detailedDescription: {
          applications: ['LAPTOP COMPUTER / VIDEO GAMES', 'NOTEBOOKS', 'PRINTERS', 'LCD TFT CRT MONITORS', 'AUDIO EQUIPMENT & AMPS', 'ELECTRONICS USING 3-PRONG POWER'],
          specifications: ['POLARISED POWER CABLE', 'FEMALE CONNECTOR FOR DEVICE CONNECTION', 'MALE CONNECTOR FOR STANDARD OUTLET', 'ADVANCED WIRES FOR OVERLOAD PROTECTION', 'ANTI-INTERFERENCE FEATURE', 'BETTER ISOLATION MATERIALS', 'RUBBERISED TEXTURE CORD'],
          features: ['COMPATIBLE WITH HP, DELL, LENOVO, SONY VAIO', 'COMPATIBLE WITH TOSHIBA, WIPRO, LG, ASUS', 'COMPATIBLE WITH SAMSUNG, IBM, ACER', 'OVERLOAD PROTECTION', 'ANTI-INTERFERENCE DESIGN']
        }
      }
    ]
  },
  {
    id: 7,
    name: 'Lift Cables',
    description: 'Specialized cables for elevator systems',
    products: [
      {
        id: createSlug('Lift Cable'),
        name: 'Lift Cable',
        price: 85.99,
        image: liftCable,
        category: 'Lift Cables',
        description: 'Professional lift cable with enhanced flexibility for elevator installations.',
        speed: 'Data + Power',
        stock: 25,
        detailedDescription: {
          applications: ['ELEVATOR SYSTEMS', 'LIFT INSTALLATIONS', 'VERTICAL TRANSPORTATION', 'CARRIAGE SYSTEMS', 'INDUSTRIAL LIFTING EQUIPMENT'],
          specifications: ['BARE COPPER CONDUCTOR, EXTRA FINE WIRE, HIGH FLEXIBLE', 'CORE INSULATION OF PLASTIC, FLEXIBLE AT LOW TEMPERATURES', 'CORE IDENTIFICATION BLACK CORES WITH CONTINUOUS WHITE NUMBERING', 'GN-YE CONDUCTOR', 'OUTER SHEATH OF SPECIAL PLASTIC, FLEXIBLE AT LOW TEMPERATURES', 'SHEATH COLOUR: ALL COLORS AVAILABLE'],
          features: ['SHEATH UV-RESISTANT', 'IN CARRIAGE VERSION WITH SPECIAL SUPPORT', 'BRAIDING AND WITH PUR SHEATH PARTICULARLY', 'RESISTANT TO WEAR, OIL, HYDROLYSIS AND', 'MICROBIAL ATTACK', 'CUSTOMIZABLE AVAILABLE']
        }
      }
    ]
  },
  {
    id: 8,
    name: 'Speaker Cable',
    description: 'High-fidelity speaker cables for audio systems',
    products: [
      {
        id: createSlug('Speaker Cable'),
        name: 'Speaker Cable',
        price: 28.99,
        image: speakerCable,
        category: 'Speaker Cable',
        description: 'Premium speaker cable for clear audio transmission in home theater and audio systems.',
        speed: 'Audio',
        stock: 50,
        detailedDescription: {
          applications: ['ALL THE CABLES ARE USED FOR SPEAKER RANGES, HOME THEATER OR AUDIO SYSTEM', 'USED FOR CONNECTING POWER AMPLIFIER AND BROADCASTING SYSTEMS', 'FOR TRANSMITTING THE AUDIO SIGNALS AMPLIFIED BY THE AMPLIFIER', 'HOME AUDIO SYSTEMS', 'PROFESSIONAL SOUND EQUIPMENT'],
          specifications: ['OFFERING WIDE RANGE OF HIGH QUALITY SPEAKER CABLE WITH ALL KINDS OF APPLICATIONS', 'SPEAKER CABLES ARE MOSTLY USED FOR ESTABLISHING A CONNECTION BETWEEN A SPEAKER AND AMPLIFIER SOURCES', '3 KEY ELECTRICAL PROPERTIES RESISTANCE, CAPACITANCE AND INDUCTANCE', 'RATED VOLTAGE: 300/300V', 'FULL 100M'],
          features: ['MULTI-STRANDED/FLEXIBLE OFC, COPPER, TINNED-COPPER WIRE CONDUCTOR', 'RELIABLE CONNECTION', 'ROHS STANDARD PVC', 'CE,SGS,ISO9001 STANDARD', 'KEEP WORKING UNDER 70°C FOR LONG PERIOD OPERATION']
        }
      }
    ]
  }
];

// Flatten all products from categories
export const allProducts: Product[] = categories.flatMap(category => 
  category.products.map(product => ({
    ...product,
    stock: product.stock || Math.floor(Math.random() * 100) + 10,
    applications: product.detailedDescription?.applications || [],
    features: product.detailedDescription?.features || [],
    specifications: product.detailedDescription?.specifications?.reduce((acc: Record<string, string>, spec: string, index: number) => {
      acc[`spec_${index}`] = spec;
      return acc;
    }, {}) || {}
  }))
);
