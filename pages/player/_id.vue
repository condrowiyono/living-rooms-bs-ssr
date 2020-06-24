<template>
  <div class="lr-player">
    <div class="title">
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
        allowfullscreen="allowfullscreen"
      />
    </div>
  </div>
</template>

<script>
import { BIconChevronLeft } from 'bootstrap-vue'
export default {
  layout: 'player',

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
