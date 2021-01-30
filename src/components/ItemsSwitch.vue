<template>
  <div class="buttons" v-if="numOfPages > 1">
    <div class="prev" v-if="curPage !== 1" @click="prev">
      <button>
        <div class="im">
          <img src="../assets/chevron-back-outline.svg" alt="" />
        </div>
        Prev
      </button>
    </div>
    <div class="next" v-if="curPage !== numOfPages" @click="next">
      <button>
        Next
        <div class="im">
          <img src="../assets/chevron-forward-outline.svg" alt="" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["numOfCountries", "itemPerPage", "curPage"],
  computed: {
    numOfPages() {
      return Math.ceil(this.numOfCountries / this.itemPerPage);
    },
  },
  methods: {
    prev() {
      this.$emit("change-page", this.curPage - 1);
    },
    next() {
      this.$emit("change-page", this.curPage + 1);
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
  gap: 2rem;
}

.next .im {
  margin-right: 0;
  margin-left: 10px;
}
</style>
