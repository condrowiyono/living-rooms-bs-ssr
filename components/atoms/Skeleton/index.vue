<template>
  <div class="lr-skeleton">
    <ul class="skeleton mt-4">
      <li
        v-for="m in n"
        :key="m"
        :style="`width: ${100 / n}%`"
      >
        <span
          class="skeleton-box"
          :style="`padding-top: ${paddingTop}%`"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    paddingTop: {
      type: Number,
      default: 150
    },

    n: {
      type: Number,
      default: 9
    },

    duration: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.lr-skeleton {
  margin: 0 4vw;
  position: absolute;
  width: calc(100% - 8vw);

  ul.skeleton {
    padding: 0;

    li {
      list-style: none;
      display: inline-block;
      padding: 1vw 2px;

      .skeleton-box {
        display: inline-block;
        width: 100%;
        height: 0;
        padding-top: 150%;
        position: relative;
        overflow: hidden;
        background-color: #090909;

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(#161616, 0) 0,
            rgba(#161616, 0.2) 20%,
            rgba(#161616, 0.5) 60%,
            rgba(#161616, 0)
          );
          animation: shimmer 1s infinite;
          content: '';
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      }
    }
  }
}

</style>
