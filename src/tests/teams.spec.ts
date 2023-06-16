import { vi } from 'vitest'
import * as TeamApi from '@/api/teams'

test('Teams API should retun data', () => {
  const getTeams = vi.spyOn(TeamApi, 'fetchTeams')
  TeamApi.fetchTeams()
  getTeams.mock.calls.length > 0
})