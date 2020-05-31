<template>
  <div class="lr-grid">
    <section class="lr-slider">
      <h2 class="title mb-4">
        <a href="#">
          {{ title }}
        </a>
      </h2>
      <div v-if="!loading">
        <div
          v-for="(slide, idx) in slideContainer"
          :key="idx"
        >
          <div class="slider">
            <ul class="lr-slider-slide">
              <li
                v-for="movie in slide"
                :key="movie.ID"
                :class="`${id}${movie.ID}`"
              >
                <div
                  @click="fetchMovie(movie.ID, idx)"
                  @mouseenter.stop="handleMouseEnter(id, idx, movie.ID)"
                  @mouseleave="handleMouseLeave(id, idx, movie.ID)"
                >
                  <div class="img">
                    <div
                      v-if="isSelected(movie.ID)"
                      class="selected"
                    />
                    <div>
                      <b-img-lazy
                        blank
                        blank-color="#ddd"
                        :src="movie.banners[0].path"
                      />
                      <div class="card-movie-title">
                        {{ movie.title }}
                      </div>
                    </div>
                  </div>
                  <div class="card-info">
                    <div
                      :id="`movie-${id}-${idx}-${movie.ID}`"
                      class="theatre"
                    />
                    <div class="caption-bg">
                      <div class="caption-content">
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
      </div>
    </section>
  </div>
</template>

<script>
// Reference : https://codepen.io/brandonjdavis/pen/poJPNXb
import $ from 'jquery'
import { chunk } from 'lodash'
import dayjs from 'dayjs'

import { BImgLazy } from 'bootstrap-vue'

import Showcase from '~/components/molecules/Showcase'
import hover from '~/components/molecules/Layout/utils'
import isObjectEmpty from '~/lib/Object'
import jwplayerSetup from '~/lib/jwplayerSetup'

export default {
  components: {
    Showcase,
    BImgLazy
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

  computed: {
    slideDetail () {
      return this.$store.state.movie.movie
    },

    slideDetailCaller () {
      return this.$store.state.movie.caller
    },

    isFetching () {
      return this.$store.state.movie.isFetchingDetail
    },

    slideContainer () {
      return chunk(this.content, 6)
    },

    interactiveMode () {
      return this.$store.state.common.interactiveMode
    }
  },

  updated () {
    hover('lr-slider-slide')
  },

  mounted () {
    hover('lr-slider-slide')
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
      return this.slideDetail.ID === slideID && this.slideDetailCaller === this.id && !this.isFetching
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
    },

    handleMouseEnter (id, idx, movieID) {
      // if selected return
      const selected = document.getElementsByClassName('selected')
      if (selected.length > 0) {
        return
      }

      // if non-interactive return
      if (this.interactiveMode === false) {
        return
      }

      // eslint-disable-next-line
      jwplayer(`movie-${id}-${idx}-${movieID}`).remove()

      jwplayerSetup({
        id: `movie-${id}-${idx}-${movieID}`,
        file: 'https://content.jwplatform.com/videos/CGcMaaAa-UpH3H8tS.mp4',
        image: 'https://image.tmdb.org/t/p/original/toqWRc1frtaqb2iZyRs5zCZh2aD.jpg'
      })
    },

    handleMouseLeave (id, idx, movieID) {
      // if non-interactive return
      if (this.interactiveMode === false) {
        return
      }

      // eslint-disable-next-line
      jwplayer(`movie-${id}-${idx}-${movieID}`).remove()
    }
  }
}
</script>

<style lang="scss">
.lr-grid {
  section.lr-slider {
    .title {
      position: relative;
    }

    ul.lr-slider-slide {
      z-index: 1;
    }

    .showcase {
      top: -5vw;
    }
  }
}
</style>
