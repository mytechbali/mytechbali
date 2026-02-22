import { CheckCircle, Users, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '5000+', label: t.about.happyCustomers },
    { icon: Clock, value: '10+', label: t.about.yearsExperience },
    { icon: Award, value: '99%', label: t.about.successRate },
    { icon: CheckCircle, value: '24/7', label: t.about.support },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {t.about.label}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.about.title1}
              <span className="text-gradient-primary">{t.about.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">{t.about.description}</p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-8">
              {t.about.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card text-center group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
