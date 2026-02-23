const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9" fill="white">
    <path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.68 6.3L3.2 28.8l6.93-1.82a12.56 12.56 0 006.874 1.62h.006c6.95 0 12.6-5.65 12.6-12.6a12.52 12.52 0 00-3.69-8.91A12.52 12.52 0 0016.004 3.2zm0 23.08h-.004a10.44 10.44 0 01-5.32-1.46l-.38-.23-3.96 1.04 1.06-3.86-.25-.39a10.42 10.42 0 01-1.6-5.56c0-5.77 4.7-10.47 10.48-10.47a10.41 10.41 0 017.41 3.07 10.41 10.41 0 013.07 7.41c0 5.78-4.7 10.48-10.47 10.48zm5.74-7.84c-.31-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16s-.82 1.03-1 1.24c-.19.21-.37.24-.69.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.19-.31-.02-.48.14-.64.14-.14.31-.37.47-.56.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.87-.77 2.13-1.51.26-.74.26-1.37.19-1.51-.08-.13-.29-.21-.61-.37z"/>
  </svg>
);

const WhatsAppButton = () => {
  const phoneNumber = '6285742630809';
  const message = encodeURIComponent('Halo, saya ingin bertanya tentang layanan service komputer.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
      <span className="absolute right-full mr-3 bg-card text-card-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
