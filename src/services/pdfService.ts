import jsPDF from 'jspdf';
import { Product } from '@/types/Product';
import { productContentMap } from '@/data/productContent';
import { getProductDetails } from '@/data/productImages';

interface PDFProductData {
  product: Product;
  images: string[];
  content: {
    overview: string;
    applications: string[];
    specifications: { [key: string]: string };
    features: string[];
  };
}

class PDFService {
  private async loadImageAsBase64(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.onerror = () => reject('Failed to convert image to base64');
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Failed to load image:', error);
      return '';
    }
  }

  async generateProductCatalog(productData: PDFProductData): Promise<void> {
    const { product, images, content } = productData;
    const pdf = new jsPDF();
    
    // Company colors
    const primaryBlue: [number, number, number] = [59, 130, 246]; // rgb(59, 130, 246)
    const darkBlue: [number, number, number] = [30, 64, 175]; // rgb(30, 64, 175)
    const lightGray: [number, number, number] = [248, 250, 252]; // rgb(248, 250, 252)
    
    let yPosition = 20;
    
    // Header with company branding
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.rect(0, 0, 210, 30, 'F');
    
    // Company name and logo area
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CHHAJER CABLE', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Professional Cable Solutions', 20, 26);
    
    // Product title
    yPosition = 50;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${product.name} - Product Catalog`, 20, yPosition);
    
    // Product price and availability
    yPosition += 15;
    pdf.setFontSize(14);
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    pdf.text(`Price: $${product.price.toFixed(2)}`, 20, yPosition);
    pdf.text(`Stock: ${product.stock || 50}+ Available`, 120, yPosition);
    
    // Overview section
    yPosition += 20;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Overview', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const overviewLines = pdf.splitTextToSize(content.overview, 170);
    pdf.text(overviewLines, 20, yPosition);
    yPosition += overviewLines.length * 5;
    
    // Applications section
    yPosition += 15;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Applications', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    content.applications.forEach((app, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(`• ${app}`, 25, yPosition);
      yPosition += 6;
    });
    
    // Specifications section
    yPosition += 10;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Technical Specifications', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    Object.entries(content.specifications).forEach(([key, value]) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${key}:`, 20, yPosition);
      pdf.setFont('helvetica', 'normal');
      const valueLines = pdf.splitTextToSize(value, 120);
      pdf.text(valueLines, 80, yPosition);
      yPosition += Math.max(6, valueLines.length * 5);
    });
    
    // Features section
    yPosition += 10;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Features', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    content.features.forEach((feature, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(`✓ ${feature}`, 25, yPosition);
      yPosition += 6;
    });
    
    // Add product images if available
    if (images.length > 0) {
      pdf.addPage();
      yPosition = 20;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Product Images', 20, yPosition);
      yPosition += 15;
      
      // Add up to 4 images per page
      let imageCount = 0;
      for (const imageUrl of images.slice(0, 4)) {
        try {
          const base64Image = await this.loadImageAsBase64(imageUrl);
          if (base64Image) {
            const x = 20 + (imageCount % 2) * 90;
            const y = yPosition + Math.floor(imageCount / 2) * 80;
            
            pdf.addImage(base64Image, 'JPEG', x, y, 80, 60);
            imageCount++;
          }
        } catch (error) {
          console.error('Failed to add image to PDF:', error);
        }
      }
    }
    
    // Footer on each page
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer background
      pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.rect(0, 280, 210, 17, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('CHHAJER CABLE - Professional Cable Solutions', 20, 290);
      pdf.text(`Page ${i} of ${pageCount}`, 170, 290);
      
      // Contact info
      pdf.setFontSize(8);
      pdf.text('Contact: info@chhajercable.com | www.chhajercable.com', 20, 294);
    }
    
    // Download the PDF
    const fileName = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_catalog.pdf`;
    pdf.save(fileName);
  }
  
  async downloadProductCatalog(product: Product, images: string[]): Promise<void> {
    const productDetails = getProductDetails(product.id);
    const content = productContentMap[product.id] || {
      overview: productDetails.description,
      applications: productDetails.applications,
      specifications: productDetails.specifications,
      features: productDetails.features
    };
    
    await this.generateProductCatalog({
      product,
      images,
      content
    });
  }
}

export const pdfService = new PDFService();
export default pdfService;