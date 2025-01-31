// ==UserScript==
// @name         Margonem Messages Sound
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Odtwarza dźwięk przy otrzymaniu prywatnej wiadomości (ignoruje stare)
// @author       Meriwas
// @match        https://*.margonem.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const soundUrl = 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3';
    let isInitialLoad = true; // Flaga dla początkowego ładowania

    // Znajdź kontener czatu
    const chatContainer = document.querySelector('.scroll-pane');

    if (!chatContainer) {
        console.error('Brak kontenera czatu!');
        return;
    }

    // Wyłącz flagę initialLoad po 5 sekundach
    setTimeout(() => {
        isInitialLoad = false;
        console.log('Okno początkowe zakończone - teraz nowe wiadomości będą odtwarzać dźwięk.');
    }, 5000);

    // Obserwator zmian
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.classList?.contains('chat-PRIVATE-message')) {
                    if (isInitialLoad) {
                        // Ignoruj wiadomości z początkowego ładowania
                        node.dataset.initialLoad = 'true';
                    } else {
                        // Odtwórz dźwięk tylko dla nowych wiadomości
                        playSound();
                    }
                }
            });
        });
    });

    observer.observe(chatContainer, {
        childList: true,
        subtree: true
    });

    // Funkcja odtwarzająca dźwięk
    function playSound() {
        const audio = new Audio(soundUrl);
        audio.play().catch(console.error);
    }

    console.log('Dodatek działa!');
})();