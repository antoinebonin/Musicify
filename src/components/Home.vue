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

			<v-card-title>Sortie aujourd'hui :</v-card-title>

    </v-card>
</template>

<script>
export default {
	name: "Home",
	data: () => ({
		isLoaded: true,
	})
}
</script>

<style>

</style>