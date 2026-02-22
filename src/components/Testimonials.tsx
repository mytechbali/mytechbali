import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    { name: 'Ahmad Rizky', role: 'Business Owner', content: 'Excellent service! My laptop was fixed in just 2 hours. The technician was very professional and explained everything clearly. Highly recommended!', rating: 5 },
    { name: 'Sarah Wijaya', role: 'Graphic Designer', content: 'They recovered all my important project files from a failing hard drive. I was so relieved! Great team and reasonable prices.', rating: 5 },
    { name: 'Budi Santoso', role: 'IT Manager', content: 'We use TechFix Pro for all our office computer maintenance. They are reliable, punctual, and their service quality is consistently high.', rating: 5 },
    { name: 'Diana Putri', role: 'Student', content: 'Fast and affordable laptop repair. My screen was replaced within a day and it looks brand new. Will definitely come back!', rating: 5 },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-dark text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            {t.testimonials.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
          <p className="text-primary-foreground/70 text-lg">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary mb-4" />
              <p className="text-primary-foreground/90 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-primary-foreground/60">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
