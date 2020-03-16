<template>
  <div class="lr-video-player h-100">
    <vue-plyr
      :ref="refData"
      :options="options"
      no-ssr
      class="h-100"
    >
      <div class="plyr__video-embed">
        <iframe
          title="plyr"
          :src="playerSrc"
          allowfullscreen
          allow="autoplay"
        />
      </div>
    </vue-plyr>
    <div class="floating-control">
      <b-icon-play-fill
        class="rounded-circle btn-transparent p-1 mr-2"
        font-scale="2"
        @click="play()"
      />
      <b-icon-volume-mute-fill
        class="rounded-circle btn-transparent p-1"
        font-scale="2"
        @click="mute()"
      />
    </div>
  </div>
</template>

<script>
import { BIconPlayFill, BIconVolumeMuteFill } from 'bootstrap-vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'

export default {
  components: {
    VuePlyr,
    BIconVolumeMuteFill,
    BIconPlayFill
  },

  props: {
    refData: {
      type: String,
      default: 'plyr',
      required: true
    },

    playerSrc: {
      type: String,
      required: true
    },

    autoplay: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      options: {
        autoplay: this.autoplay,
        controls: []
      }
    }
  },

  methods: {
    play () {
      console.warn(this.$refs[this.refData].player)
      this.$refs[this.refData].player.togglePlay()
    },

    mute () {
      if (this.$refs[this.refData].player.volume === 0) {
        this.$refs[this.refData].player.volume = 1
      } else {
        this.$refs[this.refData].player.volume = 0
      }
    }
  }
}
</script>

<style lang="scss">
.lr-video-player {
  position: relative;

  .floating-control {
    z-index: 3;
    position: absolute;
    bottom: 30%;
    right: 0;
    padding: 0.5vw 4vw 0.5vw 0.5vw;
    border-left: 2px solid #fff;
    background-color: rgba(51,51,51,0.5);

    * {
      cursor: pointer;
      border: 1px solid #fff;
    }
  }
}
</style>
