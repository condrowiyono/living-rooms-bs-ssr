<template>
  <div class="lr-player">
    <div class="title">
      <nuxt-link
        :to="{
          name: 'movie-id',
          params: { id: video.ID }
        }"
      >
        <b-icon-chevron-left /> {{ video.title }}
      </nuxt-link>
    </div>
    <div class="player">
      <iframe
        :src="video.video_url"
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

  transition: 'bounce',

  components: {
    BIconChevronLeft
  },

  async fetch ({ store, params }) {
    await store.dispatch('video/FETCH_VIDEO_DETAIL', { id: params.id, type: 'movies' })
  },

  computed: {
    video () {
      return this.$store.state.video.video
    }
  }
}
</script>
