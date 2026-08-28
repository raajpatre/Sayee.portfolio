'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { deleteProject } from '@/lib/actions';
import ProjectForm from './ProjectForm';

export type Project = {
  id: string;
  title: string;
  category: string;
  slug: string;
  description: string;
  cover_image: string;
  featured?: boolean;
  published?: boolean;
  client_name?: string;
  created_at: string;
};

export default function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  if (isAdding) {
    return (
      <div className="max-w-[780px] mx-auto w-full">
        <ProjectForm onBack={() => setIsAdding(false)} />
      </div>
    );
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          (p.client_name && p.client_name.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === 'All Categories' || p.category === categoryFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'Published') matchesStatus = p.published === true;
    if (statusFilter === 'Draft') matchesStatus = p.published === false;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    startTransition(async () => {
      try {
        const result = await deleteProject(id);
        if (result && 'error' in result) {
          alert(result.error);
          return;
        }
        setProjects(prev => prev.filter(p => p.id !== id));
      } catch (err: any) {
        alert(err?.message || 'An unexpected error occurred');
      }
    });
  }

  return (
    <div className="max-w-[1000px] mx-auto w-full pt-8 px-4 md:px-8 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-[22px] font-bold leading-tight mb-1 text-[#1A1A1A]">
            Projects
          </h2>
          <p className="text-[14px] text-[#6B6560]">
            Manage your portfolio projects.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#FFD600] text-[#1A1A1A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#FFDF33] transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Project
        </button>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-[320px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560] text-[20px]">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E8E8] rounded-lg font-body-md text-body-md text-[#1A1A1A] placeholder-[#6B6560] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            placeholder="Search projects..."
            type="text"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-2 font-body-md text-body-md text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] appearance-none pr-10 cursor-pointer"
          >
            <option>All Categories</option>
            <option>Design</option>
            <option>Photography</option>
          </select>
        </div>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-[12px] border border-[#E8E8E8] shadow-subtle overflow-hidden">
        {/* Mobile List View */}
        <div className="block sm:hidden divide-y divide-[#E8E8E8]">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center text-[#9CA3AF]">
              No projects found.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const dateObj = new Date(project.created_at);
              const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <div key={project.id} className="p-4 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <img
                      alt={project.title}
                      className="w-[64px] h-[52px] rounded-lg object-cover bg-gray-100 border border-[#E8E8E8] shrink-0"
                      src={project.cover_image || 'https://via.placeholder.com/56x48?text=No+Image'}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1A1A1A] text-sm truncate">{project.title}</h4>
                      <p className="text-xs text-[#6B6560] truncate">{project.client_name || 'Personal Project'}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{dateString}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex gap-2">
                      <span className="bg-[#FAFAFA] text-[#6B6560] px-2 py-0.5 rounded-[6px] font-bold text-[9px] uppercase tracking-wider border border-[#E8E8E8] select-none">
                        {project.category}
                      </span>
                      {project.published !== false ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider inline-flex items-center gap-1 shadow-sm select-none">
                          <span className="w-1 h-1 rounded-full bg-green-500"></span>
                          Published
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider inline-flex items-center gap-1 shadow-sm select-none">
                          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                          Draft
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/admin/projects/${project.id}/edit`} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#6B6560] hover:text-[#1A1A1A] flex items-center justify-center border border-[#DCDCDC] transition-all">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        disabled={isPending}
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center border border-red-200 transition-all disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop & Tablet Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E8] bg-[#FAFAFA] font-label-md text-label-md text-[#6B6560]">
                <th className="py-4 px-6">Project</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 hidden md:table-cell">Date Added</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md divide-y divide-[#E8E8E8]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#9CA3AF] table-cell">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const dateObj = new Date(project.created_at);
                  const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                  return (
                    <tr key={project.id} className="hover:bg-[#FAFAFA]/50 transition-colors group">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img
                          alt={project.title}
                          className="w-[56px] h-[48px] rounded object-cover bg-gray-100 border border-[#E8E8E8]"
                          src={project.cover_image || 'https://via.placeholder.com/56x48?text=No+Image'}
                        />
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">
                            {project.title}
                          </p>
                          <p className="text-[12px] text-[#6B6560]">{project.client_name || 'Personal Project'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-[#FAFAFA] text-[#6B6560] px-2 py-1 rounded-[8px] font-label-sm text-label-sm border border-[#E8E8E8]">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {project.published !== false ? (
                          <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-label-sm text-label-sm inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Published
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-full font-label-sm text-label-sm inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-[#6B6560] hidden md:table-cell">{dateString}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/projects/${project.id}/edit`} className="text-[#6B6560] hover:text-[#1A1A1A] p-1 inline-flex">
                            <span className="material-symbols-outlined text-[20px]">
                              edit
                            </span>
                          </Link>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            disabled={isPending}
                            className="text-[#6B6560] hover:text-red-600 p-1 disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        {filteredProjects.length > 0 && (
          <div className="border-t border-[#E8E8E8] px-6 py-4 flex items-center justify-between bg-white">
            <p className="text-[12px] text-[#6B6560]">
              Showing {filteredProjects.length} entries
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
