<template>
  <div class="lr-grid">
    <section class="lr-slider is-horizontal">
      <h2 class="title mb-4">
        <a href="#">
          {{ title }}
        </a>
      </h2>
      <div
        v-for="(slide, idx) in slideContainer"
        :key="idx"
      >
        <div class="slider">
          <ul class="lr-slider-slide is-horizontal">
            <li
              v-for="movie in slide"
              :key="movie.ID"
              :class="`${id}${movie.ID}`"
            >
              <div
                @click="fetchMovie(movie.ID, idx)"
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
                      {{ movie.runtime }}
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
        </div>
        <showcase
          :id="`${id}-${idx}`"
          :data="slideDetail"
          :loading="isFetching"
          @close="closeShowcase"
          @title-click="handleTitleClick"
          @play-click="handlePlayClick"
          @video-click="handleVideoClick"
        />
      </div>
    </section>
  </div>
</template>

<script>
// Reference : https://codepen.io/brandonjdavis/pen/poJPNXb
import $ from 'jquery'
import { chunk } from 'lodash'
import dayjs from 'dayjs'

import Showcase from '~/components/molecules/Showcase'
import hover from '~/components/molecules/Layout/utils'
import isObjectEmpty from '~/lib/Object'

export default {
  components: {
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

    fetchMovie (id, containerId) {
      $('.showcase').removeClass('visible')

      this.$store.dispatch('movie/FETCH_MOVIE_DETAIL', { id, caller: this.id })

      // Refactor here
      $(`.${this.id}-${containerId}`).addClass('visible')
    },

    isSelected (slideID) {
      return this.slideDetail.ID === slideID && this.slideDetailCaller === this.id
    },

    closeShowcase () {
      this.$store.dispatch('movie/RESET_MOVIE_DETAIL')
      $('.showcase').removeClass('visible')
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
.lr-grid {
  section.lr-slider.is-horizontal {
    .title {
      position: relative;
    }

    ul li .img {
      padding-top: 56%;
    }

    ul.lr-slider-slide {
      z-index: 1;

      li .card-info {
        bottom: 0;
        padding: 10% 5%;
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
    }

    .showcase {
      top: -4.8vw;
    }
  }
}
</style>
