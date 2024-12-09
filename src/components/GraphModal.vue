<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <h2>Hourly Temperature for {{ city ? city.name : 'Selected City' }}</h2>
      <canvas ref="temperatureChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

export default {
  name: "ChartModal",
  props: {
    city: Object,
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    Chart.register(...registerables);
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        if (newCity) {
          console.log("City updated:", newCity);
          this.fetchHourlyTemperature();
        }
      },
    },
  },
  methods: {
    async fetchHourlyTemperature() {
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
              params: {
                lat: this.city.lat,
                lon: this.city.lon,
                units: "metric",
                appid: "9f2b2e8cd60541bbd9ad927b1a5cda93",
              },
            }
        );

        const hourlyData = response.data.list.slice(0, 8); // Next 8 intervals
        const labels = hourlyData.map((item) =>
            new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
        );
        const temperatures = hourlyData.map((item) => item.main.temp);

        // Ensure canvas is rendered before trying to access its context
        this.$nextTick(() => {
          this.renderChart(labels, temperatures);
        });
      } catch (error) {
        console.error("Error fetching hourly temperature:", error);
      }
    },
    renderChart(labels, temperatures) {
      if (!this.$refs.temperatureChart) {
        console.error("Canvas not found.");
        return;
      }

      const ctx = this.$refs.temperatureChart.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context.");
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatures,
              borderColor: "#42A5F5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Temperature (°C)",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
