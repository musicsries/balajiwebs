import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';

const Footer = () => (

<footer className="bg-black text-white py-12 mt-16">
  <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">

    <div>
      <h3 className="font-heading text-xl font-bold mb-3">Balaji Collections</h3>

<p className="text-sm opacity-80 leading-relaxed">
        Your trusted destination for premium ethnic & modern fashion. 
        Quality fabrics, timeless designs, and unbeatable prices.
      </p>
    </div>

    <div>
      <h4 className="font-heading text-lg font-semibold mb-3">Quick Links</h4>

 <div className="space-y-2 text-sm text-white">
        <Link to="/" className="block hover:opacity-100">Home</Link>

<Link to="/collections" className="block hover:opacity-100">
          Collections
        </Link>

        <Link to="/about" className="block hover:opacity-100">
          About Us
        </Link>
      </div>
    </div>

    <div>
      <h4 className="font-heading text-lg font-semibold mb-3">Contact</h4>

<div className="space-y-2 text-sm text-white">
        <a

href="https://goo.gl/maps/HdMem9BEi7FXS9NbA"

target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-100"
        >
          <MapPin className="w-4 h-4" />
          View on Google Maps
        </a>

        <a
          href="tel:+919380738510"
          className="flex items-center gap-2 hover:opacity-100"
        >

<Phone className="w-4 h-4" />
          +91 9380738510
        </a>

      </div>
    </div>

  </div>

<div className="container mx-auto px-4 mt-8 pt-6 border-t border-background/20 text-center text-xs opacity-60">
    © {new Date().getFullYear()} Balaji Collections. All rights reserved.
  </div>

</footer>

);

export default Footer;