import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = ["Explore Programs", "Top Universities", "Compare", "About", "Blog"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-18 px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-xl tracking-tight text-primary">
            sample_KA01
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="accent" size="lg">
            Get Free Counselling
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                {item}
              </a>
            ))}
            <Button variant="accent" className="mt-3 w-full">
              Get Free Counselling
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
