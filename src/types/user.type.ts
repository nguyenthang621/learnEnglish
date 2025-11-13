export interface User {
  id: string
  fullName: string
  email: string
  avatar?: string | null
  createAt?: string | null
  gender?: string | null
  address?: string | null
  phoneNumber?: string | null
  role?: string | null
  token?: string | null
  updateAt?: string | null
}

export interface UserEdit {
  fullName: string
  email: string
  phoneNumber?: string | null
  address?: string | null
  avatar?: string | null
}

export interface Profile {
  id: string
  email: string
  fullName: string
  avatarUrl?: string | null
  streak: number
  totalScore: number
}