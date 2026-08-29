'use client';

import { useState, useTransition, useRef } from 'react';
import { addTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/actions';
import { uploadImage } from '@/lib/upload-action';

type Testimonial = {
  id: string;
  author_name: string;
  content: string;
  author_image?: string | null;
  is_published?: boolean;
};

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add' }
  | { mode: 'edit'; testimonial: Testimonial };

export default function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string>('');
  const [captionValue, setCaptionValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function openAdd() { setError(''); setPreview(''); setCaptionValue(''); setTitleValue(''); setModal({ mode: 'add' }); }
  function openEdit(t: Testimonial) { setError(''); setPreview(t.author_image || ''); setCaptionValue(t.content || ''); setTitleValue(t.author_name || ''); setModal({ mode: 'edit', testimonial: t }); }
  function closeModal() { setModal({ mode: 'closed' }); setError(''); setPreview(''); setCaptionValue(''); setTitleValue(''); }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    startTransition(async () => {
      try {
        let author_image = modal.mode === 'edit' ? (modal.testimonial.author_image || '') : '';
        if (file && file.size > 0) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          const uploadResult = await uploadImage(uploadFormData);
          if ('error' in uploadResult) {
            setError(uploadResult.error);
            return;
          }
          author_image = uploadResult.url;
        }
        formData.set('author_image', author_image);

        let result;
        if (modal.mode === 'add') {
          result = await addTestimonial(formData);
        } else if (modal.mode === 'edit') {
          result = await updateTestimonial(formData);
        }
        if (result && 'error' in result) {
          setError(result.error);
          return;
        }
        closeModal();
        window.location.reload();
      } catch (err: any) {
        setError(err?.message || 'An unexpected error occurred');
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    startTransition(async () => {
      try {
        const result = await deleteTestimonial(id);
        if (result?.error) {
          alert(result.error);
          return;
        }
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    });
  }

  const editingTestimonial = modal.mode === 'edit' ? modal.testimonial : null;

  return (
    <div className="w-full max-w-[1200px] mx-auto">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight">My Journal</h2>
          <p className="text-[13px] text-[#6B7280] mt-0.5">{testimonials.length} {testimonials.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#FFD600] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[13px] font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#1a1a1a] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Entry
        </button>
      </div>

      {/* Cards Grid */}
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-[48px] text-[#D1D5DB] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>book_4</span>
          <p className="text-[15px] font-semibold text-[#6B7280]">No journal entries yet</p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">Click "Add Entry" to write your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-white border border-gray-200 rounded-xl flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <button
                  type="button"
                  className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing transition-colors"
                  title="Drag to reorder"
                >
                  <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
                </button>
                {/* Inline Edit / Delete Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(t)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#1B5BFF] hover:underline"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    Edit
                  </button>
                  <span className="text-gray-200">|</span>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#FF5C5C] hover:underline disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    Delete
                  </button>
                </div>
              </div>

              {/* Identity Row: Avatar + Title */}
              <div className="flex items-center gap-3 px-4 pb-3">
                {t.author_image ? (
                  <img
                    src={t.author_image}
                    alt={t.author_name}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">image</span>
                  </div>
                )}
                <h4 className="text-[14px] font-bold text-[#1A1A1A] leading-snug line-clamp-2">
                  {t.author_name}
                </h4>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mx-4" />

              {/* Quote Body */}
              <div className="px-4 pt-3 pb-4 flex-1 relative">
                <span
                  className="material-symbols-outlined absolute top-2 left-3 text-[#FFD600]"
                  style={{ fontSize: '26px', fontVariationSettings: "'FILL' 1", opacity: 0.6 }}
                >
                  format_quote
                </span>
                <p className="text-[13px] text-[#374151] italic leading-relaxed line-clamp-3 pl-6">
                  {t.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {modal.mode !== 'closed' && (
        <div
          className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                {modal.mode === 'add' ? 'Add Journal Entry' : 'Edit Entry'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSave} className="space-y-5">
              {modal.mode === 'edit' && (
                <input type="hidden" name="id" value={editingTestimonial?.id} />
              )}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </div>
              )}

              {/* Photo Upload */}
              <div className="flex items-center gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-[72px] h-[72px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#1A1A1A] hover:bg-white transition-colors relative overflow-hidden shrink-0"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-[24px]">add_a_photo</span>
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1A1A1A]">Thumbnail Photo</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">Square ratio recommended (JPG, PNG)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>Title</span>
                  <span className={`text-[11px] font-semibold lowercase ${titleValue.length > 16 ? 'text-red-500' : 'text-gray-400'}`}>
                    {titleValue.length} / 16 characters
                  </span>
                </label>
                <input
                  name="author_name"
                  required
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all placeholder:text-gray-400"
                  placeholder="e.g. My birthday"
                  type="text"
                  maxLength={16}
                />
                <input type="hidden" name="author_title" value="" />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>Caption</span>
                  <span className={`text-[11px] font-semibold lowercase ${captionValue.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
                    {captionValue.length} / 70 characters
                  </span>
                </label>
                <textarea
                  name="content"
                  required
                  value={captionValue}
                  onChange={(e) => setCaptionValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] font-medium text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  placeholder="Write the caption for this entry..."
                  rows={4}
                  maxLength={70}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-[#1A1A1A] bg-[#FFD600] border-2 border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#1a1a1a] transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                >
                  {isPending ? 'Saving...' : modal.mode === 'add' ? 'Save Entry' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
