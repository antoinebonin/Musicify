import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Home"),
        meta: {
            value: "home"
        }
    },
    {
        path: '/pending',
        name: "PendingList",
        component: () => import("../components/PendingList"),
        meta: {
            value: "pendingList"
        }
    },
    {
        path: '/titres',
        name: "Titres",
        component: () => import("../components/Titres"),
        meta: {
            value: "titres"
        }
    },
    {
        path: '/albums',
        name: "Albums",
        component: () => import("../components/Albums"),
        meta: {
            value: "albums"
        }
    },
    {
        path: '/albums/:id',
        name: "Album",
        component: () => import("../components/Album"),
        meta: {
            value: "albums"
        }
    },
    {
        path: '/artists',
        name: "Artists",
        component: () => import("../components/Artists"),
        meta: {
            value: "artists"
        }
    },
    {
        path: '/artists/:id',
        name: "Artist",
        component: () => import("../components/Artist"),
        meta: {
            value: "artists"
        }
    },
    {
        path: '/liked',
        name: "Liked",
        component: () => import("../components/Liked"),
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