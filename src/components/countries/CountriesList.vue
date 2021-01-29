<template>
  <ul v-if="hasCountries">
    <countries-item
      @get-details="getD"
      v-for="country in countries"
      :key="country.id"
      :id="country.id"
      :flag="country.flag"
      :name="country.name"
      :population="country.population"
      :region="country.region"
      :capital="country.capital"
    ></countries-item>
  </ul>
</template>

<script>
import CountriesItem from "./CountriesItem";

export default {
  components: { CountriesItem },
  data() {
    return {};
  },
  props: ["countries"],

  computed: {
    hasCountries() {
      return this.countries && this.countries.length > 0;
    },
  },
  methods: {
    getD(id) {
      this.$emit("get-details", id);
    },
  },
};
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(4, 260px);
  list-style: none;
  margin: 3rem 0;
  gap: 1rem;
  place-content: center;
}

@media (max-width: 1160px) {
  ul {
    grid-template-columns: repeat(3, 260px);
    gap: 4vw;
  }
}
@media (max-width: 969px) {
  ul {
    grid-template-columns: repeat(2, 260px);
    gap: 10vw;
  }
}
@media (max-width: 699px) {
  ul {
    grid-template-columns: 260px;
  }
}
</style>
