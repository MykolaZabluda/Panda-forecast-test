<template>
  <div>
    <input
        type="text"
        class="search-input"
        v-model="query"
        @input="onInput"
        @keydown.enter="selectFirstSuggestion"
        placeholder="Search for a city"
    />
    <ul v-if="suggestions.length">
      <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectCity(suggestion)"
      >
        {{ suggestion.name }}, {{ suggestion.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CityInput",
  data() {
    return {
      query: "",
      suggestions: [],
    };
  },
  methods: {
    async onInput() {
      if (this.query.length < 3) {
        this.suggestions = [];
        return;
      }
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct`,
            {
              params: {
                q: this.query,
                limit: 5,
                appid: "9f2b2e8cd60541bbd9ad927b1a5cda93",
              },
            }
        );
        this.suggestions = response.data;
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    },
    selectCity(city) {
      this.$emit("city-selected", {
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      });
      this.query = ""; // Clear the input field
      this.suggestions = []; // Clear the suggestions list
    },
    selectFirstSuggestion() {
      if (this.suggestions.length > 0) {
        this.selectCity(this.suggestions[0]);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
}
</style>
