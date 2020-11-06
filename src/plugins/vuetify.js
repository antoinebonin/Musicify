import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import minifyTheme from 'minify-css-string';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { minifyTheme,
            themeCache: {
                get: key => localStorage.getItem(key),
                set: (key, value) => localStorage.setItem(key, value),
              },
            },
        dark: false,
        
    },
});
