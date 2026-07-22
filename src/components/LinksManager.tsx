'use client';

import { useState, useTransition } from 'react';
import { addLink, updateLink, deleteLink } from '@/lib/actions';

export type BlogLink = {
  id: string;
  title: string;
  icon: string; // The DB column used for the platform name
  url: string;
  created_at?: string;
};

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add' }
  | { mode: 'edit'; link: BlogLink };

const PLATFORM_STYLES: Record<string, string> = {
  Medium: 'bg-[#1A1A1A] text-[#FFD600]',
  Substack: 'bg-[#FF5C5C] text-white',
  LinkedIn: 'bg-[#1B5BFF] text-white',
  'Personal Blog': 'bg-[#EAE4D9] text-[#1A1A1A]',
  Other: 'bg-[#F0F0F0] text-[#1A1A1A]'
};

export default function LinksManager({ initialLinks }: { initialLinks: BlogLink[] }) {
  const [links, setLinks] = useState<BlogLink[]>(initialLinks);
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function openAdd() { setError(''); setModal({ mode: 'add' }); }
  function openEdit(l: BlogLink) { setError(''); setModal({ mode: 'edit', link: l }); }
  function closeModal() { setModal({ mode: 'closed' }); setError(''); }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (modal.mode === 'add') {
          await addLink(formData);
        } else if (modal.mode === 'edit') {
          await updateLink(formData);
        }
        closeModal();
        window.location.reload();
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article link? This cannot be undone.')) return;
    startTransition(async () => {
      try {
        await deleteLink(id);
        setLinks((prev) => prev.filter((l) => l.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    });
  }

  const editingLink = modal.mode === 'edit' ? modal.link : null;

  return (
    <div className="w-full">
      {/* Top Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 max-w-[1200px] mx-auto w-full">
        <div>
          <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-1">
            Blog Links
          </h2>
          <p className="text-[14px] text-[#6B6560]">
            Add external articles you've written.
          </p>
        </div>
        <button 
          onClick={openAdd}
          className="mt-4 md:mt-0 px-5 py-2.5 bg-[#FFD600] text-[#1A1A1A] font-semibold rounded-[8px] flex items-center gap-2 hover:bg-[#FFDF33] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Article
        </button>
      </div>

      {/* Articles List Container */}
      <div className="max-w-[1200px] mx-auto w-full bg-white rounded-[12px] border border-[#E8E8E8] shadow-subtle overflow-hidden">
        {/* List Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[#E8E8E8] bg-[#FAFAFA] text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
          <div className="col-span-3 md:col-span-2">Platform</div>
          <div className="col-span-6 md:col-span-7">Article Details</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        {links.length === 0 ? (
          <div className="py-16 text-center text-[14px] text-[#9CA3AF]">
            No links yet.{' '}
            <button onClick={openAdd} className="text-[#1A1A1A] font-semibold underline">
              Add your first one →
            </button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[#E8E8E8]">
            {links.map((link) => {
              const platformStyle = PLATFORM_STYLES[link.icon] || PLATFORM_STYLES['Other'];
              // Format created_at date nicely if available
              const dateObj = link.created_at ? new Date(link.created_at) : null;
              const dateString = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
              
              return (
                <div key={link.id} className={`group flex flex-col md:flex-row items-start md:items-center p-4 md:px-5 md:py-4 hover:bg-[#FAFAFA] transition-colors`}>
                  <div className="w-full md:w-[16.666%] mb-3 md:mb-0">
                    <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[11px] font-bold ${platformStyle}`}>
                      {link.icon || 'Link'}
                    </span>
                  </div>
                  <div className={`flex-1 pr-4 mb-3 md:mb-0 w-full md:w-[58.333%]`}>
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-semibold text-[14px] text-[#1A1A1A]">
                        {link.title}
                      </h3>
                      {dateString && (
                        <span className="text-[12px] text-[#6B6560] hidden md:inline-block">
                          {dateString}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#6B6560] italic truncate max-w-[500px]">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-auto w-full md:w-[25%] justify-end">
                    <div className="flex items-center mr-2 border-r border-[#E8E8E8] pr-4">
                      <span className="text-[12px] text-[#6B6560] mr-2 font-medium">
                        Published
                      </span>
                      <div className={`relative inline-block w-9 h-5 rounded-full bg-[#10B981]`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform left-4.5 translate-x-[16px]`}></div>
                      </div>
                    </div>
                    <a
                      className="text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View External"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </a>
                    <button 
                      onClick={() => openEdit(link)}
                      className="text-[#1B5BFF] text-[13px] font-semibold hover:underline ml-1"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(link.id)}
                      disabled={isPending}
                      className="text-[#FF5C5C] text-[13px] font-semibold hover:underline ml-2 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL OVERLAY */}
      {modal.mode !== 'closed' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-[#E8E8E8] flex justify-between items-center">
              <h3 className="text-[18px] font-bold text-[#1A1A1A]">
                {modal.mode === 'add' ? 'Add New Article' : 'Edit Article'}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6] rounded-full p-1 w-8 h-8 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="flex-col flex max-h-[85vh]">
              <div className="p-6 overflow-y-auto space-y-5">
                {modal.mode === 'edit' && (
                  <input type="hidden" name="id" value={editingLink?.id} />
                )}
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1.5">
                    Article Title
                  </label>
                  <input
                    name="title"
                    required
                    defaultValue={editingLink?.title ?? ''}
                    className="w-full px-3 py-2 border border-[#E8E8E8] rounded-[8px] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#9CA3AF]"
                    placeholder="e.g. My latest thoughts on Design..."
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1.5">
                    Platform
                  </label>
                  <div className="relative">
                    <select 
                      name="platform"
                      required
                      defaultValue={editingLink?.icon ?? 'Medium'}
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-[8px] text-[14px] focus:outline-none focus:border-[#1A1A1A] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Medium">Medium</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Substack">Substack</option>
                      <option value="Personal Blog">Personal Blog</option>
                      <option value="Other">Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1.5">
                    External URL
                  </label>
                  <input
                    name="url"
                    required
                    defaultValue={editingLink?.url ?? ''}
                    className="w-full px-3 py-2 border border-[#E8E8E8] rounded-[8px] text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#9CA3AF]"
                    placeholder="https://"
                    type="url"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#E8E8E8] bg-[#FAFAFA] flex justify-end gap-3 mt-auto">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-[13px] font-semibold text-[#6B7280] border border-transparent rounded-[8px] hover:text-[#1A1A1A] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 text-[13px] font-semibold text-[#1A1A1A] bg-[#FFD600] rounded-[8px] hover:bg-[#FFDF33] transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : modal.mode === 'add' ? 'Save Article' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
