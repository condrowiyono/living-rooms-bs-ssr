<template>
  <div class="lr-movie">
    <showcase
      :id="`movie-${movie.ID}`"
      class="visible"
      :data="movie"
      no-close
    />
  </div>
</template>

<script>
import Showcase from '~/components/molecules/Showcase'

export default {
  components: {
    Showcase
  },

  async fetch ({ store, params }) {
    await store.dispatch('movie/FETCH_MOVIE_DETAIL', { id: params.id, caller: null })
  },

  computed: {
    movie () {
      return this.$store.state.movie.movie
    }
  }
}
</script>
