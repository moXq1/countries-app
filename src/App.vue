<template>
  <the-header :mode="mode" @change-theme="changeTheme"></the-header>
  <section v-if="!detailOpen">
    <the-wrapper>
      <the-search @change-input="getInput"></the-search>
      <the-filter @get-filter="getFilter"></the-filter>
    </the-wrapper>

    <countries-list
      :countries="countries"
      @get-details="details"
    ></countries-list>
  </section>

  <section v-else>
    <the-wrapper>
      <button @click="detailOpen = false">
        <div class="im">
          <img src="./assets/chevron-back-outline.svg" alt="" />
        </div>
        Back
      </button></the-wrapper
    >
  </section>
</template>

<script>
import CountriesList from "./components/countries/CountriesList.vue";
import TheWrapper from "./components/TheWrapper.vue";

export default {
  components: { CountriesList, TheWrapper },
  data() {
    return {
      mode: "light",
      findInput: "",
      filterData: "",
      countries: [],
      countryDetails: {},
      detailOpen: false,
    };
  },
  async created() {
    await this.countriesRequest();
    this.countries = this.countries.slice(0, 11);
  },
  methods: {
    changeTheme(m) {
      this.mode = m;
      document.documentElement.setAttribute("data-theme", this.mode);
    },
    getInput(inp) {
      this.findInput = inp;
    },
    async getFilter(filter) {
      this.filterData = filter;
      await this.countriesRequest(this.filterData);
    },
    async countriesRequest(region = null) {
      let resp;
      if (region) {
        resp = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
      } else {
        resp = await fetch("https://restcountries.eu/rest/v2/all");
      }

      this.countries = await resp.json();
    },

    details(id) {
      this.countryDetails = this.countries.find((el) => el.id === id);
      this.detailOpen = true;
      console.log(this.countryDetails);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,600;0,800;1,300;1,600;1,800&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --Text: hsl(200, 15%, 8%);
  --Input: hsl(0, 0%, 52%);
  --Background: hsl(0, 0%, 98%);
  --Elements: hsl(0, 0%, 100%);
  --i: 0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --Elements: hsl(209, 23%, 22%);
    --Background: hsl(207, 26%, 17%);
    --Text: hsl(0, 0%, 100%);
    --Input: hsl(209, 23%, 22%);
    --i: 1;
  }
}

[data-theme="dark"] {
  --Elements: hsl(209, 23%, 22%);
  --Background: hsl(207, 26%, 17%);
  --Text: hsl(0, 0%, 100%);
  --Input: hsl(209, 23%, 22%);
  --i: 1;
}

body {
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--Text);
  background-color: var(--Background);
}

button {
  font: inherit;
  padding: 0.35rem 1rem;
  border-radius: 5px;
  background-color: var(--Elements);
  border: none;
  color: inherit;
  font-weight: 300;
  box-shadow: 0px 0px 7px 1px var(--Input);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

button:hover {
  color: #dbadea;
}

button:hover .im img {
  filter: invert(85%) sepia(44%) saturate(1391%) hue-rotate(199deg)
    brightness(94%) contrast(94%);
}

::-webkit-scrollbar {
  width: 0;
}

.im {
  width: 17px;
  height: 17px;
  margin-right: 10px;
}

img {
  width: 100%;
  height: 100%;
  filter: invert(var(--i));
}
</style>
