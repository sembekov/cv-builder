import type { ReactNode } from 'react'
import type { ResumePayload, ResumeTemplate } from '../types/resume'

interface ResumePreviewProps {
  resume: ResumePayload
}

function formatDate(date: string | null): string {
  if (!date) return 'Present'

  const parsed = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function DateRange({
  startDate,
  endDate,
}: {
  startDate: string | null
  endDate: string | null
}) {
  return (
    <span>
      {startDate ? formatDate(startDate) : 'Start date'} —{' '}
      {formatDate(endDate)}
    </span>
  )
}

function ContactDetails({ resume }: { resume: ResumePayload }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {resume.email && <span>{resume.email}</span>}
      {resume.phoneNumber && <span>{resume.phoneNumber}</span>}
      {resume.location && <span>{resume.location}</span>}
    </div>
  )
}

function ModernTemplate({ resume }: { resume: ResumePayload }) {
  return (
    <article className="resume-paper resume-modern min-h-[842px] w-full max-w-[595px] bg-white p-8 text-[#25233A] shadow-2xl sm:p-10">
      <header className="border-b-4 border-violet-600 pb-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600">
          Professional resume
        </p>

        <h1 className="break-words text-4xl font-bold tracking-tight">
          {resume.fullName || 'Your Name'}
        </h1>

        <div className="mt-4 text-[#666477]">
          <ContactDetails resume={resume} />
        </div>
      </header>

      {resume.summary && (
        <section className="mt-7">
          <ModernHeading>Profile</ModernHeading>
          <p className="whitespace-pre-wrap text-[13px] leading-6 text-[#555366]">
            {resume.summary}
          </p>
        </section>
      )}

      {resume.workExperience.length > 0 && (
        <section className="mt-7">
          <ModernHeading>Experience</ModernHeading>
          <div className="space-y-5">
            {resume.workExperience.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-sm font-bold">
                    {item.position || 'Position'}
                  </h3>
                  <span className="text-[11px] text-[#777487]">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                    />
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-violet-700">
                  {item.companyName || 'Company'}
                </p>
                {item.description && (
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-[#666477]">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mt-7">
          <ModernHeading>Education</ModernHeading>
          <div className="space-y-4">
            {resume.education.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-sm font-bold">
                    {item.institution || 'Institution'}
                  </h3>
                  <span className="text-[11px] text-[#777487]">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                    />
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#666477]">
                  {[item.degree, item.fieldOfStudy]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mt-7">
          <ModernHeading>Skills</ModernHeading>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

function ModernHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-[#E8E6F0] pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700">
      {children}
    </h2>
  )
}

function MinimalTemplate({ resume }: { resume: ResumePayload }) {
  return (
    <article className="resume-paper resume-minimal min-h-[842px] w-full max-w-[595px] bg-white p-8 text-[#171717] shadow-2xl sm:p-11">
      <header className="border-b border-black pb-5">
        <h1 className="break-words text-4xl font-normal tracking-tight">
          {resume.fullName || 'Your Name'}
        </h1>
        <div className="mt-3 text-[11px] text-[#555]">
          <ContactDetails resume={resume} />
        </div>
      </header>

      {resume.summary && (
        <MinimalSection title="Summary">
          <p className="whitespace-pre-wrap text-xs leading-6">
            {resume.summary}
          </p>
        </MinimalSection>
      )}

      {resume.workExperience.length > 0 && (
        <MinimalSection title="Experience">
          <div className="space-y-5">
            {resume.workExperience.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {item.position || 'Position'}
                    {item.companyName && `, ${item.companyName}`}
                  </h3>
                  <span className="text-[10px] text-[#666]">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                    />
                  </span>
                </div>
                {item.description && (
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-[#444]">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </MinimalSection>
      )}

      {resume.education.length > 0 && (
        <MinimalSection title="Education">
          <div className="space-y-4">
            {resume.education.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {item.institution || 'Institution'}
                  </h3>
                  <span className="text-[10px] text-[#666]">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                    />
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#444]">
                  {[item.degree, item.fieldOfStudy]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            ))}
          </div>
        </MinimalSection>
      )}

      {resume.skills.length > 0 && (
        <MinimalSection title="Skills">
          <p className="text-xs leading-6 text-[#333]">
            {resume.skills.join('  ·  ')}
          </p>
        </MinimalSection>
      )}
    </article>
  )
}

function MinimalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ProfessionalTemplate({ resume }: { resume: ResumePayload }) {
  return (
    <article className="resume-paper resume-professional min-h-[842px] w-full max-w-[595px] bg-white text-[#263447] shadow-2xl">
      <header className="bg-[#24364B] px-8 py-9 text-white sm:px-10">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B9C9D9]">
          Curriculum vitae
        </p>
        <h1 className="break-words text-3xl font-bold tracking-tight">
          {resume.fullName || 'Your Name'}
        </h1>
        <div className="mt-4 text-[11px] text-[#D5DEE7]">
          <ContactDetails resume={resume} />
        </div>
      </header>

      <div className="px-8 py-7 sm:px-10">
        {resume.summary && (
          <ProfessionalSection title="Professional profile">
            <p className="whitespace-pre-wrap text-xs leading-6 text-[#536174]">
              {resume.summary}
            </p>
          </ProfessionalSection>
        )}

        {resume.workExperience.length > 0 && (
          <ProfessionalSection title="Professional experience">
            <div className="space-y-5">
              {resume.workExperience.map((item, index) => (
                <div
                  key={index}
                  className="border-l-2 border-[#AAB8C7] pl-4"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {item.position || 'Position'}
                    </h3>
                    <span className="text-[10px] text-[#718096]">
                      <DateRange
                        startDate={item.startDate}
                        endDate={item.endDate}
                      />
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#3F5D7D]">
                    {item.companyName || 'Company'}
                  </p>
                  {item.description && (
                    <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-[#536174]">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ProfessionalSection>
        )}

        {resume.education.length > 0 && (
          <ProfessionalSection title="Education">
            <div className="space-y-4">
              {resume.education.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {item.institution || 'Institution'}
                    </h3>
                    <span className="text-[10px] text-[#718096]">
                      <DateRange
                        startDate={item.startDate}
                        endDate={item.endDate}
                      />
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#536174]">
                    {[item.degree, item.fieldOfStudy]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </ProfessionalSection>
        )}

        {resume.skills.length > 0 && (
          <ProfessionalSection title="Core competencies">
            <div className="grid grid-cols-2 gap-x-5 gap-y-2">
              {resume.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 text-xs text-[#536174]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3F5D7D]" />
                  {skill}
                </div>
              ))}
            </div>
          </ProfessionalSection>
        )}
      </div>
    </article>
  )
}

function ProfessionalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mb-7 last:mb-0">
      <h2 className="mb-3 border-b border-[#D9E0E7] pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#3F5D7D]">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const template: ResumeTemplate = resume.resumeTemplate ?? 'MODERN'

  switch (template) {
    case 'MINIMAL':
      return <MinimalTemplate resume={resume} />
    case 'PROFESSIONAL':
      return <ProfessionalTemplate resume={resume} />
    case 'MODERN':
    default:
      return <ModernTemplate resume={resume} />
  }
}
