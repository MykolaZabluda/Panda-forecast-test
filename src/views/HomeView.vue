<template>
  <div>
    <CityInput @city-selected="addCity" />
    <div class="cards w-100 justify-center">
      <WeatherCard
          v-for="(city, index) in cities"
          :key="city.lat + city.lon"
          :city="city"
          @close="confirmRemoveCity(city, index)"
          @add-to-favorites="addFavorite"
          @show-temperature-graph="showTemperatureGraph"
      />
    </div>

    <div v-if="showLimitModal" class="modal">
      <div class="modal-content">
        <p>You have reached the limit of displaying cities. To add a new city, please remove at least one card.</p>
        <button class="button button-cancel" @click="showLimitModal = false">Close</button>
      </div>
    </div>

    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to remove the city {{ cityToRemove.name }} from the list?</p>
        <button class="button button-apply" @click="removeCity">Yes</button>
        <button class="button button-cancel" @click="cancelRemoveCity">No</button>
      </div>
    </div>

    <ChartModal
        v-if="showChartModal"
        :city="selectedCity"
        @close="showChartModal = false"
    />
  </div>
</template>

<script>
import CityInput from "@/components/CityInput.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import ChartModal from "@/components/GraphModal.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    ChartModal,
    CityInput,
    WeatherCard,
  },
  data() {
    return {
      cities: [],
      showLimitModal: false,
      showConfirmModal: false,
      cityToRemove: null,
      cityToRemoveIndex: null,
      showChartModal: false,
      selectedCity: null,
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
    cancelRemoveCity() {
      this.cityToRemove = null;
      this.cityToRemoveIndex = null;
      this.showConfirmModal = false;
    },
    addFavorite(city) {
      console.log("Favorite city added:", city);
    },
    showTemperatureGraph(city) {
      this.selectedCity = city;
      this.showChartModal = true;
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