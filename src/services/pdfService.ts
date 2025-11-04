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
    
    // Company colors matching website theme
    const primaryBlue: [number, number, number] = [59, 130, 246];
    const darkBlue: [number, number, number] = [30, 58, 138];
    const accentBlue: [number, number, number] = [37, 99, 235];
    const lightGray: [number, number, number] = [248, 250, 252];
    const darkGray: [number, number, number] = [71, 85, 105];
    const textColor: [number, number, number] = [15, 23, 42];
    
    let yPosition = 20;
    
    // Header with company branding - gradient effect
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.rect(0, 0, 210, 35, 'F');
    
    // Accent stripe
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    pdf.rect(0, 32, 210, 3, 'F');
    
    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CHHAJER CABLE', 20, 18);
    
    // Tagline
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Professional Cable Solutions', 20, 27);
    
    // Product title with background
    yPosition = 48;
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(15, yPosition - 5, 180, 14, 'F');
    
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.name, 20, yPosition + 5);
    
    // Product price and availability with badges
    yPosition += 22;
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    pdf.roundedRect(18, yPosition - 5, 45, 10, 2, 2, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`$${product.price.toFixed(2)}`, 22, yPosition + 2);
    
    pdf.setFillColor(34, 197, 94); // Green for stock
    pdf.roundedRect(68, yPosition - 5, 55, 10, 2, 2, 'F');
    pdf.text(`In Stock: ${product.stock || 50}+`, 72, yPosition + 2);
    
    // Overview section with styled heading
    yPosition += 18;
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.8);
    pdf.line(20, yPosition, 50, yPosition);
    
    yPosition += 1;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    pdf.text('Overview', 20, yPosition + 5);
    
    yPosition += 12;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    const overviewLines = pdf.splitTextToSize(content.overview, 170);
    pdf.text(overviewLines, 20, yPosition);
    yPosition += overviewLines.length * 5 + 2;
    
    // Applications section with styled heading
    yPosition += 12;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.8);
    pdf.line(20, yPosition, 60, yPosition);
    
    yPosition += 1;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    pdf.text('Applications', 20, yPosition + 5);
    
    yPosition += 12;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    content.applications.forEach((app, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      // Bullet point with accent color
      pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      pdf.circle(22, yPosition - 1, 0.8, 'F');
      pdf.text(app, 26, yPosition);
      yPosition += 6;
    });
    
    // Specifications section with styled heading
    yPosition += 12;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.8);
    pdf.line(20, yPosition, 85, yPosition);
    
    yPosition += 1;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    pdf.text('Technical Specifications', 20, yPosition + 5);
    
    yPosition += 12;
    pdf.setFontSize(10);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    Object.entries(content.specifications).forEach(([key, value], index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Alternating background for better readability
      if (index % 2 === 0) {
        pdf.setFillColor(250, 250, 252);
        pdf.rect(18, yPosition - 4, 174, 7, 'F');
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      pdf.text(`${key}:`, 20, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      const valueLines = pdf.splitTextToSize(value, 105);
      pdf.text(valueLines, 85, yPosition);
      yPosition += Math.max(7, valueLines.length * 5 + 1);
    });
    
    // Features section with styled heading
    yPosition += 12;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.8);
    pdf.line(20, yPosition, 57, yPosition);
    
    yPosition += 1;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    pdf.text('Key Features', 20, yPosition + 5);
    
    yPosition += 12;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    content.features.forEach((feature, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      // Checkmark with accent color
      pdf.setTextColor(34, 197, 94); // Green checkmark
      pdf.setFont('helvetica', 'bold');
      pdf.text('✓', 22, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(feature, 28, yPosition);
      yPosition += 6;
    });
    
    // Add product images if available
    if (images.length > 0) {
      pdf.addPage();
      yPosition = 20;
      
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setLineWidth(0.8);
      pdf.line(20, yPosition, 70, yPosition);
      
      yPosition += 1;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
      pdf.text('Product Images', 20, yPosition + 5);
      yPosition += 15;
      
      // Add up to 4 images per page with borders
      let imageCount = 0;
      for (const imageUrl of images.slice(0, 4)) {
        try {
          const base64Image = await this.loadImageAsBase64(imageUrl);
          if (base64Image) {
            const x = 20 + (imageCount % 2) * 90;
            const y = yPosition + Math.floor(imageCount / 2) * 85;
            
            // Image border
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.rect(x - 1, y - 1, 82, 62);
            
            // Add image
            pdf.addImage(base64Image, 'JPEG', x, y, 80, 60);
            imageCount++;
          }
        } catch (error) {
          console.error('Failed to add image to PDF:', error);
        }
      }
    }
    
    // Footer on each page with enhanced styling
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer background with gradient effect
      pdf.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
      pdf.rect(0, 282, 210, 15, 'F');
      
      // Top accent line
      pdf.setDrawColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      pdf.setLineWidth(1);
      pdf.line(0, 282, 210, 282);
      
      // Company name
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('CHHAJER CABLE', 20, 288);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('Professional Cable Solutions', 20, 292);
      
      // Page number
      pdf.setFontSize(9);
      pdf.text(`Page ${i} of ${pageCount}`, 180, 290);
      
      // Contact info
      pdf.setFontSize(7);
      pdf.setTextColor(220, 220, 220);
      pdf.text('info@chhajercable.com | www.chhajercable.com', 70, 292);
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