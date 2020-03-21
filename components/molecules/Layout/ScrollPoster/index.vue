<template>
  <div class="lr-scroll">
    <h6>
      <a href="#">
        {{ title }}
      </a>
    </h6>
    <skeleton v-if="loading" />
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
          :style="`background-image: url(${movie.posters[0].path});`"
          @click="handleTitleClick(movie.ID)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from '~/components/atoms/Skeleton'

export default {
  components: {
    Skeleton
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
.lr-scroll {
  padding: 0 0 0 4vw;

  .scroll {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    .item {
      display: inline-block;
      width: calc(100% / 6 - 1vw);

      .content {
        padding: 80% 0;
        width: 98%;
        background-size: cover;
        background-position: center;
      }
    }
  }
}

@media screen and (max-width: 575.98px) and (min-width: 0px) {
  .lr-scroll .scroll .item {
    width: calc(100% / 3 - 1vw);
  }
}

@media screen and (max-width: 767.98px) and (min-width: 575.98px) {
  .lr-scroll .scroll .item {
    width: calc(100% / 5 - 1vw);
  }
}
</style>
