<template>
  <div class="lr-front-store">
    <b-navbar
      :class="{ 'navbar--solid': !transparentNavbar || $device.isMobileOrTablet }"
      toggleable="lg"
      type="dark"
      sticky
    >
      <b-navbar-brand>
        <nuxt-link :to="{ name: 'home' }">
          Living Rooms
        </nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home' }">
            Home
          </b-nav-item>
          <b-nav-item :to="{ name: 'movie' }">
            Movie
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <div class="flex items-center">
            <b-input-group class="search" size="sm">
              <template v-slot:prepend>
                <b-input-group-text>
                  <b-icon-search />
                </b-input-group-text>
              </template>
              <template
                v-if="search !== ''"
                v-slot:append
              >
                <b-input-group-text>
                  <b-icon-x @click="handleClearSearch" />
                </b-input-group-text>
              </template>
              <b-form-input
                ref="search"
                v-model="search"
                placeholder="Search . . ."
                :class="{
                  'filled' : (search !== '')
                }"
              />
            </b-input-group>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BCollapse,
  BNavItem,
  BFormInput,
  BInputGroup,
  BInputGroupText,
  BIconSearch,
  BIconX
} from 'bootstrap-vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BCollapse,
    BNavItem,
    BFormInput,
    BInputGroup,
    BInputGroupText,
    BIconSearch,
    BIconX
  },

  data () {
    return {
      transparentNavbar: true,
      search: ''
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      this.transparentNavbar = currentScrollPosition < 64
    },

    handleClearSearch () {
      this.search = ''
      this.$refs.search.$el.focus()
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/_color.scss';

.lr-front-store {
  .navbar {
    background: linear-gradient(180deg, rgba($black,1) 0%, rgba($black,0.6) 10%, rgba($black,0) 100%);
    transition: background-color .3s linear;
    font-size: clamp(0.8rem, 0.5vw, 1.2rem);
  }

  .navbar--solid {
    background-color: $black!important;
    transition: background-color .3s linear;
  }

  .nuxt-link-active {
    color: $white;
  }

  .search {
    border-radius: 0;
    width: 250px;

    * {
      border-radius: 0!important;
      background: transparent!important;
      color: $white!important;
    }

    .input-group-prepend .input-group-text {
      border-right-style: none;
    }

    input {
      border-left-style: none;

      &.filled {
        border-right-style: none;
      }
    }

    .input-group-append .input-group-text {
      cursor: pointer;
      border-left-style: none;
    }
  }
}
</style>
