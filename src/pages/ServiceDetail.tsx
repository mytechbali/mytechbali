import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/i18n/LanguageContext';
import { getServiceBySlug, servicesData } from '@/data/servicesData';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useEffect } from 'react';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-3xl font-bold text-foreground">Service not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const Icon = service.icon;
  const title = (t.services as Record<string, any>)[service.titleKey] || service.titleKey;
  const description = (t.services as Record<string, any>)[service.descKey] || '';
  const features: string[] = (t.services as Record<string, any>)[service.featuresKey] || [];

  const waMessage = encodeURIComponent(`Halo My Tech Bali, saya ingin bertanya tentang layanan ${title}.`);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-primary text-primary-foreground pt-16 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary-foreground/20 flex-shrink-0">
              <Icon className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mb-6">{description}</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+6285742630809">
                  <Button variant="secondary" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    +62 857-4263-0809
                  </Button>
                </a>
                <a href={`https://wa.me/6285742630809?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          {/* Overview + Features */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{service.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price list */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Price List (IDR)</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Prices below are estimates. Final pricing depends on device model, parts availability, and
              complexity of the issue. Free diagnosis for all devices.
            </p>
            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[55%]">Service</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.priceList.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-foreground">
                        {item.name}
                        {item.note && (
                          <span className="ml-2 inline-block text-xs text-accent font-semibold">
                            ({item.note})
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-foreground whitespace-nowrap">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 p-6 bg-gradient-primary rounded-2xl text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Need a custom quote?</h3>
              <p className="text-primary-foreground/90 mb-4">
                Contact us for a free diagnosis and a tailored estimate for your device.
              </p>
              <a href={`https://wa.me/6285742630809?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Request a Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Other Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => {
                const SIcon = s.icon;
                const sTitle = (t.services as Record<string, any>)[s.titleKey] || s.titleKey;
                return (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="group bg-card rounded-xl p-5 border border-border/50 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <SIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">{sTitle}</h3>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <LanguageSwitcher />
    </div>
  );
};

export default ServiceDetail;