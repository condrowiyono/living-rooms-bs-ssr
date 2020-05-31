<template>
  <div class="lr-scroll">
    <h6>
      <a href="#">
        {{ title }}
      </a>
    </h6>
    <div
      v-if="!loading"
      class="scroll"
    >
      <div
        v-for="movie in content"
        :key="movie.ID"
        :class="`${id}${movie.ID}`"
        class="item"
      >
        <div
          class="content"
          @click="handleTitleClick(movie.ID)"
        >
          <b-img-lazy
            fluid
            blank
            blank-color="#ddd"
            :src="movie.banners[0].path"
          />
          <div class="card-movie-title">
            {{ movie.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy
  },

  props: {
    id: {
      type: String,
      default: 'itemsss',
      required: true
    },
    title: {
      type: String,
      default: 'Untitled',
      required: true
    },
    content: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleTitleClick (id) {
      this.$router.push({
        name: 'movie-id',
        params: { id }
      })
    }
  }
}
</script>

<style lang="scss">
.lr-scroll .scroll .item {
  width: calc(100% / 4 - 1vw);
}

@media screen and (max-width: 575.98px) and (min-width: 0px) {
  .lr-scroll .scroll .item {
    width: calc(100% / 2 - 1vw);
  }
}

@media screen and (max-width: 767.98px) and (min-width: 575.98px) {
  .lr-scroll .scroll .item {
    width: calc(100% / 3 - 1vw);
  }
}
</style>
