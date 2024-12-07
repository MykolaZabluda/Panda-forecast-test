<template>
  <div>
    <CityInput @city-selected="addCity" />
    <div class="cards w-100 justify-center">
      <WeatherCard
          v-for="(city, index) in cities"
          :key="city.lat + city.lon"
          :city="city"
          @close="removeCity(index)"
          @add-to-favorites="addFavorite"
      />
    </div>
    <div v-if="showLimitModal" class="modal">
      <div class="modal-content">
        <p>You have reached the limit of displaying cities. To add a new city, please remove at least one card.</p>
        <button @click="showLimitModal = false">Close</button>
      </div>
    </div>
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to remove the city {{ cityToRemove.name }} from the list?</p>
        <button @click="removeCity">Yes</button>
        <button @click="cancelRemoveCity">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import CityInput from "@/components/CityInput.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import axios from "axios";

export default {
  name: "WeatherDashboard",
  components: { CityInput, WeatherCard },
  data() {
    return {
      cities: [],
      showLimitModal: false,
      showConfirmModal: false,
      cityToRemove: null,
      cityToRemoveIndex: null,
    };
  },
  created() {
    this.fetchDefaultCityWeather();
  },
  methods: {
    async fetchDefaultCityWeather() {
      try {
        const locationResponse = await axios.get("http://ip-api.com/json/");
        const { city, country, lat, lon } = locationResponse.data;

        const defaultCity = {
          name: city,
          country: country,
          lat: lat,
          lon: lon,
        };

        this.cities.push(defaultCity);
      } catch (error) {
        console.error("Error fetching default city weather:", error);
      }
    },
    addCity(city) {
      if (this.cities.length >= 5) {
        this.showLimitModal = true;
        return;
      }
      this.cities.push(city);
    },
    confirmRemoveCity(city, index) {
      this.cityToRemove = city;
      this.cityToRemoveIndex = index;
      this.showConfirmModal = true;
    },
    removeCity() {
      if (this.cityToRemoveIndex !== null) {
        this.cities.splice(this.cityToRemoveIndex, 1);
        this.cityToRemove = null;
        this.cityToRemoveIndex = null;
        this.showConfirmModal = false;
      }
    },
    addFavorite(city) {
      if (this.$refs.favoriteCards) {
        this.$refs.favoriteCards.addFavorite(city);
      } else {
        console.error("FavoriteCards component is not available.");
      }
    },
    cancelRemoveCity() {
      this.cityToRemove = null;
      this.cityToRemoveIndex = null;
      this.showConfirmModal = false;
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}
button {
  margin: 0.5rem;
}
</style>