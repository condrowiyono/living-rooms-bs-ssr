<template>
  <b-tabs class="lr-tabs">
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
.lr-tabs {
  position: relative;
  height: 100%;

  div {
    width: 100%;
  }

  ul {
    margin: 0;
    width: 100%;
    position: absolute;
    bottom: 0;
    justify-content: center;
    border: none;

    li {
      text-align: center;

      a.nav-link {
        text-transform: uppercase;
        border: none;
        background: none;
        color: white;
        border-bottom: .2vw transparent solid;

        &.active {
          background: none;
          color: white;
          border-bottom: .2vw red solid;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
