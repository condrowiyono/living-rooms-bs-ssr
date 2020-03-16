<template>
  <div>
    <section class="lr-slider is-horizontal">
      <h2 class="title">
        <a href="#">
          {{ title }}
        </a>
      </h2>
      <div class="slider">
        <VueSlickCarousel
          :dots="true"
          :touch-move="false"
          :swipe="false"
          :swipe-to-slide="false"
        >
          <ul
            v-for="(slide, idx) in slideContainer"
            :key="idx"
            class="lr-slider-slide is-horizontal"
          >
            <li
              v-for="movie in slide"
              :key="movie.ID"
              :class="`${id}${movie.ID}`"
            >
              <div
                @click="fetchMovie(movie.ID)"
              >
                <div
                  class="img"
                  :style="`background-image: url(${movie.banners[0].path});`"
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
                      {{ dayjs(movie.release_date).format('YYYY') }}
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
                      :key="genre.id"
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
        :loading="isFetching"
        @close="closeShowcase"
        @title-click="handleTitleClick"
        @play-click="handlePlayClick"
        @video-click="handleVideoClick"
      />
    </section>
  </div>
</template>

<script>
// Reference : https://codepen.io/brandonjdavis/pen/poJPNXb
import $ from 'jquery'
import { chunk } from 'lodash'
import VueSlickCarousel from 'vue-slick-carousel'
import dayjs from 'dayjs'

import Showcase from '~/components/molecules/Showcase'
import hover from '~/components/molecules/Layout/utils'

import isObjectEmpty from '~/lib/Object'

export default {
  components: {
    VueSlickCarousel,
    Showcase
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
    }
  },

  computed: {
    slideDetail () {
      return this.$store.state.movie.movie
    },

    slideDetailCaller () {
      return this.$store.state.movie.caller
    },

    isFetching () {
      return this.$store.state.movie.isFetching
    },

    slideContainer () {
      return chunk(this.content, 6)
    }
  },

  mounted () {
    hover('lr-slider-slide', 'is-horizontal')
  },

  methods: {
    dayjs,

    isObjectEmpty,

    fetchMovie (id) {
      $('.showcase').removeClass('visible')

      this.$store.dispatch('movie/FETCH_MOVIE_DETAIL', { id, caller: this.id })

      // Refactor here
      $(`.${this.id}`).addClass('visible')
    },

    isSelected (slideID) {
      return this.slideDetail.ID === slideID && this.slideDetailCaller === this.id
    },

    closeShowcase () {
      this.$store.dispatch('movie/RESET_MOVIE_DETAIL')
      $(`.${this.id}`).removeClass('visible')
    },

    handleTitleClick (id) {
      console.warn(id)
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
section.lr-slider.is-horizontal {
  ul li .img {
    padding-top: 56%;
  }

  ul.lr-slider-slide li {
    width: calc(100% / 6);

    .card-info {
      bottom: 15%;
      padding: 0 5%;
      transform: none;

      h3 {
        font-size: .7vw;
      }

      .info {
        .year {
          font-size: .5vw;
        }

        .age {
          font-size: .5vw;
        }

        .dur {
          font-size: .5vw;
        }
      }

      .tags span{
          font-size: .5vw;
      }
    }

    .showcase {
      top: -6vw;
    }
  }
}
</style>
