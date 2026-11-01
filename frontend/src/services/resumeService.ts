import type { Resume, ResumePayload } from '../types/resume'

const API_URL = '/api/resumes'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(
      message || `Request failed with status ${response.status}`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function getResumes(): Promise<Resume[]> {
  const response = await fetch(API_URL)
  return handleResponse<Resume[]>(response)
}

export async function getResumeById(id: number): Promise<Resume> {
  const response = await fetch(`${API_URL}/${id}`)
  return handleResponse<Resume>(response)
}

export async function createResume(data: ResumePayload): Promise<Resume> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<Resume>(response)
}

export async function updateResume(
  id: number,
  data: ResumePayload,
): Promise<Resume> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<Resume>(response)
}
