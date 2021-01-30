<template>
  <div class="content">
    <div class="flag">
      <img :src="flag" alt="flag" />
    </div>

    <div class="details">
      <h2>{{ name }}</h2>
      <div class="details-options">
        <div>
          <p><strong>Native Name:</strong> {{ nativeName }}</p>
          <p><strong>Population:</strong> {{ population }}</p>
          <p><strong>Region:</strong> {{ region }}</p>
          <p><strong>Sub Region:</strong> {{ subregion }}</p>
          <p><strong>Capital:</strong> {{ capital }}</p>
        </div>
        <div>
          <p><strong>Top Level Domain:</strong> {{ topLevelDomain }}</p>
          <p><strong>Currencies:</strong> {{ currencies }}</p>
          <p><strong>Languages:</strong> {{ languages }}</p>
        </div>
      </div>
      <div class="borders">
        <p>
          <strong>Border countries:</strong>
        </p>
        <div>
          <span
            v-for="b in border"
            :data-neighbour="b"
            @click="getNeighbour"
            :key="b"
            >{{ b }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "flag",
    "name",
    "nativeName",
    "population",
    "region",
    "subregion",
    "capital",
    "topLevelDomain",
    "currencies",
    "languages",
    "border",
  ],
  methods: {
    getNeighbour(e) {
      const neighbour = e.target.dataset.neighbour;
      this.$emit("get-neighbour", neighbour);
    },
  },
};
</script>

<style scoped>
.content {
  display: grid;
  --w: clamp(300px, 50vw, 800px);
  grid-template-columns: 560px var(--w);
  grid-template-rows: 400px;
  grid-gap: 3rem;
  margin: 0 2rem;
  place-content: center;
}

span {
  padding: 0.25rem 1rem;
  background-color: var(--Elements);
  box-shadow: 0 0 2px var(--Input);
  cursor: pointer;
  margin: 0 5px 5px 0;
  display: inline-block;
  transition: all 0.5s ease;
}

span:hover {
  color: #dbadea;
}

.borders p {
  display: inline-block;
}

.borders {
  padding: 1rem 0;
  display: flex;
}

.borders div {
  width: fit-content;
}

.borders p strong {
  margin-right: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: invert(0);
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 3rem 0;
  gap: 2rem;
}

.details-options {
  display: flex;

  justify-content: space-between;
}

h2 {
  font-size: 32px;
}

p {
  font-size: 14px;
  padding-bottom: 0.5rem;
}
p strong {
  font-size: 16px;
  white-space: nowrap;
}



@media (max-width: 1070px) {
  .content {
    grid-template-columns: 560px;
    grid-template-rows: 400px;
    place-content: center;
  }
}

@media (max-width: 620px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-content: center;
  }

  h2 {
    font-size: 28px;
  }

  .details {
    padding-top: 0;
  }
}

@media (max-width: 455px) {
  .details-options {
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    font-size: 24px;
  }
}
</style>
