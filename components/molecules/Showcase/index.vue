<template>
  <div
    :class="id"
    class="showcase"
    :style="`background-image: url('https://image.tmdb.org/t/p/original/o3Htmlg6BfNs8Ew7yjsRzVnYSEs.jpg');`"
  >
    <div class="bg-gradient">
      <div
        class="close-icon"
        @click="closeShowcase"
      >
        <b-icon-x />
      </div>
      <l-r-tabs>
        <b-tab title="Overview" active>
          <div class="showcase-container">
            <h2>{{ data.title }}</h2>
            <div class="info mb-2">
              <div class="year">
                {{ dayjs(data.released_date).format('YYYY') }}
              </div>
              <div class="age">
                {{ data.rated }}
              </div>
              <div class="dur">
                {{ data.runtime }} m
              </div>
            </div>
            <div class="plot mb-4">
              {{ data.overview }}
            </div>
            <div class="mb-4">
              <b-button variant="danger">
                <b-icon-play-fill /> PUTAR
              </b-button>
            </div>
            <div class="actor">
              <strong>Pemeran : </strong>
              <span
                v-for="actor in data.actors"
                :key="actor.ID"
              >
                {{ actor.name }}
              </span>
            </div>
            <div class="genre">
              <strong>Genres : </strong>
              <span
                v-for="genre in data.genres"
                :key="genre.ID"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>
        </b-tab>
        <b-tab title="Detail">
          <div class="showcase-container">
            <h2>{{ data.title }}</h2>
          </div>
        </b-tab>
      </l-r-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { BIconX, BIconPlayFill, BTab, BButton } from 'bootstrap-vue'

import LRTabs from '~/components/atoms/LRTabs'

export default {
  components: {
    LRTabs,
    BTab,
    BButton,
    BIconX,
    BIconPlayFill
  },

  props: {
    id: {
      type: String,
      required: true,
      default: 'showcase-id'
    },
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    dayjs,

    closeShowcase () {
      this.$emit('close')
    }
  }
}
</script>
