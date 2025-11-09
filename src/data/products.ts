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
import liftCable from '../assets/lift-cable.jpg';
import speakerCable from '../assets/speaker-cable.jpg';

export const categories = [{
  id: 1,
  name: 'Patchcords',
  products: [{
    id: 'pc1',
    name: 'Cat 6 STP',
    price: 29.99,
    image: cat6StpPatchcord,
    category: 'Patchcords',
    description: 'Shielded Twisted Pair Cat6 patchcord with enhanced EMI protection, ideal for high-interference environments. Supports speeds up to 10Gbps.',
    detailedDescription: {
      applications: ['LAN NETWORK SYSTEM', 'COMPUTER NETWORK DISTRIBUTING SYSTEM', 'TELECOMMUNICATION NETWORK SYSTEM', 'TESTING EQUIPMENT SYSTEM', 'CATV SYSTEM'],
      specifications: ['STP TYPE', 'RJ45 PLUG', 'PVC JACKET', '4 TWISTED PAIR', 'COPPER CONDUCTOR', 'MATERIAL OF CONDUCTOR: BARE COPPER OR TINNED COPPER OR CCA', 'GAUGE: 23/24/25/26AWG OR CUSTOMIZED'],
      features: ['4 TWISTED PAIRS CABLE AROUND A CROSS SHAPED CENTRAL FILLER INTO THE CABLE CORE', 'OEM SUPPLIER', 'LENGTHS: ALL LENGTHS AVAILABLE', 'CUSTOMIZATION AVAILABLE', 'ALL COLORS AVAILABLE']
    },
    stock: 50
  }, {
    id: 'pc2',
    name: 'Cat 6 FTP',
    price: 27.99,
    image: cat6FtpPatchcord,
    category: 'Patchcords',
    description: 'Foiled Twisted Pair Cat6 patchcord offering excellent noise protection. Perfect for data centers and enterprise networks.',
    detailedDescription: {
      applications: ['DATA CENTERS', 'ENTERPRISE NETWORKS', 'HIGH-SPEED NETWORK APPLICATIONS', 'INDUSTRIAL ENVIRONMENTS'],
      specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100 ±15Ω', 'SHIELD: ALUMINUM FOIL SUPPORTED', 'SPECIFICATION: 23/24/25/26 AWG STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
      features: ['PASSED FLUKE TEST', 'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PACKING: PE BAG OR CUSTOMIZED']
    },
    stock: 45
  }, {
    id: 'pc3',
    name: 'Cat 6 UTP',
    price: 25.99,
    image: cat6UtpPatchcord,
    category: 'Patchcords',
    description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs. Cost-effective solution for office environments.',
    detailedDescription: {
      applications: ['OFFICE ENVIRONMENTS', 'COMMERCIAL BUILDINGS', 'EDUCATIONAL INSTITUTIONS', 'SMALL TO MEDIUM BUSINESSES'],
      specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100, ±15Ω', 'SPECIFICATION: 23/24/25/26 AWG, STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
      features: ['OEM SUPPLIERS', 'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PASSED FLUKE TEST', 'PACKING: PE BAG OR CUSTOMIZED']
    },
    stock: 60
  }, {
    id: 'pc4',
    name: 'Cat 5e STP',
    price: 24.99,
    image: cat5eStpPatchcord,
    category: 'Patchcords',
    description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Supports speeds up to 1Gbps.',
    detailedDescription: {
      applications: ['ENTERPRISE NETWORKS', 'DATA CENTERS', 'INDUSTRIAL ENVIRONMENTS', 'HIGH-INTERFERENCE AREAS'],
      specifications: ['FREQUENCY: UPTO 600MHZ', 'LENGTH: 0.1 MTR TO 100 MTR', 'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS', 'SHIELDED PLUG BOOT CABLE ASSEMBLIES'],
      features: ['AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION', '100% FACTORY TESTED', 'PROVIDES BETTER MECHANICAL PROPERTIES', 'AVAILABLE IN 5 DIFFERENT JACKET COLORS', 'CUSTOMIZATION AVAILABLE']
    },
    stock: 55
  }, {
    id: 'pc5',
    name: 'Cat5e FTP',
    price: 22.99,
    image: cat5eFtpPatchcord,
    category: 'Patchcords',
    description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Ideal for small business networks.',
    detailedDescription: {
      applications: ['SMALL BUSINESS NETWORKS', 'EDUCATIONAL INSTITUTIONS', 'OFFICE ENVIRONMENTS', 'MEDIUM-INTERFERENCE AREAS'],
      specifications: ['FREQUENCY: UPTO 600MHZ', 'IMPEDANCE: 100 ±15Ω', 'SHIELD: ALUMINUM FOIL SUPPORTED', 'SPECIFICATION: 23/24/25/26 AWG STRANDED', 'CONDUCTOR: CCA OR PURE COPPER', 'INSULATION: LLDPE', 'JACKET: PVC AND LSZH', 'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'],
      features: ['CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED', 'PASSED FLUKE TEST', 'PACKING: PE BAG OR CUSTOMIZED']
    },
    stock: 50
  }, {
    id: 'pc6',
    name: 'Cat5e UTP',
    price: 20.99,
    image: cat5eUtpPatchcord,
    category: 'Patchcords',
    description: 'Standard Cat5e patchcord for basic networking needs. Perfect for home and small office use.',
    detailedDescription: {
      applications: ['HOME NETWORKS', 'SMALL OFFICE NETWORKS', 'BASIC DATA TRANSMISSION', 'GENERAL NETWORKING'],
      specifications: ['FREQUENCY: UPTO 600MHZ', 'LENGTH: 0.1 MTR TO 100 MTR', 'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS', 'SHIELDED PLUG BOOT CABLE ASSEMBLIES'],
      features: ['AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION', '100% FACTORY TESTED', 'PROVIDES BETTER MECHANICAL PROPERTIES', 'AVAILABLE IN 5 DIFFERENT JACKET COLORS', 'CUSTOMIZATION AVAILABLE']
    },
    stock: 70
  }]
}];

// Flatten all products from categories
export const allProducts: Product[] = categories.flatMap(category => 
  category.products.map(product => ({
    ...product,
    stock: product.stock || Math.floor(Math.random() * 100) + 10,
    applications: product.detailedDescription?.applications || [],
    features: product.detailedDescription?.features || [],
    specifications: product.detailedDescription?.specifications.reduce((acc: Record<string, string>, spec: string, index: number) => {
      acc[`spec_${index}`] = spec;
      return acc;
    }, {}) || {}
  }))
);
