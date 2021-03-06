<template>
  <div
    :class="id"
    class="showcase"
    :style="`background: none`"
  >
    <div class="bg-gradient w-100 h-100 position-absolute">
      <div
        v-if="data && data.banners"
        class="position-absolute h-100 right-0"
      >
        <b-img-lazy
          v-if="!loading"
          :src="data.banners[0].path"
          class="h-100 w-auto position-absolute right-0"
        />
      </div>
    </div>
    <div class="h-100 mb-5">
      <div
        v-if="!noClose"
        class="close-icon position-absolute right-0 top-20 pr-2 cursor-pointer"
        @click="closeShowcase"
      >
        <b-icon-x />
      </div>
      <r-tabs v-if="!loading">
        <b-tab title="Overview" active>
          <div class="overview px-3 px-sm-5 py-vw-3 overflow-none h-100">
            <div class="title mb-vw-1">
              <span v-if="noClose"> {{ data.title }} </span>
              <b-link
                v-else
                :to="{
                  name: 'movie-id',
                  params: { id: data.ID }
                }"
              >
                {{ data.title }}
              </b-link>
            </div>
            <div class="attribute mb-vw-1 d-flex justify-content-start align-items-center">
              <div class="mr-2">
                {{ data.release_date | yearOfDate }}
              </div>
              <div class="mr-2 border px-2">
                {{ data.rated }}
              </div>
              <div class="mr-2">
                {{ data.runtime | inHour }}
              </div>
            </div>
            <div class="mb-vw-1 plot d-none d-md-block text-white-darker">
              {{ data.overview }}
            </div>
            <div
              v-if="data && data.player"
              class="mb-vw-1 "
            >
              <b-button
                class="btn-white"
                :to="{
                  name: 'player-id',
                  params: { id: data.player.ID }
                }"
              >
                <b-icon-play-fill /> Putar
              </b-button>
            </div>
            <div class="cast d-md-block d-none">
              <div>
                <strong>Pemeran : </strong>
                <span
                  v-for="actor in limitedActors(5)"
                  :key="actor.ID"
                  class="text-white-darker"
                >
                  {{ actor.name }}
                </span>
              </div>
              <div>
                <strong>Genres : </strong>
                <span
                  v-for="genre in data.genres"
                  :key="genre.ID"
                  class="text-white-darker"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab
          v-if="!$device.isMobileOrTablet"
          title="Videos"
        >
          <div class="px-5 py-vw-3 w-100">
            <div class="title mb-vw-1">
              {{ data.title }}
            </div>
            <div class="video-container">
              <div
                v-for="video in data.videos"
                :key="video.ID"
                class="video-item"
              >
                <div class="thumbnail cursor-pointer">
                  <b-img-lazy
                    fluid
                    :src="getThumbnails(video.player_url)"
                  />
                  <b-link
                    class="hover"
                    :to="{
                      name: 'video-id',
                      params: {id: video.ID}
                    }"
                  >
                    <b-icon-play-fill
                      font-scale="4"
                    />
                  </b-link>
                </div>
                <div class="type">
                  {{ video.type }}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab
          v-if="!$device.isMobileOrTablet"
          title="Detail"
        >
          <div class="detail overflow-auto px-5 py-vw-3 w-100 h-100">
            <div class="title mb-vw-1">
              {{ data.title }}
            </div>
            <div class="d-flex justify-content-start">
              <div class="mr-5">
                <div class="font-weight-bold">
                  Director
                </div>
                <div>
                  <nuxt-link
                    class="item"
                    :to="''"
                  >
                    {{ data.director }}
                  </nuxt-link>
                </div>
                <div class="font-weight-bold mt-2">
                  Cast
                </div>
                <div>
                  <nuxt-link
                    v-for="actor in limitedActors(8)"
                    :key="actor.ID"
                    class="d-block"
                    :to="''"
                  >
                    {{ actor.name }}
                  </nuxt-link>
                </div>
              </div>
              <div>
                <div class="font-weight-bold">
                  Genre
                </div>
                <div>
                  <nuxt-link
                    v-for="genre in data.genres"
                    :key="genre.ID"
                    class="item"
                    :to="''"
                  >
                    {{ genre.name }}
                  </nuxt-link>
                </div>
                <div class="font-weight-bold mt-2">
                  Rating TMDB
                </div>
                <div>
                  {{ data.vote_average }}
                </div>
                <div class="font-weight-bold mt-2">
                  Kelompuk Umur
                </div>
                <div>
                  {{ data.rated }}
                </div>
                <div class="font-weight-bold mt-2">
                  TMDB ID
                </div>
                <div>
                  {{ data.tmdb_id }}
                </div>
                <div class="font-weight-bold mt-2">
                  IMDB ID
                </div>
                <div>
                  {{ data.imdb_id }}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </r-tabs>
      <div
        v-if="$device.isMobileOrTablet"
        class="mobile-view px-3 mt-3 text-white-darker"
      >
        <div class="overview">
          {{ data.overview }}
        </div>
        <div class="detail">
          <div class="mb-2 mt-2">
            <strong> DETAIL FILM </strong>
          </div>
          <div class="d-flex justify-content-start">
            <div class="mr-4">
              <div class="font-weight-bold">
                Director
              </div>
              <div>
                <nuxt-link
                  class="item"
                  :to="''"
                >
                  {{ data.director }}
                </nuxt-link>
              </div>
              <div class="font-weight-bold mt-2">
                Cast
              </div>
              <div>
                <nuxt-link
                  v-for="actor in limitedActors(8)"
                  :key="actor.ID"
                  class="d-block"
                  :to="''"
                >
                  {{ actor.name }}
                </nuxt-link>
              </div>
            </div>
            <div>
              <div class="font-weight-bold">
                Genre
              </div>
              <div>
                <nuxt-link
                  v-for="genre in data.genres"
                  :key="genre.ID"
                  class="item"
                  :to="''"
                >
                  {{ genre.name }}
                </nuxt-link>
              </div>
              <div class="font-weight-bold mt-2">
                Rating TMDB
              </div>
              <div>
                {{ data.vote_average }}
              </div>
              <div class="font-weight-bold mt-2">
                Kelompuk Umur
              </div>
              <div>
                {{ data.rated }}
              </div>
              <div class="font-weight-bold mt-2">
                TMDB ID
              </div>
              <div>
                {{ data.tmdb_id }}
              </div>
              <div class="font-weight-bold mt-2">
                IMDB ID
              </div>
              <div>
                {{ data.imdb_id }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconX, BIconPlayFill, BTab, BButton, BImgLazy, BLink } from 'bootstrap-vue'

