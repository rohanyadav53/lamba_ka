import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Contact */}
          <div className="md:col-span-2">
            <img
              src="/sv_logo.svg"
              alt="ShikshaVision"
              className="h-32 md:h-40 mb-4 w-auto"
            />
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              India's trusted platform to compare and enroll in UGC-approved online universities.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/50">
                <Phone size={14} className="text-accent shrink-0" />
                <a href="tel:+919256925671" className="hover:text-accent transition-colors duration-200">
                  +91 92569 25671
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/50">
                <Mail size={14} className="text-accent shrink-0" />
                <a href="mailto:info@shikshavision.com" className="hover:text-accent transition-colors duration-200">
                  info@shikshavision.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>
                  M-47, Mehrauli-Gurgaon Rd, Block M,<br />
                  Old DLF Colony, Sector 14,<br />
                  Gurugram, Haryana 122007
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary-foreground/80">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  Explore Programs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/universities" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  Top Universities
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary-foreground/80">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@shikshavision.com" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="tel:+919256925671" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                  Call Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} shikshavision.com. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors duration-200">
                About
              </Link>
              <Link to="/programs" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors duration-200">
                Programs
              </Link>
              <a href="mailto:info@shikshavision.com" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;