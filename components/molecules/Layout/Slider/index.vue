<template>
  <section class="lr-slider d-block position-relative mb-5">
    <h5 class="title mx-5 mb-4">
      <a href="#">
        {{ title }}
      </a>
    </h5>
    <div class="slider mx-5">
      <VueSlickCarousel
        dots
        :touch-move="false"
        :swipe="false"
        :swipe-to-slide="false"
      >
        <ul
          v-for="(slide, idx) in slideContainer"
          :key="idx"
          class="lr-slider-slide m-0 p-0 w-100 list-unstyled"
        >
          <li
            v-for="movie in slide"
            :key="movie.ID"
            :class="`${id}${movie.ID}`"
            class="cursor-pointer d-inline-block"
            :style="{
              width: `calc(100% / ${perSlide})`
            }"
          >
            <div
              @click="handleOpenShowcase(movie.ID)"
              @mouseenter.stop="handleMouseEnter(id, idx, movie.ID)"
              @mouseleave="handleMouseLeave(id, idx, movie.ID)"
            >
              <div class="img mx-1">
                <div
                  v-if="isSelected(movie.ID)"
                  class="selected position-absolute w-100 h-100 top-0 left-0"
                />
                <b-img-lazy
                  blank
                  blank-color="#111"
                  :src="movie.banners[0].path"
                  :alt="movie.title"
                  class="rounded position-absolute w-100 h-100 top-0 left-0"
                />
              </div>
              <div>
                <div class="card-info d-block position-absolute w-100 h-100 opacity-0 bottom-0">
                  <div
                    :id="`movie-${id}-${idx}-${movie.ID}`"
                    class="theatre"
                  />
                  <div class="position-absolute bottom-0 w-100 h-auto px-2 pb-2">
                    <div class="font-size-smaller">
                      {{ movie.title }}
                    </div>
                    <div class="font-size-smallest d-flex">
                      <div class="mr-1 text-success">
                        {{ movie.release_date | yearOfDate }}
                      </div>
                      <div class="mr-1">
                        {{ movie.rated }}
                      </div>
                      <div class="mr-1">
                        {{ movie.runtime | inHour }}
                      </div>
                    </div>
                    <div class="font-size-smallest tags">
                      <span
                        v-for="(genre, genreIdx) in movie.genres"
                        :key="genreIdx"
                      >
                        {{ genre.name }}
                        <span v-if="genreIdx !== movie.genres.length - 1"> • </span>
                      </span>
                    </div>
                  </div>
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
</template>

<script>
import $ from 'jquery'
import { chunk } from 'lodash'
import VueSlickCarousel from 'vue-slick-carousel'

import { BImgLazy } from 'bootstrap-vue'

import Showcase from '~/components/molecules/Showcase'
import hover from '~/components/molecules/Layout/utils'
import jwplayerSetup from '~/lib/jwplayerSetup'

export default {
  components: {
    VueSlickCarousel,
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
    }
  },

  data () {
    return {
      selected: {
        id: null,
        idx: null
      },
      perSlide: 6
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
      return chunk(this.content, this.perSlide)
    },

    interactiveMode () {
      return this.$store.state.common.interactiveMode
    }
  },

  beforeMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  mounted () {
    this.handleResize()
    hover('lr-slider-slide', this.perSlide)
  },

  updated () {
    this.handleResize()
    hover('lr-slider-slide', this.perSlide)
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
    },

    handleOpenShowcase (id) {
      $('.showcase').removeClass('visible')

      this.$store.dispatch('movie/FETCH_MOVIE_DETAIL', { id, caller: this.id })

      // Refactor here
      $(`.${this.id}`).addClass('visible')
    },

    isSelected (slideID) {
      return this.slideDetail.ID === slideID && this.slideDetailCaller === this.id && !this.isFetching
    },

    closeShowcase () {
      this.$store.dispatch('movie/RESET_MOVIE_DETAIL')
      $(`.${this.id}`).removeClass('visible')
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
.lr-slider {
  ul.lr-slider-slide li {
    .img {
      display: block;
      position: relative;
      padding-top: 56%;
      font-size: 1.2vw;

      &:after {
        content:"";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(#000,1) 100%);
        transition: all .5s ease .2s;
        border-radius: 0.25rem;
      }

      .selected {
        border-style: solid;
        border-width: 0.4rem;
        border-radius: 0.5rem;
        z-index: 100;

        &::after {
          content: '';
          width: 0;
          height: 0;
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -20px;
          border-style: solid;
          border-width: 10px 20px 0 20px;
          margin-top: 3px;
          border-color : #fff transparent transparent transparent;
        }
      }
    }

    &:hover .img:after { opacity: 1;}
    &:first-child { transform-origin: 0px center; }
    &:last-child { transform-origin: 100% center; }
  }
  li, li * {
    outline: none;
    transition: all .5s ease .2s;
  }
}

section.lr-slider {
  .slick-list {
    overflow: unset;
    z-index: 10;
  }

  .slick-arrow  {
    background: rgba(20,20,20,.5);
    z-index: 100;
    height: 100%;
  }

  .slick-prev {
    opacity: 0;
    left: -3rem;
    width: 3rem;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }

  .slick-next {
    opacity: 0;
    right: -3rem;
    width: 3rem;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }
}

</style>
