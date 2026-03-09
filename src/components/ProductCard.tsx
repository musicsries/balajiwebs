import { MessageCircle } from 'lucide-react';
import { useState } from "react";
import type { Product } from '../lib/supabase';
import { whatsappProductLink } from './WhatsAppButton';

const ProductCard = ({ product }: { product: Product }) => {
  const discount = Math.round(
    ((product.old_price - product.new_price) / product.old_price) * 100
  );

  // State to track which image is shown
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Function to swap images on click
  const handleImageClick = () => {
    if (product.images && product.images.length > 1) {
      setMainImageIndex(prev => (prev === 0 ? 1 : 0));
    }
  };
return (
    <div className="bg-card rounded-lg overflow-hidden border card-hover animate-fade-in">
      {/* Main Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-muted rounded-md cursor-pointer"
        onClick={handleImageClick}
      >
        <a
          href={product.images?.[mainImageIndex]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={product.images?.[mainImageIndex] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </a>

        {discount > 0 && (
          <span className="discount-badge absolute top-3 left-3">
            {discount}% OFF
          </span>
        )}
      </div>
{/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading text-lg font-semibold leading-tight">{product.name}</h3>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {product.colors.map(c => (
              <span
                key={c}
                className="w-5 h-5 rounded-full border-2 border-border"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        )}

        {/* Price */}
<div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">₹{product.new_price}</span>
          {product.old_price > product.new_price && (
            <span className="strikethrough text-sm">₹{product.old_price}</span>
          )}
        </div>

        {/* WhatsApp */}
        <a
          href={whatsappProductLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-whatsapp text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>

      {/* Thumbnails */}
{product.images && product.images.length > 1 && (
        <div className="grid grid-cols-2 gap-1 mt-2 p-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className={`w-full h-20 object-cover rounded-md cursor-pointer border ${
                mainImageIndex === index ? "border-primary" : "border-border"
              }`}
              loading="lazy"
              onClick={() => setMainImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;