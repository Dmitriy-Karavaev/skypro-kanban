import { request } from './http'

export const authApi = {
  register: (data) =>
    request('/user', {
      method: 'POST',
      body: data,
    }),
  login: (data) =>
    request('/user/login', {
      method: 'POST',
      body: data,
    }),
}
