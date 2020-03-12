<template>
  <div class="lr-front-store">
    <b-navbar
      :class="{ 'navbar--solid': !transparentNavbar }"
      toggleable="lg"
      type="dark"
      sticky
    >
      <b-navbar-brand>
        Living Rooms
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item>Home</b-nav-item>
          <b-nav-item>Movie</b-nav-item>
          <b-nav-item>TV Series</b-nav-item>
          <b-nav-item>Bola</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <div class="flex items-center">
            <b-form-input
              size="sm"
              class="w-64 bg-black"
              placeholder="Search"
              style="border-radius: 0;"
            />
          </div>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              Login
            </template>
            <b-dropdown-item @click="$router.push('/in')">
              Login
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
    <div class="px-36 pb-12">
      <b-container>
        <b-row>
          <b-col>Tentang Kami</b-col>
          <b-col>Didukung oleh GdrivePlayer</b-col>
          <b-col>Semangat</b-col>
        </b-row>
      </b-container>
    </div>
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
  BNavItemDropdown,
  BDropdownItem,
  BFormInput,
  BContainer,
  BRow,
  BCol
} from 'bootstrap-vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BCollapse,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem,
    BFormInput,
    BContainer,
    BRow,
    BCol
  },

  data () {
    return {
      transparentNavbar: true
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
    padding: .5rem 2rem;
    font-size: 1vw;
  }
  .navbar--solid {
    background-color: $black!important;
    transition: background-color .3s linear;
  }
}
</style>
