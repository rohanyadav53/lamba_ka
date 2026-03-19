import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Briefcase, GraduationCap, Globe, Target, Landmark, Calculator,
  HeadphonesIcon, ShieldCheck, FileText, BookOpen, Video, Gift,
  TrendingUp, Users, BadgePercent, Newspaper, MessageSquare, Bot,
} from "lucide-react";

const allServices = [
  { icon: Briefcase, label: "Job Portal" },
  { icon: GraduationCap, label: "Internship Portal" },
  { icon: Globe, label: "Virtual Expo" },
  { icon: Target, label: "Career Finder" },
  { icon: Landmark, label: "Education Loans" },
  { icon: Calculator, label: "ROI Calculator" },
  { icon: HeadphonesIcon, label: "Post Admission Services" },
  { icon: ShieldCheck, label: "Verify Your University" },
  { icon: FileText, label: "Create Resume" },
  { icon: BookOpen, label: "Career Guides & Tips" },
  { icon: Video, label: "Video Counselling" },
  { icon: Gift, label: "Refer & Earn" },
  { icon: TrendingUp, label: "Online Education Trends" },
  { icon: Users, label: "Community" },
  { icon: BadgePercent, label: "Subsidy Cashback" },
  { icon: Newspaper, label: "News" },
  { icon: MessageSquare, label: "Q&A Panel" },
  { icon: Bot, label: "SARA (Chatbot)" },
];

const featured = allServices.slice(0, 6);

const PlatformServices = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Platform That Supports You End-to-End
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need — from career discovery to placement — in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10">
          {featured.map((s, i) => (
            <div
              key={s.label}
              className="bg-card rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s`, boxShadow: "var(--shadow-card)" }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-3">
                <s.icon size={24} />
              </div>
              <p className="text-xs font-semibold text-foreground leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="accent" size="lg" className="rounded-xl px-10" onClick={() => setOpen(true)}>
            View All Services
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading font-extrabold text-foreground">
                All Platform Services
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Explore the complete range of services sample_KA01 offers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {allServices.map((s) => (
                <div
                  key={s.label}
                  className="bg-secondary rounded-xl p-4 text-center transition-all duration-200 hover:bg-accent/10 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-2">
                    <s.icon size={20} />
                  </div>
                  <p className="text-xs font-semibold text-foreground leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PlatformServices;
