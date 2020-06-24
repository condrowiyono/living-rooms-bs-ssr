<template>
  <div class="lr-home desktop">
    <div
      v-if="$device.isDesktop"
      class="lr-container"
    >
      <layout
        id="newest"
        type="slider"
        title="Terbaru"
        :content="movies"
      />
      <layout
        id="popular"
        type="slider"
        title="Populer di Living Rooms"
        :content="movies"
      />
      <!-- <adboard /> -->
    </div>
    <div v-if="$device.isMobileOrTablet" class="lr-container">
      <layout
        id="scroll-top"
        type="scroll"
        title="Mantap"
        :content="movies"
      />
    </div>
  </div>
</template>

<script>
// import Highlight from '~/components/molecules/Highlight'
import Layout from '~/components/molecules/Layout'

export default {
  components: {
    Layout
  },

  async fetch ({ store }) {
    await store.dispatch('movie/FETCH_MOVIE')
    await store.dispatch('movie/FETCH_LATEST_MOVIE')
  },

  computed: {
    movies () {
      return this.$store.state.movie.movies
    },

    latestMovies () {
      return this.$store.state.movie.latestMovies
    },

    loading () {
      return this.$store.state.movie.isFetching
    }
  }
}
</script>
