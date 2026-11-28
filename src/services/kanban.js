import { request } from './http'

export const kanbanApi = {
  list: () => request('/kanban', { auth: true }),
  create: (data) => request('/kanban', { method: 'POST', body: data, auth: true }),
  update: (id, data) => request(`/kanban/${id}`, { method: 'PUT', body: data, auth: true }),
  remove: (id) => request(`/kanban/${id}`, { method: 'DELETE', auth: true }),
}
