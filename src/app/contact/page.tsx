/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
import { getProfile } from '@/lib/api';

export default async function Page() {
  const profile = await getProfile();
  const contactEmail = profile?.email || 'hello@studiochaos.com';

  return (
    <>

      <main>
        {/* HERO AREA */}
        <section className="min-h-[921px] bg-primary-container flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop py-stack-lg relative overflow-hidden">
          {/* Decorative Stickers */}
          <span className="material-symbols-outlined absolute top-1/4 left-1/4 text-6xl opacity-20 -rotate-12 animate-pulse">
            star
          </span>
          <span className="material-symbols-outlined absolute bottom-1/4 right-1/4 text-8xl opacity-20 rotate-45">
            explosion
          </span>
          <div className="max-w-4xl relative z-10 flex flex-col items-center gap-6">
            <span className="font-caveat text-2xl text-on-surface -rotate-3 inline-block">
              don't be a stranger ✦
            </span>
            <h1 className="font-display-xl-mobile md:font-display-xl text-on-surface uppercase leading-none">
              Let's make something loud together.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface/70 max-w-2xl mt-4">
              Whether it's a quick question or a full project, I'd love to hear
              from you.
            </p>
            <div className="mt-stack-md flex flex-col items-center">
              <a
                className="font-headline-lg text-headline-lg text-on-surface border-b-4 border-on-surface pb-1 hover:bg-on-surface hover:text-primary-container hover:px-6 hover:rounded-full transition-all duration-300"
                href={`mailto:${contactEmail}`}
              >
                <span className="material-symbols-outlined inline-block align-middle mr-2 text-4xl">
                  mail
                </span>
                {contactEmail}
              </a>
              <span className="font-caveat text-xl text-on-surface mt-4 inline-block">
                or find me on ↓
              </span>
            </div>
          </div>
        </section>
        {/* SOCIAL LINKS SECTION */}
        <section className="bg-on-surface w-full py-stack-lg px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-primary-container text-center mb-stack-md uppercase">
              Find Me Here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto">
              {/* Instagram */}
              <a
                className="group bg-on-surface border-2 border-[#333333] rounded-xl p-8 flex items-center gap-6 hover:border-primary-container hover:-translate-y-2 transition-all duration-300"
                href="#"
              >
                <div className="w-16 h-16 rounded-full bg-[#333333] group-hover:bg-primary-container flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-4xl text-white group-hover:text-on-surface">
                    photo_camera
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-container transition-colors">
                    Instagram
                  </h3>
                  <p className="font-body-md text-[#6B6560]">@studio_chaos</p>
                </div>
              </a>
              {/* Behance */}
              <a
                className="group bg-on-surface border-2 border-[#333333] rounded-xl p-8 flex items-center gap-6 hover:border-primary-container hover:-translate-y-2 transition-all duration-300"
                href="#"
              >
                <div className="w-16 h-16 rounded-full bg-[#333333] group-hover:bg-primary-container flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-4xl text-white group-hover:text-on-surface">
                    palette
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-container transition-colors">
                    Behance
                  </h3>
                  <p className="font-body-md text-[#6B6560]">
                    behance.net/studiochaos
                  </p>
                </div>
              </a>
              {/* LinkedIn */}
              <a
                className="group bg-on-surface border-2 border-[#333333] rounded-xl p-8 flex items-center gap-6 hover:border-primary-container hover:-translate-y-2 transition-all duration-300"
                href="#"
              >
                <div className="w-16 h-16 rounded-full bg-[#333333] group-hover:bg-primary-container flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-4xl text-white group-hover:text-on-surface">
                    work
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-container transition-colors">
                    LinkedIn
                  </h3>
                  <p className="font-body-md text-[#6B6560]">
                    linkedin.com/in/studiochaos
                  </p>
                </div>
              </a>
              {/* Dribbble */}
              <a
                className="group bg-on-surface border-2 border-[#333333] rounded-xl p-8 flex items-center gap-6 hover:border-primary-container hover:-translate-y-2 transition-all duration-300"
                href="#"
              >
                <div className="w-16 h-16 rounded-full bg-[#333333] group-hover:bg-primary-container flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-4xl text-white group-hover:text-on-surface">
                    sports_basketball
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-container transition-colors">
                    Dribbble
                  </h3>
                  <p className="font-body-md text-[#6B6560]">@studiochaos</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-on-surface w-full py-stack-md border-t-2 border-on-surface px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-gutter">
        <div className="font-headline-md text-headline-md font-black text-surface tracking-tighter">
          STUDIO CHAOS
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-body-md text-body-md font-bold uppercase tracking-wider">
          <a
            className="text-surface-variant hover:text-primary-fixed-dim hover:italic transition-all"
            href="#"
          >
            INSTAGRAM
          </a>
          <a
            className="text-surface-variant hover:text-primary-fixed-dim hover:italic transition-all"
            href="#"
          >
            BEHANCE
          </a>
          <a
            className="text-surface-variant hover:text-primary-fixed-dim hover:italic transition-all"
            href="#"
          >
            DRIBBBLE
          </a>
          <a
            className="text-surface-variant hover:text-primary-fixed-dim hover:italic transition-all"
            href="#"
          >
            LINKEDIN
          </a>
        </div>
        <div className="font-body-md text-surface-variant text-sm">
          © 2024 STUDIO CHAOS. MADE WITH CHAOS
        </div>
      </footer>
    </>
  );
}
