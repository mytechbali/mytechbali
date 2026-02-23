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
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.052 9.38L1.056 31.2l6.012-1.964C9.622 30.916 12.7 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.342 22.616c-.392 1.1-1.932 2.012-3.172 2.28-.848.18-1.956.324-5.684-1.22-4.772-1.976-7.836-6.82-8.072-7.136-.228-.316-1.9-2.528-1.9-4.824s1.2-3.424 1.628-3.892c.428-.468.932-.584 1.244-.584.312 0 .624.004.896.016.288.012.676-.108 1.056.808.392.94 1.332 3.236 1.448 3.472.116.236.192.508.036.824-.148.316-.228.512-.46.788-.228.28-.484.624-.688.836-.228.24-.468.496-.2.972.268.476 1.188 1.96 2.552 3.176 1.756 1.564 3.236 2.048 3.696 2.276.46.228.728.192.996-.116.276-.316 1.176-1.372 1.488-1.84.312-.468.624-.392 1.056-.236.432.156 2.724 1.284 3.188 1.52.46.236.768.352.884.548.116.2.116 1.12-.276 2.22z" />
      </svg>
      <span className="absolute right-full mr-3 bg-card text-card-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
