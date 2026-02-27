import { useEffect, useState } from 'react';

import { supabase, type Product } from "../lib/supabase";

import { LogOut, Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

import { useToast } from "../hooks/use-toast";

const Admin = () => {

const [session, setSession] = useState<any>(null);

const [email, setEmail] = useState('');

const [password, setPassword] = useState('');

const [authLoading, setAuthLoading] = useState(true);

const [loginLoading, setLoginLoading] = useState(false);

const { toast } = useToast();

useEffect(() => {
  const { data: { subscription } } =
    supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setAuthLoading(false);
      }
    );

  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setAuthLoading(false);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

const handleLogin = async (e: React.FormEvent) => {

e.preventDefault();

setLoginLoading(true);

const { error } = await supabase.auth.signInWithPassword({ email, password });

if (error) toast({ title: 'Login failed', description: error.message, variant: 'destructive' });

setLoginLoading(false);

};


const handleLogout = async () => {

await supabase.auth.signOut();

};

if (authLoading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;



if (!session) {

return (

<div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">

<form onSubmit={handleLogin} className="bg-card border rounded-xl p-8 w-full max-w-sm space-y-5 shadow-lg">

<h1 className="font-heading text-2xl font-bold text-center">Admin Login</h1>

<div>


<label className="text-sm font-medium block mb-1.5">Email</label>

<input

type="email"

value={email}

onChange={(e) => setEmail(e.target.value)}

required

className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"

/>

</div>

<div>

<label className="text-sm font-medium block mb-1.5">Password</label>

<input

type="password"

value={password}

onChange={(e) => setPassword(e.target.value)}

required

className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"

/>

</div>

<button

type="submit"

disabled={loginLoading}

className="w-full gold-gradient text-primary-foreground py-2.5 rounded-md font-semibold text-sm disabled:opacity-50"

>

{loginLoading ? 'Signing in...' : 'Sign In'}

</button>

</form>

</div>

);

}

return <AdminDashboard onLogout={handleLogout} />;

};

/* ─── Dashboard ─── */

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {

const [products, setProducts] = useState<Product[]>([]);

const [loading, setLoading] = useState(true);

const [showForm, setShowForm] = useState(false);

const [editProduct, setEditProduct] = useState<Product | null>(null);

const { toast } = useToast();

const fetchProducts = async () => {


const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });

setProducts((data as Product[]) || []);

setLoading(false);

};


useEffect(() => { fetchProducts(); }, []);

const handleDelete = async (id: string) => {

if (!confirm('Delete this product?')) return;

const { error } = await supabase.from('products').delete().eq('id', id);


if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });

else {

toast({ title: 'Deleted' });

fetchProducts();

}

};

return (

<div className="min-h-screen bg-muted/40">

<header className="bg-card border-b sticky top-0 z-40">

<div className="container mx-auto px-4 flex items-center justify-between h-14">

<h1 className="font-heading text-lg font-bold">Admin Dashboard</h1>

<button
  onClick={onLogout}
  className="flex items-center gap-2 text-sm font-medium"
>
  <LogOut className="w-4 h-4" />
  Logout
</button>

</div>

</header>


<main className="container mx-auto px-4 py-8">

<div className="flex items-center justify-between mb-6">

<h2 className="font-heading text-2xl font-bold">Products ({products.length})</h2>

<button


onClick={() => { setEditProduct(null); setShowForm(true); }}

className="flex items-center gap-1.5 gold-gradient text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold"

>

<Plus className="w-4 h-4" /> Add Product

</button>

</div>

{loading ? (

<p className="text-muted-foreground">Loading products...</p>

) : products.length === 0 ? (

<p className="text-muted-foreground py-12 text-center">No products yet. Add your first product!</p>

) : (

<div className="grid gap-4">

{products.map((p) => (

<div key={p.id} className="bg-card border rounded-lg p-4 flex items-center gap-4">

<img

src={p.images?.[0] || '/placeholder.svg'}

alt={p.name}

className="w-16 h-16 rounded-md object-cover bg-muted flex-shrink-0"

/>

<div className="flex-1 min-w-0">


<h3 className="font-semibold truncate">{p.name}</h3>

<p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
  <span>{p.category}</span>

  {p.old_price > 0 && p.old_price > p.new_price && (
    <>
      <span className="line-through text-muted-foreground">
        ₹{p.old_price}
      </span>

      <span className="text-foreground font-semibold">
        ₹{p.new_price}
      </span>

      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
        {Math.round(((p.old_price - p.new_price) / p.old_price) * 100)}% OFF
      </span>
    </>
  )}

  {(!p.old_price || p.old_price <= p.new_price) && (
    <span className="text-foreground font-semibold">
      ₹{p.new_price}
    </span>
  )}
</p>

</div>

<div className="flex gap-2">

<button

onClick={() => { setEditProduct(p); setShowForm(true); }}

className="p-2 rounded-md border hover:bg-muted transition-colors"

>

<Pencil className="w-4 h-4" />

</button>

<button

onClick={() => handleDelete(p.id)}

className="p-2 rounded-md border hover:bg-destructive/10 text-destructive transition-colors"

>

<Trash2 className="w-4 h-4" />

</button>

</div>

</div>

))}

</div>

)}

</main>


{showForm && (

<ProductFormModal

product={editProduct}

onClose={() => setShowForm(false)}

onSaved={() => { setShowForm(false); fetchProducts(); }}

/>

)}

</div>

);

};

