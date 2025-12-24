import { Monitor, Laptop, HardDrive, Cpu, Shield, Wifi, Server, Smartphone } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Laptop,
      title: 'Laptop Repair',
      description: 'Screen replacement, keyboard repair, battery issues, and more for all laptop brands.',
      features: ['Screen Replacement', 'Keyboard Repair', 'Battery Service'],
    },
    {
      icon: Monitor,
      title: 'Desktop Repair',
      description: 'Complete desktop PC repair including hardware upgrades and troubleshooting.',
      features: ['Hardware Upgrade', 'Power Supply', 'Motherboard Repair'],
    },
    {
      icon: HardDrive,
      title: 'Data Recovery',
      description: 'Professional data recovery from damaged drives, SSDs, and storage devices.',
      features: ['HDD Recovery', 'SSD Recovery', 'RAID Recovery'],
    },
    {
      icon: Shield,
      title: 'Virus Removal',
      description: 'Complete malware and virus removal with security optimization.',
      features: ['Malware Removal', 'Security Setup', 'System Cleanup'],
    },
    {
      icon: Cpu,
      title: 'Hardware Upgrade',
      description: 'RAM, SSD, GPU upgrades to boost your computer performance.',
      features: ['RAM Upgrade', 'SSD Installation', 'GPU Upgrade'],
    },
    {
      icon: Wifi,
      title: 'Network Setup',
      description: 'Home and office network installation and troubleshooting.',
      features: ['WiFi Setup', 'Router Config', 'Network Security'],
    },
    {
      icon: Server,
      title: 'Server Maintenance',
      description: 'Business server setup, maintenance, and monitoring services.',
      features: ['Server Setup', 'Backup Solutions', '24/7 Monitoring'],
    },
    {
      icon: Smartphone,
      title: 'Software Installation',
      description: 'Operating system installation and software configuration.',
      features: ['OS Installation', 'Driver Updates', 'Software Setup'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Computer
            <span className="text-gradient-primary"> Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We offer comprehensive computer repair and maintenance services with certified technicians and quality parts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
