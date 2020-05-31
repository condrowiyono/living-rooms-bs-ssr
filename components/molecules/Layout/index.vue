<template>
  <div>
    <slider
      v-if="type==='slider'"
      :id="id"
      :title="title"
      :content="content"
    />
    <grid
      v-if="type==='grid'"
      :id="id"
      :title="title"
      :content="content"
      :loading="loading"
    />
    <scroll
      v-if="type==='scroll'"
      :id="id"
      :title="title"
      :content="content"
      :loading="loading"
    />
  </div>
</template>

<script>
import Slider from './Slider'
import Grid from './Grid'

import Scroll from './Scroll'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    Slider,
    Grid,
    Scroll
  },

  props: {
    type: {
      type: String,
      default: 'slider',
      required: true
    },
    id: {
      type: String,
      default: 'item',
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

  mounted () {
    this.$store.dispatch('movie/RESET_MOVIE_DETAIL')
  }
}
</script>
