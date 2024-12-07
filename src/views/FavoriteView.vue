<template>
 <div class="favorite">
   <FavoriteCards ref="favoriteCards" />
 </div>
</template>

<script>
import FavoriteCards from "@/components/FavoriteCards.vue";

export default {
  components: {
    FavoriteCards
  }
}
</script>

<style scoped lang="scss">
</style>