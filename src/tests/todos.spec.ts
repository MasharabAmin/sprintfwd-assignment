import { vi } from 'vitest'
import * as TodoApi from '@/api/todo'

test('Todos API should retun data', () => {
  const getTodos = vi.spyOn(TodoApi, 'fetchTodoList')
  TodoApi.fetchTodoList()
  getTodos.mock.calls.length > 0
})