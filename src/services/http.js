const BASE_URL = 'https://wedev-api.sky.pro/api'

export function getToken() {
  return localStorage.getItem('token')
}

export async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'text/plain'
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(BASE_URL + path, options)

  if (!response.ok) {
    let message = `Ошибка ${response.status}`
    try {
      const data = await response.json()
      if (data.errorInfo?.message) message = data.errorInfo.message
      else if (typeof data.error === 'string') message = data.error
      else if (data.message) message = data.message
    } catch {
      // тело не JSON — оставляем общий текст ошибки
    }
    throw new Error(message)
  }
  return response.json()
}
