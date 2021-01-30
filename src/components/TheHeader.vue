<template>
  <header>
    <nav>
      <h2 @click="$emit('main-page')">Where in the World?</h2>

      <label for="checkbox">
        <input type="checkbox" id="checkbox" @change="switchMode" />
        <div class="container">
          <img src="../assets/moon-outline.svg" alt="" />
        </div>
        <p>Dark Mode</p>
      </label>
    </nav>
  </header>
</template>

<script>
export default {
  props: ["mode"],
  emits: ["change-theme", "main-page"],
  methods: {
    switchMode() {
      let m = "";
      if (this.mode === "light") {
        m = "dark";
      } else {
        m = "light";
      }
      this.$emit("change-theme", m);
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  width: 100%;
}

header {
  display: flex;
  height: 70px;
  box-shadow: 0 0 3px var(--Input);
  background-color: var(--Elements);
}

h2 {
  font-weight: 800;
  font-size: 24px;
  cursor: pointer;
}

.container {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

input {
  display: none;
}

img {
  width: 100%;
  height: 100%;
  filter: invert(var(--i));
}

@media (min-width: 1800px) {
  nav {
    margin: 0 4rem;
  }
}

@media (max-width: 460px) {
  h2 {
    font-size: 20px;
  }
  nav {
    margin: 0 10px;
  }
}

@media (max-width: 370px) {
  h2 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
  }
  .container {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
}
</style>
