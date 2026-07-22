const fs = require('fs');

const fileContent = `/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
import React from 'react';
import ProjectForm from "@/components/ProjectForm";

export default function Page() {
  return (
    <React.Fragment>
      {/* Top App Bar */}
      <header className="flex justify-between items-center h-16 px-[40px] bg-surface dark:bg-inverse-surface border-b border-[#E8E8E8] sticky top-0 z-40 transition-opacity duration-200 shrink-0">
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-inverse-on-surface">
          Projects
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:bg-[#FFFFFF] p-2 rounded-full transition-opacity opacity-90 hover:opacity-100">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:bg-[#FFFFFF] p-2 rounded-full transition-opacity opacity-90 hover:opacity-100">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="border border-[#E8E8E8] text-[#1A1A1A] font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            View Site
          </button>
          <img
            alt="Administrator Profile"
            className="w-8 h-8 rounded-full object-cover border border-[#E8E8E8]"
            src="https://via.placeholder.com/150"
          />
        </div>
      </header>

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-[16px] md:p-[40px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <ProjectForm />
          </div>
          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-lg">
            <div className="relative w-full sm:w-[320px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560] text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E8E8] rounded-lg font-body-md text-body-md text-[#1A1A1A] placeholder-[#6B6560] focus:outline-none focus:border-[#1A1A1A] focus:ring-0 transition-colors"
                placeholder="Search projects..."
                type="text"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <select className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-2 font-body-md text-body-md text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-0 appearance-none pr-10 cursor-pointer">
                <option>All Categories</option>
                <option>Branding</option>
                <option>UI/UX</option>
                <option>Photography</option>
              </select>
              <select className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-2 font-body-md text-body-md text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-0 appearance-none pr-10 cursor-pointer">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
          {/* Projects Table Card */}
          <div className="bg-white rounded-[12px] shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E8E8] bg-[#FAFAFA] font-label-md text-label-md text-[#6B6560]">
                    <th className="py-4 px-6 w-12">
                      <input
                        className="rounded-[4px] border-[#E8E8E8] text-[#FFD600] focus:ring-0 w-4 h-4 cursor-pointer"
                        type="checkbox"
                      />
                    </th>
                    <th className="py-4 px-6">Project</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date Added</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md divide-y divide-[#E8E8E8]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#FAFAFA]/50 transition-colors group">
                    <td className="py-4 px-6">
                      <input
                        className="rounded-[4px] border-[#E8E8E8] text-[#FFD600] focus:ring-0 w-4 h-4 cursor-pointer"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        alt="FinTech Redesign"
                        className="w-[56px] h-[48px] rounded object-cover bg-gray-100"
                        data-alt="A minimal financial dashboard UI mockup shown on a sleek modern smartphone, angled slightly on a light grey studio background. Clean, high-contrast, premium digital product aesthetic."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb9P9DmSlNgBjVvGPYivlmU22fSFbdgpAmfgYZPRn7aIZKn01mGAUnWKNTCyxy1Xsn5U1r7a63C_f9kWlnvh4LGWArK-LV2_ChQeA7eu-4XJZU_EHyLNEyU8ZkCtFoOEEEZb2K_W8GUhMfgKrfApjikl19fIoqWWQTWUa_YVpCOTlnEtgD6M2ZuAHc3ZAftYqsp2iVNYtZJF393ZNEYF8mioKSa_udo39CUzG24w5INLzLu-hrSrxn"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          FinTech Redesign
                        </p>
                        <p className="text-[12px] text-[#6B6560]">Nexus Bank</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAFAFA] text-[#6B6560] px-2 py-1 rounded-[8px] font-label-sm text-label-sm">
                        UI/UX
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-label-sm text-label-sm inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Published
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#6B6560]">Oct 24, 2023</td>
                    <td className="py-4 px-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#6B6560] hover:text-[#1A1A1A] p-1">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="text-[#6B6560] hover:text-red-600 p-1 ml-2">
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-[#FAFAFA]/50 transition-colors group">
                    <td className="py-4 px-6">
                      <input
                        className="rounded-[4px] border-[#E8E8E8] text-[#FFD600] focus:ring-0 w-4 h-4 cursor-pointer"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        alt="EcoBrand Identity"
                        className="w-[56px] h-[48px] rounded object-cover bg-gray-100"
                        data-alt="Eco-friendly brand identity presentation featuring organic shapes in sage green and cream printed on textured recycled paper stationery. Flat lay composition, soft natural lighting, elegant organic aesthetic."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT4sgJhKsxkjGF3CbyXp2MXW580swzMnqsx4n3h1UoJ1f5SZONPrTZfVaniy-yCzTsgub6VVSBeMz5ZGiZAHxy0FAQt5owvJ7WVw1YS8JKbhf-t1snBK7UyZkNCfwink99XDHPEUAhwpR-Iuhnh2iDq1qlqZ8bYEtUZPfQBE1a7cuLRvP3R0NiW3mwUiECBjq8BrDkqURxxMqYQyIFjzOa4DzTDlMvU9qPDIC3TCPbKnF3UaRd9sA_"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          EcoBrand Identity
                        </p>
                        <p className="text-[12px] text-[#6B6560]">Verdant Co.</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAFAFA] text-[#6B6560] px-2 py-1 rounded-[8px] font-label-sm text-label-sm">
                        Branding
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-full font-label-sm text-label-sm inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Draft
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#6B6560]">Oct 21, 2023</td>
                    <td className="py-4 px-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#6B6560] hover:text-[#1A1A1A] p-1">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="text-[#6B6560] hover:text-red-600 p-1 ml-2">
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-[#FAFAFA]/50 transition-colors group">
                    <td className="py-4 px-6">
                      <input
                        className="rounded-[4px] border-[#E8E8E8] text-[#FFD600] focus:ring-0 w-4 h-4 cursor-pointer"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        alt="Bloom Studio"
                        className="w-[56px] h-[48px] rounded object-cover bg-gray-100"
                        data-alt="A modern interior architecture shot of a minimalist studio space with concrete floors, white walls, and a single statement designer chair bathed in natural sunlight. High contrast, clean, editorial photography style."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGWCr7F7ahrv522gzeugoY1JW2qK18EKMhvA72yuFc9P2nIwxXhJMF7wv8dtOLcX9Y9OVIL2w2QLerevIGbcsMnxGeaBh9_93BZADr1n5LQ5XFEawitzPJrNhNj3w84xj-_hwK6tca9vWiFtIP5xAdTaNAdR-12x2Uc5jfYl0b4F3ogj2SKZzVcnHuyE_po3Y_6XXIpU_c4d9z__ZrUL5sF_yg8Blh3xkA9UwDgFtfJwuTAOWO_pbf"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">Bloom Studio</p>
                        <p className="text-[12px] text-[#6B6560]">Internal</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-[#FAFAFA] text-[#6B6560] px-2 py-1 rounded-[8px] font-label-sm text-label-sm">
                        Photography
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-label-sm text-label-sm inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Published
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#6B6560]">Oct 15, 2023</td>
                    <td className="py-4 px-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#6B6560] hover:text-[#1A1A1A] p-1">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="text-[#6B6560] hover:text-red-600 p-1 ml-2">
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="border-t border-[#E8E8E8] px-6 py-4 flex items-center justify-between bg-white">
              <p className="text-[12px] text-[#6B6560]">
                Showing 1 to 5 of 24 entries
              </p>
              <div className="flex items-center gap-1 font-label-md text-label-md">
                <button className="px-3 py-1 text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>{" "}
                  Previous
                </button>
                <button className="w-8 h-8 rounded-full bg-[#FAFAFA] text-[#1A1A1A] font-semibold flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-full text-[#6B6560] hover:bg-[#FAFAFA] hover:text-[#1A1A1A] transition-colors flex items-center justify-center">
                  2
                </button>
                <button className="w-8 h-8 rounded-full text-[#6B6560] hover:bg-[#FAFAFA] hover:text-[#1A1A1A] transition-colors flex items-center justify-center">
                  3
                </button>
                <button className="px-3 py-1 text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
                  Next{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
`;

fs.writeFileSync('src/app/admin/projects/page.tsx', fileContent);
