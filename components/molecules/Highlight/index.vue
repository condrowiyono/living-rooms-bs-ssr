<template>
  <div
    class="higlight"
    @mouseenter.stop.self="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <transition name="fade">
      <div
        id="myElement"
        style="position:relative; overflow:hidden; padding-bottom:56.25%"
      />
      <!-- <b-img
        v-else
        fluid
        src="https://image.tmdb.org/t/p/original/8K001T1pcEDQSOYwEI1wKps1qcA.jpg"
      /> -->
    </transition>
    <div class="higlight-content">
      <h2 :style="$fontResizer(isMobileOrTablet, '1.4rem')">
        Parasite
      </h2>
      <p v-if="!isMobileOrTablet">
        All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.
      </p>
      <div
        :class="{
          'mt-2' : isMobileOrTablet,
          'mt-4': !isMobileOrTablet
        }"
      >
        <b-button
          class="btn-transparent mr-2"
          :style="$fontResizer(isMobileOrTablet)"
        >
          <b-icon-play-fill /> Putar
        </b-button>
        <b-button
          class="btn-transparent"
          :style="$fontResizer(isMobileOrTablet)"
        >
          <b-icon-info-circle />
          <span v-if="!isMobileOrTablet">
            Info Lengkap
          </span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton, BIconPlayFill, BIconInfoCircle } from 'bootstrap-vue'
// import LrBgVideo from '~/components/atoms/LrBgVideo'

import jwplayerSetup from '~/lib/jwplayerSetup'

export default {
  components: {
    BButton,
    BIconPlayFill,
    BIconInfoCircle
  },

  props: {
    isMobileOrTablet: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      timeoutID: '',
      toggleImage: true
    }
  },

  created () {
    jwplayerSetup({
      id: 'myElement',
      file: 'https://content.jwplatform.com/videos/CGcMaaAa-UpH3H8tS.mp4',
      image: 'https://image.tmdb.org/t/p/original/toqWRc1frtaqb2iZyRs5zCZh2aD.jpg'
    })
  },

  beforeDestroy () {
    clearTimeout(this.timeoutID)
  },

  methods: {
    handleMouseEnter (event) {
      if (this.$device.isMobileOrTablet) {
        return
      }
      // eslint-disable-next-line
      console.warn(jwplayer('myElement').stop(true))
      // eslint-disable-next-line
      console.warn(jwplayer('myElement').play(true))
    },

    handleMouseLeave (event) {
      // eslint-disable-next-line
      console.warn(jwplayer('myElement').stop(true))
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
    max-width: 50%;
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
