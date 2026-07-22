/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
import { getProfile, getTestimonials, getCredentials } from '@/lib/api';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PinIcon from '@/components/PinIcon';
import CertificateStack from '@/components/CertificateStack';

export default async function Page() {
  const profile = await getProfile();
  const testimonials = await getTestimonials();
  const credentials = await getCredentials();
  return (
    <>
      <NavBar profile={profile} />
      <main>

        {/* 2. Certificates & Achievements */}
        {credentials && credentials.length > 0 && (
          <section 
            className="bg-surface-container py-stack-lg border-t-4 border-on-background relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('/certs-bg.png')` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
                <div className="md:col-span-3 text-left">
                  <span className="font-caveat text-4xl text-secondary mb-2 inline-block">
                    things I've earned
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">
                    Certificates &amp; Awards
                  </h2>
                  <p className="font-body-lg text-brand-black/70 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">swipe</span>
                    Drag to flip through them
                  </p>
                </div>
                <div className="md:col-span-7 flex justify-center mt-12 md:mt-0 mb-10">
                  <CertificateStack initialCredentials={credentials} />
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="bg-[#E5D3B3] py-stack-lg border-t-4 border-on-background relative overflow-hidden" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"), radial-gradient(#C4A47C 2px, transparent 2px)`, 
          backgroundSize: '150px 150px, 30px 30px' 
        }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
          
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="flex justify-center mb-stack-md group cursor-default">
              <div className="relative text-center bg-[#FFFBF0] border-4 border-brand-black p-4 inline-block shadow-hard-sm transform -rotate-3 group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-[8px_8px_0px_0px_rgba(31,27,16,1)] transition-all duration-300 ease-out">
                <h2 className="font-caveat text-5xl md:text-6xl text-[#1A1A1A] font-bold">
                  My Journal
                </h2>
                {/* Decorative Washi Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-brand-yellow/80 border-2 border-brand-black rotate-[-4deg] opacity-90 z-20 group-hover:-rotate-2 transition-transform duration-300"></div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center pb-20 pt-12 px-4 sm:px-8">
              {testimonials?.length > 0 ? (
                testimonials.map((entry: any, index: number) => {
                  const rotations = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-6', '-rotate-4', 'rotate-2'];
                  const rotation = rotations[index % rotations.length];
                  const margins = ['mt-4 ml-0', '-mt-10 -ml-4 md:-ml-8', 'mt-8 -ml-6 md:-ml-12', '-mt-6 -ml-4 md:-ml-6', 'mt-12 -ml-8 md:-ml-10', '-mt-8 -ml-4 md:-ml-8'];
                  const margin = margins[index % margins.length];
                  const zIndexes = ['z-10', 'z-20', 'z-30', 'z-10', 'z-20', 'z-30'];
                  const zIndex = zIndexes[index % zIndexes.length];
                  
                  const tacks: ('red' | 'blue' | 'yellow' | 'green')[] = ['red', 'blue', 'yellow', 'green'];
                  const tackColor = tacks[index % tacks.length];

                  return (
                    <div 
                      key={entry.id} 
                      className={`relative bg-white p-2 pb-10 border-2 border-brand-black shadow-[4px_6px_0px_0px_rgba(31,27,16,1)] hover:shadow-none hover:-translate-y-2 hover:z-50 transition-all duration-300 w-[200px] sm:w-[240px] ${rotation} ${margin} ${zIndex}`}
                    >
                      {/* Thumbtack */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 drop-shadow-[2px_4px_2px_rgba(0,0,0,0.3)]">
                        <PinIcon color={tackColor} className="w-10 h-10" />
                      </div>

                      <div className="w-full aspect-square bg-gray-200 border-2 border-brand-black mb-3 relative overflow-hidden">
                        {entry.avatar_url ? (
                          <img 
                            src={entry.avatar_url} 
                            alt={entry.author_name}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-125"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-brand-black font-bold">No Photo</div>
                        )}
                      </div>
                      
                      <div className="px-2">
                        <h3 className="font-headline-sm text-lg font-bold text-brand-black mb-1 leading-tight">{entry.author_name}</h3>
                        <p className="font-caveat text-lg text-brand-black leading-tight line-clamp-3">
                          {entry.content}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="font-caveat text-2xl text-brand-black bg-white p-4 border-2 border-brand-black inline-block rotate-2 shadow-hard-sm">Nothing pinned to the board yet!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      {/* Footer Shared Component */}
      <Footer profile={profile} />
    </>
  );
}
