import Image from "next/image";
import { MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <Card className={`group overflow-hidden rounded-2xl border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-500 hover:-translate-y-2 flex flex-col ${className || ""}`}>
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm backdrop-blur-md uppercase tracking-wider text-[10px] font-bold"
          >
            {property.type}
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4">
          <Badge 
            variant="default" 
            className={`
              shadow-sm backdrop-blur-md uppercase tracking-wider text-[10px] font-bold border-none
              ${property.status === "sale" ? "bg-emerald-500/90 hover:bg-emerald-500" : ""}
              ${property.status === "rent" ? "bg-amber-500/90 hover:bg-amber-500" : ""}
              ${property.status === "lease" ? "bg-indigo-500/90 hover:bg-indigo-500" : ""}
            `}
          >
            For {property.status}
          </Badge>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md text-white font-bold rounded-xl border border-white/10 shadow-lg">
            {property.price}
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{property.location}</span>
        </div>

        {/* Features Row */}
        <div className="flex gap-4 mb-6">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
              <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <BedDouble className="h-4 w-4" />
              </div>
              <span>{property.beds}</span>
            </div>
          )}
          
          {property.baths > 0 && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
              <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Bath className="h-4 w-4" />
              </div>
              <span>{property.baths}</span>
            </div>
          )}
          
          {property.size && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
              <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <Square className="h-4 w-4" />
              </div>
              <span className="truncate max-w-[80px]">{property.size}</span>
            </div>
          )}
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 group-hover:line-clamp-none mt-auto">
          {property.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-6 pt-0 mt-auto">
        <a 
          href="#contact" 
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400 font-semibold group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300"
        >
          Inquire Now
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </CardFooter>
    </Card>
  );
}
