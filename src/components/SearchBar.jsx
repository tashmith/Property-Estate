import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Bed, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = ({ variant = "hero", className = "" }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (maxPrice) params.set("maxPrice", maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 font-body"
          />
        </div>
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-medium">
          Search
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-2xl bg-card p-4 shadow-xl md:p-6 ${className}`}
    >
      <div className="grid gap-4 md:grid-cols-5">
        {/* Location Input */}
        <div className="md:col-span-2">
          <label className="mb-2 block font-body text-sm font-medium text-foreground">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city, area or postcode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 pl-11 font-body text-base"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="mb-2 block font-body text-sm font-medium text-foreground">
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-12 font-body">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Any" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="Detached">Detached</SelectItem>
              <SelectItem value="Semi-Detached">Semi-Detached</SelectItem>
              <SelectItem value="Terraced">Terraced</SelectItem>
              <SelectItem value="Flat">Flat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-2 block font-body text-sm font-medium text-foreground">
            Bedrooms
          </label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="h-12 font-body">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Any" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Price */}
        <div>
          <label className="mb-2 block font-body text-sm font-medium text-foreground">
            Max Price
          </label>
          <Select value={maxPrice} onValueChange={setMaxPrice}>
            <SelectTrigger className="h-12 font-body">
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
              <SelectItem value="3000000">£3,000,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        className="mt-6 h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base font-semibold"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Properties
      </Button>
    </form>
  );
};

export default SearchBar;
