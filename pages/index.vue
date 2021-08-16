<template>
  <div class="container p-2.5 flex flex-col items-center">
    <p>Chamois</p>
    <p>NBR</p>
    <form action="" class=" text-black">
      <input type="text" placeholder="Espèce" v-model="space">
      <input type="number" placeholder="Nombre" v-model="nbr">
      <button @click.prevent="addNewList(space, nbr, list)">OK</button>
    </form>

    <div v-for="list of list" :key="list.name" class=" flex space-x-3">
      <p>{{list.name}}</p>
      <p>{{list.nbr}}</p>
    </div>
    <p v-if="list.length === 0">Pas de données</p>
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
        space: "",
        nbr: 0,
        list: [],
      }
    },
    methods: {
      editList(objectOfDatas, newNbr, list) {
        const parsedObjectOfDatas = JSON.parse(JSON.stringify(objectOfDatas))
        const recoverObject = list.find(element => element.name == parsedObjectOfDatas.name)
        const oldNbr = parseInt(JSON.parse(JSON.stringify(recoverObject)).nbr)
        const newTotal = oldNbr + newNbr
        console.log(parsedObjectOfDatas);
        console.log(newTotal);
        const index = list.indexOf(objectOfDatas, 0)
        console.log(index);


        list.splice(index, 1)
        list.push({
          name: objectOfDatas.name,
          nbr: newTotal,
        })

      },
      addNewList(spaceList, nbrList, list) {

        const isEqual = list.find(element => element.name == spaceList)
        if (spaceList != "" && nbrList != 0) {
          if (isEqual == undefined) {
            list.push({
              name: spaceList,
              nbr: nbrList,
            })
          } else {
            this.editList(isEqual, parseInt(nbrList), list)
          }
        }
      },
    }
  }

</script>
