<template>
  <div class=" h-[80vh] pb-32 ">
    <form action="" class=" flex flex-col h-full space-y-8">
      <div class=" relative">
        <multiselect v-model="oneSpace" :options="allSpaces" track-by="name" placeholder="Espèces"
          class=" w-full bg-darkGrey rounded-lg px-2 pl-10 py-2 focus:outline-none">
          <template>
            <p slot="noResult" class=" mt-2">Aucun résultat</p>
          </template>

        </multiselect>
        <svg class="absolute top-3 left-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input type="number" placeholder="0" min="0" v-model="nbr"
        class=" w-full bg-darkGrey text-center h-full rounded-lg text-7xl focus:outline-none">
      <button @click.prevent="addSpace"
        class=" w-full bg-darkGrey text-center rounded-lg py-2 focus:outline-none">Ajouter</button>
    </form>
  </div>
</template>

<script>
  import allSpaces from '@/datas/allSpaces.json';
  import Multiselect from 'vue-multiselect';

  export default {
    components: {
      Multiselect,
    },
    head() {
      return {
        title: this.$global.siteName,
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.$global.siteMetaDescription
        }],
      }
    },
    data() {
      return {
        oneSpace: "",
        nbr: "",
        listOfSpaces: [],
        allSpaces: allSpaces
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

      addSpace() {
        // inputs are not empty validation
        if (!this.oneSpace || this.nbr <= 0) {
          return;
        }
        // find oneSpace in array for know if oneSpace already exist
        const isDuplicate = this.listOfSpaces.find(element => element.oneSpace == this.oneSpace)
        console.log(isDuplicate);

        // exist or no
        if (isDuplicate != undefined) {
          this.editSpace(isDuplicate)
        } else {
          // defined const
          const oneSpace = this.oneSpace
          const nbr = parseInt(this.nbr)
          const lastUpdate = new Date()
          // push on array
          this.listOfSpaces.push({
            oneSpace,
            nbr,
            lastUpdate
          })
          // reset datas
          this.oneSpace = ''
          this.nbr = 0

          this.saveSpace()
        }
      },
      editSpace(oneSpaces) {
        // parsed object
        const parsedSpace = JSON.parse(JSON.stringify(oneSpaces))
        // defined const
        const oneSpace = this.oneSpace
        const oldNbr = parsedSpace.nbr
        const newNbr = parseInt(this.nbr)
        // addition of old & new nbr
        const totalNbr = oldNbr + newNbr

        // recover index
        const index = this.listOfSpaces.indexOf(oneSpaces, 0)

        // delete this space
        this.listOfSpaces.splice(index, 1)

        // re-defined nbr for push with the good key
        const nbr = totalNbr
        this.listOfSpaces.push({
          oneSpace,
          nbr
        })
        // reset datas
        this.oneSpace = ''
        this.nbr = 0

        this.saveSpace()
      },
      saveSpace() {
        // parsed array & save in localStorage
        const parsed = JSON.stringify(this.listOfSpaces)
        localStorage.setItem('listOfSpaces', parsed)
      }
    }
  }

</script>

<style>
  .multiselect__input {
    @apply bg-transparent focus:outline-none;
  }
  .multiselect__content-wrapper {
    @apply overflow-scroll py-3;
  }
</style>