<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

@media (min-width: 1800px) {
  .wrapper {
    margin: 3rem 4rem;
  }
}

@media (max-width: 620px) {
  .wrapper {
    flex-direction: column;
    gap: 2rem;
  }
}
@media (max-width: 460px) {
  .wrapper {
    margin: 3rem 10px;
  }
}
</style>
