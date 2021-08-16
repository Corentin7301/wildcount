<template>
  <div class="container p-2.5 flex flex-col items-center">
    <form action="" class=" text-black mb-5">
      <!-- <input type="text" placeholder="Espèce" v-model="spaceName"> -->
      <select name="spaces" id="spaces" v-model="spaceName" class=" rounded-md px-2 py-1">
        <option value="" disabled>Espèce</option>
        <option :value="space" v-for="space of spacesDatasArray" :key="space">
          {{space}}
        </option>
      </select>
      <input type="number" placeholder="Nombre" v-model="nbr" class=" rounded-md px-2 py-1">
      <button @click.prevent="addSpace" class=" bg-gray-100 text-black px-2 py-1 rounded-md">OK</button>
      <!-- <button @click.prevent="addNewList(space, nbr, list)">OK</button> -->
    </form>

    <div v-for="list of listOfSpaces" :key="list.spaceName" class=" flex space-x-3">
      <p>{{list.spaceName}}</p>
      <p>{{list.nbr}}</p>
    </div>
    <p v-if="listOfSpaces.length === 0">Encore aucune espèce 😭</p>
  </div>
</template>

<script>
  export default {

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
        spaceName: "",
        nbr: 0,
        listOfSpaces: [],
        spacesDatasArray: [
          'chamois',
          'renard',
          'chevreuil'
        ],
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
        if (!this.spaceName || this.nbr <= 0) {
          return;
        }
        // find spaceName in array for know if spaceName already exist
        const isDuplicate = this.listOfSpaces.find(element => element.spaceName == this.spaceName)

        // exist or no
        if (isDuplicate != undefined) {
          this.editSpace(isDuplicate)
        } else {
          // defined const
          const spaceName = this.spaceName
          const nbr = parseInt(this.nbr)
          // push on array
          this.listOfSpaces.push({
            spaceName,
            nbr
          })
          // reset datas
          this.spaceName = ''
          this.nbr = 0

          this.saveSpace()
        }
      },
      editSpace(oneSpaces) {
        // parsed object
        const parsedSpace = JSON.parse(JSON.stringify(oneSpaces))
        // defined const
        const spaceName = this.spaceName
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
          spaceName,
          nbr
          })
          // reset datas
          this.spaceName = ''
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
