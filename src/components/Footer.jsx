import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Home className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-semibold">Estate Agent</span>
            </Link>
            <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">
              Your trusted partner in finding the perfect home. We've been helping families find their dream properties for over 25 years.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
             <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

         {/* Quick Links (Plain Text) */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold">Quick Links</h3>
                    <ul className="space-y-2 font-body text-sm text-primary-foreground/80">
                      <li><span>Search</span></li>
                      <li><span>Browse Properties</span></li>
                      <li><span>Property Details</span></li>
                    </ul>
                  </div>
        
                  {/* Property Types (Plain Text) */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold">Property Types</h3>
                    <ul className="space-y-2 font-body text-sm text-primary-foreground/80">
                      <li><span>Houses for Sale</span></li>
                      <li><span>Flats & Apartments</span></li>
                      <li><span>Bungalows</span></li>
                    </ul>
                  </div>
        
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold">Contact Us</h3>
                    <ul className="space-y-3 font-body text-sm">
                      <li className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-primary-foreground/80">
                          123 Property Lane, Mayfair, London W1K 2AB
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-primary-foreground/80">
                          +44 20 1234 5678
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-primary-foreground/80">
                          info@estateagent.co.uk
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
        
                {/* Bottom Bar */}
                <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center font-body text-sm text-primary-foreground/60">
                  <p>© {new Date().getFullYear()} Estate Agent. All rights reserved</p>
                </div>
              </div>
            </footer>
          );
        };
        
        export default Footer;
        