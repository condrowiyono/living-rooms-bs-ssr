<template>
  <div
    class="higlight"
    @mouseenter.once="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <transition name="fade">
      <lr-bg-video
        v-if="!toggleImage"
        ref="lr-bg-video-highlight"
        ref-data="lr-highlight-video"
        autoplay
        player-src="https://www.youtube-nocookie.com/embed/5xH0HfJHsaY?controls=0"
      />
      <b-img
        v-else
        fluid
        src="https://image.tmdb.org/t/p/original/8K001T1pcEDQSOYwEI1wKps1qcA.jpg"
      />
    </transition>
    <div class="higlight-content">
      <h2> Parasite </h2>
      <p>
        All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.
      </p>
      <div class="mt-4">
        <b-button class="btn-transparent mr-2">
          <b-icon-play-fill /> Putar
        </b-button>
        <b-button class="btn-transparent">
          <b-icon-info /> Info Lengkap
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton, BIconPlayFill, BIconInfo, BImg } from 'bootstrap-vue'
import LrBgVideo from '~/components/atoms/LrBgVideo'

export default {
  components: {
    BButton,
    BIconPlayFill,
    BIconInfo,
    BImg,
    LrBgVideo
  },

  data () {
    return {
      timeoutID: '',
      toggleImage: true
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeoutID)
  },

  methods: {
    handleMouseEnter (event) {
      this.timeoutID = setTimeout(() => {
        this.toggleImage = false
      }, 2500)
    },

    handleMouseLeave (event) {
      clearTimeout(this.timeoutID)
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/_color.scss';

.higlight {
  transform: translateY(-60px);
  position: relative;

  .higlight-content {
    max-width: 40%;
    z-index: 3;
    position: absolute;
    margin: 0 4vw;
    top:20vw;

    h2 {
      font-size: 3vw;
    }

    p {
      font-size: 1.2vw;
    }
  }

  &::after {
    display: block;
    position: relative;
    background-image: linear-gradient(to bottom, transparent 0, #141414 100%);
    margin-top: -24vw;
    height: 24vw;
    width: 100%;
    content: '';
  }

  + .lr-container {
    transform: translateY(-20vw);
  }
}
</style>
