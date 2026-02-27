import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"
import { MapPin, Phone, Clock } from 'lucide-react';

const About = () => (

<>

<Navbar />

<main className="container mx-auto px-4 py-16 max-w-4xl">

<h1 className="font-heading text-4xl font-bold mb-6">About Balaji Collections</h1>


<div className="space-y-6 text-muted-foreground leading-relaxed">

<p>

Balaji Collections is your one-stop destination for the finest ethnic and modern fashion. 

With years of experience in the textile industry, we bring you hand-picked collections that 

combine traditional craftsmanship with contemporary style.

</p>

<p>

Our curated range includes sarees, salwar suits, lehengas, kurtis, and western wear — 

all sourced from trusted manufacturers across India. We believe everyone deserves to look 

their best without breaking the bank.

</p>

</div>


{/* Info cards */}

<div className="grid sm:grid-cols-3 gap-6 mt-12">

<div className="bg-card border rounded-lg p-6 text-center">

<MapPin className="w-8 h-8 text-primary mx-auto mb-3" />

<h3 className="font-heading font-semibold mb-1">Address</h3>

<p className="text-sm text-muted-foreground">123 Market Street, City, India</p>

</div>

<div className="bg-card border rounded-lg p-6 text-center">

<Phone className="w-8 h-8 text-primary mx-auto mb-3" />

<h3 className="font-heading font-semibold mb-1">Phone</h3>

<p className="text-sm text-muted-foreground">+91 9380738510</p>

</div>
</div>
<div className="bg-card border rounded-lg p-6 text-center">

<Clock className="w-8 h-8 text-primary mx-auto mb-3" />

<h3 className="font-heading font-semibold mb-1">Hours</h3>

<p className="text-sm text-muted-foreground">Mon–Sat: 10 AM – 9 PM</p>

</div>

{/* Google Maps */}

<div className="mt-12 rounded-lg overflow-hidden border">

<iframe

title="Store location"

src="https://maps.app.goo.gl/qV1LR3Lt3sgH1ARbA"

className="w-full h-80"

allowFullScreen

loading="lazy"

referrerPolicy="no-referrer-when-downgrade"

/>

</div>

</main>

<Footer />

<WhatsAppButton />

</>

);

export default About;


