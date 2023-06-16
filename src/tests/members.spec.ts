import { vi } from 'vitest'
import * as MemberApi from '@/api/members'

test('Members API should retun data', () => {
  const getMembers = vi.spyOn(MemberApi, 'fetchMembers')
  MemberApi.fetchMembers()
  getMembers.mock.calls.length > 0
})