import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product } from '@/types/Product';
import { toast } from 'sonner';

interface ShareButtonProps {
  product: Product;
  size?: 'sm' | 'lg' | 'default' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  product, 
  size = 'default', 
  variant = 'outline' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Generate shareable content
  const shareData = {
    title: `${product.name} - Chhajer Cable Industries`,
    text: `Check out this ${product.name} from Chhajer Cable Industries - Starting at $${product.price}`,
    url: `${window.location.origin}/product/${product.id}`,
    image: product.image
  };

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedTitle = encodeURIComponent(shareData.title);
    const encodedText = encodeURIComponent(shareData.text);

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareData.url);
          setCopiedToClipboard(true);
          toast.success('Link copied to clipboard!');
          setTimeout(() => setCopiedToClipboard(false), 2000);
          return;
        } catch (err) {
          toast.error('Failed to copy link');
          return;
        }
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share(shareData);
            toast.success('Content shared successfully!');
            setIsOpen(false);
            return;
          } catch (err) {
            // User cancelled or error occurred
            return;
          }
        }
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-white'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: copiedToClipboard ? Check : Copy,
      color: copiedToClipboard ? 'bg-green-500' : 'bg-gray-500 hover:bg-gray-600',
      textColor: 'text-white'
    }
  ];

  // Check if native sharing is available
  const hasNativeShare = navigator.share !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Product Preview */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-contain bg-white rounded"
            />
            <div>
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Native Share (if available) */}
          {hasNativeShare && (
            <Button
              onClick={() => handleShare('native')}
              className="w-full"
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share via System
            </Button>
          )}

          {/* Share Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  className={`${option.color} ${option.textColor} hover:scale-105 transition-transform`}
                  variant="default"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {option.name}
                </Button>
              );
            })}
          </div>

          {/* URL Display */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-2">Share URL:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareData.url}
                readOnly
                className="flex-1 p-2 text-xs bg-gray-50 border rounded"
              />
              <Button
                size="default"
                variant="outline"
                onClick={() => handleShare('copy')}
              >
                {copiedToClipboard ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;