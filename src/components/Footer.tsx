import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  "Quick Links": ["Explore Programs", "Top Universities", "Compare", "Blog"],
  Programs: ["MBA Online", "BBA Online", "MCA Online", "Data Science"],
  Support: ["About Us", "Contact", "FAQs", "Privacy Policy"]
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
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
                <span>+91 92569 25671</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/50">
                <Mail size={14} className="text-accent shrink-0" />
                <span>info@shikshavision.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/50">
                <MapPin size={14} className="text-accent shrink-0" />
                <p className="text-sm text-muted-foreground">
                  M-47, Mehrauli-Gurgaon Rd, Block M,<br />
                  Old DLF Colony, Sector 14,<br />
                  Gurugram, Haryana 122007
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((s) =>
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-xs font-bold transition-colors duration-200">

                  {s.charAt(0)}
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) =>
            <div key={title}>
              <h4 className="font-heading font-bold text-sm mb-4 text-primary-foreground/80">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) =>
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* App badges row */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* QR placeholder */}



              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-xs font-semibold text-primary-foreground/60 flex items-center gap-2 cursor-pointer hover:bg-primary-foreground/15 transition-colors">
                  ▶ Google Play
                </div>
                <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-xs font-semibold text-primary-foreground/60 flex items-center gap-2 cursor-pointer hover:bg-primary-foreground/15 transition-colors">
                  App Store
                </div>
              </div>
            </div>
            <p className="text-xs text-primary-foreground/40">
              © 2026 shikshavision.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;