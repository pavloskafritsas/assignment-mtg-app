<template>
  <main>
    <NuxtRouteAnnouncer />

    <div>
      <h2 v-text="'Team members'" />

      <div>
        <PSelect
          v-model="filterRole"
          :options="roles"
          label="Filter by role"
        />
      </div>

      <PDataTable
        :headers="headers"
        :loading="isLoading"
        :rows="rows"
        :pagination="pagination"
        height="300px"
        @paginate="onPaginate"
      >
        <template #cell_email="{ value }">
          <div
            class="p-truncate"
            style="max-width: 240px"
            v-text="value"
          />
        </template>
      </PDataTable>
    </div>

    <PToastContainer />
  </main>
</template>

<script lang="ts" setup>
import {
  PDataTable,
  PSelect,
  PToastContainer,
  useToast,
  type Pagination,
  type PDataTableHeader,
} from 'assignment-mtg-ui'

import type { teamMembers } from './api/teamMembers'

const { fetchTeamMembers, isLoading } = useTeamMembers()

const route = useRoute()

const rows = shallowRef<typeof teamMembers>([])

const pagination = ref<Pagination>()

const headers: PDataTableHeader<(typeof teamMembers)[number]>[] = [
  {
    key: 'id',
    label: 'id',
  },

  {
    key: 'name',
    label: 'Name',
  },

  {
    key: 'email',
    label: 'Email',
  },

  {
    key: 'role',
    label: 'Role',
  },

  {
    key: 'status',
    label: 'Status',
  },

  {
    key: 'last_active',
    label: 'Last active',
  },
]

const toast = useToast()

const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Designer', value: 'Designer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'All roles', value: undefined },
]

const filterRole = ref<string>()

const onPaginate = async (page: number): Promise<void> => {
  fetchRows(page)
}

const fetchRows = async (page: number) => {
  try {
    const res = await fetchTeamMembers(page, filterRole.value)

    rows.value = res.data

    pagination.value = res.pagination
  } catch (e) {
    const message = typeof e === 'string' ? e : 'Unknown error occured'

    toast.error({
      message,
    })
  }
}

const allRoles = ['Admin', 'Developer', 'Designer', 'Manager']

onMounted(() => {
  let _page = Number(route.query.page)

  if (!Number.isInteger(_page) || _page <= 0) {
    _page = 1
  }

  const _filterRole = route.query.role?.toString() ?? ''

  if (allRoles.includes(_filterRole)) {
    filterRole.value = _filterRole
  }

  void fetchRows(_page)
})

const router = useRouter()

watch([filterRole, () => pagination.value?.current_page], (v) => {
  router.push({
    query: {
      page: v[1] ?? 1,
      role: v[0],
    },
  })
})

watch(filterRole, () => {
  fetchRows(1)
})
</script>

<style>
/*  */
</style>
