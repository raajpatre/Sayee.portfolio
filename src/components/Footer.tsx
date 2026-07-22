export default function Footer({ profile }: { profile: any }) {
  return (
    <footer className="sticky top-[68px] md:top-[84px] z-[6] bg-white border-t-4 border-brand-black text-brand-black w-full overflow-hidden relative">
      {/* Background texture line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
      <div className="flex flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 md:py-6 max-w-container-max mx-auto gap-4">
        <div className="flex flex-row items-center gap-4 md:gap-6">
          {/* Name */}
          <div className="font-handwriting text-3xl md:text-4xl font-bold text-brand-black -rotate-2 hidden md:block">
            {profile?.display_name || 'Sayee'}
          </div>
          
          {/* Socials & Resume */}
          <div className="flex items-center gap-3 md:gap-4">
            {profile?.instagram_url && (
              <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-cream border-2 border-brand-black rounded-full hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-hard-sm transition-all group">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-cream border-2 border-brand-black rounded-full hover:bg-brand-blue hover:text-white hover:-translate-y-1 hover:shadow-hard-sm transition-all group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {profile?.resume_url && (
              <a 
                href={profile.resume_url} 
                download 
                target="_blank" 
                rel="noreferrer"
                className="bg-brand-coral text-white border-2 border-brand-black px-4 py-2 md:px-5 md:py-2.5 font-bold hover:-translate-y-1 hover:shadow-hard-sm transition-all rotate-2 ml-1 md:ml-2 hidden md:inline-block"
              >
                My Resume
              </a>
            )}
          </div>
        </div>
        
        {/* Watermark */}
        <div className="font-medium text-[13px] sm:text-sm md:text-[15px] text-brand-black bg-brand-yellow/80 border-2 border-brand-black px-3.5 py-2 md:px-4 md:py-2 rotate-1 shadow-sm whitespace-nowrap">
          Made with ❤️ by <a href="https://raajpatre.me/" target="_blank" rel="noreferrer" className="underline hover:text-brand-coral transition-colors font-bold">raajpatre.me</a>
        </div>
      </div>
    </footer>
  );
}
