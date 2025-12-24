import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const quickLinks = ['Home', 'Services', 'About Us', 'Testimonials', 'Contact'];
  const services = ['Laptop Repair', 'Desktop Repair', 'Data Recovery', 'Virus Removal', 'Hardware Upgrade'];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="My Tech Bali" className="h-10 w-auto" />
              <span className="text-xl font-bold">My Tech <span className="text-primary">Bali</span></span>
            </a>
            <p className="text-primary-foreground/70 mb-6">
              Your trusted partner for professional computer repair and maintenance services. 
              Fast, reliable, and affordable solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>Jl. Sedap Malam</li>
              <li>Denpasar, Bali, Indonesia</li>
              <li>+62 857-4263-0809</li>
              <li>mytechbali@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} My Tech Bali. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
