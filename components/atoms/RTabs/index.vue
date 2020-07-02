<template>
  <b-tabs
    class="r-tabs"
    end
  >
    <slot />
  </b-tabs>
</template>

<script>
import { BTabs } from 'bootstrap-vue'

export default {
  components: {
    BTabs
  }
}
</script>
<style lang="scss">
@import './assets/scss/_color.scss';
.r-tabs {
  position: relative;
  height: 100%;

  .tab-content, .tab-pane {
    height: 100%;
  }

  ul {
    width: 100%;
    position: absolute;
    justify-content: center;
    border: none;
    bottom: 0;

    li {
      text-align: center;

      a.nav-link {
        text-transform: uppercase;
        border: none;
        background: none;
        color: white;
        border-bottom: .25vw transparent solid;
        font-size: inherit;
        font-weight: 600;

        &.active {
          background: none;
          color: white;
          border-bottom: .25vw red solid;
        }
      }
    }
  }

  @media (max-width: 767.98px) {
    ul li a.nav-link {
      font-size: 0.8rem;
    }
  }
}
</style>
