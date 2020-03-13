<template>
  <div class="lr-player">
    <div
      class="title"
    >
      <nuxt-link
        :to="{
          name: 'movie-id',
          params: { id: player.ID }
        }"
      >
        <b-icon-chevron-left /> {{ player.title }}
      </nuxt-link>
    </div>
    <div class="player">
      <iframe
        :src="player.player_url"
        frameborder="0"
        width="100%"
        height="100%"
        allowfullscreen="allowfullscreen">
      </iframe>
    </div>
  </div>
</template>

<script>
import { BIconChevronLeft } from 'bootstrap-vue'
export default {
  layout: 'player',

  transition: 'bounce',

  components: {
    BIconChevronLeft
  },

  async fetch ({ store, params }) {
    await store.dispatch('player/FETCH_PLAYER_DETAIL', { id: params.id, type: 'movies' })
  },

  computed: {
    player () {
      return this.$store.state.player.player
    }
  }
}
</script>

<style lang="scss">
.lr-player {
  .title {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    background: #141414;
    font-size: clamp(1rem, 1.2vw, 1.5rem);
    padding-left: 3vw;
  }

  .player {
    height: 100vh;
  }
}
</style>
