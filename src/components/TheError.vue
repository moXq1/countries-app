<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <h2>{{ title }}</h2>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu>
          <button @click="tryClose">Close</button>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false },
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      this.$emit("close", false);
    },
  },
};
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -30%) scale(0.8);
}

.dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -70%) scale(0.8);
}

.dialog-enter-active {
  transition: all 0.5s ease-out;
}
.dialog-leave-active {
  transition: all 0.5s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.backdrop {
  width: 100vw;
  height: 100vh;
  background-color: lightGrey;
  opacity: 0.6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
}

section {
  padding: 1rem;
}

header {
  background-color: #dbadea;
  width: 100%;
  padding: 1rem;
}

dialog {
  width: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 20;
  background-color: white;
  color: black;
  font: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  padding-bottom: 1rem;
}

button {
  background-color: white;
  color: black;
  font: inherit;
  transition: all 0.5s ease;
}

button:hover {
  color: #dbadea;
}

menu {
  padding: 1rem;
}

@media (min-width: 768px) {
  dialog {
    width: 40rem;
  }
}
</style>
