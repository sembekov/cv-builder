import { useEffect, useState } from 'react'
import ResumeEditor from './components/ResumeEditor'
import {
  createResume,
  getResumes,
  updateResume,
} from './services/resumeService'
import type { Resume, ResumePayload } from './types/resume'

function App() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showEditor, setShowEditor] = useState(false)
  const [selectedResume, setSelectedResume] = useState<Resume | undefined>()

  useEffect(() => {
    loadResumes()
  }, [])

  async function loadResumes() {
    try {
      setError(null)
      const data = await getResumes()
      setResumes(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong',
      )
    } finally {
      setLoading(false)
    }
  }

  function openNewResume() {
    setSelectedResume(undefined)
    setShowEditor(true)
  }

  function openExistingResume(resume: Resume) {
    setSelectedResume(resume)
    setShowEditor(true)
  }

  async function handleSave(data: ResumePayload) {
    if (selectedResume) {
      await updateResume(selectedResume.id, data)
    } else {
      await createResume(data)
    }

    await loadResumes()

    setShowEditor(false)
    setSelectedResume(undefined)
  }

  if (showEditor) {
    return (
      <ResumeEditor
        initialResume={selectedResume}
        onBack={() => setShowEditor(false)}
        onSave={handleSave}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#101114] text-[#E5E7EB]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-[#272930] bg-[#141519] px-5 py-7 lg:flex">
          <div className="mb-12 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-lg font-bold text-violet-300 ring-1 ring-violet-400/20">
              C
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Craft<span className="text-violet-400">CV</span>
            </span>
          </div>

          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#666A76]">
            Workspace
          </div>

          <nav className="space-y-1">
            <a
              href="#dashboard"
              className="flex items-center gap-3 rounded-lg border border-violet-400/10 bg-violet-400/10 px-3 py-2.5 text-sm font-medium text-violet-300"
            >
              <span>▦</span>
              Dashboard
            </a>

            <a
              href="#resumes"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#9295A1] transition hover:bg-[#202127] hover:text-white"
            >
              <span>▤</span>
              My resumes
            </a>

            <a
              href="#templates"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#9295A1] transition hover:bg-[#202127] hover:text-white"
            >
              <span>▧</span>
              Templates
            </a>
          </nav>

          <div className="mt-auto rounded-xl border border-[#292B34] bg-[#1A1B20] p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#282332] text-violet-300">
              ✦
            </div>

            <p className="text-sm font-medium text-[#E5E7EB]">
              Make your next move
            </p>

            <p className="mt-1.5 text-xs leading-5 text-[#858895]">
              Build a professional resume and get ready for new opportunities.
            </p>
          </div>

          <div className="mt-5 border-t border-[#272930] pt-5">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#292B34] text-sm font-semibold text-[#C4B5FD]">
                U
              </div>

              <div>
                <p className="text-sm font-medium">My workspace</p>
                <p className="text-xs text-[#777B87]">Personal account</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <main className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-[#272930] bg-[#141519] px-6 md:px-10">
            <div>
              <p className="text-xs text-[#777B87]">
                Workspace <span className="mx-1.5">/</span> Dashboard
              </p>

              <h1 className="mt-1 text-lg font-semibold tracking-tight">
                Dashboard
              </h1>
            </div>

            <button
              type="button"
              onClick={openNewResume}
              className="rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              + New resume
            </button>
          </header>

          <div className="mx-auto max-w-[1440px] p-6 md:p-10">
            {/* Welcome section */}
            <section className="relative overflow-hidden rounded-2xl border border-[#34303F] bg-[#1A1821] p-7 md:p-9">
              <div className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full bg-violet-500/[0.08] blur-3xl" />

              <div className="relative max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Your career workspace
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Build a resume that
                  <span className="text-violet-300"> gets noticed.</span>
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-[#9A9BA8]">
                  Create a polished resume, customize every section, and
                  export it as a professional PDF.
                </p>

                <button
                  type="button"
                  onClick={openNewResume}
                  className="mt-6 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Create a resume →
                </button>
              </div>
            </section>

            {/* Resume list */}
            <section className="mt-10" id="resumes">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Your resumes
                  </h2>

                  <p className="mt-1 text-sm text-[#858895]">
                    Manage and edit your professional documents.
                  </p>
                </div>

                <div className="rounded-lg border border-[#2B2D35] bg-[#191A1F] px-3 py-2 text-xs text-[#A1A3AE]">
                  <span className="font-semibold text-white">
                    {resumes.length}
                  </span>{' '}
                  documents
                </div>
              </div>

              {loading && (
                <div className="rounded-xl border border-[#292B34] bg-[#17181D] py-16 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#393B45] border-t-violet-400" />

                  <p className="mt-4 text-sm text-[#858895]">
                    Loading your resumes...
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-5">
                  <p className="text-sm font-semibold text-red-300">
                    Could not load resumes
                  </p>

                  <p className="mt-1 text-sm text-red-300/70">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={loadResumes}
                    className="mt-3 text-xs font-semibold text-red-300 underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!loading && !error && resumes.length === 0 && (
                <div className="rounded-xl border border-dashed border-[#353741] bg-[#17181D] px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#34303F] bg-[#211D2B] text-xl text-violet-300">
                    +
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white">
                    No resumes yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#858895]">
                    Your workspace is ready. Create your first resume to get
                    started.
                  </p>

                  <button
                    type="button"
                    onClick={openNewResume}
                    className="mt-5 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400"
                  >
                    Create your first resume
                  </button>
                </div>
              )}

              {!loading && !error && resumes.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {resumes.map((resume) => (
                    <article
                      key={resume.id}
                      className="group overflow-hidden rounded-xl border border-[#2B2D35] bg-[#191A1F] transition duration-200 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#1C1D23]"
                    >
                      {/* Document thumbnail */}
                      <div className="flex h-48 items-center justify-center border-b border-[#292B34] bg-[#202127] p-5">
                        <div className="h-full w-[125px] overflow-hidden rounded-sm bg-[#F5F5F4] p-3 shadow-xl transition duration-200 group-hover:scale-[1.03]">
                          <div className="border-b border-[#D6D3D1] pb-2">
                            <div className="h-2 w-16 rounded-sm bg-[#292524]" />
                            <div className="mt-1.5 h-1 w-12 rounded-sm bg-[#A8A29E]" />
                          </div>

                          <div className="mt-3">
                            <div className="h-1 w-9 rounded-sm bg-[#57534E]" />
                            <div className="mt-2 h-1 w-full rounded-sm bg-[#D6D3D1]" />
                            <div className="mt-1 h-1 w-4/5 rounded-sm bg-[#D6D3D1]" />
                            <div className="mt-1 h-1 w-11/12 rounded-sm bg-[#D6D3D1]" />
                          </div>

                          <div className="mt-3">
                            <div className="h-1 w-12 rounded-sm bg-[#57534E]" />
                            <div className="mt-2 h-1 w-full rounded-sm bg-[#D6D3D1]" />
                            <div className="mt-1 h-1 w-3/4 rounded-sm bg-[#D6D3D1]" />
                            <div className="mt-1 h-1 w-5/6 rounded-sm bg-[#D6D3D1]" />
                          </div>

                          <div className="mt-3">
                            <div className="h-1 w-10 rounded-sm bg-[#57534E]" />
                            <div className="mt-2 h-1 w-full rounded-sm bg-[#D6D3D1]" />
                            <div className="mt-1 h-1 w-4/5 rounded-sm bg-[#D6D3D1]" />
                          </div>
                        </div>
                      </div>

                      {/* Resume details */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-[#E5E7EB]">
                              {resume.fullName || 'Untitled resume'}
                            </h3>

                            <p className="mt-1 truncate text-xs text-[#858895]">
                              {resume.email}
                            </p>
                          </div>

                          <span className="text-[#777B87]">···</span>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-[#2B2D35] pt-4">
                          <span className="text-[11px] text-[#777B87]">
                            Resume #{resume.id}
                          </span>

                          <button
                            type="button"
                            onClick={() => openExistingResume(resume)}
                            className="text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                          >
                            Open editor →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
