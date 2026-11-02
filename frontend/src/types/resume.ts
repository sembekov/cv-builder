export type ResumeTemplate = 'MODERN' | 'MINIMAL' | 'PROFESSIONAL'

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string | null
  endDate: string | null
}

export interface WorkExperience {
  companyName: string
  position: string
  description: string
  startDate: string | null
  endDate: string | null
}

export interface Resume {
  id: number
  fullName: string
  email: string
  summary: string
  phoneNumber: string
  education: Education[]
  skills: string[]
  workExperience: WorkExperience[]
  location: string
  resumeTemplate: ResumeTemplate
}

export type ResumePayload = Omit<Resume, 'id'>