/* ─── Product Form Modal ─── */


const ProductFormModal = ({

product,

onClose,

onSaved,

}: {

product: Product | null;

onClose: () => void;

onSaved: () => void;

}) => {

const isEdit = !!product;

const { toast } = useToast();

const [saving, setSaving] = useState(false);

const [uploading, setUploading] = useState(false);

const [name, setName] = useState(product?.name || '');

const [category, setCategory] = useState(product?.category || '');

const [oldPrice, setOldPrice] = useState(product?.old_price?.toString() || '');


const [newPrice, setNewPrice] = useState(product?.new_price?.toString() || '');

const [colorsInput, setColorsInput] = useState(product?.colors?.join(', ') || '');

const [images, setImages] = useState<string[]>(product?.images || []);

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

const files = e.target.files;

if (!files?.length) return;

setUploading(true);

const uploaded: string[] = [];

for (const file of Array.from(files)) {

const ext = file.name.split('.').pop();

const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`


const { error } = await supabase.storage.from('product-images').upload(path, file);

if (error) {

toast({ title: 'Upload error', description: error.message, variant: 'destructive' });

continue;


}

const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);

uploaded.push(urlData.publicUrl);

}

setImages((prev) => [...prev, ...uploaded]);

setUploading(false);

};


const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault();

setSaving(true);


const colors = colorsInput

.split(',')

.map((c) => c.trim())

.filter(Boolean);

const payload = {

name,

category,

old_price: parseFloat(oldPrice) || 0,

new_price: parseFloat(newPrice) || 0,

colors,

images,

};

let error;

if (isEdit) {

({ error } = await supabase.from('products').update(payload).eq('id', product.id));

} else {

({ error } = await supabase.from('products').insert([payload]));

}

if (error) {

toast({ title: 'Error', description: error.message, variant: 'destructive' });

} else {

toast({ title: isEdit ? 'Product updated!' : 'Product added!' });

onSaved();

}

setSaving(false);

};


return (

<div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>

<div

className="bg-card border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl"

onClick={(e) => e.stopPropagation()}

>

<div className="flex items-center justify-between mb-6">

<h2 className="font-heading text-xl font-bold">{isEdit ? 'Edit Product' : 'Add Product'}</h2>

<button onClick={onClose} className="text-muted-foreground hover:text-foreground">

<X className="w-5 h-5" />

</button>

</div>


<form onSubmit={handleSubmit} className="space-y-4">

<Field label="Product Name">

<input value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />


</Field>

<Field label="Category">

<input value={category} onChange={(e) => setCategory(e.target.value)} className="form-input" placeholder="e.g. Sarees, Kurtis" />


</Field>

<div className="grid grid-cols-2 gap-4">

<Field label="Old Price (₹)">

<input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} className="form-input" />

</Field>

<Field label="New Price (₹)">

<input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required className="form-input" />

</Field>

</div>

<Field label="Color Variants (comma separated)">

<input value={colorsInput} onChange={(e) => setColorsInput(e.target.value)} className="form-input" placeholder="#ff0000, #00ff00, blue" />

</Field>

{/* Images */}

<Field label="Images">

<div className="flex flex-wrap gap-3 mb-2">

{images.map((url, i) => (

<div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border bg-muted">

<img src={url} alt="" className="w-full h-full object-cover" />

<button

type="button"

onClick={() => removeImage(i)}

className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"

>

×

</button>

</div>

))}

</div>

<label className="flex items-center gap-2 cursor-pointer text-sm text-primary font-medium">

<Upload className="w-4 h-4" />

{uploading ? 'Uploading...' : 'Upload Images'}

<input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

</label>

</Field>

<button

type="submit"

disabled={saving}

className="w-full gold-gradient text-primary-foreground py-2.5 rounded-md font-semibold text-sm disabled:opacity-50"

>


{saving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}

</button>

</form>

</div>

</div>

);

};


const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (

<div>

<label className="text-sm font-medium block mb-1.5">{label}</label>

{children}

</div>

);

// Add form-input utility via CSS-in-JS style

const style = document.createElement('style');

style.textContent = `.form-input{width:100%;border:1px solid hsl(var(--border));border-radius:0.375rem;padding:0.5rem 0.75rem;font-size:0.875rem;background:hsl(var(--background));outline:none}.form-input:focus{box-shadow:0 0 0 2px hsl(var(--ring))}`;

document.head.appendChild(style);

export default Admin;
