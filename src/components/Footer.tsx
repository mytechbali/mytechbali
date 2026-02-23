import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const services = [
    t.services.laptopRepair, t.services.desktopRepair, t.services.dataRecovery,
    t.services.virusRemoval, t.services.hardwareUpgrade,
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="My Tech Bali" className="h-10 w-auto" />
              <span className="text-xl font-bold">My Tech <span className="text-primary">Bali</span></span>
            </a>
            <p className="text-primary-foreground/70 mb-6">{t.footer.description}</p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t.footer.ourServices}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-primary-foreground/70 hover:text-primary transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t.footer.contactInfo}</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>Jl. Sedap Malam</li>
              <li>Denpasar, Bali, Indonesia</li>
              <li>+62 857-4263-0809</li>
              <li>mytechbali@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} My Tech Bali. {t.footer.copyright}</p>
          <LanguageSwitcher isScrolled={true} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
