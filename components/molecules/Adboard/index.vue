<template>
  <div class="adboard" style="background-image:url('https://image.tmdb.org/t/p/original/o3Htmlg6BfNs8Ew7yjsRzVnYSEs.jpg');">
    <div class="adboard-bg-gradient">
      <div class="adboard-container">
        <div class="adboard-container__left">
          <lr-bg-video
            ref-data="lr-adboard-video"
            class="adboard-video"
          />
        </div>
        <div class="adboard-container__right">
          <div>
            <h2> Crash Landing On You </h2>
            <p>A paragliding mishap drops a South Korean heiress in North Korea -- and into the life of an army officer, who decides he will help her hide.</p>
            <div class="mt-4">
              <b-button class="btn-transparent mr-2"> <b-icon-play-fill/> Putar </b-button>
              <b-button class="btn-transparent"> <b-icon-info/> Info Lengkap </b-button>
            </div>
          </div>
        </div>
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
.adboard {
  height: 32vw;
  background-size: cover;

  .adboard-bg-gradient {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, rgba(20,20,20,1) 20%, rgba(20,20,20,0.9) 60%, rgba(20,20,20,0.8) 100%);
  }

  .adboard-container {
    margin: 0 3vw;
    display: flex;
    height: 100%;

    &__left,
    &__right {
      position: relative;
      height: inherit;
      display: flex;
      align-items: center;
    }

    &__right {
      margin-left: 3vw;
      font-size: 1.2vw;

      h2 {
        font-size: 1.8vw;
      }
    }
  }

  .adboard-video {
    width: 50vw;
  }
}
</style>
