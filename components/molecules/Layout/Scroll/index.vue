<template>
  <div class="r-scroll">
    <h6 class="p-3">
      <a href="#">
        {{ title }}
      </a>
    </h6>
    <div class="scroll">
      <ul class="m-0 p-0 w-100 list-unstyled">
        <li class="initial " />
        <li
          v-for="movie in content"
          :key="movie.ID"
          class="cursor-pointer d-inline-block"
          :style="{
            width: `calc(100% / ${perSlide})`
          }"
        >
          <b-link
            :to="{
              name: 'movie-id',
              params: { id: movie.ID }
            }"
            class="img mr-1"
          >
            <b-img-lazy
              fluid
              blank
              blank-color="#111"
              :src="movie.banners[0].path"
              :alt="movie.title"
              class="rounded position-absolute w-100 h-100 top-0 left-0"
            />
          </b-link>
        </li>
        <li class="initial d-inline-block" />
      </ul>
    </div>
  </div>
</template>

<script>
import { BImgLazy, BLink } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy,
    BLink
  },

  props: {
    id: {
      type: String,
      default: 'itemsss',
      required: true
    },
    title: {
      type: String,
      default: 'Untitled',
      required: true
    },
    content: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      perSlide: 2
    }
  },

  beforeMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  mounted () {
    this.handleResize()
  },

  updated () {
    this.handleResize()
  },

  methods: {
    handleResize () {
      const screenSize = window.innerWidth
      if (screenSize < 480) {
        this.perSlide = 2
      } else if (screenSize < 768) {
        this.perSlide = 3
      } else if (screenSize < 1024) {
        this.perSlide = 4
      } else {
        this.perSlide = 6
      }
    }
  }
}
</script>

<style lang="scss">
.scroll ul {
  overflow-y: hidden ;
  overflow-x: auto;
  white-space: nowrap;

  .initial {
    width: 1rem;
  }

  .img {
    display: block;
    position: relative;
    padding-top: 56%;
  }
}
</style>
