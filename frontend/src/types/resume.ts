export interface Education {
  id?: number
  institution: string
  degree: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
}

export interface WorkExperience {
  id?: number
  company: string
  position: string
  description?: string
  startDate?: string
  endDate?: string
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
}
