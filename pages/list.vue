<template>
  <div class=" space-y-10 ">
    <div class=" relative">
      <input type="text" placeholder="Espèce" v-model="spaceQuery"
        class=" w-full bg-darkGrey rounded-lg px-2 pl-10 py-2 focus:outline-none">
      <svg class="absolute top-3 left-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-3 overflow-scroll">
      <div v-for="list of fuseResult" :key="list.spaceName"
        class=" bg-lightGrey flex flex-col justify-between space-y-2 text-white rounded-lg py-3 px-4 text-center text-xl">
        <div class=" h-full flex items-center justify-center">
          <p class=" font-light">{{list.oneSpace}}</p>
        </div>
        <p class=" text-5xl">{{list.nbr}}</p>
      </div>
    </div>
    <div v-if="listOfSpaces.length === 0">
      <p class=" text-center">Encore aucune espèce 😭</p>
      <nuxt-link to="/"><button
          class=" w-full bg-darkGrey text-center rounded-lg py-2 mt-5 focus:outline-none">Ajoutes-en une !</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import Fuse from "fuse.js";
  export default {
    data() {
      return {
        listOfSpaces: [],
        spaceQuery: '',
      }
    },
    mounted() {
      if (localStorage.getItem('listOfSpaces')) {
        try {
          this.listOfSpaces = JSON.parse(localStorage.getItem('listOfSpaces'))
        } catch (e) {
          localStorage.removeItem('listOfSpaces')
        }
      }
    },
    methods: {

    },
    computed: {
      sortByDate() {
        const sortListOfSpaces = this.listOfSpaces
        const sortedListOfSpaces = sortListOfSpaces.sort((a, b) => {
          return a < b ? 1 : -1
        })
        return sortedListOfSpaces
      },
      fuseResult() {
        return this.spaceQuery ? this.results : this.sortByDate
      },
      results() {
        const listOfSpaces = this.listOfSpaces
        const spaceQuery = this.spaceQuery
        const options = {
          keys: ['oneSpace']
        }
        let fuseSpace = new Fuse(listOfSpaces, options)
        
        return fuseSpace.search(spaceQuery).map((space => {
          return {
            ...space.item
          }
        }))
      }
    }
  }

</script>
