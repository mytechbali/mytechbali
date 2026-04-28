import { Monitor, Laptop, HardDrive, Cpu, Shield, Wifi, Server, Smartphone, LucideIcon } from 'lucide-react';

export interface ServicePriceItem {
  name: string;
  price: string; // IDR formatted
  note?: string;
}

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  titleKey: keyof typeof titlePlaceholder;
  descKey: string;
  featuresKey: string;
  heroImage?: string;
  overview: string;
  priceList: ServicePriceItem[];
}

// Placeholder to keep TS happy — translations are pulled at runtime via t.services[key]
const titlePlaceholder = {
  laptopRepair: '', desktopRepair: '', dataRecovery: '', virusRemoval: '',
  hardwareUpgrade: '', networkSetup: '', serverMaintenance: '', softwareInstallation: '',
};

const idr = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

export const servicesData: ServiceDetail[] = [
  {
    slug: 'laptop-repair',
    icon: Laptop,
    titleKey: 'laptopRepair',
    descKey: 'laptopRepairDesc',
    featuresKey: 'laptopFeatures',
    overview: 'Professional laptop repair for all major brands — Asus, Acer, Lenovo, HP, Dell, MSI, Apple MacBook. Free diagnosis, genuine parts, and 90-day service warranty.',
    priceList: [
      { name: 'Diagnosis & Inspection', price: idr(0), note: 'Free' },
      { name: 'LCD / LED Screen Replacement 14"', price: `${idr(850000)} – ${idr(1800000)}` },
      { name: 'LCD / LED Screen Replacement 15.6"', price: `${idr(950000)} – ${idr(2200000)}` },
      { name: 'Keyboard Replacement', price: `${idr(350000)} – ${idr(950000)}` },
      { name: 'Battery Replacement (Original)', price: `${idr(550000)} – ${idr(1500000)}` },
      { name: 'Charger / Adapter', price: `${idr(250000)} – ${idr(650000)}` },
      { name: 'Hinge Repair', price: `${idr(350000)} – ${idr(750000)}` },
      { name: 'Liquid Damage Cleaning', price: `${idr(450000)} – ${idr(1200000)}` },
      { name: 'Thermal Paste & Fan Cleaning', price: idr(250000) },
      { name: 'MacBook Service (Starting)', price: idr(750000) },
    ],
  },
  {
    slug: 'desktop-repair',
    icon: Monitor,
    titleKey: 'desktopRepair',
    descKey: 'desktopRepairDesc',
    featuresKey: 'desktopFeatures',
    overview: 'Complete desktop PC diagnosis and repair — from home builds to gaming rigs and workstations.',
    priceList: [
      { name: 'Full PC Diagnosis', price: idr(0), note: 'Free' },
      { name: 'Power Supply (PSU) Replacement 500W', price: `${idr(650000)} – ${idr(1200000)}` },
      { name: 'Power Supply (PSU) Replacement 750W', price: `${idr(1200000)} – ${idr(2500000)}` },
      { name: 'Motherboard Repair (Component Level)', price: `${idr(550000)} – ${idr(1800000)}` },
      { name: 'Motherboard Replacement', price: 'From ' + idr(1500000) },
      { name: 'Full PC Cleaning & Reassembly', price: idr(300000) },
      { name: 'Cable Management & Build', price: idr(450000) },
      { name: 'Custom Gaming PC Build Service', price: 'From ' + idr(750000) },
    ],
  },
  {
    slug: 'data-recovery',
    icon: HardDrive,
    titleKey: 'dataRecovery',
    descKey: 'dataRecoveryDesc',
    featuresKey: 'dataRecoveryFeatures',
    overview: 'Safe, confidential data recovery from damaged HDDs, SSDs, USB flash, SD cards, and RAID arrays. No data, no charge policy.',
    priceList: [
      { name: 'Logical Recovery (Deleted / Formatted)', price: `${idr(500000)} – ${idr(1500000)}` },
      { name: 'HDD Bad Sector Recovery', price: `${idr(850000)} – ${idr(2500000)}` },
      { name: 'SSD Firmware / Controller Recovery', price: `${idr(1500000)} – ${idr(4500000)}` },
      { name: 'USB / SD Card Recovery', price: `${idr(400000)} – ${idr(1200000)}` },
      { name: 'RAID 0 / 1 / 5 Recovery', price: 'From ' + idr(3500000) },
      { name: 'Physical Head Swap (Cleanroom)', price: 'From ' + idr(5000000) },
    ],
  },
  {
    slug: 'virus-removal',
    icon: Shield,
    titleKey: 'virusRemoval',
    descKey: 'virusRemovalDesc',
    featuresKey: 'virusFeatures',
    overview: 'Complete malware, ransomware, and spyware removal with ongoing security hardening.',
    priceList: [
      { name: 'Virus & Malware Scan + Removal', price: idr(250000) },
      { name: 'Ransomware Cleanup', price: `${idr(650000)} – ${idr(1500000)}` },
      { name: 'Antivirus Installation (Licensed 1 Year)', price: `${idr(350000)} – ${idr(750000)}` },
      { name: 'Browser Hijack / Adware Cleanup', price: idr(200000) },
      { name: 'Full Security Hardening', price: idr(450000) },
    ],
  },
  {
    slug: 'hardware-upgrade',
    icon: Cpu,
    titleKey: 'hardwareUpgrade',
    descKey: 'hardwareUpgradeDesc',
    featuresKey: 'hardwareFeatures',
    overview: 'Boost performance with RAM, SSD, and GPU upgrades using genuine parts with warranty.',
    priceList: [
      { name: 'RAM Upgrade 8GB DDR4', price: 'From ' + idr(450000) },
      { name: 'RAM Upgrade 16GB DDR4', price: 'From ' + idr(850000) },
      { name: 'RAM Upgrade 16GB DDR5', price: 'From ' + idr(1200000) },
      { name: 'SSD SATA 512GB + Installation', price: 'From ' + idr(850000) },
      { name: 'SSD NVMe 512GB + Installation', price: 'From ' + idr(1100000) },
      { name: 'SSD NVMe 1TB + Installation', price: 'From ' + idr(1800000) },
      { name: 'GPU Upgrade (Mid-range)', price: 'From ' + idr(4500000) },
      { name: 'Cloning from HDD to SSD', price: idr(250000) },
    ],
  },
  {
    slug: 'network-setup',
    icon: Wifi,
    titleKey: 'networkSetup',
    descKey: 'networkSetupDesc',
    featuresKey: 'networkFeatures',
    overview: 'Home and office network installation, WiFi mesh, cabling, and security.',
    priceList: [
      { name: 'Home WiFi Setup & Configuration', price: `${idr(350000)} – ${idr(750000)}` },
      { name: 'Mesh WiFi Installation (up to 3 nodes)', price: 'From ' + idr(1500000) },
      { name: 'Router / Access Point Configuration', price: idr(350000) },
      { name: 'Network Cable Installation (per point)', price: `${idr(150000)} – ${idr(300000)}` },
      { name: 'Office LAN Setup (up to 10 devices)', price: 'From ' + idr(2500000) },
      { name: 'Firewall & VPN Configuration', price: 'From ' + idr(1200000) },
    ],
  },
  {
    slug: 'server-maintenance',
    icon: Server,
    titleKey: 'serverMaintenance',
    descKey: 'serverMaintenanceDesc',
    featuresKey: 'serverFeatures',
    overview: 'Business-grade server setup, backup solutions, and 24/7 monitoring for SMBs and hospitality.',
    priceList: [
      { name: 'Server Installation & Configuration', price: 'From ' + idr(3500000) },
      { name: 'Monthly Maintenance (Small Business)', price: idr(1500000) + ' / month' },
      { name: 'Monthly Maintenance (Medium Business)', price: idr(3500000) + ' / month' },
      { name: 'Backup Solution Setup (NAS)', price: 'From ' + idr(2500000) },
      { name: 'Cloud Backup Configuration', price: 'From ' + idr(1500000) },
      { name: '24/7 Monitoring Service', price: idr(2000000) + ' / month' },
    ],
  },
  {
    slug: 'software-installation',
    icon: Smartphone,
    titleKey: 'softwareInstallation',
    descKey: 'softwareInstallationDesc',
    featuresKey: 'softwareFeatures',
    overview: 'Operating system installation, driver updates, and software configuration for Windows and macOS.',
    priceList: [
      { name: 'Windows 10 / 11 Installation + Drivers', price: idr(250000) },
      { name: 'macOS Reinstall & Setup', price: idr(450000) },
      { name: 'Microsoft Office Installation', price: `${idr(150000)} – ${idr(850000)}` },
      { name: 'Adobe Creative Cloud Setup', price: idr(350000) },
      { name: 'Full Software Bundle (Office + Utilities)', price: idr(650000) },
      { name: 'Data Migration from Old PC', price: idr(350000) },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesData.find((s) => s.slug === slug);