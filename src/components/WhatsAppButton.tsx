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
      <svg viewBox="0 0 32 32" className="w-9 h-9 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.335 22.594c-.39 1.1-1.932 2.014-3.18 2.28-.852.18-1.964.324-5.71-1.228-4.796-1.986-7.882-6.852-8.12-7.17-.228-.318-1.918-2.554-1.918-4.872 0-2.318 1.214-3.458 1.644-3.932.39-.432.912-.594 1.188-.594.144 0 .288.006.414.012.432.018.648.042 .932.72.354.846 1.218 2.916 1.326 3.126.108.21.216.504.066.798-.138.3-.258.486-.468.744-.21.258-.432.456-.642.738-.192.24-.408.498-.168.93.24.432 1.068 1.764 2.292 2.856 1.578 1.404 2.91 1.842 3.324 2.04.414.198.654.168.894-.102.252-.27 1.068-1.242 1.35-1.668.276-.432.558-.36.936-.216.384.144 2.442 1.152 2.862 1.362.42.21.702.318.804.492.108.174.108 1.008-.282 2.108z"/>
      </svg>
      <span className="absolute right-full mr-3 bg-card text-card-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
