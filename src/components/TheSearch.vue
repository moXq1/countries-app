<template>
  <div class="wrap">
    <label>
      <div class="container">
        <img src="../assets/search-outline.svg" alt="search icon" />
      </div>
    </label>
    <input
      type="text"
      v-model="inputData"
      placeholder="Search for a country..."
      @change="sendData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: "",
    };
  },
  watch: {
    inputData() {
      this.$emit("change-input", this.inputData);
    },
  },
};
</script>

<style scoped>
.container {
  width: 20px;
  height: 20px;
}

img {
  width: 100%;
  height: 100%;
  filter: invert(var(--i));
}

label {
  padding: 1rem;
  background-color: var(--Elements);
  border-radius: 5px 0 0 5px;
}

.wrap {
  display: flex;
  background-color: transparent;
  box-shadow: 0px 3px 6px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%);
  width: 300px;
  border-radius: 5px;
}

input {
  border: none;
  width: 100%;
  background-color: var(--Elements);
  border-radius: 0 5px 5px 0;
  outline: none;
  padding: 0.5rem;
  color: var(--Text);
  font-size: 18px;
}

input::placeholder {
  color: var(--Text);
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 620px) {
  .wrap {
    width: max(200px, 100%);
  }
}
</style>
