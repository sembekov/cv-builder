import { useState } from 'react'
import type { ReactNode } from 'react'
import type {
  Education,
  Resume,
  ResumePayload,
  WorkExperience,
} from '../types/resume'

interface ResumeEditorProps {
  initialResume?: Resume
  onBack: () => void
  onSave: (resume: ResumePayload) => Promise<void>
}

const createEmptyResume = (): ResumePayload => ({
  fullName: '',
  email: '',
  summary: '',
  phoneNumber: '',
  education: [],
  skills: [],
  workExperience: [],
  location: '',
})

export default function ResumeEditor({
  initialResume,
  onBack,
  onSave,
}: ResumeEditorProps) {
  const [form, setForm] = useState<ResumePayload>(() => {
    if (!initialResume) return createEmptyResume()

    const {
      id: _id,
      ...resumeData
    } = initialResume

    return {
      ...resumeData,
      education: resumeData.education ?? [],
      skills: resumeData.skills ?? [],
      workExperience: resumeData.workExperience ?? [],
      summary: resumeData.summary ?? '',
      phoneNumber: resumeData.phoneNumber ?? '',
      location: resumeData.location ?? '',
    }
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [skillInput, setSkillInput] = useState('')

  function updateField<K extends keyof ResumePayload>(
    field: K,
    value: ResumePayload[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function updateEducation(
    index: number,
    field: keyof Education,
    value: string | null,
  ) {
    const updated = [...form.education]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    updateField('education', updated)
  }

  function addEducation() {
    updateField('education', [
      ...form.education,
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: null,
        endDate: null,
      },
    ])
  }

  function removeEducation(index: number) {
    updateField(
      'education',
      form.education.filter((_, i) => i !== index),
    )
  }

  function updateExperience(
    index: number,
    field: keyof WorkExperience,
    value: string | null,
  ) {
    const updated = [...form.workExperience]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    updateField('workExperience', updated)
  }

  function addExperience() {
    updateField('workExperience', [
      ...form.workExperience,
      {
        companyName: '',
        position: '',
        description: '',
        startDate: null,
        endDate: null,
      },
    ])
  }

  function removeExperience(index: number) {
    updateField(
      'workExperience',
      form.workExperience.filter((_, i) => i !== index),
    )
  }

  function addSkill() {
    const skill = skillInput.trim()

    if (!skill) return

    const alreadyExists = form.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    )

    if (alreadyExists) {
      setSkillInput('')
      return
    }

    updateField('skills', [...form.skills, skill])
    setSkillInput('')
  }

  function removeSkill(skill: string) {
    updateField(
      'skills',
      form.skills.filter((item) => item !== skill),
    )
  }

  async function handleSave() {
    setError(null)

    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Full name and email are required.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (form.skills.length === 0) {
      setError('Please add at least one skill.')
      return
    }

    try {
      setSaving(true)
      await onSave(form)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not save resume.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#101114] text-[#E5E7EB]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#292B34] bg-[#141519]/95 px-5 backdrop-blur md:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-[#30323B] px-3 py-2 text-sm text-[#A1A3AE] transition hover:bg-[#25262D] hover:text-white"
          >
            ← Back
          </button>

          <div>
            <p className="text-xs text-[#777B87]">
              Workspace / Editor
            </p>
            <h1 className="text-sm font-semibold">
              {initialResume ? 'Edit resume' : 'Create resume'}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save resume'}
        </button>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:p-7">
        {/* LEFT: FORM */}
        <section className="min-w-0 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300">
              Resume editor
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Build your resume
            </h2>

            <p className="mt-2 text-sm text-[#858895]">
              Add your information. Your document updates automatically.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/[0.07] p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Personal information */}
          <section className="rounded-xl border border-[#2B2D35] bg-[#191A1F] p-5">
            <SectionTitle
              number="01"
              title="Personal information"
              subtitle="Your contact details"
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    updateField('fullName', e.target.value)
                  }
                  placeholder="John Smith"
                />
              </Field>

              <Field label="Professional email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField('email', e.target.value)
                  }
                  placeholder="john@example.com"
                />
              </Field>

              <Field label="Phone number">
                <input
                  value={form.phoneNumber}
                  onChange={(e) =>
                    updateField('phoneNumber', e.target.value)
                  }
                  placeholder="+7 700 123 4567"
                />
              </Field>

              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(e) =>
                    updateField('location', e.target.value)
                  }
                  placeholder="Almaty, Kazakhstan"
                />
              </Field>
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-xl border border-[#2B2D35] bg-[#191A1F] p-5">
            <SectionTitle
              number="02"
              title="Professional summary"
              subtitle="A short introduction about you"
            />

            <div className="mt-5">
              <Field label="About you">
                <textarea
                  rows={5}
                  value={form.summary}
                  onChange={(e) =>
                    updateField('summary', e.target.value)
                  }
                  placeholder="Write a short summary of your professional background, strengths and goals..."
                />
              </Field>
            </div>
          </section>

          {/* Work experience */}
          <section className="rounded-xl border border-[#2B2D35] bg-[#191A1F] p-5">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle
                number="03"
                title="Work experience"
                subtitle="Your professional background"
              />

              <AddButton onClick={addExperience} />
            </div>

            {form.workExperience.length === 0 && (
              <EmptySection text="No work experience added yet." />
            )}

            <div className="mt-5 space-y-4">
              {form.workExperience.map((experience, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#30323B] bg-[#15161A] p-4"
                >
                  <ItemHeader
                    title={`Experience ${index + 1}`}
                    onRemove={() => removeExperience(index)}
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Company">
                      <input
                        value={experience.companyName}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'companyName',
                            e.target.value,
                          )
                        }
                        placeholder="Company name"
                      />
                    </Field>

                    <Field label="Position">
                      <input
                        value={experience.position}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'position',
                            e.target.value,
                          )
                        }
                        placeholder="Software Engineer"
                      />
                    </Field>

                    <Field label="Start date">
                      <input
                        type="date"
                        value={experience.startDate ?? ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'startDate',
                            e.target.value || null,
                          )
                        }
                      />
                    </Field>

                    <Field label="End date">
                      <input
                        type="date"
                        value={experience.endDate ?? ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'endDate',
                            e.target.value || null,
                          )
                        }
                      />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Description">
                      <textarea
                        rows={3}
                        value={experience.description}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'description',
                            e.target.value,
                          )
                        }
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="rounded-xl border border-[#2B2D35] bg-[#191A1F] p-5">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle
                number="04"
                title="Education"
                subtitle="Your academic background"
              />

              <AddButton onClick={addEducation} />
            </div>

            {form.education.length === 0 && (
              <EmptySection text="No education added yet." />
            )}

            <div className="mt-5 space-y-4">
              {form.education.map((education, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#30323B] bg-[#15161A] p-4"
                >
                  <ItemHeader
                    title={`Education ${index + 1}`}
                    onRemove={() => removeEducation(index)}
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Institution">
                      <input
                        value={education.institution}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'institution',
                            e.target.value,
                          )
                        }
                        placeholder="University name"
                      />
                    </Field>

                    <Field label="Degree">
                      <input
                        value={education.degree}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'degree',
                            e.target.value,
                          )
                        }
                        placeholder="Bachelor's degree"
                      />
                    </Field>

                    <Field label="Field of study">
                      <input
                        value={education.fieldOfStudy}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'fieldOfStudy',
                            e.target.value,
                          )
                        }
                        placeholder="Computer Science"
                      />
                    </Field>

                    <Field label="Start date">
                      <input
                        type="date"
                        value={education.startDate ?? ''}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'startDate',
                            e.target.value || null,
                          )
                        }
                      />
                    </Field>

                    <Field label="End date">
                      <input
                        type="date"
                        value={education.endDate ?? ''}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'endDate',
                            e.target.value || null,
                          )
                        }
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-[#2B2D35] bg-[#191A1F] p-5">
            <SectionTitle
              number="05"
              title="Skills"
              subtitle="Your technical and professional skills"
            />

            <div className="mt-5 flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                placeholder="Add a skill, e.g. Java"
                className="min-w-0 flex-1"
              />

              <button
                type="button"
                onClick={addSkill}
                className="rounded-lg border border-[#45404F] px-4 text-sm font-medium text-violet-300 transition hover:bg-violet-500/10"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-400/15 bg-violet-400/[0.07] px-3 py-1.5 text-xs text-violet-200"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="text-violet-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-violet-500 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save resume'}
          </button>
        </section>

        {/* RIGHT: LIVE PREVIEW */}
        <aside className="min-w-0 lg:sticky lg:top-[88px] lg:h-[calc(100vh-112px)]">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#2B2D35] bg-[#191A1F]">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#2B2D35] px-5">
              <div>
                <h3 className="text-sm font-semibold">Live preview</h3>
                <p className="text-[11px] text-[#777B87]">
                  Changes appear instantly
                </p>
              </div>

              <span className="rounded-md border border-[#343640] px-2 py-1 text-[10px] text-[#A1A3AE]">
                A4 · Preview
              </span>
            </div>

            <div className="flex-1 overflow-auto bg-[#202127] p-4 md:p-7">
              <div className="mx-auto min-h-[842px] w-full max-w-[595px] bg-white p-7 text-[#292524] shadow-2xl sm:p-10">
                <header className="border-b-2 border-[#292524] pb-5">
                  <h1 className="break-words text-3xl font-bold tracking-tight">
                    {form.fullName || 'Your Name'}
                  </h1>

                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#57534E]">
                    Professional Resume
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#57534E]">
                    {form.email && <span>{form.email}</span>}
                    {form.phoneNumber && <span>{form.phoneNumber}</span>}
                    {form.location && <span>{form.location}</span>}
                  </div>
                </header>

                <PreviewSection title="Profile">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[#57534E]">
                    {form.summary ||
                      'Your professional summary will appear here.'}
                  </p>
                </PreviewSection>

                {form.workExperience.length > 0 && (
                  <PreviewSection title="Work experience">
                    {form.workExperience.map((item, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex flex-wrap justify-between gap-2">
                          <h3 className="text-sm font-bold">
                            {item.position || 'Position'}
                          </h3>

                          <span className="text-xs text-[#78716C]">
                            {item.startDate || 'Start'} —{' '}
                            {item.endDate || 'Present'}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold text-[#57534E]">
                          {item.companyName || 'Company'}
                        </p>

                        {item.description && (
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-[#57534E]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </PreviewSection>
                )}

                {form.education.length > 0 && (
                  <PreviewSection title="Education">
                    {form.education.map((item, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <h3 className="text-sm font-bold">
                          {item.institution || 'Institution'}
                        </h3>

                        <p className="mt-1 text-xs text-[#57534E]">
                          {[item.degree, item.fieldOfStudy]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>

                        <p className="mt-1 text-xs text-[#78716C]">
                          {item.startDate || 'Start'} —{' '}
                          {item.endDate || 'Present'}
                        </p>
                      </div>
                    ))}
                  </PreviewSection>
                )}

                {form.skills.length > 0 && (
                  <PreviewSection title="Skills">
                    <div className="flex flex-wrap gap-2">
                      {form.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded border border-[#D6D3D1] px-2 py-1 text-xs text-[#57534E]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </PreviewSection>
                )}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

/* Reusable UI components */

function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm text-violet-300">
        {number}
      </span>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-0.5 text-xs text-[#777B87]">{subtitle}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block min-w-0 space-y-2">
      <span className="block text-xs font-medium text-[#A1A3AE]">
        {label}
      </span>

      {children}
    </label>
  )
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
    >
      + Add
    </button>
  )
}

function ItemHeader({
  title,
  onRemove,
}: {
  title: string
  onRemove: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-[#A1A3AE]">{title}</span>

      <button
        type="button"
        onClick={onRemove}
        className="text-xs text-red-400 transition hover:text-red-300"
      >
        Remove
      </button>
    </div>
  )
}

function EmptySection({ text }: { text: string }) {
  return (
    <p className="mt-5 rounded-lg border border-dashed border-[#353741] px-4 py-5 text-center text-xs text-[#777B87]">
      {text}
    </p>
  )
}

function PreviewSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 border-b border-[#D6D3D1] pb-2 text-xs font-bold uppercase tracking-[0.12em]">
        {title}
      </h2>

      {children}
    </section>
  )
}
