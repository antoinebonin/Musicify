self.addEventListener("message", msg => {
    if (msg.data.action=='skipWaiting'){
        self.skipWaiting()
    }
})


/* eslint-disable no-undef  */
workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.registerRoute(
    ({url}) => url.pathname.endsWith('.mp3'),
    new workbox.strategies.CacheFirst({
        cacheName: 'audio',
        plugins: [
            new workbox.cacheableResponse.Plugin({ statuses: [200] }),
            new workbox.rangeRequests.Plugin(),
        ],
        matchOptions: {
            ignoreSearch: true,
            ignoreVary: true
        }
    })
);

workbox.routing.registerRoute(
    new RegExp('json'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'json',
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
    })
);


workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'scripts',
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'styles'
    })
);
