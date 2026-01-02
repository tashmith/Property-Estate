import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getPropertyImage } from "@/types/property";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl = getPropertyImage(property.images[0]);

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block rounded-md bg-primary/90 px-3 py-1 font-body text-xs font-medium text-primary-foreground">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Price */}
        <p className="font-display text-xl font-bold text-foreground md:text-2xl">
          {formatPrice(property.price)}
        </p>

        {/* Location */}
        <div className="mt-2 flex items-start gap-1.5 text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="font-body text-sm line-clamp-1">{property.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
