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

export const categories = [
  {
    id: 1,
    name: 'Patchcords',
    description: 'Premium networking patchcords for high-speed connectivity',
    products: [
      {
        id: 'pc1',
        name: 'Cat 6 STP Patchcord',
        price: 29.99,
        image: cat6StpPatchcord,
        category: 'Patchcords',
        description: 'Shielded Twisted Pair Cat6 patchcord with enhanced EMI protection, ideal for high-interference environments.',
        speed: '10Gbps',
        stock: 50
      },
      {
        id: 'pc2',
        name: 'Cat 6 FTP Patchcord',
        price: 27.99,
        image: cat6FtpPatchcord,
        category: 'Patchcords',
        description: 'Foiled Twisted Pair Cat6 patchcord offering excellent noise protection for data centers.',
        speed: '10Gbps',
        stock: 45
      },
      {
        id: 'pc3',
        name: 'Cat 6 UTP Patchcord',
        price: 25.99,
        image: cat6UtpPatchcord,
        category: 'Patchcords',
        description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs.',
        speed: '10Gbps',
        stock: 60
      },
      {
        id: 'pc4',
        name: 'Cat 5e STP Patchcord',
        price: 24.99,
        image: cat5eStpPatchcord,
        category: 'Patchcords',
        description: 'Shielded Cat5e patchcord with reliable performance and EMI protection.',
        speed: '1Gbps',
        stock: 55
      },
      {
        id: 'pc5',
        name: 'Cat 5e FTP Patchcord',
        price: 22.99,
        image: cat5eFtpPatchcord,
        category: 'Patchcords',
        description: 'Foiled Cat5e patchcord with overall shield for noise reduction.',
        speed: '1Gbps',
        stock: 50
      },
      {
        id: 'pc6',
        name: 'Cat 5e UTP Patchcord',
        price: 20.99,
        image: cat5eUtpPatchcord,
        category: 'Patchcords',
        description: 'Standard Cat5e patchcord for basic networking needs.',
        speed: '1Gbps',
        stock: 70
      }
    ]
  },
  {
    id: 2,
    name: 'Cat5e LAN Cables',
    description: 'High-quality Cat5e cables for reliable network infrastructure',
    products: [
      {
        id: 'lan4',
        name: 'Cat 5e FTP Cable',
        price: 45.99,
        image: cat5eFtpLan,
        category: 'Cat5e LAN Cables',
        description: 'Premium Cat 5e FTP cable with aluminum foil shielding.',
        speed: '1Gbps',
        stock: 40
      },
      {
        id: 'lan5',
        name: 'Cat 5e STP Cable',
        price: 48.99,
        image: cat5eStpLan,
        category: 'Cat5e LAN Cables',
        description: 'Designed for network adapters, hubs, switches, and routers.',
        speed: '1Gbps',
        stock: 35
      },
      {
        id: 'lan6',
        name: 'Cat 5e UTP Cable',
        price: 42.99,
        image: cat5eUtpLan,
        category: 'Cat5e LAN Cables',
        description: 'Ethernet standard achieving 1,000 Mbps transmission speed.',
        speed: '1Gbps',
        stock: 55
      },
      {
        id: 'lan7',
        name: 'Cat 5e Flat Cable',
        price: 39.99,
        image: cat5eFlatLan,
        category: 'Cat5e LAN Cables',
        description: 'Ultra-thin flat design for discreet installations.',
        speed: '1Gbps',
        stock: 45
      },
      {
        id: 'lan8',
        name: 'Cat 5e 2 Pair Cable',
        price: 35.99,
        image: cat5e2pairLan,
        category: 'Cat5e LAN Cables',
        description: 'Cost-effective 2-pair cable for basic applications.',
        speed: '100Mbps',
        stock: 60
      },
      {
        id: 'lan9',
        name: 'Cat 5e Armored Cable',
        price: 55.99,
        image: cat5eArmoredLan,
        category: 'Cat5e LAN Cables',
        description: 'Heavy-duty armored cable for harsh environments.',
        speed: '1Gbps',
        stock: 30
      },
      {
        id: 'lan10',
        name: 'Cat 5e Outdoor Cable',
        price: 52.99,
        image: cat5eOutdoorLan,
        category: 'Cat5e LAN Cables',
        description: 'Weather-resistant cable for outdoor installations.',
        speed: '1Gbps',
        stock: 40
      }
    ]
  },
  {
    id: 3,
    name: 'Cat 6 LAN Cable',
    description: 'Premium Cat6 cables for high-performance networking',
    products: [
      {
        id: 'cat1',
        name: 'Cat 6 Flat Cable',
        price: 49.99,
        image: cat6FlatLan,
        category: 'Cat 6 LAN Cable',
        description: 'Low-profile flat design for discrete installations.',
        speed: '10Gbps',
        stock: 45
      },
      {
        id: 'cat2',
        name: 'Cat 6 Armored Cable',
        price: 65.99,
        image: cat6ArmoredLan,
        category: 'Cat 6 LAN Cable',
        description: 'Double-jacketed armored cable for harsh environments.',
        speed: '10Gbps',
        stock: 30
      },
      {
        id: 'cat3',
        name: 'Cat 6 STP Cable',
        price: 58.99,
        image: cat6StpLan,
        category: 'Cat 6 LAN Cable',
        description: 'NO.1 QUALITY - 80 wire aloe shielded with 42 micron aluminum foil.',
        speed: '10Gbps',
        stock: 40
      },
      {
        id: 'cat4',
        name: 'Cat 6 FTP Cable',
        price: 55.99,
        image: cat6FtpLan,
        category: 'Cat 6 LAN Cable',
        description: 'Weather proof double jacket with international standard twisting.',
        speed: '10Gbps',
        stock: 35
      },
      {
        id: 'cat5',
        name: 'Cat 6 UTP Cable',
        price: 52.99,
        image: cat6UtpLan,
        category: 'Cat 6 LAN Cable',
        description: 'Maximum performance for video & data applications.',
        speed: '10Gbps',
        stock: 50
      },
      {
        id: 'cat6',
        name: 'Cat 6 Outdoor Cable',
        price: 62.99,
        image: cat6OutdoorLan,
        category: 'Cat 6 LAN Cable',
        description: 'LDPE sheath for indoor/outdoor applications.',
        speed: '10Gbps',
        stock: 40
      }
    ]
  },
  {
    id: 4,
    name: 'CCTV Cable',
    description: 'Professional CCTV cables for surveillance systems',
    products: [
      {
        id: 'cctv1',
        name: 'CCTV 3+1 Cable',
        price: 35.99,
        image: cctv3plus1Cable,
        category: 'CCTV Cable',
        description: 'Siamese cable with 3 power conductors and 1 coaxial core.',
        speed: 'HD Video',
        stock: 55
      },
      {
        id: 'cctv2',
        name: 'CCTV 4+1 Cable',
        price: 42.99,
        image: cctv4plus1Cable,
        category: 'CCTV Cable',
        description: 'Premium cable with 4 power conductors for PTZ cameras.',
        speed: 'HD Video',
        stock: 45
      }
    ]
  },
  {
    id: 5,
    name: 'Telephone Cable',
    description: 'Quality telephone cables for communication systems',
    products: [
      {
        id: 'tel1',
        name: 'Telephone Cable',
        price: 25.99,
        image: telephoneCable,
        category: 'Telephone Cable',
        description: 'Premium telephone cable for reliable voice communication.',
        speed: 'Voice',
        stock: 60
      }
    ]
  },
  {
    id: 6,
    name: 'Computer Cords',
    description: 'Power cords for computers and laptops',
    products: [
      {
        id: 'cord1',
        name: 'Desktop Power Cord',
        price: 15.99,
        image: desktopPowerCord,
        category: 'Computer Cords',
        description: 'Standard power cord for desktop computers and monitors.',
        speed: 'Power',
        stock: 80
      },
      {
        id: 'cord2',
        name: 'Laptop Adapter Cord',
        price: 12.99,
        image: laptopAdapterCord,
        category: 'Computer Cords',
        description: 'Power cord for laptop adapters and chargers.',
        speed: 'Power',
        stock: 75
      }
    ]
  },
  {
    id: 7,
    name: 'Lift Cables',
    description: 'Specialized cables for elevator systems',
    products: [
      {
        id: 'lift1',
        name: 'Lift Cable',
        price: 85.99,
        image: liftCable,
        category: 'Lift Cables',
        description: 'Flexible flat cable designed for elevator installations.',
        speed: 'Data + Power',
        stock: 25
      }
    ]
  },
  {
    id: 8,
    name: 'Speaker Cable',
    description: 'High-fidelity speaker cables for audio systems',
    products: [
      {
        id: 'spk1',
        name: 'Speaker Cable',
        price: 28.99,
        image: speakerCable,
        category: 'Speaker Cable',
        description: 'Premium speaker cable for clear audio transmission.',
        speed: 'Audio',
        stock: 50
      }
    ]
  }
];

// Flatten all products from categories
export const allProducts: Product[] = categories.flatMap(category => 
  category.products.map(product => ({
    ...product,
    stock: product.stock || Math.floor(Math.random() * 100) + 10,
    applications: [],
    features: [],
    specifications: {}
  }))
);
