<template>
  <div>
    <div
      :class="id"
      class="showcase alt visible"
      :style="`background: none`"
    >
      <transition v-if="!loading" name="fade">
        <div
          class="bg-gradient"
          :style="{backgroundColor: loading ? 'black' : ''}"
        >
          <div v-if="data && (data.videos || data.banners)">
            <b-img
              :src="data.banners[0].path"
            />
          </div>
        </div>
      </transition>
      <div class="container">
        <h6> {{ data.title }} </h6>
        <div class="text-white-darker d-flex mb-2">
          <div class="mr-2">
            {{ dayjs(data.release_date).format('YYYY') }}
          </div>
          <div class="mr-2">
            {{ data.rated }}
          </div>
          <div>
            {{ inHour(data.runtime) }}
          </div>
        </div>
        <div class="mb-4">
          <b-button
            variant="danger"
            class="btn-red"
            @click="handlePlayClick(data.player.ID)"
          >
            PUTAR
          </b-button>
        </div>
      </div>
    </div>
    <div class="margined-container text-white-darker">
      <p> {{ data.overview }} </p>
      <div class="d-flex showcase-detail">
        <div class="section mr-4">
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
              class="item d-block"
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
            Kelompuk Umur
          </div>
          <div class="body">
            {{ data.rated }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { BImg, BButton } from 'bootstrap-vue'

export default {
  components: {
    BImg,
    BButton
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

    inHour (min) {
      const hour = Math.floor(min / 60)
      min = min % 60
      return `${hour} j ${min} m`
    },

    handlePlayClick (playerID) {
      this.$emit('play-click', playerID)
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
    }
  }
}
</script>

<style lang="scss">
.showcase.alt {
  font-size: 0.7rem!important;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }

  .btn {
    font-size: inherit;
  }
}
</style>
