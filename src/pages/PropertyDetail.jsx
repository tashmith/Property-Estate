import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Map,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPropertyImage } from "@/types/property";
import propertiesData from "@/data/properties.json";

const PropertyDetail = () => {
  const { id } = useParams();
  const properties = propertiesData.properties;
  const property = properties.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Property Not Found
          </h1>
          <p className="mt-3 font-body text-muted-foreground">
            The property you're looking for doesn't exist.
          </p>
          <Link to="/properties">
            <Button className="mt-6">Browse Properties</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (added) => {
    return `${added.day} ${added.month} ${added.year}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const currentImageUrl = getPropertyImage(property.images[currentImageIndex]);
  const floorPlanUrl = getPropertyImage(property.floorPlan);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-16 md:pb-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>

        {/* Property Image Gallery */}
        <div className="container mx-auto px-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted md:aspect-[21/9]">
            <img
              src={currentImageUrl}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-lg transition-colors hover:bg-card"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-lg transition-colors hover:bg-card"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/90 px-4 py-2 font-body text-sm text-foreground">
              {currentImageIndex + 1} / {property.images.length}
            </div>

          </div>

          {/* Thumbnail Strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentImageIndex
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={getPropertyImage(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8">
          <div className="space-y-8">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Tabs Section */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto">
                  <TabsTrigger value="description" className="flex items-center gap-2 py-3">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Description</span>
                  </TabsTrigger>
                  <TabsTrigger value="floorplan" className="flex items-center gap-2 py-3">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Floor Plan</span>
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2 py-3">
                    <Map className="h-4 w-4" />
                    <span className="hidden sm:inline">Map</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      About This Property
                    </h2>
                    <div className="mt-4 font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                      {property.longDescription}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="floorplan" className="mt-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Floor Plan
                    </h2>
                    <div className="rounded-xl bg-secondary p-4 overflow-hidden">
                      <img
                        src={floorPlanUrl}
                        alt={`${property.title} Floor Plan`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="map" className="mt-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Location
                    </h2>
                    <div className="rounded-xl overflow-hidden bg-secondary">
                      <iframe
                        title={`Map of ${property.location}`}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=15`}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
