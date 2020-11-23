<template>
  <v-card
      align="center"
      class="elevation-0"
      :loading="!isLoaded">

    <template slot="progress">
      <v-progress-circular
          color="green accent-3"
          size="100"
          width="10"
          indeterminate
      ></v-progress-circular>
    </template>

    <div v-if="isLoaded">
      <v-card-title>Liste des artistes :</v-card-title>

      <v-col
          v-for="(artist, i) in artists"
          :key="i"
          cols="12"
      >
        <v-card
            :color="artist.color"
            dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                  class="headline"
                  v-text="artist.name"
              ></v-card-title>

              <v-card-actions>

                <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="seeArtist(artist.id)"
                >
                  Voir l'artiste
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="artist.coverUrl"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </div>

  </v-card>
</template>

<script>
import axios from "axios";

const API_ENDPOINT = "http://localhost:3000";

export default {
  name: "Artists",
  data: () => ({
    artists: null,
    isLoaded: false,
  }),
  methods: {
    async fetchArtists() {
      let response = await axios.get(API_ENDPOINT + '/artists');
      this.artists = response.data;
      this.isLoaded = true;
    },
    seeArtist(id) {
      this.$router.push('/artists/' + id);
    }
  },
  created() {
    this.fetchArtists();
  }
}
</script>

<style scoped>

</style>