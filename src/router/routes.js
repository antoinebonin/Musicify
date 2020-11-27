import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */"../components/Home"),
        meta: {
            value: "home"
        }
    },
    {
        path: '/pending',
        name: "PendingList",
        component: () => import(/* webpackChunkName: "pendinglist" */"../components/PendingList"),
        meta: {
            value: "pendingList"
        }
    },
    {
        path: '/titres',
        name: "Titres",
        component: () => import(/* webpackChunkName: "titres" */"../components/Titres"),
        meta: {
            value: "titres"
        }
    },
    {
        path: '/albums',
        name: "Albums",
        component: () => import(/* webpackChunkName: "albums" */"../components/Albums"),
        meta: {
            value: "albums"
        }
    },
    {
        path: '/albums/:id',
        name: "Album",
        component: () => import(/* webpackChunkName: "album" */"../components/Album"),
        meta: {
            value: "albums"
        }
    },
    {
        path: '/artists',
        name: "Artists",
        component: () => import(/* webpackChunkName: "artists" */"../components/Artists"),
        meta: {
            value: "artists"
        }
    },
    {
        path: '/artists/:id',
        name: "Artist",
        component: () => import(/* webpackChunkName: "artist" */"../components/Artist"),
        meta: {
            value: "artists"
        }
    },
    {
        path: '/liked',
        name: "Liked",
        component: () => import(/* webpackChunkName: "liked" */"../components/Liked"),
        meta: {
            value: "liked"
        }
    },
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;