<template>
  <div>
    <h2>Favorite Cities</h2>
    <div v-if="favorites.length === 0">
      <p>There are currently no selected cities</p>
    </div>
    <div v-else class="cards">
      <WeatherCard
          v-for="(city, index) in favorites"
          :key="city.lat + city.lon"
          :city="city"
          @close="removeFromFavorites(city)"
      />
    </div>
    <div v-if="showLimitModal" class="modal">
      <div class="modal-content">
        <p>You have reached the limit for adding to favorites. To add a city, please delete any of the already added ones.</p>
        <button @click="showLimitModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";

export default {
  name: "FavoriteCards",
  components: { WeatherCard },
  data() {
    return {
      favorites: [],
      showLimitModal: false,
    };
  },
  created() {
    this.loadFavorites();
  },
  methods: {
    loadFavorites() {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      this.favorites = savedFavorites;
    },
    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addFavorite(city) {
      if (this.favorites.length >= 5) {
        this.showLimitModal = true;
        return;
      }
      this.favorites.push(city);
      this.saveFavorites();
    },
    removeFromFavorites(city) {
      this.favorites = this.favorites.filter(
          (favorite) => favorite.lat !== city.lat || favorite.lon !== city.lon
      );
      this.saveFavorites();
    },
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

button {
  margin: 0.5rem;
}
</style>
