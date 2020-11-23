<template>
  <v-app>

    <v-main>
      <v-container
          fill-height>
        <v-row
            justify="center">
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
          color="green accent-3"
          v-model="value">

        <v-btn value="home" @click="navigate()">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="pendingList" @click="navigate('pending')">
          <span>Liste de lecture</span>
          <v-icon>mdi-headphones</v-icon>
        </v-btn>

        <v-btn value="titres" @click="navigate('titres')">
          <span>Titres</span>
          <v-icon>mdi-music</v-icon>
        </v-btn>

        <v-btn value="albums" @click="navigate('albums')">
          <span>Albums</span>
          <v-icon>mdi-disc</v-icon>
        </v-btn>

        <v-btn value="artists" @click="navigate('artists')">
          <span>Artists</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn value="liked" @click="navigate('liked')">
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
  background-color: #74EBD5;
  background-image: linear-gradient(45deg, #74EBD5 0%, #9FACE6 100%);
}
</style>