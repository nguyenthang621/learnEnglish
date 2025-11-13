import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'


export type AuthResponse = SuccessResponseApi<{
  access_token: string
  refresh_token: string
  user: User
}>

export interface refreshResponse {
  success: boolean
  access_token: string
  refresh_token: string
}
