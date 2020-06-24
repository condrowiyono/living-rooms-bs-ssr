<template>
  <div
    :class="id"
    class="showcase"
    :style="`background: none`"
  >
    <div
      class="bg-gradient"
      :style="{backgroundColor: loading ? 'black' : ''}"
    >
      <div v-if="data && data.banners">
        <b-img
          :src="data.banners[0].path"
        />
      </div>
    </div>
    <div class="h-100">
      <div
        v-if="!noClose"
        class="close-icon"
        @click="closeShowcase"
      >
        <b-icon-x />
      </div>
      <l-r-tabs v-if="!loading">
        <b-tab title="Overview" active>
          <div class="showcase-container">
            <h2 @click="handleTitleClick(data.ID)">
              {{ data.title }}
            </h2>
            <div class="info mb-2">
              <div class="year">
                {{ dayjs(data.release_date).format('YYYY') }}
              </div>
              <div class="age">
                {{ data.rated }}
              </div>
              <div class="dur">
                {{ inHour(data.runtime) }}
              </div>
            </div>
            <div class="plot mb-4">
              {{ data.overview }}
            </div>
            <div class="mb-4">
              <b-button
                variant="danger"
                class="btn-red"
                @click="handlePlayClick(data.player.ID)"
              >
                <b-icon-play-fill /> Putar
              </b-button>
            </div>
            <div class="actor">
              <strong>Pemeran : </strong>
              <span
                v-for="actor in limitedActors(5)"
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
        <b-tab title="Videos">
          <div class="showcase-container w-100">
            <h2>{{ data.title }}</h2>
            <div class="video-container">
              <div
                v-for="video in data.videos"
                :key="video.ID"
                class="video-item"
              >
                <div
                  class="thumbnail"
                >
                  <b-img fluid :src="getThumbnails(video.player_url)" />
                  <div class="hover">
                    <b-icon-play-fill
                      font-scale="4"
                      @click="handleVideoClick(video.ID)"
                    />
                  </div>
                </div>
                <div class="title">
                  {{ video.type }}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Detail">
          <div class="showcase-container showcase-detail">
            <h2>{{ data.title }}</h2>
            <div class="d-flex">
              <div class="section">
                <div class="title">
                  Director
                </div>
                <div class="body">
                  <nuxt-link
                    class="item"
                    :to="''"
                  >
                    {{ data.director }}
                  </nuxt-link>
                </div>
                <div class="title mt-4">
                  Cast
                </div>
                <div class="body">
                  <nuxt-link
                    v-for="actor in limitedActors(8)"
                    :key="actor.ID"
                    class="item"
                    :to="''"
                  >
                    {{ actor.name }}
                  </nuxt-link>
                </div>
              </div>
              <div class="section">
                <div class="title">
                  Genre
                </div>
                <div class="body">
                  <nuxt-link
                    v-for="genre in data.genres"
                    :key="genre.ID"
                    class="item"
                    :to="''"
                  >
                    {{ genre.name }}
                  </nuxt-link>
                </div>
                <div class="title mt-4">
                  Rating TMDB
                </div>
                <div class="body">
                  {{ data.vote_average }}
                </div>
                <div class="title mt-4">
                  Awards
                </div>
                <div class="body">
                  {{ data.awards ? data.awards : '-' }}
                </div>
              </div>
              <div class="section">
                <div class="title">
                  Kelompuk Umur
                </div>
                <div class="body">
                  {{ data.rated }}
                </div>
                <div class="title mt-4">
                  Sumber Video
                </div>
                <div class="body">
                  {{ data.player ? data.player.source : '-' }}
                </div>
                <div class="title mt-4">
                  TMDB ID
                </div>
                <div class="body">
                  {{ data.tmdb_id }}
                </div>
                <div class="title mt-4">
                  IMDB ID
                </div>
                <div class="body">
                  {{ data.imdb_id }}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </l-r-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { BIconX, BIconPlayFill, BTab, BButton, BImg } from 'bootstrap-vue'

import LRTabs from '~/components/atoms/LRTabs'

export default {
  components: {
    LRTabs,
    BTab,
    BButton,
    BImg,
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
    dayjs,

    closeShowcase () {
      this.$emit('close')
    },

    inHour (min) {
      const hour = Math.floor(min / 60)
      min = min % 60
      return `${hour} j ${min} m`
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
