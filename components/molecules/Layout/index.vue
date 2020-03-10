<template>
  <div>
    <slider-poster
      v-if="type==='slider-poster'"
      :id="id"
      :title="title"
      :content="content"
    />
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
    />
    <grid-poster
      v-if="type==='grid-poster'"
      :id="id"
      :title="title"
      :content="content"
    />
  </div>
</template>

<script>
import SliderPoster from './SliderPoster'
import Slider from './Slider'
import GridPoster from './GridPoster'
import Grid from './Grid'

export default {
  components: {
    SliderPoster,
    Slider,
    GridPoster,
    Grid
  },
  props: {
    type: {
      type: String,
      default: 'slider-poster',
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
    }
  }
}
</script>
