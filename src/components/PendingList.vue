<template>
    <v-card
    max-width="374"
    align="center"
    justify-center>
            
        <v-list 
        align="start">
            <v-subheader>Liste de lecture :</v-subheader>
            <template v-for="(id, index) in pendingList">

                <v-divider :key="index"></v-divider>

                <v-list-item :key="tracks[id].title" @click="selectTrack(id)" :class="(id != currentTrack.id) ? '': 'green accent-1'">

                    <v-list-item-avatar>
                        <v-img :src="tracks[id].coverUrl"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="tracks[id].title"></v-list-item-title>
                        <v-list-item-subtitle v-html="tracks[id].author"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </template>
        </v-list>

    </v-card>
</template>

<script>
import axios from "axios";

const API_ENDPOINT = "http://localhost:3000";

export default {
    name: 'PendingList',
    data: () => ({
        tracks: null,
    }),
    computed: {
        currentTrack () {
            return this.$store.state.track
        },
        pendingList () {
            return this.$store.state.pending
        }
    },
    methods: {
        async fetchTracks() {
            let pending = this.pendingList
            let response = await axios.get(API_ENDPOINT + '/tracks');
            let tracks = response.data.filter(
                function(e) {
                    return this.indexOf(e.id) != -1;
                },
                pending
            );
            this.tracks = tracks;
        },
        selectTrack(id) {
            this.$store.commit('changeTrack', id);
        }
    },
    created() {
        this.fetchTracks();
    }
}
</script>

<style>

</style>