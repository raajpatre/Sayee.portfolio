'use client';

import { useState, useTransition, useRef } from 'react';
import { addCredential, updateCredential, deleteCredential } from '@/lib/actions';
import { uploadImage } from '@/lib/upload-action';

type Credential = {
  id: string;
  title: string;
  description: string;   // maps to "institution" in UI
  date: string;          // maps to "year" in UI
  type: 'degree' | 'certification' | 'award' | 'course';
  url?: string | null;
  image_url?: string | null;
};

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add' }
  | { mode: 'edit'; credential: Credential };

const TYPE_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  degree:        { label: 'Degree',        bg: 'bg-[#E8F0FE]', text: 'text-[#1967D2]' },
  certification: { label: 'Certification', bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]' },
  award:         { label: 'Award',         bg: 'bg-[#FBE9E7]', text: 'text-[#D84315]' },
  course:        { label: 'Course',        bg: 'bg-[#F5F5F5]', text: 'text-[#212121]' },
};

export default function CredentialsManager({ initialCredentials }: { initialCredentials: Credential[] }) {
  const [credentials, setCredentials] = useState<Credential[]>(initialCredentials);
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string>('');

  function openAdd() { setError(''); setPreview(''); setModal({ mode: 'add' }); }
  function openEdit(c: Credential) { setError(''); setPreview(c.image_url || ''); setModal({ mode: 'edit', credential: c }); }
  function closeModal() { setModal({ mode: 'closed' }); setError(''); setPreview(''); }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    startTransition(async () => {
      try {
        let image_url = modal.mode === 'edit' ? (modal.credential.image_url || '') : '';
        
        if (file && file.size > 0) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          const uploadResult = await uploadImage(uploadFormData);
          if ('error' in uploadResult) {
            setError(uploadResult.error);
            return;
          }
          image_url = uploadResult.url;
        }
        
        formData.set('image_url', image_url);

        if (modal.mode === 'add') {
          const result = await addCredential(formData);
          if (result && 'error' in result) { setError(result.error); return; }
        } else if (modal.mode === 'edit') {
          const result = await updateCredential(formData);
          if (result && 'error' in result) { setError(result.error); return; }
        }
        closeModal();
        window.location.reload();
      } catch (err: any) {
        setError(err?.message || 'An unexpected error occurred');
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this credential? This cannot be undone.')) return;
    startTransition(async () => {
      try {
        await deleteCredential(id);
        setCredentials((prev) => prev.filter((c) => c.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    });
  }

  const editingCredential = modal.mode === 'edit' ? modal.credential : null;

  return (
    <>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">Credentials</h2>
        <button
          onClick={openAdd}
          className="bg-[#FFD600] text-[#1A1A1A] font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#FFDF33] transition-colors border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Credential
        </button>
      </div>

      {/* Credentials List */}
      <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-subtle overflow-hidden">
        {credentials.length === 0 ? (
          <div className="py-16 text-center text-[14px] text-[#9CA3AF]">
            No credentials yet.{' '}
            <button onClick={openAdd} className="text-[#1A1A1A] font-semibold underline">
              Add your first one →
            </button>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-[#F0F0F0]">
            {credentials.map((c) => {
              const style = TYPE_STYLES[c.type] ?? TYPE_STYLES.course;
              return (
                <li
                  key={c.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[#FAFAFA] transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="cursor-grab text-[#C4C4C4] hover:text-[#1A1A1A] material-symbols-outlined select-none shrink-0">
                      drag_indicator
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-[4px] text-[11px] font-bold tracking-widest uppercase shrink-0 ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[15px] text-[#1A1A1A] leading-tight truncate">
                        {c.title}
                      </h3>
                      <p className="text-[13px] text-[#6B7280] leading-tight mt-0.5">
                        {c.description}{c.date ? ` • ${c.date}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                    <button
                      onClick={() => openEdit(c)}
                      className="text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={isPending}
                      className="text-[13px] font-semibold text-[#DC2626] hover:opacity-80 transition-opacity disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ─── Modal ───────────────────────────────────────────────── */}
      {modal.mode !== 'closed' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#F0F0F0]">
              <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                {modal.mode === 'add' ? 'Add Credential' : 'Edit Credential'}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {modal.mode === 'edit' && (
                <input type="hidden" name="id" value={editingCredential?.id} />
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-600 font-medium">
                  {error}
                </div>
              )}

              {/* Type */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-[#1A1A1A]">Type</label>
                <div className="relative">
                  <select
                    name="type"
                    required
                    defaultValue={editingCredential?.type ?? ''}
                    className="w-full px-3 py-2.5 border border-[#DCDCDC] rounded-lg text-[14px] text-[#1A1A1A] bg-white appearance-none focus:outline-none focus:border-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select type…</option>
                    <option value="degree">Degree</option>
                    <option value="certification">Certification</option>
                    <option value="award">Award</option>
                    <option value="course">Course</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[20px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-[#1A1A1A]">Title</label>
                <input
                  name="title"
                  required
                  defaultValue={editingCredential?.title ?? ''}
                  placeholder="e.g. Master of Fine Arts in Interaction Design"
                  className="w-full px-3 py-2.5 border border-[#DCDCDC] rounded-lg text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
                />
              </div>

              {/* Institution + Year (mapped to description + date in DB) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-[#1A1A1A]">Institution</label>
                  <input
                    name="description"
                    required
                    defaultValue={editingCredential?.description ?? ''}
                    placeholder="e.g. School of Visual Arts"
                    className="w-full px-3 py-2.5 border border-[#DCDCDC] rounded-lg text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-[#1A1A1A]">Year</label>
                  <input
                    name="date"
                    required
                    defaultValue={editingCredential?.date ?? ''}
                    placeholder="e.g. 2023"
                    className="w-full px-3 py-2.5 border border-[#DCDCDC] rounded-lg text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
                  />
                </div>
              </div>

              {/* URL (optional) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-[#1A1A1A]">
                  Link <span className="text-[#9CA3AF] font-normal">(optional)</span>
                </label>
                <input
                  name="url"
                  type="url"
                  defaultValue={editingCredential?.url ?? ''}
                  placeholder="https://certificate-link.com"
                  className="w-full px-3 py-2.5 border border-[#DCDCDC] rounded-lg text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white"
                />
              </div>

              {/* Certificate Image */}
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-[#1A1A1A]">
                  Certificate Photo <span className="text-[#9CA3AF] font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded border border-[#DCDCDC]" 
                    />
                  )}
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-[13px] text-[#6B7280]
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-[13px] file:font-semibold
                      file:bg-[#F0F0F0] file:text-[#1A1A1A]
                      hover:file:bg-[#E8E8E8] transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t border-[#F0F0F0] mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-[#FFD600] text-[#1A1A1A] rounded-lg text-[13px] font-bold hover:bg-[#FFDF33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Saving…' : modal.mode === 'add' ? 'Add Credential' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
