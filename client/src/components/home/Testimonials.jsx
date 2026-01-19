import React from "react";

const Testimonials = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      date: "April 20, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
      date: "June 5, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-medium">{card.name}</p>
            <svg
              className="mt-0.5"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="#2196F3"
            >
              <path d="M4.555.72a4 4 0 0 1-.297.24..." />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-800">
        Radiant made undercutting all of our competitors an absolute breeze.
      </p>

      <div className="flex justify-between text-xs text-slate-500">
        <span>Posted on X</span>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="bg-violet-50 py-24 scroll-mt-24">
      <div className="w-full max-w-[900px] h-[3px] mt-12 bg-linear-to-r from-white/10 via-violet-500 to-white/10"></div>
      <h1 className="mt-5 text-3xl font-semibold text-center mx-auto">
        Trusted by Job Seekers Worldwide
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        See how our resume builder helped users land interviews and advance
        their careers.
      </p>
      <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>

      {/* ROW 1 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-violet-50 to-transparent"></div>

        <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 bg-gradient-to-l from-violet-50 to-transparent"></div>
      </div>

      {/* ROW 2 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-violet-50 to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 bg-gradient-to-l from-violet-50 to-transparent"></div>
      </div>
    </section>
  );
};

export default Testimonials;
