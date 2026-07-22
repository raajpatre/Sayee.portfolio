'use client';

import { useState, useTransition } from 'react';
import { addService, updateService, deleteService } from '@/lib/actions';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  card_color?: string;
  text_color?: string;
};

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add' }
  | { mode: 'edit'; service: Service };

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [iconPreview, setIconPreview] = useState('🎨');

  function openAdd() {
    setError('');
    setIconPreview('🎨');
    setModal({ mode: 'add' });
  }
  function openEdit(s: Service) {
    setError('');
    setIconPreview(s.icon || '🎨');
    setModal({ mode: 'edit', service: s });
  }
  function closeModal() {
    setModal({ mode: 'closed' });
    setError('');
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        if (modal.mode === 'add') {
          await addService(formData);
        } else if (modal.mode === 'edit') {
          await updateService(formData);
        }
        closeModal();
        window.location.reload();
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    startTransition(async () => {
      try {
        await deleteService(id);
        setServices((prev) => prev.filter((s) => s.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    });
  }

  const editingService = modal.mode === 'edit' ? modal.service : null;

  return (
    <div className="w-full max-w-[1200px] mx-auto">

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h2 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight">Services</h2>
          <p className="text-[13px] text-[#6B7280] mt-0.5">
            These appear as cards on your homepage. · {services.length} {services.length === 1 ? 'service' : 'services'}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="shrink-0 bg-[#FFD600] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[13px] font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#1a1a1a] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Service
        </button>
      </div>

      {/* Services List */}
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <span className="material-symbols-outlined text-[48px] text-[#D1D5DB] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>design_services</span>
          <p className="text-[15px] font-semibold text-[#6B7280]">No services yet</p>
          <p className="text-[13px] text-[#9CA3AF] mt-1 mb-4">Add your first service to display it on your homepage.</p>
          <button
            onClick={openAdd}
            className="text-[13px] font-bold text-[#1A1A1A] underline underline-offset-2 hover:text-[#FFD600] transition-colors"
          >
            Add your first one →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-sm hover:border-gray-300 transition-all duration-200"
            >
              {/* Drag Handle (desktop only) */}
              <button
                type="button"
                className="hidden sm:flex text-gray-300 group-hover:text-gray-400 cursor-grab active:cursor-grabbing transition-colors shrink-0"
                title="Drag to reorder"
              >
                <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
              </button>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                {service.icon || '🎨'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug">
                  {service.title}
                </h3>
                <p className="text-[13px] text-[#6B7280] truncate mt-1">
                  {service.description}
                </p>
              </div>

              {/* Color Swatches (desktop hint) */}
              {(service.card_color || service.text_color) && (
                <div className="hidden md:flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Style</span>
                  <span className={`w-4 h-4 rounded-full border border-gray-200 inline-block ${service.card_color || 'bg-white'}`} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(service)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#1B5BFF] hover:bg-blue-50 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#EF4444] hover:bg-red-50 transition-all disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal.mode !== 'closed' && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                {modal.mode === 'add' ? 'Add Service' : 'Edit Service'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {modal.mode === 'edit' && (
                <input type="hidden" name="id" value={editingService?.id} />
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-600 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </div>
              )}

              {/* Icon */}
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  Icon (emoji)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl shrink-0">
                    {iconPreview || '✨'}
                  </div>
                  <input
                    name="icon"
                    required
                    onChange={(e) => setIconPreview(e.target.value)}
                    className="w-20 text-center px-3 py-2.5 rounded-xl border border-gray-200 text-lg focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                    type="text"
                    defaultValue={editingService?.icon ?? '🎨'}
                  />
                  <p className="text-[12px] text-gray-400">Paste any emoji or short symbol</p>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  Service Title
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all placeholder:text-gray-400"
                  type="text"
                  placeholder="e.g. Brand Identity"
                  defaultValue={editingService?.title ?? ''}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] font-medium text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  rows={3}
                  placeholder="Describe what this service includes..."
                  defaultValue={editingService?.description ?? ''}
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                    Card Background
                  </label>
                  <div className="relative">
                    <select
                      name="card_color"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all appearance-none cursor-pointer bg-white"
                      defaultValue={editingService?.card_color ?? 'bg-white'}
                    >
                      <option value="bg-white">White</option>
                      <option value="bg-brand-cream">Cream</option>
                      <option value="bg-brand-yellow">Yellow</option>
                      <option value="bg-brand-coral">Coral</option>
                      <option value="bg-[#FAFAFA]">Light Gray</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                    Text Color
                  </label>
                  <div className="relative">
                    <select
                      name="text_color"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-[#1A1A1A] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all appearance-none cursor-pointer bg-white"
                      defaultValue={editingService?.text_color ?? 'text-brand-black'}
                    >
                      <option value="text-brand-black">Black</option>
                      <option value="text-brand-coral">Coral</option>
                      <option value="text-brand-blue">Blue</option>
                      <option value="text-white">White</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-[#1A1A1A] bg-[#FFD600] border-2 border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#1a1a1a] transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                >
                  {isPending ? 'Saving...' : modal.mode === 'add' ? 'Add Service' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
