/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
import { Metadata } from 'next';
import { getProjects } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find(p => p.slug === slug);
  
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Sayee Kinjavdekar`,
    description: project.description || `View the ${project.title} project by Sayee Kinjavdekar.`,
    openGraph: {
      title: `${project.title} | Sayee Kinjavdekar`,
      description: project.description || `View the ${project.title} project by Sayee Kinjavdekar.`,
      images: [project.cover_image || "/sayee-home-bg.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Sayee Kinjavdekar`,
      description: project.description || `View the ${project.title} project by Sayee Kinjavdekar.`,
      images: [project.cover_image || "/sayee-home-bg.png"],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find(p => p.slug === slug);

  return (
    <>

      {/* Project Header */}
      <header className="bg-[#F5F0E8] pt-[64px] pb-stack-lg px-margin-mobile md:px-margin-desktop w-full border-b-2 border-on-background">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-md relative">
          {/* Decorative Sticker */}
          <div className="absolute -top-10 right-10 md:right-32 text-secondary rotate-12">
            <svg
              fill="currentColor"
              height="64"
              viewBox="0 0 64 64"
              width="64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 0L37.8924 24.1076L62 30L37.8924 35.8924L32 60L26.1076 35.8924L2 30L26.1076 24.1076L32 0Z" />
            </svg>
          </div>
          <a
            className="font-body-md text-body-md text-[#6B6560] hover:underline flex items-center gap-2 w-fit"
            href="#"
          >
            <span className="material-symbols-outlined">arrow_left_alt</span>
            Back to Projects
          </a>
          <div className="flex flex-col gap-stack-sm items-start">
            <div className="bg-primary-container text-on-background px-4 py-1 border-2 border-on-background rounded-full font-body-md text-body-md font-bold uppercase tracking-wider inline-block shadow-[2px_2px_0px_0px_rgba(31,27,16,1)]">
              Carousel
            </div>
            <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background max-w-4xl">
              Bloom Studio — Brand Kit
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Client: Bloom Studio · 2026
            </p>
          </div>
        </div>
      </header>
      {/* Image Gallery */}
      <section className="bg-[#1A1A1A] w-full py-stack-md px-margin-mobile md:px-margin-desktop border-b-2 border-on-background">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-sm">
          {/* Hero Image */}
          <div className="w-full h-[400px] md:h-[600px] rounded-lg border-2 border-on-background overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(255,214,0,1)]">
            <img
              className="w-full h-full object-cover"
              data-alt="A striking digital presentation of a vibrant brand identity kit for 'Bloom Studio'. The scene features bold, colorful typography, geometric shapes, and abstract floral motifs spread across multiple screens and print materials. High-contrast yellow and deep black tones dominate the palette, set against a sleek dark studio background with dramatic spotlighting. The aesthetic is loud, energetic, and maximalist, embodying a premium yet eccentric creative agency vibe."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM910cG1bRQeipWeoywGq55l4DSe9Dz1GfQT6OBdwO1ixGtAf-5Ep9FqFlO4VaQtl6U9LHR7-GFXehTedQUL6dH6YR_WlFIig2GBH-SDATEWkFourKamKycXYKFtPlsVNb-Exa-oCD6SCrQ2k7JELDJI6hYIa34UjvSuZcS4mTwaA2lhoE1-0MARnF-DKeNJ8PuOQGkHUj87F4BTx5HCHPDaqCzBP8UDJ-mQaw1b_RbBZ0J3t1L4HH"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
            <div className="w-[160px] h-[120px] rounded-lg border-2 border-primary-container flex-shrink-0 overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(255,214,0,1)] cursor-pointer hover:scale-105 transition-transform">
              <img
                className="w-full h-full object-cover"
                data-alt="Close up detail of a dynamic logo design for Bloom Studio, featuring bright yellow and bold black graphic elements on a dark textured background. The aesthetic is controlled maximalism, highlighting sharp typography and energetic composition."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWx8h4TOILqGCYUzFR97knwrhxTSoeTOytaqEd6ejrR36ELihn6_HYjftVu5WGRXY2d8xxpmiHfeoO9f8fWG3J1Wd-RqMq1ti_-vHfEyISe27O8syVYZPg9rZVqzjuGuzgeH_nHMTGkqA2VpeFYaxfWA3qipE4hjoJBczy1y0woXLaV_p5_RP7w3ilba_sl2u_n3NGgC5DM2GKrMPVrDbPvR9JG0EAiUsPYNsoOeWXbl11pZw8aGCD"
              />
            </div>
            <div className="w-[160px] h-[120px] rounded-lg border-2 border-on-background flex-shrink-0 overflow-hidden relative opacity-70 hover:opacity-100 hover:scale-105 transition-all cursor-pointer">
              <img
                className="w-full h-full object-cover"
                data-alt="A mockup of stationary for Bloom Studio, displaying a loud and colorful business card and letterhead. The design utilizes a fluid grid with overlapping bold yellow shapes and striking black text. The lighting is crisp studio lighting creating soft highlights on the paper texture."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJVMyQFToP38Ew49pviPH24Ie-zi3I5PkhqINfOkWaMv1ScTEp0YBhSrdrBPM8KV8eghAwvsLJgaO1tvipYuIuiNYnzuhRP5bukFy3W82ZgPPixUoEg7pkOoYybM1IkFMY6RyuplI7bzv_vPryLx63aboSj08GluNN-7aVoSiYXiQa5EbqN-4HDPYh4YbSW5Ww0EFNH1YVIenXTHQkTnRNqvoHorIAW7x1TxCrtr6LqdDuCFI05Qn6"
              />
            </div>
            <div className="w-[160px] h-[120px] rounded-lg border-2 border-on-background flex-shrink-0 overflow-hidden relative opacity-70 hover:opacity-100 hover:scale-105 transition-all cursor-pointer">
              <img
                className="w-full h-full object-cover"
                data-alt="A digital screen showcasing the mobile website design for Bloom Studio. The interface is high-contrast, featuring deep black backgrounds with vibrant yellow buttons and bold typography. Abstract sticker-like vector shapes overlap the content, adding a layer of tactile, creative energy."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmtMjvuDh3LfEDq-29MkwGrXLSCvOMXv2I7eGCWSGTUfBWvfEKXUnxbkg2TXTVH_uYkYf1JMEgClja-ofAXF2ZPUaA2JNopodRU7sTP_wjSH_uYcCGNCPpohzEI7kwBa3tjO9STwKwJUzihmxQERaPb33Fn4MiyfeGhdVYp_N-0XwTLmYhTmBDZfJyoEp61l4ZS-VgmEujzmWqhM9RdD13bgoTruV5IuVxw_Ju80SIqI2ChdKHSAHZ"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Project Info */}
      <section className="bg-[#FFFBF0] w-full py-stack-lg px-margin-mobile md:px-margin-desktop border-b-2 border-on-background">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Left Column */}
          <div className="md:col-span-8 flex flex-col gap-stack-sm relative">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              About this project
            </h2>
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
              <p>
                Bloom Studio approached us to completely overhaul their visual
                identity. They needed something that felt inherently loud and
                unapologetic, yet structured enough to work across complex
                digital products and physical merchandise.
              </p>
              <p>
                Our approach leaned heavily into a "Controlled Maximalist"
                aesthetic. We developed a robust fluid grid system that allowed
                their vibrant primary colors to clash beautifully without
                breaking the usability of their core platforms. The inclusion of
                tactile 'sticker' elements provided a playful, physical feel to
                their otherwise sterile digital presence.
              </p>
              <p>
                The final deliverable included a comprehensive brand guidelines
                document, digital asset libraries, and motion templates designed
                to maintain consistency while encouraging creative expression
                within their internal teams.
              </p>
            </div>
          </div>
          {/* Right Column (Info Card) */}
          <div className="md:col-span-4 mt-8 md:mt-0">
            <div className="bg-[#F5F0E8] rounded-xl border-2 border-on-background shadow-[8px_8px_0px_0px_rgba(31,27,16,1)] p-[28px] flex flex-col gap-6 relative overflow-hidden">
              {/* Decorative Squiggle */}
              <div className="absolute -bottom-4 -right-4 text-tertiary opacity-20 w-32 h-32">
                <svg
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 50 Q 25 10, 40 50 T 70 50 T 100 50"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
              </div>
              <div className="border-b border-outline pb-4">
                <h3 className="font-body-md text-body-md text-on-surface-variant mb-1 uppercase tracking-widest text-sm">
                  Client
                </h3>
                <p className="font-headline-md text-headline-md text-on-background">
                  Bloom Studio
                </p>
              </div>
              <div className="border-b border-outline pb-4">
                <h3 className="font-body-md text-body-md text-on-surface-variant mb-1 uppercase tracking-widest text-sm">
                  Category
                </h3>
                <p className="font-headline-md text-headline-md text-on-background">
                  Brand Identity
                </p>
              </div>
              <div className="border-b border-outline pb-4">
                <h3 className="font-body-md text-body-md text-on-surface-variant mb-1 uppercase tracking-widest text-sm">
                  Year
                </h3>
                <p className="font-headline-md text-headline-md text-on-background">
                  2026
                </p>
              </div>
              <div>
                <h3 className="font-body-md text-body-md text-on-surface-variant mb-3 uppercase tracking-widest text-sm">
                  Deliverables
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border-2 border-on-background rounded-full font-body-md text-sm text-on-background bg-transparent hover:bg-primary-container transition-colors cursor-default">
                    Logo Design
                  </span>
                  <span className="px-3 py-1 border-2 border-on-background rounded-full font-body-md text-sm text-on-background bg-transparent hover:bg-primary-container transition-colors cursor-default">
                    Typography
                  </span>
                  <span className="px-3 py-1 border-2 border-on-background rounded-full font-body-md text-sm text-on-background bg-transparent hover:bg-primary-container transition-colors cursor-default">
                    Motion Assets
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Footer */}
      <section className="w-full flex flex-col md:flex-row border-b-2 border-on-background">
        <a
          className="flex-1 bg-[#F5F0E8] hover:bg-[#FFD600] transition-colors duration-300 py-stack-md px-margin-mobile md:px-margin-desktop border-b-2 md:border-b-0 md:border-r-2 border-on-background flex flex-col items-start justify-center group"
          href="#"
        >
          <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-background flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined">arrow_left_alt</span>
            Previous Project
          </span>
          <h3 className="font-headline-md text-headline-md text-on-background group-hover:translate-x-2 transition-transform">
            Echo Tech Refresh
          </h3>
        </a>
        <a
          className="flex-1 bg-[#F5F0E8] hover:bg-[#FFD600] transition-colors duration-300 py-stack-md px-margin-mobile md:px-margin-desktop flex flex-col items-end justify-center group text-right"
          href="#"
        >
          <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-background flex items-center gap-2 mb-2">
            Next Project
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </span>
          <h3 className="font-headline-md text-headline-md text-on-background group-hover:-translate-x-2 transition-transform">
            Nova App Design
          </h3>
        </a>
      </section>
      {/* CTA Strip */}
      <section className="bg-primary-container w-full py-stack-lg px-margin-mobile md:px-margin-desktop border-b-2 border-on-background overflow-hidden relative">
        {/* Animated background pattern simulation */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#1f1b10 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-stack-md relative z-10">
          <h2 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background max-w-3xl leading-tight">
            Let's make something loud together.
          </h2>
          <button className="bg-on-background text-surface flex items-center gap-2 px-8 py-4 font-headline-md text-headline-md border-2 border-on-background shadow-[8px_8px_0px_0px_rgba(255,91,91,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,91,91,1)] active:translate-y-2 active:shadow-none transition-all flex-shrink-0">
            Get in touch
            <span className="material-symbols-outlined">arrow_outward</span>
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-secondary dark:bg-on-secondary-fixed-variant border-t-4 border-on-background flex flex-col gap-stack-md px-margin-mobile md:px-margin-desktop py-stack-lg w-full mt-auto">
        <div className="font-headline-lg text-headline-lg-mobile font-black text-surface dark:text-surface-bright">
          STUDIO_LOUD
        </div>
        <ul className="flex flex-col md:flex-row gap-4 font-body-lg text-body-lg">
          <li className="text-on-secondary dark:text-on-secondary-fixed opacity-80 hover:opacity-100 hover:scale-105 transition-transform cursor-pointer">
            Instagram
          </li>
          <li className="text-on-secondary dark:text-on-secondary-fixed opacity-80 hover:opacity-100 hover:scale-105 transition-transform cursor-pointer">
            Dribbble
          </li>
          <li className="text-on-secondary dark:text-on-secondary-fixed opacity-80 hover:opacity-100 hover:scale-105 transition-transform cursor-pointer">
            LinkedIn
          </li>
        </ul>
        <div className="font-body-lg text-body-lg text-on-secondary dark:text-on-secondary-fixed opacity-80 mt-stack-md">
          © 2024 STUDIO_LOUD. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}
