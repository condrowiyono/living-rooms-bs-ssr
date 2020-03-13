<template>
  <div class="lr-movie mt-4">
    <layout
      id="item-top"
      type="grid-poster"
      title="Movies"
      :content="movies"
    />
  </div>
</template>

<script>
import Layout from '~/components/molecules/Layout'

export default {
  components: {
    Layout
  },

  async fetch ({ store }) {
    await store.dispatch('movie/RESET_MOVIE_DETAIL')
    await store.dispatch('movie/FETCH_MOVIE')
  },

  computed: {
    movies () {
      return this.$store.state.movie.movies
    },
    loading () {
      return this.$store.state.movie.isFetching
    }
  }
}
</script>
