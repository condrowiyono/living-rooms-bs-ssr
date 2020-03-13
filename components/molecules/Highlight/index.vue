<template>
  <div class="higlight">
    <lr-bg-video ref-data="lr-highlight-video" />
    <div class="higlight-content">
      <h2> Crash Landing On You </h2>
      <p>
        A paragliding mishap drops a South Korean heiress in North Korea -- and into the life of an army officer, who decides he will help her hide.
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
import { BButton, BIconPlayFill, BIconInfo } from 'bootstrap-vue'
import LrBgVideo from '~/components/atoms/LrBgVideo'

export default {
  components: {
    BButton,
    BIconPlayFill,
    BIconInfo,
    LrBgVideo
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
