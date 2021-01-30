<template>
  <li @click="getDetails">
    <div class="container">
      <div class="flag">
        <img :src="flag" alt="flag" />
      </div>
      <div class="content">
        <h3>{{ name }}</h3>
        <p><strong>Population:</strong> {{ population }}</p>
        <p><strong>Region:</strong> {{ region }}</p>
        <p><strong>Capital:</strong> {{ capital }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "flag", "name", "population", "region", "capital"],
  emits: ["get-details"],
  methods: {
    getDetails() {
      console.log(this.id);
      this.$emit("get-details", this.id);
    },
  },
};
</script>

<style scoped>
li {
  width: fit-content;
  box-shadow: 0px 3px 6px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%);
  border-radius: 5px;
  transform: translateY(0);
  transition: transform 0.5s ease;

  backface-visibility: hidden;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0px 3px 6px 0px var(--Input), 0px 1px 3px 0px var(--Input);
  cursor: pointer;
}

.container {
  display: grid;
  border-radius: 5px;
  grid-template-rows: 130px 1fr;
  grid-template-columns: 260px;
  background-color: var(--Elements);
  gap: 1rem;
}

.flag {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  filter: invert(0);
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  gap: 5px;
}

h3 {
  margin-bottom: 5px;
}

p {
  font-size: 15px;
}
</style>
