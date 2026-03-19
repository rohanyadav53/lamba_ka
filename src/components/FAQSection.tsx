import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Does sample_KA01 take any charges?", a: "No, sample_KA01's counselling services are completely free for students. We earn from university partnerships, so you never pay extra." },
  { q: "How is sample_KA01 different from others?", a: "We offer unbiased comparisons, verified university data, dedicated counsellors, and end-to-end admission support — all in one platform." },
  { q: "Why take admission through sample_KA01?", a: "You get the best prices guaranteed, expert guidance, easy comparison tools, and post-admission support that other platforms don't provide." },
  { q: "How is sample_KA01 an independent platform?", a: "We are not owned by any university. Our recommendations are data-driven and unbiased, ensuring you get genuine advice." },
  { q: "What is sample_KA01?", a: "sample_KA01 is India's trusted ed-tech platform that helps students compare and enroll in UGC-approved online universities with expert counselling support." },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Let's clear up some doubts
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Common questions students ask before starting their online degree journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-2xl border-0 px-6 overflow-hidden transition-all duration-200"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <AccordionTrigger className="hover:no-underline py-5 gap-4">
                  <div className="flex items-center gap-4 text-left">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="font-heading font-semibold text-foreground text-sm md:text-base">
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-[3.25rem] text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
