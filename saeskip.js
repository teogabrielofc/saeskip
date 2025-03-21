// ==UserScript==
// @name         SAE Digital - SAEskip
// @namespace    https://github.com/teogabrielofc/saeskip
// @version      1.1
// @description  Um UserScript para a VideoAula do ava.sae.digital ficar 100% Automaticamente
// @match        *://ava.sae.digital/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Interceptar XMLHttpRequest
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (method === "POST" && url.includes("apis.sae.digital/ava/answer/video")) {
            this.addEventListener("readystatechange", function() {
                if (this.readyState === 4 && this.responseURL.includes("apis.sae.digital/ava/answer/video")) {
                    console.log("[SAEskip] Modificando video_percentage para 100%");
                }
            });

            const send = this.send;
            this.send = function(body) {
                try {
                    let data = JSON.parse(body);
                    if (data.video_percentage !== undefined) {
                        data.video_percentage = 100;
                        body = JSON.stringify(data);
                    }
                } catch (e) {
                    console.error("[SAEskip] Erro ao modificar request:", e);
                }
                send.call(this, body);
            };
        }
        open.call(this, method, url, ...rest);
    };

    // Interceptar fetch()
    window.fetch = new Proxy(window.fetch, {
        apply: async function(target, thisArg, args) {
            let url = args[0];
            let options = args[1] || {};

            if (url.includes("apis.sae.digital/ava/answer/video") && options.method === "POST") {
                let clone = options.body;

                if (clone) {
                    let bodyText = await clone.text();
                    let bodyJson = JSON.parse(bodyText);

                    if (bodyJson.video_percentage !== undefined) {
                        console.log("[SAEskip] Modificando progresso do vídeo para 100%!");
                        bodyJson.video_percentage = 100;
                        options.body = JSON.stringify(bodyJson);
                    }
                }
            }

            return target.apply(thisArg, [url, options]);
        }
    });

})();
