/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
export default function Page() {
  return (
    <>
      {/* SideNavBar (Predicted) */}
      <aside className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-brand-border z-10 flex flex-col py-lg hidden md:flex">
        <div className="px-md mb-8">
          <h1 className="font-headline-md text-headline-md font-bold text-brand-text">
            Portfolio CMS
          </h1>
          <p className="font-body-md text-body-md text-brand-subtext">
            Admin Console
          </p>
        </div>
        <div className="px-md mb-6">
          <button className="w-full bg-primary-container text-brand-text font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span> New
            Project
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>{" "}
            Dashboard
          </a>
          {/* Active State */}
          <a
            className="flex items-center gap-md px-md py-sm bg-primary-container text-brand-text border-l-4 border-primary font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              folder_special
            </span>{" "}
            Projects
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">person_outline</span>{" "}
            Bio
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">verified</span>{" "}
            Credentials
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">reviews</span>{" "}
            Testimonials
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span> Blog
            Links
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-brand-subtext hover:bg-surface-container-low transition-colors duration-200 font-body-md text-body-md cursor-pointer active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">work_outline</span>{" "}
            Services
          </a>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 md:ml-[260px] pt-16">
        {/* TopAppBar (Predicted) */}
        <header className="h-16 fixed top-0 right-0 left-0 md:left-[260px] bg-surface-container-lowest border-b border-brand-border shadow-sm flex justify-between items-center px-lg w-full z-20">
          <div className="flex items-center gap-4">
            <span className="md:hidden material-symbols-outlined cursor-pointer">
              menu
            </span>
            <span className="font-headline-sm text-headline-sm font-semibold text-brand-text">
              Admin Workspace
            </span>
          </div>
          <div className="flex items-center gap-4 text-brand-subtext">
            <span className="material-symbols-outlined cursor-pointer hover:text-brand-text transition-all duration-300">
              notifications
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-brand-text transition-all duration-300">
              settings
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-brand-text transition-all duration-300">
              help_outline
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-border overflow-hidden">
              <img
                alt="Administrator"
                className="w-full h-full object-cover"
                data-alt="A small circular profile picture of an administrator, featuring a sleek, professional aesthetic. Light mode, bright and clean."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChI43rGdO0foFrywjh2c7NJJJiy_pRwx8RnUUgOgT-72xJuu6YIOGYfj4LUoNvlHOOR3b1dUrmokoLwcNXnkS_ikEh53M3wrV7i0y82Psgo2CH-ombB9fBffI1w4nQA7wxy6cFEMYp7D9dn88nC6oAkSK_7Qb-EzRqUV76AD7rCCxazbsdYSGBYy9EARDN6GyZJ2OgCROegBvoNBthThD9VbMVOdCECQ_FDghpXfLxZD4Ls8YSChQ3"
              />
            </div>
          </div>
        </header>
        {/* Form Workspace */}
        <div className="p-xl max-w-[800px] mx-auto mt-8 mb-24">
          {/* Page Header */}
          <div className="mb-8">
            <a
              className="inline-flex items-center text-brand-subtext text-sm hover:text-brand-text mb-4 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-sm mr-1">
                arrow_back
              </span>{" "}
              Back to Projects
            </a>
            <h2 className="text-[22px] font-bold text-brand-text">
              Add New Project
            </h2>
          </div>
          {/* Form Card */}
          <form className="bg-surface rounded-lg border border-brand-border p-xl shadow-level-2">
            {/* Section 1: Basic Info */}
            <section className="mb-8">
              <div className="mb-6">
                <label className="form-label" htmlFor="project-title">
                  Title
                </label>
                <input
                  className="form-input w-full"
                  id="project-title"
                  placeholder="e.g. Acme Rebrand 2024"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="form-label" htmlFor="project-category">
                    Category
                  </label>
                  <select
                    className="form-select w-full bg-white"
                    id="project-category"
                  >
                    <option>Select a category</option>
                    <option>Carousel</option>
                    <option>Thumbnail</option>
                    <option>Print</option>
                    <option>Brand</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="project-client">
                    Client Name{" "}
                    <span className="text-brand-subtext font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    className="form-input w-full"
                    id="project-client"
                    placeholder="e.g. Acme Corp"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="project-desc">
                  Description
                </label>
                <textarea
                  className="form-textarea w-full"
                  id="project-desc"
                  placeholder="Briefly describe the project scope and outcome..."
                  rows={5}
                ></textarea>
              </div>
            </section>
            <hr className="border-brand-border mb-8" />
            {/* Section 2: Project Images */}
            <section className="mb-8">
              <div className="mb-4">
                <h3 className="text-[15px] font-semibold text-brand-text">
                  Project Images
                </h3>
                <p className="text-[13px] font-normal text-brand-subtext">
                  Upload high-resolution images. The first image will be used as
                  the cover.
                </p>
              </div>
              {/* Upload Area */}
              <div className="border-2 border-dashed border-brand-border rounded-lg bg-[#FAFAFA] p-2xl flex flex-col items-center justify-center text-center mb-6 cursor-pointer hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-4xl text-brand-subtext mb-2">
                  cloud_upload
                </span>
                <p className="text-sm font-semibold text-brand-text mb-1">
                  Drag &amp; drop images here
                </p>
                <p className="text-xs text-brand-subtext mb-4">
                  PNG, JPG up to 10MB
                </p>
                <button
                  className="border border-brand-border bg-transparent text-brand-text text-sm font-semibold py-2 px-4 rounded-lg hover:bg-brand-border transition-colors"
                  type="button"
                >
                  Browse files
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {/* Cover Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="w-full h-full rounded-lg border-2 border-primary overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A placeholder thumbnail for a portfolio project, showing an abstract geometric design. Clean, professional, light mode."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfkh-J1LbM6t2TbLgJfKU1mJKoVD-miAXRVnpI2G8qd3d2aXuK02ixgluaUgUBmUWvyDqbsYBT-9DkJtWvS6zqy3g0ODD23WPrB1s2PAZYtMuDWG7nLNFb3h-lDjplcKoX4IlpoG2k1-0gr831-unsxPHwngAtMnljuLZqQXy1zg1KOmZ023Ej2uFzrYNzhB65IAZ_YjJctcacM0157ksJ0q9YTpnDmtlcPlPfSa15e8hdTseNTo6U"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 bg-primary-container text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                    Cover
                  </div>
                  <button
                    className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-subtext hover:text-error shadow-sm z-10"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      close
                    </span>
                  </button>
                </div>
                {/* Secondary Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="w-full h-full rounded-lg border border-brand-border overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Another placeholder thumbnail for a portfolio project, showing a digital interface mockup. Professional, bright."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMLTKz1wGStOPLlbrdaqSoR00eV6mygOTAOJJ2YgmQg35y6RxZXNaHuWKqCrHm5DnTwu6vB1_Uq5p3WfPRByqal2L26N7h41hUrXZgmfFcZbx_XMxRX8xkTpeipjAY-OPwAgNhF83NX3PQB98-hguS0E_BocspLLMbTvwvez1t6v4huMoVCpPuAFnuldEgOmcokXu41MS37wKBMQEq3StqQe2RALmy8BuglNxAudHeWELR2ZRN_EvO"
                    />
                  </div>
                  <button
                    className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-subtext hover:text-error shadow-sm z-10"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      close
                    </span>
                  </button>
                </div>
              </div>
            </section>
            <hr className="border-brand-border mb-8" />
            {/* Section 3: Settings */}
            <section className="mb-8">
              <h3 className="text-[15px] font-semibold text-brand-text mb-4">
                Settings
              </h3>
              <div className="flex items-center justify-between py-3 border-b border-brand-border">
                <div>
                  <p className="font-semibold text-sm text-brand-text">
                    Featured
                  </p>
                  <p className="text-xs text-brand-subtext">
                    Show this on the homepage grid
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    defaultChecked
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-brand-border right-5 transition-all duration-300"
                    id="toggle-featured"
                    name="toggle"
                    type="checkbox"
                  />
                  <label
                    className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-border cursor-pointer transition-colors duration-300"
                    htmlFor="toggle-featured"
                  ></label>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-sm text-brand-text">
                    Published
                  </p>
                  <p className="text-xs text-brand-subtext">
                    Make visible on the public site
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    defaultChecked
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-brand-border right-5 transition-all duration-300"
                    id="toggle-published"
                    name="toggle"
                    type="checkbox"
                  />
                  <label
                    className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-border cursor-pointer transition-colors duration-300"
                    htmlFor="toggle-published"
                  ></label>
                </div>
              </div>
            </section>
            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-brand-border">
              <button
                className="px-6 py-3 border border-brand-border bg-transparent text-brand-text rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors"
                type="button"
              >
                Discard
              </button>
              <button
                className="px-[28px] py-[12px] bg-primary-container text-brand-text rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
                type="submit"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* Minimal Script for Toggle Visuals (Tailwind handles most, this ensures initial state matches check property if complex) */}
    </>
  );
}
