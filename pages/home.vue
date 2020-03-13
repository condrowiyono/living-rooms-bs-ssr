<template>
  <div class="lr-home">
    <highlight />
    <div class="lr-container">
      <layout
        id="item-top"
        type="slider-poster"
        title="Mantap"
        :content="movies"
      />
      <adboard />
      <layout
        id="item-top2"
        type="slider-poster"
        title="Mantap"
        :content="movies"
      />
      <layout
        id="item-top23"
        type="slider"
        title="Mantap1212"
        :content="movies"
      />
    </div>
  </div>
</template>

<script>
import Highlight from '~/components/molecules/Highlight'
import Layout from '~/components/molecules/Layout'
import Adboard from '~/components/molecules/Adboard'

export default {
  components: {
    Highlight,
    Layout,
    Adboard
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