import RTabs from '~/components/atoms/RTabs'

export default {
  components: {
    RTabs,
    BTab,
    BButton,
    BImgLazy,
    BIconX,
    BIconPlayFill,
    BLink
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
    },

    noClose: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isVideo: false
    }
  },

  methods: {
    closeShowcase () {
      this.$emit('close')
    },

    handleTitleClick (id) {
      this.$emit('title-click', id)
    },

    handlePlayClick (playerID) {
      this.$emit('play-click', playerID)
    },

    handleVideoClick (videoID) {
      this.$emit('video-click', videoID)
    },

    limitedActors (firstN) {
      if (this.data.actors) {
        if (this.data.actors.length > firstN) {
          return this.data.actors.slice(0, firstN)
        } else {
          return this.data.actors
        }
      } else {
        return []
      }
    },

    getThumbnails (url) {
      const youtube = 'https://img.youtube.com/vi/{id}/0.jpg'

      // eslint-disable-next-line
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      const match = url.match(regExp)
      if (match && match[2].length === 11) {
        return youtube.replace('{id}', match[2])
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/_color.scss';
.showcase {
  position: relative;
  height: 34vw;
  font-size: 1.2vw;
  visibility: hidden;
  display: none;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba($white,0.7);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &.visible {
    visibility: visible;
    display: block;
  }

  .overview {
    width: 50%;
  }

  .close-icon {
    font-size: 3rem;
    z-index: 2;
    transition: transform .1s linear;

    &:hover {
      transform: scale(1.1);
      transition: transform .1s linear;
    }
  }

  .bg-gradient {
    &::after {
      background-image: linear-gradient(90deg,#000 0%, #000 40%, transparent);
      display: block;
      content: '';
      height: 100%;
      width: 100%;
      position: relative;
    }
  }

  .plot {
    max-height: 8vw;
    overflow-y: auto;
  }

  .title {
    font-size: 2vw;
  }

  .btn {
    font-size: inherit;
    font-weight: 600;
  }

  .mb-vw-1 {
    margin-bottom: 1vw ;
  }

  .py-vw-3 {
    padding-top: 3vw;
    padding-bottom: 3vw;
  }

  .video-container {
    padding: 2vw 0;
    width: 100%;
    overflow-y: hidden ;
    overflow-x: auto;
    white-space: nowrap;

    .video-item {
      margin: 0 0.4vw;
      display: inline-block;
      vertical-align: top;

      .thumbnail{
        padding: .5vw;
        margin-bottom: 1vw ;
        width: 14vw;
        height: 9vw;
        background-size: cover;
        position: relative;
        display: flex;

        .hover {
          transition: opacity .2s linear;
          opacity: 0;
          position: absolute;
          height: auto;
          width: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          &:hover {
            color: red;
            transition: color .2s linear;
          }
        }

        &:hover .hover {
          opacity: 1;
          transition: opacity .2s linear;
        }
      }
    }
  }

  @media (max-width: 767.98px) {
    .overview {
      width: 100%;
    }

    .title {
      font-size: 1rem;
    }

    .attribute, .btn {
      font-size: 0.8rem;
    }

    .detail {
      font-size: 0.8rem;
    }
  }

  .mobile-view {
    .overview {
      width: 100%;
    }

    font-size: 1rem;
  }
}
</style>
