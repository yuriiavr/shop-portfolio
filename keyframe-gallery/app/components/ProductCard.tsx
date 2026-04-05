import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group cursor-pointer space-y-6 block">
      <div className="relative aspect-[4/5] w-full bg-text-primary/5 overflow-hidden flex items-center justify-center transition-colors duration-500">
        <div className="relative w-[80%] aspect-square transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4">
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">{category}</p>
            <h3 className="text-lg font-light tracking-tight text-text-primary">{title}</h3>
          </div>
          <p className="text-sm font-medium opacity-60 italic">{price}</p>
        </div>
        <div className="h-[1px] w-full bg-text-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-text-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </div>
    </Link>
  );
}