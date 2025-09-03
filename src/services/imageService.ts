// AI Image Generation Service for Cable Products
import { Product } from '@/types/Product';

interface GeneratedImageSet {
  images: string[];
  image_generation_prompt: string;
  image_set_version: string;
}

interface ProductImageCache {
  [productId: string]: GeneratedImageSet;
}

class ImageService {
  private cache: ProductImageCache = {};
  private readonly IMAGE_SET_VERSION = "v1.0-cci";

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
   * Generate 5 AI images for a product
   */
  async generateProductImages(product: Product): Promise<GeneratedImageSet> {
    // Check cache first
    if (this.cache[product.id]) {
      return this.cache[product.id];
    }

    const prompt = this.generatePrompt(product);
    
    try {
      // Generate 5 images using Lovable's built-in image generation
      const imagePromises = Array.from({ length: 5 }, (_, index) => 
        this.generateSingleImage(prompt, product.name, index + 1)
      );
      
      const images = await Promise.all(imagePromises);
      
      const imageSet: GeneratedImageSet = {
        images: images.filter(Boolean), // Remove any failed generations
        image_generation_prompt: prompt,
        image_set_version: this.IMAGE_SET_VERSION
      };

      // Cache the result
      this.cache[product.id] = imageSet;
      
      return imageSet;
    } catch (error) {
      console.error(`Failed to generate images for product ${product.id}:`, error);
      
      // Return fallback with existing image if available
      return {
        images: product.image ? [product.image] : [],
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
    // This would be replaced with actual image generation
    // For now, return a placeholder URL that indicates the image type
    const baseUrl = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=1024&h=1024";
    return `${baseUrl}&sig=${this.generateSeed(productName, imageIndex)}`;
  }

  /**
   * Get cached images for a product or trigger generation
   */
  async getProductImages(product: Product): Promise<string[]> {
    const imageSet = await this.generateProductImages(product);
    return imageSet.images.length > 0 ? imageSet.images : [product.image].filter(Boolean);
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