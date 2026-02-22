import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const contactInfo = [
    { icon: MapPin, title: t.contact.location, content: 'Jl. Sedap Malam, Denpasar, Bali, Indonesia' },
    { icon: Phone, title: t.contact.phone, content: '+62 857-4263-0809' },
    { icon: Mail, title: t.contact.email, content: 'mytechbali@gmail.com' },
    { icon: Clock, title: t.contact.workingHours, content: t.contact.workingHoursValue },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {t.contact.label}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.contact.title1}
              <span className="text-gradient-primary">{t.contact.title2}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">{t.contact.subtitle}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h3 className="text-xl font-bold text-card-foreground mb-6">{t.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.contact.yourName}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.contact.emailAddress}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.contact.phoneNumber}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+62 812-3456-7890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.contact.serviceNeeded}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">{t.contact.selectService}</option>
                    <option value="laptop-repair">{t.services.laptopRepair}</option>
                    <option value="desktop-repair">{t.services.desktopRepair}</option>
                    <option value="data-recovery">{t.services.dataRecovery}</option>
                    <option value="virus-removal">{t.services.virusRemoval}</option>
                    <option value="hardware-upgrade">{t.services.hardwareUpgrade}</option>
                    <option value="network-setup">{t.services.networkSetup}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.contact.yourMessage}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder={t.contact.messagePlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {t.contact.sendMessage}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
