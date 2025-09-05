// AI Image Generation Service for Cable Products
import { Product } from '@/types/Product';

interface GeneratedImageSet {
  images: string[];
  images_status: ('valid' | 'placeholder' | 'generating' | 'error')[];
  image_generation_prompt: string;
  image_set_version: string;
}

interface ProductImageCache {
  [productId: string]: GeneratedImageSet;
}

class ImageService {
  private cache: ProductImageCache = {};
  private readonly IMAGE_SET_VERSION = "v1.1-cci";
  private readonly PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=1024&h=1024";

  /**
   * Generate product-specific prompt based on product metadata
   */
private generatePrompt(product: Product): string {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    
    // Determine cable type and specifications
    let cableType = "standard";
    let shielding = "unshielded";
    let construction = "standard";
    let pairs = "4";
    let connectorType = "none";
    let useContext = "office networking";
    let labelText = "CABLE";

    // Parse shielding type
    if (name.includes("stp")) {
      shielding = "shielded with braided shield";
      connectorType = "shielded RJ45";
    } else if (name.includes("ftp")) {
      shielding = "foil shielded";
      connectorType = "shielded RJ45";
    } else if (name.includes("utp")) {
      shielding = "unshielded";
      connectorType = "unshielded RJ45";
    }

    // Parse construction type
    if (name.includes("flat")) {
      construction = "flat profile";
    } else if (name.includes("armored")) {
      construction = "armored with metallic armor layer";
    } else if (name.includes("outdoor")) {
      construction = "outdoor rated with black UV-resistant jacket";
      useContext = "outdoor conduit installation";
    }

    // Parse pair count
    if (name.includes("2 pair")) {
      pairs = "2";
    }

    // Category-specific specifications
    if (category.includes("cat 6")) {
      cableType = "CAT 6";
      labelText = "CAT 6";
      useContext = "high-speed network installation";
    } else if (category.includes("cat 5e")) {
      cableType = "CAT 5e";
      labelText = "CAT 5E";
      useContext = "ethernet network installation";
    } else if (category.includes("cctv")) {
      cableType = "CCTV coaxial";
      shielding = "coaxial with inner conductor";
      connectorType = "BNC or power connectors";
      useContext = "security camera installation";
      labelText = name.includes("3+1") ? "CCTV 3+1" : "CCTV 4+1";
      pairs = name.includes("3+1") ? "1 coax + 3 power" : "1 coax + 4 power";
    } else if (category.includes("telephone")) {
      cableType = "telephone";
      shielding = "multi-conductor";
      connectorType = "RJ11/RJ12";
      useContext = "telephone system installation";
      labelText = "TELEPHONE";
    } else if (category.includes("speaker")) {
      cableType = "speaker";
      shielding = "2-conductor with clear or red/black jacket";
      connectorType = "bare wire or banana plugs";
      useContext = "audio system connection";
      labelText = "SPEAKER";
    } else if (category.includes("lift")) {
      cableType = "lift/elevator";
      shielding = "multi-core flexible";
      connectorType = "industrial connectors";
      useContext = "elevator control installation";
      labelText = "LIFT CABLE";
    } else if (category.includes("computer") || category.includes("power")) {
      cableType = "power cord";
      shielding = "3-wire with ground";
      connectorType = "3-prong plug and IEC connector";
      useContext = "computer power connection";
      labelText = "POWER CORD";
    }

    return `Create a professional ecommerce studio photo set of ${product.name} for Chhajer Cable Industries. Category: ${category}. Type: ${cableType}. Construction: ${construction}. Shielding: ${shielding}. Pairs: ${pairs}. Connectors: ${connectorType}. Generate exactly 5 images in 1024x1024 PNG format: 1) Primary hero shot at 3/4 angle on pure white seamless background with soft realistic shadows, high detail product-centered view, 2) Macro close-up showing ${shielding === "shielded with braided shield" ? "braided shield detail and shielded RJ45 connector" : shielding === "foil shielded" ? "foil wrap detail and shielded RJ45 connector" : shielding === "coaxial with inner conductor" ? "coaxial center conductor and outer shield" : shielding === "2-conductor with clear or red/black jacket" ? "copper strand detail and conductor colors" : "connector and cable detail"}, 3) Alternate angle or neat coil layout on white background with soft shadow, 4) Subtle in-use context showing ${useContext} with soft-focus background, product-centered composition, 5) Packaging view showing neat coil with visible technical jacket marking "${labelText}" on white background. Studio ecommerce aesthetic, consistent lighting, realistic cable colors, no watermarks or logos, minimal reflections.`;
  }

