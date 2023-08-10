if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js").then(
            function(registration) {
                // console.log("Service Worker зарегистрирован: ", registration.scope);
            },
            function(err) {
                // console.log("Service Worker не зарегистрирован: ", err);
            }
        );
    });
}

window.self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("static").then(function(cache) {
            return cache.addAll([
              "/",
              "/index.html",
              "/manifest.json",
              "/favicon.ico",
              "/logo192.png",
              "/logo512.png",
            ]);
        })
    );
});

window.self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    window.deferredPrompt = e;
    window.localStorage.setItem("pwainstalled", "false");
});

window.addEventListener("appinstalled", (event) => {
    window.localStorage.setItem("pwainstalled", "true");
});

export function installPWA() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {                 
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
        });
    }
}
