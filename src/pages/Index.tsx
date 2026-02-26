import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <>
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[350px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Balaji Collections hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Store name + Tagline + CTA */}
      <section className="bg-card border-b py-10 text-center px-4">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-gold mb-3">
          Balaji Collections
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
          Premium ethnic & modern fashion — quality fabrics, timeless designs, unbeatable prices.
        </p>

        <Link
          to="/collections"
          className="mt-6 inline-flex items-center gap-2 gold-gradient text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
        >
          View Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <h2 className="font-heading text-3xl font-bold mb-4">
          Why Choose Us
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          At Balaji Collections, we handpick the finest fabrics and latest designs to bring you fashion that speaks elegance.
          From traditional sarees to contemporary western wear, every piece is curated with love and care.
        </p>

        <Link
          to="/about"
          className="inline-block mt-6 text-sm font-medium text-primary hover:underline"
        >
          Learn more about us →
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;