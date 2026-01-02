import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import propertiesData from "@/data/properties.json";

const Properties = () => {
  const [searchParams] = useSearchParams();

  const properties = propertiesData.properties;

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by location/postcode
    const location = searchParams.get("location");
    if (location) {
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(location.toLowerCase()) ||
          p.postcode.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by property type
    const type = searchParams.get("type");
    if (type && type !== "any") {
      result = result.filter((p) => p.type === type);
    }

    // Filter by bedrooms
    const bedrooms = searchParams.get("bedrooms");
    if (bedrooms && bedrooms !== "any") {
      result = result.filter((p) => p.bedrooms >= parseInt(bedrooms));
    }

    // Filter by max price
    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice && maxPrice !== "any") {
      result = result.filter((p) => p.price <= parseInt(maxPrice));
    }

    return result;
  }, [properties, searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Properties for Sale
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center font-body text-primary-foreground/80">
            Browse our extensive collection of properties across London
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Properties Count */}
          <p className="mb-6 font-body text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredProperties.length}
            </span>{" "}
            properties found
          </p>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-display text-xl font-semibold text-foreground">
                No properties found
              </p>
              <p className="mt-2 font-body text-muted-foreground">
                Try adjusting your search filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
