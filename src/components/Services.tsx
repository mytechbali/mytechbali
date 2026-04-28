import { Monitor, Laptop, HardDrive, Cpu, Shield, Wifi, Server, Smartphone } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { slug: 'laptop-repair', icon: Laptop, title: t.services.laptopRepair, description: t.services.laptopRepairDesc, features: t.services.laptopFeatures },
    { slug: 'desktop-repair', icon: Monitor, title: t.services.desktopRepair, description: t.services.desktopRepairDesc, features: t.services.desktopFeatures },
    { slug: 'data-recovery', icon: HardDrive, title: t.services.dataRecovery, description: t.services.dataRecoveryDesc, features: t.services.dataRecoveryFeatures },
    { slug: 'virus-removal', icon: Shield, title: t.services.virusRemoval, description: t.services.virusRemovalDesc, features: t.services.virusFeatures },
    { slug: 'hardware-upgrade', icon: Cpu, title: t.services.hardwareUpgrade, description: t.services.hardwareUpgradeDesc, features: t.services.hardwareFeatures },
    { slug: 'network-setup', icon: Wifi, title: t.services.networkSetup, description: t.services.networkSetupDesc, features: t.services.networkFeatures },
    { slug: 'server-maintenance', icon: Server, title: t.services.serverMaintenance, description: t.services.serverMaintenanceDesc, features: t.services.serverFeatures },
    { slug: 'software-installation', icon: Smartphone, title: t.services.softwareInstallation, description: t.services.softwareInstallationDesc, features: t.services.softwareFeatures },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.services.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.services.title1}
            <span className="text-gradient-primary">{t.services.title2}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={`/services/${service.slug}`}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border/50 block"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                View details & prices
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
