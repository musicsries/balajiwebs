import { MessageCircle } from 'lucide-react';

const PHONE = '919380738510'; 
const WhatsAppButton = ({ message = 'Hi! I am interested in your products.' }: { message?: string }) => {

const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;


return (

<a

href={url}

target="_blank"

rel="noopener noreferrer"

className="fixed bottom-6 right-6 z-50 bg-whatsapp text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform"

aria-label="Chat on WhatsApp"

>

<MessageCircle className="w-6 h-6" />

</a>

);

};

export default WhatsAppButton;


export const whatsappProductLink = (productName: string) =>

`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi! I'm interested in "${productName}". Is it available?`)}`;


