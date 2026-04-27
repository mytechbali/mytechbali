import { ArrowRight, Monitor, Wrench, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import heroVideo from '@/assets/hero-video.mp4';

const Hero = () => {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  const quickServices = [
    {
      icon: Monitor,
      title: settings.heroService1Title || t.hero.computerRepair,
      description: settings.heroService1Desc || t.hero.computerRepairDesc,
    },
    {
      icon: Wrench,
      title: settings.heroService2Title || t.hero.maintenance,
      description: settings.heroService2Desc || t.hero.maintenanceDesc,
    },
    {
      icon: HardDrive,
      title: settings.heroService3Title || t.hero.dataRecovery,
      description: settings.heroService3Desc || t.hero.dataRecoveryDesc,
    },
  ];

  const videoSrc = settings.heroVideoUrl || heroVideo;
  const overlay = Math.max(0, Math.min(100, settings.heroOverlayOpacity ?? 75)) / 100;
  const primaryUrl =
    settings.heroPrimaryBtnUrl ||
    `https://wa.me/6285742630809?text=${encodeURIComponent('Halo, saya ingin membuat janji untuk service komputer.')}`;
  const secondaryUrl =
    settings.heroSecondaryBtnUrl ||
    `https://wa.me/6285742630809?text=${encodeURIComponent('Halo, saya ingin diagnosis gratis untuk komputer saya.')}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={videoSrc} />
        </video>
        <div className="absolute inset-0 bg-hero-overlay" style={{ opacity: overlay }} />
      </div>

      <div className="container relative mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-primary-foreground/90">{settings.heroBadge || t.hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            {settings.heroHeadline1 || t.hero.headline1}
            <br />
            <span className="text-gradient-primary">{settings.heroHeadline2 || t.hero.headline2}</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 animate-slide-up animation-delay-200">
            {settings.heroSubheadline || t.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up animation-delay-400">
            <Button variant="hero" size="lg" asChild>
              <a href={primaryUrl} target="_blank" rel="noopener noreferrer">
                {settings.heroPrimaryBtnLabel || t.hero.bookAppointment}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={secondaryUrl} target="_blank" rel="noopener noreferrer">
                {settings.heroSecondaryBtnLabel || t.hero.freeDiagnosis}
              </a>
            </Button>
          </div>
        </div>

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
