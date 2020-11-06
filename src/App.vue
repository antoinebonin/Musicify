<template>
  <v-app>

    <v-main>
      <v-container
      fill-height>
        <v-row
        justify="center" >

          <v-col
          sm="8"
          md="6"
          lg="4">
           <Player/>
          </v-col>

          <v-col
          sm="8"
          md="6"
          lg="4">
            <router-view></router-view>
          </v-col>

        </v-row>
      </v-container>
    </v-main>

    

    <v-footer
    fixed
    padless>

      <v-bottom-navigation
      grow
        color="green accent-3"
        v-model="value">

        <v-btn value="home" @click="navigate()">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="pendingList" @click="navigate('pending')">
          <span>Liste de lecture</span>
          <v-icon>mdi-music</v-icon>
        </v-btn>

        <v-btn value="titres" @click="navigate('titres')">
          <span>Titres</span>
          <v-icon>mdi-music</v-icon>
        </v-btn>

        <v-btn value="albums" @click="navigate('albums')">
          <span>Albums</span>
          <v-icon>mdi-music</v-icon>
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