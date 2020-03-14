<template>
  <div class="lr-movie">
    <showcase
      :id="`movie-${movie.ID}`"
      class="visible"
      :data="movie"
      no-close
      @play-click="handlePlayClick"
      @video-click="handleVideoClick"
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
  },

  methods: {
    handlePlayClick (playerID) {
      this.$router.push({
        name: 'player-id',
        params: { id: playerID }
      })
    },

    handleVideoClick (videoID) {
      this.$router.push({
        name: 'video-id',
        params: { id: videoID }
      })
    }
  }
}
</script>

<style lang="scss">
.lr-movie {
  top: 0;

  .showcase {
    top: 0;
  }
}
</style>
