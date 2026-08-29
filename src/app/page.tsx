/* eslint-disable react/no-unescaped-entities, jsx-a11y/alt-text */
import Image from 'next/image';
import Link from 'next/link';
import { getProfile, getProjects, getServices, getTestimonials } from '@/lib/api';
import ServicesCarousel from '@/components/ServicesCarousel';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default async function Home() {
  const profile = await getProfile();
  const projects = await getProjects();
  const services = await getServices();
  const testimonials = await getTestimonials();

  let marqueeItems = [
    '☀️ SUNFLOWER GIRLIE',
    '🖨️ PRINT NERD',
    '✦ BOLD BY DEFAULT',
    '☕ OAT LATTE ENTHUSIAST',
    '🎨 MAKES THINGS LOUD'
  ];
  if (profile?.marquee) {
    try { marqueeItems = JSON.parse(profile.marquee); } catch (e) { }
  }

  let aboutImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxHA1l9F_rUSAdbzVubC_lO3wNHzUu1d4gP6r2KDQV7GKeQ4_W1K2Yi0I0zhVyD7sotFNsbT7mr1x_hjNWMVoY1SOUkJD_pUBK18fEeaINXFAKrBnUvkurTTQFpon_j2xZhcktF4VuHd709RboABZBaP4QUEQdAil7WZ3IIhrmIH2GkRS1rqiqdXFVxuYGM3vqaLrw-nB30qAHCGnGjr3M6FoDwjF0itW52pGEtfWceQSVfMwnBuRR"
  ];
  if (profile?.about_image) {
    try {
      const parsed = JSON.parse(profile.about_image);
      if (Array.isArray(parsed) && parsed.length > 0) {
        aboutImages = parsed;
      } else if (typeof profile.about_image === 'string') {
        aboutImages = [profile.about_image];
      }
    } catch {
      if (typeof profile.about_image === 'string') {
        aboutImages = [profile.about_image];
      }
    }
  }

  return (
    <>
      <NavBar profile={profile} />

      {/* SECTION 1 - HERO */}
      <section
        className="relative md:sticky md:top-[84px] z-0 w-full min-h-[90svh] md:min-h-[auto] md:aspect-[2/1] overflow-hidden px-margin-mobile md:px-margin-desktop border-b-2 border-brand-black flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/sayee-home-bg.png')" }}
      >
        {/* Decorative Elements */}
        <svg
          className="absolute top-20 right-1/4 w-8 h-8 text-brand-blue animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
        </svg>
        <svg
          className="absolute bottom-40 right-20 w-6 h-6 text-brand-coral animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
        </svg>
        <svg
          className="absolute bottom-20 left-1/3 w-8 h-8 text-brand-coral animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
        </svg>
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-green-400 rounded-full"></div>
        <div className="absolute top-40 left-10 w-16 h-16 border-t-2 border-l-2 border-brand-coral rounded-tl-full opacity-60"></div>
        <div className="absolute bottom-10 right-40 w-24 h-12 border-b-2 border-r-2 border-brand-blue rounded-br-full opacity-60"></div>
        <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-gutter relative z-10 translate-y-0 md:-translate-y-[40px] pt-6 pb-8 md:py-0">
          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col justify-center items-start order-2 md:order-1 relative z-20 px-4 md:px-0">
            <div className="inline-flex items-center bg-brand-black rounded-full px-5 py-2 mb-6 md:mb-8 shadow-hard-sm">
              <span className={`w-3 h-3 rounded-full animate-pulse-slow mr-3 ${profile?.availability_status === 'working' ? 'bg-red-500' : 'bg-green-400'}`}></span>
              <span className="text-white text-sm font-bold tracking-wider uppercase">
                {profile?.availability_status === 'working' ? 'WORKING' : 'OPEN TO WORK'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[90px] font-display-xl font-black text-brand-black mb-2 uppercase leading-[0.9] tracking-tighter drop-shadow-md break-words hover:text-brand-yellow hover:drop-shadow-[6px_6px_0_rgba(26,26,26,1)] transition-all duration-300 hover:-translate-y-1 hover:rotate-1 cursor-crosshair">
              {profile?.display_name || '[NAME]'}
            </h1>
            <div className="relative mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwriting text-brand-black">
                Design that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 px-2">speaks.</span>
                  <span className="absolute inset-0 bg-brand-yellow -skew-x-12 transform scale-110 z-0"></span>
                </span>
              </h2>
            </div>
            <p className="text-body-md sm:text-body-lg font-body-lg text-brand-black/80 mb-8 md:mb-10 ml-0 md:ml-14 max-w-sm font-medium">
              {profile?.tagline || 'Bold design for brands that refuse to be boring.'}
            </p>
            <a
              className="inline-flex items-center justify-center bg-brand-black text-white rounded-lg px-8 py-4 font-bold text-lg hover:translate-y-1 transition-all duration-200 group shadow-[4px_4px_0px_0px_rgba(26,26,26,0.2)] hover:shadow-none"
              href="#contact"
            >
              Let's work together
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
          {/* Right Column: Imagery & Layers */}
          <div className="flex justify-center items-start md:items-center order-1 md:order-2 relative pt-2 pb-6 md:py-0 md:min-h-[500px]">
            {/* Sticky Note Doodle */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-10 md:-left-10 z-30 w-32 h-32 md:w-48 md:h-48 bg-brand-coral border-2 border-brand-black shadow-hard-sm p-3 md:p-4 rotate-[-6deg] transform transition-transform hover:rotate-0">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 md:w-12 h-4 md:h-6 bg-brand-black/80 rotate-3"></div>
              <div className="w-full h-full border-2 border-brand-black/20 rounded-md flex flex-col items-center justify-center p-1.5 md:p-2 relative">
                <span className="absolute top-0 -left-6 md:-left-10 font-handwriting text-green-500 text-sm md:text-2xl border border-green-500 rounded-full px-2 md:px-4 py-0.5 md:py-1 -rotate-12 bg-white/80 whitespace-nowrap z-10">
                  Ideas
                </span>
                <svg
                  className="w-12 h-12 md:w-20 md:h-20 text-brand-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18"
                  />
                </svg>
                <div className="flex space-x-1 mt-1 md:mt-2">
                  <span className="w-1 h-1.5 md:h-2 bg-brand-black rounded-full"></span>
                  <span className="w-1 h-1.5 md:h-2 bg-brand-black rounded-full"></span>
                  <span className="w-1 h-1.5 md:h-2 bg-brand-black rounded-full"></span>
                </div>
              </div>
            </div>
            {/* Hand-drawn list */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 font-handwriting text-lg md:text-xl text-brand-black space-y-1 md:space-y-2 transform -rotate-2 hidden md:block">
              <div className="flex items-center gap-2">
                Strategy{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_right_alt
                </span>
              </div>
              <div className="flex items-center gap-2">
                Design{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_right_alt
                </span>
              </div>
              <div className="flex items-center gap-2">
                Impact{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_right_alt
                </span>
              </div>
            </div>
            <div className="relative w-2/3 max-w-[280px] md:w-full md:max-w-lg aspect-square">
              {/* Large Image Blob */}
              <div className="w-full h-full border-[3px] border-brand-black hero-blob overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] z-10 relative">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  alt="Hero profile image"
                  src={profile?.hero_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5thwa93cesb0qwv6AoS405ld05e3cUd11ubtFuaYxBZHZHorIM5Ntu84dyvT5yZdmPukRhEVGGn6r3RswJjImf2zrqXKMIH0B6hOMhG9VyaX1x-sN6gLfOWDm7lXsVEqpDjvfUmn91Scq3lAkN6p92ypbeavt9Eo8NASJi_2v64JbI_s5WzTUu748_NdTPhKl4CBh2WzfmKny0fcxC-AWLFJANhW4DEo_Zhq_V7S2mKLK1BQ7Q-Z"}
                />
              </div>
              {/* Circle element behind image */}
              <div className="absolute top-10 -right-10 w-16 h-16 rounded-full border-2 border-brand-blue -z-10"></div>
              {/* Dots pattern */}
              <div
                className="absolute top-1/2 -right-8 w-20 h-40 opacity-40 z-0"
                style={{
                  backgroundImage:
                    "radial-gradient(#1a1a1a 2px, transparent 2px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2 - ABOUT */}
      <section
        className="relative md:sticky md:top-[84px] z-[1] pt-6 pb-16 md:py-stack-lg border-t-4 border-b-2 border-brand-black overflow-hidden bg-cover bg-[15%_center] md:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/sayee-about-bg.png')" }}
        id="about"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md items-center">
            <div className="relative flex justify-center group pt-1 pb-8 md:py-0">
              <div className="absolute -top-2 md:-top-6 right-4 md:-right-6 font-handwriting text-xl md:text-2xl text-brand-black -rotate-12 z-20 transition-transform group-hover:rotate-0">
                that's me ✦
              </div>
              <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[4/5] flex items-center justify-center mt-6 mb-6 md:mt-0 md:mb-0">
                {aboutImages.slice(1, 5).map((img, idx) => {
                  // Positions for up to 4 background collage images (closer, overlapping, authentic scrapbook feel)
                  const positions = [
                    "top-[-8%] left-[-12%] -rotate-[14deg] w-[45%] md:w-[60%] z-[1]",
                    "top-[8%] right-[-15%] rotate-[10deg] w-[40%] md:w-[55%] z-[2]",
                    "bottom-[-10%] left-[-5%] -rotate-[6deg] w-[50%] md:w-[70%] z-[3]",
                    "bottom-[-12%] right-[5%] rotate-[12deg] w-[45%] md:w-[60%] z-[1]",
                  ];
                  return (
                    <div key={idx} className={`absolute ${positions[idx]} border-[4px] md:border-[6px] border-white shadow-hard-sm md:shadow-hard-md bg-white transition-transform duration-500 hover:scale-[1.08] hover:z-20`}>
                      <Image fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover" alt="Collage image" src={img} />
                    </div>
                  );
                })}
                {/* Primary large image */}
                <div className="relative z-10 -rotate-3 border-[6px] md:border-8 border-white shadow-hard-md md:shadow-hard-lg bg-white w-[85%] md:w-[90%] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    alt="Candid about image"
                    src={aboutImages[0]}
                  />
                </div>
              </div>
            </div>
            <div 
              className="space-y-6 bg-[#FFFDF6] p-6 sm:p-8 border-4 border-brand-black shadow-hard-md rounded-2xl md:bg-transparent md:border-0 md:shadow-none md:p-0 md:bg-none relative z-10 mx-4 md:mx-0 rotate-[-1deg] md:rotate-0"
              style={{
                backgroundImage: "radial-gradient(rgba(26,26,26,0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px"
              }}
            >
              {/* Tape Accent */}
              <div className="absolute -top-4 left-6 w-16 h-6 bg-[#C8E6C9]/90 border-2 border-brand-black rotate-[-6deg] z-20 md:hidden"></div>
              
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-brand-coral text-white border-2 border-brand-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider rotate-6 shadow-hard-sm z-20 md:hidden">
                BIO ✦
              </div>

              <h2 className="text-3xl md:text-headline-lg font-headline-lg text-brand-black leading-none">
                Hey, I'm {(profile?.display_name || '[Name]').split(' ')[0]}{" "}
                <span className="inline-block animate-wave">👋</span>
              </h2>
              <div className="space-y-4 text-body-md md:text-body-lg font-body-lg text-brand-black/90 max-w-lg font-medium leading-relaxed">
                <p className="whitespace-pre-wrap">
                  {profile?.bio || "I'm a multidisciplinary designer who believes boring is a cardinal sin. I build loud, personality-driven identities for brands that want to be remembered.\n\nWhen I'm not pushing pixels or arguing about kerning, I'm probably drinking an oat latte or obsessing over vintage print ephemera."}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  className="inline-block bg-brand-yellow text-brand-black border-2 border-brand-black px-5 py-2.5 font-bold text-sm uppercase tracking-wider hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] transition-all -rotate-1"
                  href="/about"
                >
                  More about me →
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Ticker - positioned at bottom on mobile, crossed center on desktop */}
        <div className="absolute bottom-6 md:bottom-auto md:top-1/2 left-0 md:left-1/3 translate-y-0 md:-translate-x-1/5 md:-translate-y-1/2 rotate-[-5deg] md:rotate-[-15deg] w-[150vw] md:w-[200vw] bg-brand-black py-3 border-y-2 border-brand-black ticker-container flex items-center overflow-hidden z-[5] opacity-90 shadow-hard-md pointer-events-none">
          <div className="ticker-content animate-ticker font-headline-md text-brand-yellow text-sm md:text-xl tracking-widest uppercase flex gap-8 whitespace-nowrap items-center">
            {marqueeItems.map((item, i) => (
              <span key={`t1-${i}`}>{item}</span>
            )).reduce((acc, curr, idx) => {
              if (idx === 0) return [curr];
              return [...acc, <span key={`sep-${idx}`}>✦</span>, curr];
            }, [] as any[])}
            <span className="">·</span>
            <span className="">✦</span>
          </div>
        </div>
      </section>
      {/* SECTION 3 - FEATURED WORK */}
      <section
        className="relative md:sticky md:top-[84px] z-[2] w-full bg-cover bg-center bg-no-repeat border-t-4 border-b-2 border-brand-black pb-16"
        style={{ backgroundImage: "url('/sayee-projects-bg.png')" }}
        id="work"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 md:pt-12">
          <ProjectsCarousel projects={projects} />
        </div>
      </section>
      {/* SECTION 4 - SERVICES */}
      <section
        className="relative md:sticky md:top-[84px] z-[3] w-full bg-cover bg-center bg-no-repeat border-t-4 border-b-2 border-brand-black relative pb-28 pt-12"
        style={{ backgroundImage: "url('/sayee-services-bg.png')" }}
        id="services"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center mb-4">
            <div className="inline-block bg-white/95 backdrop-blur-sm p-4 px-6 md:px-8 border-4 border-brand-black shadow-hard-md rotate-1 relative mx-4">
              {/* Tape accent */}
              <div className="absolute -top-3 right-4 w-12 h-6 bg-brand-coral/80 border-2 border-brand-black rotate-6"></div>
              <span className="font-handwriting text-brand-blue text-xl md:text-2xl block mb-1">
                what I do
              </span>
              <h2 className="text-3xl md:text-headline-lg font-headline-lg text-brand-black leading-none">
                How I Can Help
              </h2>
            </div>
          </div>
          <ServicesCarousel services={services} />
        </div>
      </section>

      {/* SECTION 6 - CONTACT CTA */}
      <section
        className="relative md:sticky md:top-[84px] z-[5] w-full min-h-[90svh] md:min-h-0 md:aspect-[1672/941] bg-cover bg-center bg-no-repeat border-t-4 border-b-2 border-brand-black text-center overflow-hidden flex flex-col justify-center"
        style={{ backgroundImage: "url('/sayee-connect-bg.JPG')" }}
        id="contact"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
        <div className="max-w-3xl mx-auto px-margin-mobile relative z-10 w-full flex flex-col items-center">
          <div className="inline-block bg-white/95 backdrop-blur-sm p-8 md:p-12 border-4 border-brand-black shadow-hard-xl -rotate-2 relative mb-10">
             {/* Tape accent */}
            <div className="absolute -top-4 right-10 w-16 h-6 bg-brand-coral/80 border-2 border-brand-black rotate-12 z-10"></div>
            <div className="absolute -bottom-4 left-10 w-12 h-6 bg-brand-yellow/80 border-2 border-brand-black -rotate-12 z-10"></div>
            
            <h2 className="text-4xl md:text-[56px] leading-tight font-display-xl text-brand-black tracking-tight">
              Let's make something loud together.
            </h2>
          </div>

          <a
            className="inline-flex items-center justify-center bg-brand-black text-white border-4 border-white px-12 py-5 font-bold text-xl shadow-hard-lg hover:shadow-none hover:translate-y-2 transition-all duration-300 group mb-8 rotate-2"
            href={`mailto:${profile?.email || 'hello@example.com'}`}
          >
            Get in touch
            <span className="material-symbols-outlined ml-3 group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </a>

          <div className="inline-block bg-white/90 border-4 border-brand-black px-6 py-2 rotate-[-4deg] shadow-hard-sm">
            <p className="font-handwriting text-brand-coral text-2xl font-bold">
              I don't bite, I promise ✦
            </p>
          </div>
        </div>
      </section>
      <Footer profile={profile} />
    </>
  );
}
