import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HeroSection = () => {
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?postcode=${encodeURIComponent(postcode)}`);
  };

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-primary md:min-h-[700px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-estate-navy-light" />

      {/* Content */}
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl animate-slide-up">
            Find Your Perfect
            <span className="block text-accent">Dream Home</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-primary-foreground/80 md:text-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover exceptional properties across London. From charming cottages to luxury penthouses, your next chapter starts here.
          </p>

          {/* Simple Postcode Search */}
          <form onSubmit={handleSubmit} className="mt-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mx-auto flex max-w-md gap-3">
              <Input
                type="text"
                placeholder="Enter postcode (e.g. BR5, NW1)"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="h-12 flex-1 border-none bg-background/95 font-body text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                5K+
              </p>
              <p className="mt-1 font-body text-sm text-primary-foreground/70 md:text-base">
                Properties Listed
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                1K+
              </p>
              <p className="mt-1 font-body text-sm text-primary-foreground/70 md:text-base">
                Happy Customers
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                5+
              </p>
              <p className="mt-1 font-body text-sm text-primary-foreground/70 md:text-base">
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background" />
    </section>
  );
};

export default HeroSection;
