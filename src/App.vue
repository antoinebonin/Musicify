<template>
  <v-app>

    <v-main class="mb-11">
      <v-container fill-height>

        <v-row justify="center">
          <v-col class="col-4">
            <v-img
                src="img/banner.png"
            ></v-img>
          </v-col>
        </v-row>

        <v-row
            justify="center"
            align="center">

          <v-col class="col-sm-11 col-md-10 col-lg-8">
            <v-card
                justify="center">

              <v-row>
                <v-col class="py-0 col-sm-12 col-md-6">
                  <Player/>
                </v-col>

                <v-divider
                    vertical
                    style="margin: 0 -0.5px"
                ></v-divider>

                <v-col class="py-0 col-sm-12 col-md-6">
                  <router-view></router-view>
                </v-col>
              </v-row>

            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>


    <v-footer
        fixed
        padless>

      <v-bottom-navigation
          shift
          color="deep-orange darken-2"
          v-model="value">

        <v-btn value="home" @click="navigate()" class="px-0">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="pendingList" @click="navigate('pending')" class="px-0">
          <span>Liste de lecture</span>
          <v-icon>mdi-headphones</v-icon>
        </v-btn>

        <v-btn value="titres" @click="navigate('titres')" class="px-0">
          <span>Titres</span>
          <v-icon>mdi-music</v-icon>
        </v-btn>

        <v-btn value="albums" @click="navigate('albums')" class="px-0">
          <span>Albums</span>
          <v-icon>mdi-disc</v-icon>
        </v-btn>

        <v-btn value="artists" @click="navigate('artists')" class="px-0">
          <span>Artists</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn value="liked" @click="navigate('liked')" class="px-0">
          <span>Titres favoris</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

      </v-bottom-navigation>
    </v-footer>

  </v-app>
</template>

<script>
import Player from './components/Player';

export default {
  name: 'App',
  data: () => ({
    value: null,
  }),
  components: {
    Player
  },
  methods: {
    navigate(page) {
      this.$router.push(`/${page}`);
    }
  }
};
</script>

<style>
#app {
  background: rgb(255,81,54);
  background: linear-gradient(90deg, rgba(255,81,54,1) 0%, rgba(255,87,34,1) 100%);
}
</style>