<template>
  <div v-if="weather" class="weather-card">
    <button class="close-btn" @click="$emit('close')">×</button>
    <h2>{{ weather.name }}</h2>
    <p>{{ weather.weather[0].description }}</p>
    <p>Temperature: {{ weather.main.temp }}°C</p>
    <p>Humidity: {{ weather.main.humidity }}%</p>
    <button @click="addToFavorites">Add to Favorites</button>
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
      this.$emit('add-to-favorites', this.city);
    },
  },
};
</script>

<style scoped>
.weather-card {
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}
</style>
