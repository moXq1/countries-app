<template>
  <div class="wrap" @mouseover="isOpen = true" @mouseout="leaveTimer">
    <div class="filter">
      <p>{{ filter }}</p>
      <div class="container">
        <img src="../assets/chevron-down-outline.svg" alt="chevron down"  width="20" height="20"/>
      </div>
    </div>

    <ul class="filt" v-if="isOpen">
      <li v-for="r in regions" :key="r" @click="getRegion" :data-country="r">
        {{ r }}
      </li>
      <li @click="getRegion" data-country="all">All</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      filter: this.filterData,
    };
  },
  props: ["filterData"],
  methods: {
    getRegion(e) {
      this.filter = e.target.dataset.country;
      this.$emit("get-filter", this.filter);
    },
    leaveTimer(e) {
      if (!e.relatedTarget.closest(".filt")) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  font-weight: 600;
  z-index: 10;
}

.container {
  width: 15px;
  height: 15px;
}

.filt {
  list-style: none;
  border-radius: 5px;
  padding-top: 7px;
  box-shadow: 0px 3px 6px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%);
  width: 200px;
  position: absolute;
}

li:first-child {
  border-radius: 5px 5px 0 0;
}

li:last-child {
  border-radius: 0 0 5px 5px;
}

li {
  background-color: var(--Elements);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.5s ease;
}

li:hover {
  color: #dbadea;
}

.filter {
  display: flex;
  align-items: center;
  background-color: var(--Elements);
  width: 200px;
  padding: 1rem;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%);
}

img {
  width: 100%;
  height: 100%;
  filter: invert(var(--i));
}
</style>
