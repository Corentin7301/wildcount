// store/filters.js
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filter: '',
      order: 'asc',
      classFilterChoiced: 'all',
    }
  },
  actions: {},
  getters: {
    // filtersList: state => state.filtersList,
  },
})