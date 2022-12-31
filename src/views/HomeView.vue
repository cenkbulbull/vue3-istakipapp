<template>
  <div class="home">
    <div class="home">
      <div v-if="hataCollection" class="error">{{hataCollection}}</div>
      <div v-if="belgeler">
        <IsListesi :isler="belgeler"/>
      </div>
    </div>
  </div>
</template>


<script>

  import getCollection from "../composables/getCollection"
  import IsListesi from "../components/IsListesi"
  export default {
    name: 'HomeView',
    components:{
      IsListesi
    },
    setup(){
      const {hataCollection,belgeler} = getCollection("isler")

      return {hataCollection,belgeler}
    }
  }
</script>
