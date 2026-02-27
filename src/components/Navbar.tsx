import { Link, useLocation } from 'react-router-dom';

import { Menu, X, ShieldCheck } from 'lucide-react';

import { useState } from 'react';

const Navbar = () => {


const [open, setOpen] = useState(false);

const location = useLocation();

const links = [

{ to: '/', label: 'Home' },

{


to: '/collections', label: 'Collections' },

{ to: '/about', label: 'About' },

];

const isActive = (path: string) => location.pathname === path;

return (

<nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b">

<div className="container mx-auto flex items-center justify-between h-16 px-4">

<Link to="/" className="font-heading text-2xl font-bold text-primary">

Balaji Collections

</Link>

{/* Desktop */}

<div className="hidden md:flex items-center gap-8">

{links.map((l) => (

<Link

key={l.to}

to={l.to}

className={`text-sm font-medium transition-colors hover:text-primary ${

isActive(l.to) ? 'text-primary' : 'text-muted-foreground'

}`}

>

{l.label}

</Link>

))}

<Link

to="/admin"

className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"

>

<ShieldCheck className="w-4 h-4" />

Admin

</Link>

</div>

{/* Mobile toggle */}

<button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>

{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}

</button>

</div>

{/* Mobile menu */}

{open && (

<div className="md:hidden border-b bg-card px-4 pb-4 space-y-3">

{links.map((l) => (

<Link

key={l.to}

to={l.to}

onClick={() => setOpen(false)}


className={`block text-sm font-medium ${

isActive(l.to) ? 'text-primary' : 'text-muted-foreground'

}`}

>

{l.label}

</Link>

))}

<Link

to="/admin"

onClick={() => setOpen(false)}

className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"

>

<ShieldCheck className="w-4 h-4" />

Admin

</Link>

</div>

)}

</nav>

);

};

export default Navbar;






