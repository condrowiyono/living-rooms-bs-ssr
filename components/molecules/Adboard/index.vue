<template>
  <div class="adboard" style="background-image:url('https://image.tmdb.org/t/p/original/o3Htmlg6BfNs8Ew7yjsRzVnYSEs.jpg');">
    <div class="adboard-bg-gradient">
      <div class="adboard-container">
        <div class="adboard-container__left" />
        <div class="adboard-container__right">
          <div>
            <h2> Crash Landing On You </h2>
            <p>A paragliding mishap drops a South Korean heiress in North Korea -- and into the life of an army officer, who decides he will help her hide.</p>
            <div class="mt-4">
              <b-button class="btn-transparent mr-2">
                <b-icon-play-fill /> Putar
              </b-button>
              <b-button class="btn-transparent">
                <b-icon-info-circle /> Info Lengkap
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton, BIconPlayFill, BIconInfoCircle } from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BIconPlayFill,
    BIconInfoCircle
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
    margin: 0 4vw;
    display: flex;
    height: 100%;

    &__left,
    &__right {
      position: relative;
      height: inherit;
      display: flex;
      align-items: center;
    }

    &__left {
      padding: 2vw 0;
    }

    &__right {
      margin-left: 4vw;
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
