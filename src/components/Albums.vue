<template>
    <v-card
    align="center"
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
          <v-card-title>Liste des albums :</v-card-title>
            
          <v-col
            v-for="(album, i) in albums"
            :key="i"
            cols="12"
          >
            <v-card
              :color="album.color"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="album.title"
                  ></v-card-title>

                  <v-card-subtitle v-text="album.author"></v-card-subtitle>

                  <v-card-actions>

                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="seeAlbum(album.id)"
                    >
                      Voir l'album
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="album.coverUrl"></v-img>
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
    name: 'Album',
    data: () => ({
        albums: null,
        isLoaded: false,
    }),
    methods: {
        async fetchTracks() {
            let response = await axios.get(API_ENDPOINT + '/albums');
            this.albums = response.data;
            this.isLoaded = true;
        },
        seeAlbum(id) {
          this.$router.push('/albums/' + id);
        }
    },
    created() {
        this.fetchTracks();
    }
}
</script>

<style>

</style>