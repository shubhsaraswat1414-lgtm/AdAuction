export default function BrandLogos() {
  const logos = [
    { name: "Google", style: "font-sans font-medium tracking-tight text-[22px]" },
    { name: "airbnb", style: "font-sans font-bold tracking-tighter text-[24px]" },
    { name: "Coca-Cola", style: "font-serif italic font-bold tracking-tight text-[22px]" },
    { name: "Spotify", style: "font-sans font-bold tracking-tight text-[22px]" },
    { name: "Microsoft", style: "font-sans font-semibold tracking-wide text-[20px]" },
    { name: "amazon", style: "font-sans font-bold tracking-tighter text-[22px]" },
    { name: "TikTok", style: "font-sans font-black tracking-tight text-[22px]" },
    { name: "Meta", style: "font-sans font-bold tracking-normal text-[22px]" },
  ];

  return (
    <div className="w-full border-t border-gray-100 bg-white py-6 sm:py-8 animate-in fade-in duration-1000 delay-500">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 sm:mb-10">
          Trusted by growing businesses worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`text-gray-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-gray-900 cursor-default opacity-60 hover:opacity-100 ${logo.style}`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
