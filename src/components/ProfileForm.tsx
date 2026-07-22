'use client';

import { useState, useTransition, useRef } from 'react';
import { updateProfile } from '@/lib/actions';
import { uploadImage } from '@/lib/upload-action';

export default function ProfileForm({ initialProfile }: { initialProfile: any }) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const initialAboutImages = (() => {
    try {
      const parsed = JSON.parse(initialProfile?.about_image);
      return Array.isArray(parsed) ? parsed : (initialProfile?.about_image ? [initialProfile.about_image] : []);
    } catch {
      return initialProfile?.about_image ? [initialProfile.about_image] : [];
    }
  })();

  const [heroPreview, setHeroPreview] = useState(initialProfile?.hero_image || '');
  const [aboutImages, setAboutImages] = useState<Array<{ url: string, file?: File }>>(
    initialAboutImages.map((url: string) => ({ url }))
  );
  
  const [marqueeItems, setMarqueeItems] = useState<string[]>(
    initialProfile?.marquee ? JSON.parse(initialProfile.marquee) : [
      '☀️ SUNFLOWER GIRLIE',
      '🖨️ PRINT NERD',
      '✦ BOLD BY DEFAULT',
      '☕ OAT LATTE ENTHUSIAST',
      '🎨 MAKES THINGS LOUD'
    ]
  );

  const heroInputRef = useRef<HTMLInputElement>(null);
  const aboutInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'identity' | 'media' | 'bios' | 'background' | 'socials'>('identity');
  const [bioValue, setBioValue] = useState(initialProfile?.bio || '');
  const [taglineValue, setTaglineValue] = useState(initialProfile?.tagline || '');

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    const formData = new FormData(e.currentTarget);
    const heroFile = formData.get('hero_file') as File;

    startTransition(async () => {
      try {
        let heroUrl = initialProfile?.hero_image || '';
        if (heroFile && heroFile.size > 0) {
          const up = new FormData();
          up.append('file', heroFile);
          heroUrl = await uploadImage(up);
        }

        const finalAboutUrls: string[] = [];
        for (const img of aboutImages) {
          if (img.file) {
            const up = new FormData();
            up.append('file', img.file);
            const uploadedUrl = await uploadImage(up);
            finalAboutUrls.push(uploadedUrl);
          } else {
            finalAboutUrls.push(img.url);
          }
        }

        formData.set('hero_image', heroUrl);
        formData.set('about_image', JSON.stringify(finalAboutUrls));
        
        const resumeUrl = formData.get('resume_url_manual') as string || '';
        formData.set('resume_url', resumeUrl);
        
        // preserve the current avatar/availability status in this form since they are handled elsewhere or hidden
        formData.append('availability_status', initialProfile?.availability_status || 'Open for Work');
        formData.append('avatar', initialProfile?.avatar || '');
        await updateProfile(formData);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    });
  }

  function makePrimary(idx: number) {
    setAboutImages(prev => {
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.unshift(moved);
      return next;
    });
  }

  const renderSaveButton = (label: string) => (
    <div className="flex justify-end items-center gap-3 pt-4 border-t border-[#F3F4F6] mt-6">
      {successMsg && (
        <span className="text-xs font-bold text-green-600 flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg animate-fade-in">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Profile saved!
        </span>
      )}
      {errorMsg && (
        <span className="text-xs font-bold text-red-600 flex items-center gap-1.5 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg animate-fade-in">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {errorMsg}
        </span>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="bg-[#FFD600] text-[#1A1A1A] hover:bg-[#FFDF33] font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-subtle disabled:opacity-50 flex items-center gap-2"
      >
        {isPending ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
            Saving...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px]">save</span>
            {label}
          </>
        )}
      </button>
    </div>
  );

  const tabs = [
    { id: 'identity', label: 'Identity & Hero', icon: 'badge' },
    { id: 'media', label: 'Media & Gallery', icon: 'photo_library' },
    { id: 'bios', label: 'Written Bios', icon: 'description' },
    { id: 'socials', label: 'Socials & Resume', icon: 'contact_mail' },
  ];

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">

      {/* Tabs Navigation */}
      <div className="border-b border-[#EBEBEB] flex flex-wrap gap-1 bg-white p-2 rounded-xl border shadow-subtle">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#FFD600] text-[#1A1A1A] shadow-sm'
                : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F9FAFB]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] select-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content Card */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-subtle min-h-[350px]">
        {/* Tab 1: Identity & Hero */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">Identity &amp; Hero Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Display Name</label>
                <input
                  name="display_name"
                  defaultValue={initialProfile?.display_name || ''}
                  className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Availability Status</label>
                <select
                  name="availability_status"
                  defaultValue={initialProfile?.availability_status || 'open'}
                  className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors"
                >
                  <option value="open">Open to work</option>
                  <option value="working">Working / Busy</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
                <span>Tagline</span>
                <span className={`text-[11px] font-semibold lowercase ${taglineValue.length > 100 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
                  short punchy intro ({taglineValue.length} / 100)
                </span>
              </label>
              <input
                name="tagline"
                value={taglineValue}
                onChange={(e) => setTaglineValue(e.target.value)}
                maxLength={100}
                className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                type="text"
                placeholder="Bold design for brands that refuse to be boring."
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Hero Profile Photo</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#F9FAFB] p-4 rounded-xl border border-[#DCDCDC]">
                <div 
                  onClick={() => heroInputRef.current?.click()}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl border-2 border-dashed border-[#DCDCDC] hover:border-gray-400 bg-white relative flex items-center justify-center overflow-hidden cursor-pointer group transition-all shrink-0 shadow-sm"
                >
                  {heroPreview ? (
                    <>
                      <img src={heroPreview} alt="Hero Profile Preview" className="w-full h-full object-cover animate-fade-in" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[20px]">upload</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-2">
                      <span className="material-symbols-outlined text-[#9CA3AF] text-[28px] mb-1">add_photo_alternate</span>
                      <p className="text-[11px] font-bold text-[#6B7280]">Choose Photo</p>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <h4 className="text-sm font-bold text-[#1A1A1A]">Upload Profile Portrait</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    This picture appears in the hero section profile slot on the main page, and the dashboard sidebar. Square ratios work best.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => heroInputRef.current?.click()}
                      className="text-xs font-bold text-[#1A1A1A] bg-white border border-[#DCDCDC] hover:bg-gray-50 px-3.5 py-1.5 rounded-xl transition-all shadow-sm"
                    >
                      Choose Image
                    </button>
                    {heroPreview && (
                      <button
                        type="button"
                        onClick={() => setHeroPreview('')}
                        className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-xl transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <input 
                ref={heroInputRef}
                name="hero_file" 
                type="file" 
                accept="image/*"
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files?.[0]) setHeroPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            {renderSaveButton('Save Identity & Hero')}
          </div>
        )}

        {/* Tab 2: Media & Gallery */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#1A1A1A]">Media Gallery Collage</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Manage the scrapbook photos shown in your About scrapbook section.</p>
              </div>
              <span className="text-xs font-bold text-[#6B7280] bg-[#F3F4F6] px-3 py-1.5 rounded-full">
                {aboutImages.length} / 5 photos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {aboutImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#EBEBEB] bg-gray-100 group shadow-sm">
                  <img src={img.url} className="w-full h-full object-cover" alt={`About image ${idx+1}`} />
                  
                  {idx === 0 ? (
                    <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#FFD600] text-[#1A1A1A] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm select-none">
                      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      Primary
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => makePrimary(idx)}
                      className="absolute bottom-2 left-2 text-[9px] font-bold bg-white text-[#1A1A1A] hover:bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Make Primary
                    </button>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => setAboutImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              ))}

              {aboutImages.length < 5 && (
                <div 
                  onClick={() => aboutInputRef.current?.click()}
                  className="aspect-[4/5] rounded-xl border-2 border-dashed border-[#DCDCDC] hover:border-gray-400 bg-[#F9FAFB] hover:bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-all gap-1"
                >
                  <span className="material-symbols-outlined text-[#9CA3AF] text-[28px]">add_a_photo</span>
                  <span className="text-[11px] font-bold text-[#6B7280]">Add Photo</span>
                </div>
              )}
            </div>

            <input 
              ref={aboutInputRef}
              type="file" 
              accept="image/*"
              multiple
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  const newFiles = Array.from(e.target.files);
                  const newImages = newFiles.map(file => ({
                    url: URL.createObjectURL(file),
                    file
                  }));
                  setAboutImages(prev => [...prev, ...newImages].slice(0, 5));
                }
                if (aboutInputRef.current) aboutInputRef.current.value = '';
              }}
            />
            {renderSaveButton('Save Media Gallery')}
          </div>
        )}

        {/* Tab 3: Written Bios */}
        {activeTab === 'bios' && (
          <div className="space-y-5">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">Written Story &amp; Tickers</h3>
            
            {/* Dynamic Scrolling Marquee Tickers */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
                <span>Marquee Scrolling Texts</span>
                <span className="text-[#9CA3AF] font-normal lowercase">Displayed on public landing banner</span>
              </label>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {marqueeItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...marqueeItems];
                          newItems[idx] = e.target.value;
                          setMarqueeItems(newItems);
                        }}
                        className="flex-1 bg-transparent border border-[#DCDCDC] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-black transition-colors"
                        placeholder="e.g. ☀️ SUNFLOWER GIRLIE"
                      />
                      <button
                        type="button"
                        onClick={() => setMarqueeItems(marqueeItems.filter((_, i) => i !== idx))}
                        className="w-8 h-8 flex items-center justify-center border border-[#DCDCDC] rounded-xl text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => setMarqueeItems([...marqueeItems, ''])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F6] border border-[#DCDCDC] px-4 py-2 rounded-xl transition-all shadow-sm bg-white"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> 
                  Add Ticker Item
                </button>
              </div>
              <input type="hidden" name="marquee" value={JSON.stringify(marqueeItems)} />
            </div>

            {/* Short Bio */}
            <div className="flex flex-col gap-1.5 pt-4 border-t border-[#F3F4F6]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Short Bio (Hero section)</label>
                <span className={`text-[11px] font-semibold ${bioValue.length > 200 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
                  {bioValue.length} / 200 characters
                </span>
              </div>
              <textarea
                name="bio"
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
                className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-black transition-colors resize-none leading-relaxed"
                rows={3}
                placeholder="Digital designer and art director..."
              />
            </div>

            {/* Preserve Detailed About Description value without displaying it */}
            <input type="hidden" name="about_description" value={initialProfile?.about_description || ''} />
            {renderSaveButton('Save Written Bios')}
          </div>
        )}

        {/* Hidden inputs to preserve Background Details database values */}
        <input type="hidden" name="currently" value={initialProfile?.currently || ''} />
        <input type="hidden" name="college" value={initialProfile?.college || ''} />
        <input type="hidden" name="school" value={initialProfile?.school || ''} />
        <input type="hidden" name="higher_secondary_education" value={initialProfile?.higher_secondary_education || ''} />
        <input type="hidden" name="born_in" value={initialProfile?.born_in || ''} />
        <input type="hidden" name="currently_based_in" value={initialProfile?.currently_based_in || ''} />

        {/* Tab 5: Socials & Resume */}
        {activeTab === 'socials' && (
          <div className="space-y-6">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">Social Presence &amp; Resume Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Email Address</label>
                <input
                  name="email"
                  defaultValue={initialProfile?.email || ''}
                  className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                  type="email"
                  placeholder="hello@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Instagram URL</label>
                <input
                  name="instagram_url"
                  defaultValue={initialProfile?.instagram_url || ''}
                  className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                  type="url"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">LinkedIn URL</label>
                <input
                  name="linkedin_url"
                  defaultValue={initialProfile?.linkedin_url || ''}
                  className="w-full bg-transparent border border-[#DCDCDC] rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                  type="url"
                  placeholder="https://linkedin.com/in/yourhandle"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-4 border-t border-[#F3F4F6]">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Resume / CV Link</label>
              <input
                name="resume_url_manual"
                className="w-full bg-transparent border-[#DCDCDC] border rounded-xl px-4 py-2.5 font-medium text-[#1A1A1A] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                type="url"
                placeholder="Paste Google Drive, Dropbox, or public resume URL here..."
                defaultValue={initialProfile?.resume_url || ''}
              />
            </div>
            {renderSaveButton('Save Socials & Resume')}
          </div>
        )}
      </div>
    </form>
  );
}