  /**
   * Validate if URL is HTTPS and accessible
   */
  private async validateImageUrl(url: string): Promise<boolean> {
    if (!url || !url.startsWith('https://')) {
      return false;
    }
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Generate 5 AI images for a product with HTTPS validation
   */
  async generateProductImages(product: Product): Promise<GeneratedImageSet> {
    // Check cache first
    const cached = this.cache[product.id];
    if (cached && cached.images.length === 5) {
      // Validate cached images
      const validationPromises = cached.images.map(url => this.validateImageUrl(url));
      const validationResults = await Promise.all(validationPromises);
      
      if (validationResults.every(Boolean)) {
        return cached;
      }
    }

    const prompt = this.generatePrompt(product);
    
    try {
      // Generate 4 additional images (first image will be original product.image if valid)
      const imagePromises = Array.from({ length: 4 }, (_, index) => 
        this.generateSingleImage(prompt, product.name, index + 2) // Start from image 2
      );
      
      const generatedImages = await Promise.all(imagePromises);
      
      // Always use original product image as first image if valid, otherwise placeholder
      const firstImage = (product.image && await this.validateImageUrl(product.image)) 
        ? product.image 
        : this.PLACEHOLDER_IMAGE;
      
      const allImages = [firstImage, ...generatedImages];
      const images_status: ('valid' | 'placeholder' | 'generating' | 'error')[] = [];
      
      // Validate all images and set status
      for (let i = 0; i < 5; i++) {
        const url = allImages[i];
        if (url === this.PLACEHOLDER_IMAGE) {
          images_status.push('placeholder');
        } else if (await this.validateImageUrl(url)) {
          images_status.push('valid');
        } else {
          allImages[i] = this.PLACEHOLDER_IMAGE;
          images_status.push('placeholder');
        }
      }
      
      const imageSet: GeneratedImageSet = {
        images: allImages,
        images_status,
        image_generation_prompt: prompt,
        image_set_version: this.IMAGE_SET_VERSION
      };

      // Cache the result
      this.cache[product.id] = imageSet;
      
      return imageSet;
    } catch (error) {
      console.error(`Failed to generate images for product ${product.id}:`, error);
      
      // Return fallback with placeholders
      const fallbackImages = Array(5).fill(this.PLACEHOLDER_IMAGE);
      const fallbackStatus = Array(5).fill('placeholder') as ('placeholder')[];
      
      return {
        images: fallbackImages,
        images_status: fallbackStatus,
        image_generation_prompt: prompt,
        image_set_version: this.IMAGE_SET_VERSION + "-fallback"
      };
    }
  }

  /**
   * Generate a single image with retry logic
   */
  private async generateSingleImage(prompt: string, productName: string, imageIndex: number): Promise<string> {
    const imagePrompt = `${prompt} Image ${imageIndex} of 5: ${this.getSpecificImageDescription(imageIndex)}`;
    
    try {
      // Use a deterministic seed based on product name and image index for consistency
      const seed = this.generateSeed(productName, imageIndex);
      
      // This would be replaced with actual image generation API call
      // For now, return a placeholder that indicates the image type
      return this.generatePlaceholderImage(productName, imageIndex);
      
    } catch (error) {
      console.warn(`Failed to generate image ${imageIndex} for ${productName}:`, error);
      return this.generatePlaceholderImage(productName, imageIndex);
    }
  }

  /**
   * Get specific description for each image index
   */
  private getSpecificImageDescription(index: number): string {
    switch (index) {
      case 1: return "Primary hero shot at 3/4 angle, professional studio lighting";
      case 2: return "Macro close-up showing connector/shielding detail";
      case 3: return "Alternate angle or neat coil layout";
      case 4: return "Subtle in-use context with soft-focus background";
      case 5: return "Packaging view with visible technical markings";
      default: return "Professional product photography";
    }
  }

  /**
   * Generate deterministic seed from product name and image index
   */
  private generateSeed(productName: string, imageIndex: number): number {
    let hash = 0;
    const str = productName + imageIndex.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate placeholder image URL (temporary implementation)
   */
  private generatePlaceholderImage(productName: string, imageIndex: number): string {
    // Special handling for CAT 6 STP - Add specific professional-grade images
    if (productName.toLowerCase().includes('cat 6') && productName.toLowerCase().includes('stp')) {
      const cat6StpImages = [
        "https://images.unsplash.com/photo-1587909209111-5097ee518b05?auto=format&fit=crop&q=80&w=1200&h=1200", // Bundle shot - coiled cables
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200&h=1200", // Single full-length diagonal
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200&h=1200", // RJ45 connector close-up
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200&h=1200", // Angled side view
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200&h=1200"  // Application shot with networking device
      ];
      
      if (imageIndex >= 1 && imageIndex <= 5) {
        return cat6StpImages[imageIndex - 1];
      }
    }
    
    // Default placeholder for other products
    const baseUrl = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=1024&h=1024";
    return `${baseUrl}&sig=${this.generateSeed(productName, imageIndex)}`;
  }

  /**
   * Get cached images for a product or trigger generation
   */
  async getProductImages(product: Product): Promise<string[]> {
    const imageSet = await this.generateProductImages(product);
    return imageSet.images;
  }

  /**
   * Get full image set with status information
   */
  async getProductImageSet(product: Product): Promise<GeneratedImageSet> {
    return await this.generateProductImages(product);
  }

  /**
   * Check if product has full image set
   */
  hasFullImageSet(product: Product): boolean {
    const cached = this.cache[product.id];
    return cached && cached.images.length === 5;
  }

  /**
   * Clear cache for a specific product
   */
  clearProductCache(productId: string): void {
    delete this.cache[productId];
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cache = {};
  }
}

// Export singleton instance
export const imageService = new ImageService();
export default imageService;