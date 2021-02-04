<template>
  <the-header
    :mode="mode"
    @change-theme="changeTheme"
    @main-page="reset"
  ></the-header>

  <the-loader v-if="isLoading"></the-loader>
  <section v-else-if="!detailOpen && !isLoading">
    <the-wrapper>
      <the-search @change-input="getInput" :findInput="findInput"></the-search>
      <the-filter @get-filter="getFilter" :filterData="filterData"></the-filter>
    </the-wrapper>

    <countries-list
      :countries="renderCountries"
      @get-details="details"
    ></countries-list>
    <items-switch
      v-if="!findInput"
      @change-page="changePage"
      :numOfCountries="countries.length"
      :itemPerPage="itemPerPage"
      :curPage="page"
    ></items-switch>
  </section>

  <section v-else-if="detailOpen && !isLoading">
    <the-wrapper>
      <button @click="detailOpen = false">
        <div class="im">
          <img src="./assets/chevron-back-outline.svg" alt="" />
        </div>
        Countries
      </button></the-wrapper
    >
    <item-details
      v-bind="countryDetails"
      @get-neighbour="renderNeighbour"
    ></item-details>
  </section>

  <the-error :show="isError" title="An error occured!" @close="isError = false">
    <p>{{ errorMessage }}</p>
  </the-error>
</template>

<script>
import CountriesList from "./components/countries/CountriesList.vue";
import ItemDetails from "./components/countries/ItemDetails.vue";
import TheWrapper from "./components/TheWrapper.vue";
import ItemsSwitch from "./components/ItemsSwitch.vue";

export default {
  components: { CountriesList, TheWrapper, ItemDetails, ItemsSwitch },
  data() {
    return {
      mode: "light",
      findInput: "",
      filterData: "Filter by Region",
      countries: [],
      renderCountries: [],
      countryDetails: {},
      detailOpen: false,
      page: 1,
      itemPerPage: 12,
      isLoading: false,
      isError: false,
      errorMessage: null,
    };
  },
  watch: {
    findInput(cur) {
      if (cur === "") {
        this.isLoading = true;
        this.renderCountries = this.slice;
        this.isLoading = false;
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.countriesRequest();
    this.renderCountries = this.slice;
    this.isLoading = false;
  },
  methods: {
    changeTheme(m) {
      this.mode = m;
      document.documentElement.setAttribute("data-theme", this.mode);
    },
    async reset() {
      this.isLoading = true;
      this.findInput = "";
      this.filterData = "Filter by Region";
      await this.countriesRequest();
      this.renderCountries = this.slice;
      this.countryDetails = {};
      this.detailOpen = false;
      this.page = 1;
      this.itemPerPage = 12;
      this.isLoading = false;
    },
    changePage(page) {
      this.isLoading = true;

      this.page = page;
      setTimeout(() => {
        this.renderCountries = this.slice;
        this.isLoading = false;
      }, 100);
    },
    getInput(inp) {
      this.isLoading = true;
      this.findInput = inp;
      const d = this.countries.filter((el) => el.name.includes(this.findInput));
      this.renderCountries = d;
      this.isLoading = false;
    },
    async getFilter(filter) {
      this.isLoading = true;
      this.filterData = filter;
      await this.countriesRequest(this.filterData);
      this.renderCountries = this.slice;
      this.isLoading = false;
    },
    async countriesRequest(region = null) {
      let resp;
      const reg = JSON.parse(localStorage.getItem("region"));
      const cc = JSON.parse(localStorage.getItem("countries"));

      if (cc) {
        this.countries = cc;
        localStorage.removeItem("countries");
        if (reg) {
          this.filterData = reg;
        }
        localStorage.removeItem("countries");
        localStorage.removeItem("region");
      } else {
        try {
          if (region && region !== "All") {
            resp = await fetch(
              `https://restcountries.eu/rest/v2/region/${region}`
            );
          } else {
            resp = await fetch("https://restcountries.eu/rest/v2/all");
          }

          const respData = await resp.json();

          if (!resp.ok) {
            throw new Error(respData.message || "Failed to send Request!");
          }

          this.countries = respData;
          localStorage.setItem("countries", JSON.stringify(this.countries));
          localStorage.setItem("region", JSON.stringify(region));
        } catch (er) {
          this.isError = true;
          this.errorMessage = er.message || "Something Failed";
        }
      }
    },

    details(id) {
      this.isLoading = true;
      const obj = this.countries.find((el) => el.name === id);
      this.detailOpen = true;
      this.countryDetails = {
        flag: obj.flag,
        name: obj.name,
        nativeName: obj.nativeName,
        population: obj.population,
        region: obj.region,
        subregion: obj.subregion,
        capital: obj.capital,
        topLevelDomain: obj.topLevelDomain.join(","),
        currencies: obj.currencies.map((el) => el.name).join(","),
        languages: obj.languages.map((el) => el.name).join(","),
        border: obj.borders.map((el) => {
          let c = this.countries.find((e) => e.alpha3Code === el);
          return c.name;
        }),
      };
      this.isLoading = false;
    },
    renderNeighbour(neighbour) {
      this.isLoading = true;
      this.details(neighbour);
      this.isLoading = false;
    },
  },
  computed: {
    slice() {
      console.log();
      window.scrollTo(0, 0);
      return this.countries.slice(
        (this.page - 1) * this.itemPerPage,
        this.itemPerPage * this.page
      );
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
  outline: none;
}

button:hover,
button:active {
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
