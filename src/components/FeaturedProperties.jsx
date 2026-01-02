import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import propertiesData from "@/data/properties.json";

const FeaturedProperties = () => {
  const properties = propertiesData.properties;
  const featuredProperties = properties.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Discover Our Top Properties
            </h2>
            <p className="mt-2 max-w-xl font-body text-muted-foreground">
              Handpicked properties that offer exceptional value and stunning features. Find your next home among our curated selection.
            </p>
          </div>
          <Link
            to="/properties"
            className="group flex items-center gap-2 font-body font-medium text-accent transition-colors hover:text-accent/80"
          >
            View All Properties
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
