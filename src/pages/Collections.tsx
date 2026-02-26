import { useEffect, useState } from 'react';

import { supabase, type Product } from '@/lib/supabase';

import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';

import ProductCard from '@/components/ProductCard';

import WhatsAppButton from '@/components/WhatsAppButton';

const Collections = () => {


const [products, setProducts] = useState<Product[]>([]);

const [loading, setLoading] = useState(true);

const [category, setCategory] = useState('All');

const [categories, setCategories] = useState<string[]>([]);


useEffect(() => {

const fetchProducts = async () => {

const { data } = await supabase

.from('products')

.select('*')

.order('created_at', { ascending: false });

if (data) {

setProducts(data as Product[]);

const cats = [...new Set(data.map((p: Product) => p.category).filter(Boolean))];

setCategories(cats);

}

setLoading(false);

};

fetchProducts();

}, []);


const filtered = category === 'All' ? products : products.filter((p) => p.category === category);

return (

<>

<Navbar />

<main className="container mx-auto px-4 py-12">

<h1 className="font-heading text-4xl font-bold mb-2">Our Collections</h1>

<p className="text-muted-foreground mb-8">Browse our latest arrivals and timeless classics.</p>

{/* Category filter */}

{categories.length > 0 && (

<div className="flex gap-2 flex-wrap mb-8">

{['All', ...categories].map((c) => (

<button

key={c}

onClick={() => setCategory(c)}

className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${

category === c

? 'bg-primary text-primary-foreground border-primary'

: 'bg-card text-muted-foreground border-border hover:border-primary'

}`}

>

{c}

</button>

))}

</div>

)}

{loading ? (

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{Array.from({ length: 8 }).map((_, i) => (

<div key={i} className="bg-muted rounded-lg animate-pulse aspect-[3/5]" />

))}

</div>

) : filtered.length === 0 ? (

<p className="text-center text-muted-foreground py-20">No products found.</p>

) : (

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{filtered.map((p) => (

<ProductCard key={p.id} product={p} />

))}

</div>

)}

</main>

<Footer />

<WhatsAppButton />

</>

);

};

export default Collections;

