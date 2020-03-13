<template>
  <div>
    <section class="lr-slider is-vertical">
      <h2 class="title">
        {{ title }}
      </h2>
      <div
        class="slider"
        :class="`slider-${id}`"
      >
        <VueSlickCarousel
          :dots="true"
          :touch-move="false"
          :swipe="false"
          :swipe-to-slide="false"
        >
          <ul
            v-for="(slide, idx) in slideContainer"
            :key="idx"
            class="lr-slider-slide is-vertical"
          >
            <li
              v-for="movie in slide"
              :key="movie.ID"
              :class="`${id}-${movie.ID}`"
            >
              <div
                @click="fetchMovie(movie.ID)"
              >
                <div
                  class="img"
                  :style="`background-image: url(${movie.posters[0].path});`"
                >
                  <div
                    v-if="isSelected(movie.ID)"
                    class="selected"
                  />
                  <img :src="movie.banners[0].path">
                </div>
                <div class="card-info">
                  <h3>{{ movie.title }}</h3>
                  <div class="info">
                    <div class="year">
                      {{ dayjs(movie.released_date).format('YYYY') }}
                    </div>
                    <div class="age">
                      {{ movie.rated }}
                    </div>
                    <div class="dur">
                      {{ movie.runtime }} m
                    </div>
                  </div>
                  <div class="tags">
                    <span
                      v-for="genre in movie.genres"
                      :key="genre.ID"
                    >
                      {{ genre.name }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </VueSlickCarousel>
      </div>
      <showcase
        :id="id"
        :data="slideDetail"
        @close="closeShowcase"
        @title-click="handleTitleClick"
        @play-click="handlePlayClick"
        @video-click="handleVideoClick"
      />
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import { chunk } from 'lodash'
import VueSlickCarousel from 'vue-slick-carousel'
import dayjs from 'dayjs'

import Showcase from '~/components/molecules/Showcase'
import hover from '~/components/molecules/Layout/utils'

import isObjectEmpty from '~/lib/Object'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    VueSlickCarousel,
    Showcase
  },

  props: {
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
  },

  computed: {
    slideDetail () {
      return this.$store.state.movie.movie
    },
    slideDetailCaller () {
      return this.$store.state.movie.caller
    },
    slideContainer () {
      return chunk(this.content, 9)
    }
  },

  mounted () {
    hover('lr-slider-slide', 'is-vertical')
  },

  methods: {
    dayjs,

    isObjectEmpty,

    fetchMovie (id) {
      // Refactor here
      $('.showcase').removeClass('visible')

      this.$store.dispatch('movie/FETCH_MOVIE_DETAIL', { id, caller: this.id })

      // Refactor here
      $(`.showcase.${this.id}`).addClass('visible')
    },

    isSelected (slideID) {
      return this.slideDetail.ID === slideID && this.slideDetailCaller === this.id
    },

    closeShowcase () {
      this.$store.dispatch('movie/RESET_MOVIE_DETAIL')
      $(`.showcase.${this.id}`).removeClass('visible')
    },

    handleTitleClick (id) {
      this.$router.push({
        name: 'movie-id',
        params: { id }
      })
    },

    handlePlayClick (playerID) {
      this.$router.push({
        name: 'player-id',
        params: { id: playerID }
      })
    },

    handleVideoClick (videoID) {
      this.$router.push({
        name: 'video-id',
        params: { id: videoID }
      })
    }
  }
}
</script>

<style lang="scss">
section.lr-slider.is-vertical {
  ul.lr-slider-slide li {
    width: calc(100% / 9)
  }
  .showcase {
    visibility: hidden;
    display: none;

    &.visible {
      visibility: visible;
      display: block;
    }
  }
}
</style>
