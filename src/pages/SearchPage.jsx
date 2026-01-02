import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Home, PoundSterling, Bed, Calendar, MapPin, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import propertiesData from "@/data/properties.json";
import { getPropertyImage } from "@/types/property";
import FavouritesPanel from "@/components/FavouritesPanel";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateAdded, setDateAdded] = useState(undefined);
  const [postcodeArea, setPostcodeArea] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Favourites state
  const [favourites, setFavourites] = useState([]);
  const [isDragOverFavourites, setIsDragOverFavourites] = useState(false);
  const [isDragOverRemove, setIsDragOverRemove] = useState(false);

  // Pre-fill postcode from URL query params (from homepage search)
  useEffect(() => {
    const postcode = searchParams.get("postcode");
    if (postcode) {
      setPostcodeArea(postcode);
    }
  }, [searchParams]);

  const filterProperties = () => {
    let results = propertiesData.properties;

    // Filter by property type
    if (propertyType && propertyType !== "any") {
      results = results.filter((p) => p.type === propertyType);
    }

    // Filter by min price
    if (minPrice && minPrice !== "any") {
      results = results.filter((p) => p.price >= parseInt(minPrice));
    }

    // Filter by max price
    if (maxPrice && maxPrice !== "any") {
      results = results.filter((p) => p.price <= parseInt(maxPrice));
    }

    // Filter by min bedrooms
    if (minBedrooms && minBedrooms !== "any") {
      results = results.filter((p) => p.bedrooms >= parseInt(minBedrooms));
    }

    // Filter by max bedrooms
    if (maxBedrooms && maxBedrooms !== "any") {
      results = results.filter((p) => p.bedrooms <= parseInt(maxBedrooms));
    }

    // Filter by postcode area
    if (postcodeArea) {
      const searchPostcode = postcodeArea.toUpperCase().trim();
      results = results.filter((p) =>
        p.postcode?.toUpperCase().includes(searchPostcode)
      );
    }

    // Filter by date added
    if (dateAdded) {
      results = results.filter((p) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = monthNames.indexOf(p.added.month);
        const propertyDate = new Date(p.added.year, monthIndex, p.added.day);
        return propertyDate >= dateAdded;
      });
    }

    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = filterProperties();
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleReset = () => {
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setMaxBedrooms("");
    setDateAdded(undefined);
    setPostcodeArea("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Favourites functions
  const addToFavourites = (property) => {
    // Prevent duplicates by checking ID
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites((prev) => [...prev, property]);
    }
  };

  const removeFromFavourites = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isFavourite = (propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  };

  // Drag and drop handlers for favourites panel
  const handleDragOverFavourites = (e) => {
    e.preventDefault();
    setIsDragOverFavourites(true);
  };

  const handleDragLeaveFavourites = () => {
    setIsDragOverFavourites(false);
  };

  const handleDropOnFavourites = (e) => {
    e.preventDefault();
    setIsDragOverFavourites(false);
    
    const propertyId = e.dataTransfer.getData("propertyId");
    if (propertyId) {
      const property = [...searchResults, ...propertiesData.properties].find(
        (p) => p.id === propertyId
      );
      if (property) {
        addToFavourites(property);
      }
    }
  };

  // Drag start handler for property cards
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  // Remove zone handlers
  const handleDragOverRemove = (e) => {
    e.preventDefault();
    setIsDragOverRemove(true);
  };

  const handleDragLeaveRemove = () => {
    setIsDragOverRemove(false);
  };

  const handleDropOnRemove = (e) => {
    e.preventDefault();
    setIsDragOverRemove(false);
    
    const propertyId = e.dataTransfer.getData("removeFromFavourites");
    if (propertyId) {
      removeFromFavourites(propertyId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Find Your Perfect Property
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-primary-foreground/80">
            Use our search to filter properties by your exact requirements
          </p>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card p-6 shadow-lg md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Property Type */}
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="font-body text-sm font-medium">
                    Property Type
                  </Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="propertyType" className="h-12 font-body">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Postcode Area */}
                <div className="space-y-2">
                  <Label htmlFor="postcodeArea" className="font-body text-sm font-medium">
                    Postcode Area
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="postcodeArea"
                      type="text"
                      placeholder="e.g. BR1, NW1"
                      value={postcodeArea}
                      onChange={(e) => setPostcodeArea(e.target.value)}
                      className="h-12 pl-11 font-body"
                    />
                  </div>
                </div>

                {/* Min Price */}
                <div className="space-y-2">
                  <Label htmlFor="minPrice" className="font-body text-sm font-medium">
                    Min Price
                  </Label>
                  <Select value={minPrice} onValueChange={setMinPrice}>
                    <SelectTrigger id="minPrice" className="h-12 font-body">
                      <div className="flex items-center gap-2">
                        <PoundSterling className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="No min" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">No min</SelectItem>
                      <SelectItem value="100000">£100,000</SelectItem>
                      <SelectItem value="200000">£200,000</SelectItem>
                      <SelectItem value="300000">£300,000</SelectItem>
                      <SelectItem value="400000">£400,000</SelectItem>
                      <SelectItem value="500000">£500,000</SelectItem>
                      <SelectItem value="750000">£750,000</SelectItem>
                      <SelectItem value="1000000">£1,000,000</SelectItem>
                      <SelectItem value="1500000">£1,500,000</SelectItem>
                      <SelectItem value="2000000">£2,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Price */}
                <div className="space-y-2">
                  <Label htmlFor="maxPrice" className="font-body text-sm font-medium">
                    Max Price
                  </Label>
                  <Select value={maxPrice} onValueChange={setMaxPrice}>
                    <SelectTrigger id="maxPrice" className="h-12 font-body">
                      <div className="flex items-center gap-2">
                        <PoundSterling className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="No max" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">No max</SelectItem>
                      <SelectItem value="250000">£250,000</SelectItem>
                      <SelectItem value="500000">£500,000</SelectItem>
                      <SelectItem value="750000">£750,000</SelectItem>
                      <SelectItem value="1000000">£1,000,000</SelectItem>
                      <SelectItem value="1500000">£1,500,000</SelectItem>
                      <SelectItem value="2000000">£2,000,000</SelectItem>
                      <SelectItem value="3000000">£3,000,000</SelectItem>
                      <SelectItem value="5000000">£5,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Min Bedrooms */}
                <div className="space-y-2">
                  <Label htmlFor="minBedrooms" className="font-body text-sm font-medium">
                    Min Bedrooms
                  </Label>
                  <Select value={minBedrooms} onValueChange={setMinBedrooms}>
                    <SelectTrigger id="minBedrooms" className="h-12 font-body">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="Any" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Bedrooms */}
                <div className="space-y-2">
                  <Label htmlFor="maxBedrooms" className="font-body text-sm font-medium">
                    Max Bedrooms
                  </Label>
                  <Select value={maxBedrooms} onValueChange={setMaxBedrooms}>
                    <SelectTrigger id="maxBedrooms" className="h-12 font-body">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="Any" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Added */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-body text-sm font-medium">
                    Added Since
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full justify-start text-left font-body font-normal",
                          !dateAdded && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {dateAdded ? format(dateAdded, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateAdded}
                        onSelect={setDateAdded}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="h-12 px-8 font-body font-medium"
                >
                  Reset Filters
                </Button>
                <Button
                  type="submit"
                  className="h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90 font-body font-semibold"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </div>
            </form>

            {/* Search Results with Favourites Panel */}
            {hasSearched && (
              <div className="mt-12">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Results Section */}
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      {searchResults.length > 0
                        ? `${searchResults.length} ${searchResults.length === 1 ? "Property" : "Properties"} Found`
                        : "No Properties Found"}
                    </h2>

                    {searchResults.length > 0 ? (
                      <div className="grid gap-6 md:grid-cols-2">
                        {searchResults.map((property) => (
                          <div
                            key={property.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, property.id)}
                            className="group rounded-xl bg-card shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-grab active:cursor-grabbing"
                          >
                            <div 
                              onClick={() => handlePropertyClick(property.id)}
                              className="cursor-pointer"
                            >
                              <div className="aspect-[4/3] overflow-hidden">
                                <img
                                  src={getPropertyImage(property.images[0])}
                                  alt={property.title}
                                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                              <div className="p-4">
                                <p className="font-body text-sm text-muted-foreground">
                                  {property.type}
                                </p>
                                <p className="mt-2 font-display text-xl font-bold text-accent">
                                  {formatPrice(property.price)}
                                </p>
                                <p className="mt-1 font-body text-sm text-muted-foreground line-clamp-1">
                                  {property.location}
                                </p>
                              </div>
                            </div>
                            {/* Add to Favourites Button */}
                            <div className="px-4 pb-4">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isFavourite(property.id)) {
                                    removeFromFavourites(property.id);
                                  } else {
                                    addToFavourites(property);
                                  }
                                }}
                                variant={isFavourite(property.id) ? "default" : "outline"}
                                size="sm"
                                className="w-full"
                              >
                                <Heart className={`h-4 w-4 mr-2 ${isFavourite(property.id) ? "fill-current" : ""}`} />
                                {isFavourite(property.id) ? "Remove from Favourites" : "Add to Favourites"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl bg-secondary p-8 text-center">
                        <p className="font-body text-muted-foreground">
                          No properties match your search criteria. Try adjusting your filters.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Favourites Panel */}
                  <div className="lg:w-80 lg:sticky lg:top-4 lg:self-start">
                    <FavouritesPanel
                      favourites={favourites}
                      onRemove={removeFromFavourites}
                      onClear={clearFavourites}
                      onDrop={handleDropOnFavourites}
                      onDragOver={handleDragOverFavourites}
                      onDragLeave={handleDragLeaveFavourites}
                      isDragOver={isDragOverFavourites}
                    />
                    
                    {/* Remove Zone - shown when dragging from favourites */}
                    {favourites.length > 0 && (
                      <div
                        onDrop={handleDropOnRemove}
                        onDragOver={handleDragOverRemove}
                        onDragLeave={handleDragLeaveRemove}
                        className={`mt-4 p-4 border-2 border-dashed rounded-xl text-center transition-all ${
                          isDragOverRemove 
                            ? "border-destructive bg-destructive/10" 
                            : "border-muted-foreground/30"
                        }`}
                      >
                        <p className={`font-body text-sm ${isDragOverRemove ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                          Drag here to remove from favourites
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchPage;
