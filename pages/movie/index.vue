<template>
  <div class="lr-movie mt-4">
    <div class="mb-4">
      <b-form-select
        v-model="selected"
        class="select"
        :options="genres"
        @change="handleChange"
      />
    </div>
    <layout
      v-if="$device.isMobileOrTablet"
      id="item-top"
      type="scroll"
      :title="`Movies ${selected !== 'Genres' ? `- ${selected}` : '' }`"
      :content="movies"
      :loading="loading"
    />
    <layout
      v-else
      id="item-top"
      type="grid"
      :title="`Movies ${selected !== 'Genres' ? `- ${selected}` : '' }`"
      :content="movies"
      :loading="loading"
    />
  </div>
</template>

<script>
import { BFormSelect } from 'bootstrap-vue'
import Layout from '~/components/molecules/Layout'

export default {
  components: {
    BFormSelect,
    Layout
  },

  async fetch ({ store, route }) {
    const query = route.query
    await store.dispatch('movie/RESET_MOVIE_DETAIL')
    await store.dispatch('movie/FETCH_MOVIE', query)
    await store.dispatch('genre/FETCH_GENRE')
  },

  data () {
    return {
      selected: 'Genres'
    }
  },

  computed: {
    movies () {
      return this.$store.state.movie.movies
    },

    genres () {
      const dbGenres = this.$store.state.genre.genres
      const result = ['Genres']
      dbGenres.forEach((item) => {
        result.push(item.name)
      })

      return result
    },

    loading () {
      return this.$store.state.movie.isFetching
    }
  },

  methods: {
    async handleChange (val) {
      if (val === 'Genres') {
        val = ''
      }
      const query = {
        genre: val
      }
      await this.$store.dispatch('movie/FETCH_MOVIE', query)
      this.$router.push({
        name: 'movie',
        query
      })
    }
  }
}
</script>

<style lang="scss">
.lr-movie {
  .select {
    width: 300px;
    margin: 0 4vw;
    background-color: transparent;
    color: #fff;
  }
}
</style>
