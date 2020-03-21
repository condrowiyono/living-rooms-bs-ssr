<template>
  <div class="lr-grid-alt">
    <h6>
      <a href="#">
        {{ title }}
      </a>
    </h6>
    <div
      class="w-100 p-4 text-center"
      v-if="loading"
    >
      <b-spinner
        type="grow"
        label="Spinning"
      />
    </div>
    <div
      v-if="!loading"
      class="grid"
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
import { BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BSpinner
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

  data () {
    return {
      width: 0
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
.lr-grid-alt {
  padding: 0 4vw;

  .grid {
    .item {
      display: inline-block;
      width: calc(100% / 6);
      margin-bottom: 2rem;

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
  .lr-grid-alt .grid .item {
    width: calc(100% / 3);
  }
}

@media screen and (max-width: 767.98px) and (min-width: 575.98px) {
  .lr-grid-alt .grid .item {
   width: calc(100% / 5);
  }
}
</style>
