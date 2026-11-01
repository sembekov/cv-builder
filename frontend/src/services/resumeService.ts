import type { Resume } from '../types/resume'

const API_URL = '/api/resumes'

export async function getResumes(): Promise<Resume[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch resumes: ${response.status}`)
  }

  return response.json() as Promise<Resume[]>
}
