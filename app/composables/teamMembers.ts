import { ref } from 'vue'

import { teamMembers } from '~/api/teamMembers'

import type { Pagination } from 'assignment-mtg-ui'

const perPage: number = 10

interface PaginatedResponse<TData> {
  data: TData
  pagination: Pagination
}

export const useTeamMembers = () => {
  const isLoading = ref<boolean>(false)

  const simulateApiErrors: boolean = useRuntimeConfig().public.simulateApiErrors

  const fetchTeamMembers = async (
    page: number,
    role?: string | null | undefined,
  ): Promise<PaginatedResponse<typeof teamMembers>> => {
    isLoading.value = true

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        isLoading.value = false

        if (simulateApiErrors && Math.random() < 0.2) {
          reject(new Error('Failed to fetch team members'))

          return
        }

        const total = teamMembers.length

        const lastPage = Math.ceil(total / perPage)

        const start = (page - 1) * perPage

        let _teamMembers = [...teamMembers]

        if (role) {
          _teamMembers = _teamMembers.filter((tM) => tM.role === role)
        }

        const data = _teamMembers.slice(start, start + perPage)

        resolve({
          data,
          pagination: {
            from: start + 1,
            current_page: page,
            last_page: lastPage,
            to: start + data.length,
            total: teamMembers.length,
          },
        })
      }, 800)
    })
  }

  return {
    fetchTeamMembers,
    isLoading,
  }
}
