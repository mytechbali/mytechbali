import { ArrowRight, Monitor, Wrench, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/hero-video.mp4';

const Hero = () => {
  const quickServices = [
    {
      icon: Monitor,
      title: 'Computer Repair',
      description: 'Fast diagnosis & repair for all brands',
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Keep your device running smoothly',
    },
    {
      icon: HardDrive,
      title: 'Data Recovery',
      description: 'Recover your precious files safely',
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-overlay/75" />
      </div>

      <div className="container relative mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-primary-foreground/90">Welcome to My Tech Bali</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Expert Computer
            <br />
            <span className="text-gradient-primary">Repair & Service</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 animate-slide-up animation-delay-200">
            Your trusted partner for all computer repairs, upgrades, and maintenance in Bali. 
            Fast, reliable, and affordable service by certified technicians.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up animation-delay-400">
            <Button variant="hero" size="lg">
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="lg">
              Free Diagnosis
            </Button>
          </div>
        </div>

        {/* Quick Service Cards */}
        <div className="grid md:grid-cols-3 gap-4 animate-slide-up animation-delay-600">
          {quickServices.map((service, index) => (
            <a
              key={index}
              href="#services"
              className="group bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
