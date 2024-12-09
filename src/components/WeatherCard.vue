<template>
  <div v-if="weather" class="weather-card">
    <button class="close-btn" @click="$emit('close')">×</button>
    <h2 class="text-space">{{ weather.name }}</h2>
    <p class="text-space">{{ weather.weather[0].description }}</p>
    <p class="text-space">Temperature: {{ weather.main.temp }}°C</p>
    <p class="text-space">Humidity: {{ weather.main.humidity }}%</p>
    <div class="bottom block">
      <button class="button button-apply" @click="addToFavorites">Add to Favorites</button>
      <button class="button button-more" @click="emitShowTemperatureGraph">Show More</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherCard",
  props: {
    city: Object,
  },
  data() {
    return {
      weather: null,
    };
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        if (newCity) {
          this.fetchWeather(newCity);
        }
      },
    },
  },
  methods: {
    async fetchWeather(city) {
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: city.lat,
                lon: city.lon,
                units: "metric",
                appid: "9f2b2e8cd60541bbd9ad927b1a5cda93",
              },
            }
        );
        this.weather = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    addToFavorites() {
      this.$emit("add-to-favorites", this.city);
    },
    emitShowTemperatureGraph() {
      this.$emit("show-temperature-graph", this.city);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-card {
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
}
</style>
