import { reactive } from 'vue'
import { columnTitles } from './data'
import { kanbanApi } from '../services/kanban'

export const store = reactive({
  cards: [],
  statuses: [...columnTitles],
  isLoading: false,
  error: '',
})

export async function fetchTasks() {
  store.isLoading = true
  store.error = ''
  try {
    const data = await kanbanApi.list()
    store.cards = (data.tasks || []).map(mapTask)
  } catch (e) {
    store.error = e.message
  } finally {
    store.isLoading = false
  }
}

function mapTask(task) {
  return {
    id: task._id,
    title: task.title,
    topic: task.topic,
    description: task.description,
    status: task.status,
    date: formatDate(task.date),
  }
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${dd}.${mm}.${yy}`
}

// все запросы на изменение возвращают весь список задач —
// заменяем доску целиком, чтобы она всегда совпадала с сервером
function applyTasks(data) {
  store.cards = (data.tasks || []).map(mapTask)
}

// приводит любую дату (строку из input, Date и т.д.) к ISO
// и отсекает пустые и битые значения до отправки на сервер
function assertDate(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Дата некорректна — проверьте срок исполнения')
  }
  return parsed.toISOString()
}

export async function addCard({ title, description, topic, date }) {
  const data = await kanbanApi.create({
    title,
    description,
    topic,
    status: 'Без статуса',
    date: assertDate(date),
  })
  applyTasks(data)
}

export async function updateCard(id, { title, description, topic, status, date }) {
  const data = await kanbanApi.update(id, {
    title,
    description,
    topic,
    status,
    date: assertDate(date),
  })
  applyTasks(data)
}

export async function removeCard(id) {
  const data = await kanbanApi.remove(id)
  applyTasks(data)
}
