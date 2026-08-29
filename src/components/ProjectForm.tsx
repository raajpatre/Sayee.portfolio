'use client'

import Link from 'next/link';
import { useState, useRef } from 'react';
import { addProject, updateProject } from '@/lib/actions';
import { uploadImage } from '@/lib/upload-action';

export default function ProjectForm({ initialData, onBack }: { initialData?: any, onBack?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previews, setPreviews] = useState<string[]>(initialData?.cover_image ? [initialData.cover_image] : []);
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [titleValue, setTitleValue] = useState(initialData?.title || '');
  const [descriptionValue, setDescriptionValue] = useState(initialData?.description || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function handleDropZoneClick() {
    fileInputRef.current?.click();
  }

  function removePreview(idx: number) {
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      let cover_image = initialData?.cover_image || '';
      if (file && file.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        const uploadResult = await uploadImage(uploadFormData);
        if ('error' in uploadResult) {
          setError(uploadResult.error);
          setLoading(false);
          return;
        }
        cover_image = uploadResult.url;
      }

      const title = formData.get('title') as string;
      const slug = initialData?.slug || title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      formData.set('cover_image', cover_image);
      formData.set('slug', slug);
      formData.set('featured', featured ? 'true' : 'false');
      formData.set('published', published ? 'true' : 'false');
      
      // Remove the raw file before sending to the server action to avoid large payloads crashing Cloudflare Workers.
      formData.delete('file');
      
      if (initialData?.id) {
        formData.set('id', initialData.id);
        const result = await updateProject(formData);
        if (result?.error) { setError(result.error); setLoading(false); return; }
        alert('Project updated successfully!');
      } else {
        const result = await addProject(formData);
        if (result?.error) { setError(result.error); setLoading(false); return; }
        formRef.current?.reset();
        setPreviews([]);
        alert('Project added successfully!');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full pb-16 px-4 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b border-[#EBEBEB] mb-8">
        <div className="space-y-1">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Projects
            </button>
          ) : (
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Projects
            </Link>
          )}
          <h1 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="submit"
            form="project-form"
            disabled={loading}
            className="px-6 py-2.5 bg-[#FFD600] border-2 border-[#1A1A1A] rounded-xl text-[14px] font-bold text-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#1a1a1a] transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-none flex items-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">publish</span>
                {initialData ? 'Save Changes' : 'Publish Project'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600 font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      {/* Main Two-Column Layout */}
      <form id="project-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* Left Column (Main Content - 2/3) */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 md:p-8 space-y-6 shadow-subtle">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
                  <span>Title</span>
                  <span className={`text-[11px] font-semibold lowercase ${titleValue.length > 50 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
                    {titleValue.length} / 50 characters
                  </span>
                </label>
                <input
                  name="title"
                  required
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  maxLength={50}
                  placeholder="e.g. Acme Rebrand 2024"
                  className="w-full px-4 py-3 border border-[#DCDCDC] rounded-xl text-[14px] font-semibold text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all bg-white"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
                  <span>Description</span>
                  <span className={`text-[11px] font-semibold lowercase ${descriptionValue.length > 270 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
                    {descriptionValue.length} / 270 characters
                  </span>
                </label>
                <textarea
                  name="description"
                  rows={6}
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                  maxLength={270}
                  placeholder="Describe the scope, objectives, design process, and creative solutions of the project..."
                  className="w-full px-4 py-3 border border-[#DCDCDC] rounded-xl text-[14px] font-medium text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all bg-white resize-none leading-relaxed"
                />
              </div>

              {/* Project Images */}
              <div className="space-y-3 pt-2">
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Project Images</h3>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">Upload high-resolution images. The first image will automatically be selected as the cover image.</p>
                </div>

                {/* Drop Zone */}
                <div
                  onClick={handleDropZoneClick}
                  className="border-2 border-dashed border-[#DCDCDC] hover:border-black hover:bg-[#F9FAFB]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-2.5 cursor-pointer group transition-all"
                >
                  <span className="material-symbols-outlined text-[32px] text-[#9CA3AF] group-hover:text-black group-hover:scale-110 transition-all">
                    cloud_upload
                  </span>
                  <div className="text-center">
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Drag &amp; drop images here, or <span className="text-blue-600 underline">browse</span></p>
                    <p className="text-[11px] text-[#6B7280] mt-1">PNG, JPG or WEBP up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <div className={`w-[110px] h-[85px] rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-[#FFD600] shadow-sm' : 'border-[#DCDCDC]'} bg-gray-50`}>
                          <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                        {idx === 0 && (
                          <span className="absolute top-1.5 left-1.5 text-[8px] font-bold bg-[#FFD600] text-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm select-none">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePreview(idx)}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#1A1A1A] hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column (Meta & Settings Sidebar - 1/3) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-6">
            <div className="bg-[#FAFAFA] rounded-xl border border-[#EBEBEB] p-6 space-y-6 shadow-subtle">
              
              {/* Card Title */}
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Project Meta &amp; Settings</h3>
                <p className="text-[11px] text-[#6B7280] mt-0.5">Control how this project is styled and categorised on the public site.</p>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    defaultValue={initialData?.category || ''}
                    className="w-full px-4 py-2.5 border border-[#DCDCDC] rounded-xl text-[14px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Design">Design</option>
                    <option value="Photography">Photography</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[20px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Aspect Ratio</label>
                <div className="relative">
                  <select
                    name="aspect_ratio"
                    defaultValue={initialData?.aspect_ratio || '1:1'}
                    className="w-full px-4 py-2.5 border border-[#DCDCDC] rounded-xl text-[14px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 bg-white appearance-none cursor-pointer"
                  >
                    <option value="1:1">1:1 (Square)</option>
                    <option value="3:4">3:4 (Portrait)</option>
                    <option value="4:3">4:3 (Landscape)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[20px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
                  <span>Client Name</span>
                  <span className="text-[#9CA3AF] font-normal lowercase">optional</span>
                </label>
                <input
                  name="client_name"
                  defaultValue={initialData?.client_name || ''}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-2.5 border border-[#DCDCDC] rounded-xl text-[14px] font-semibold text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 bg-white transition-all"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-[#EBEBEB] pt-4">
                
                {/* Published Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A] uppercase tracking-wider">Published</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5 leading-normal">Make visible on the public site</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPublished(!published)}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-200 px-1 shrink-0 ${published ? 'bg-[#FFD600] justify-end border-2 border-black' : 'bg-[#DCDCDC] justify-start border-2 border-[#DCDCDC]'}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm flex items-center justify-center">
                      {published && <span className="material-symbols-outlined text-[8px] font-bold text-[#1A1A1A]">check</span>}
                    </div>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
