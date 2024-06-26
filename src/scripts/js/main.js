(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    const registerServiceWorker = () => __awaiter(void 0, void 0, void 0, function* () {
        if ('serviceWorker' in navigator) {
            try {
                const registration = yield navigator.serviceWorker.register('/sw.js');
                if (registration.installing) {
                    console.log('Service worker installing');
                }
                else if (registration.waiting) {
                    console.log('Service worker installed');
                }
                else if (registration.active) {
                    console.log('Service worker active');
                }
            }
            catch (err) {
                console.error(`Registration failed with ${err}`);
            }
        }
    });

    const isRegistered = () => 'simpleAuthUser' in localStorage;

    const getUserData = () => isRegistered()
        ? JSON.parse(localStorage.getItem('simpleAuthUser'))
        : false;

    const loggedHeader = () => {
        const profile = document.getElementById('profile');
        const user = document.getElementById('user');
        const thumb = document.getElementById('thumb');
        const log = document.getElementById('log');
        const userData = getUserData();
        if (userData.isLogged) {
            log.classList.add('hidden');
            profile.classList.remove('hidden');
            const { userName, userThumb } = userData;
            user.textContent = userName;
            thumb.src = userThumb;
        }
    };

    const toggleMenu = () => {
        const menu = document.getElementById('menu');
        const firstFocusableElement = document.getElementById('menu-btn');
        const lastFocusableElement = document.getElementById('delete-acc');
        const focusTrap = (evt) => {
            if (evt.key === 'Tab') {
                if (evt.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        evt.preventDefault();
                        lastFocusableElement.focus();
                    }
                }
                else {
                    if (document.activeElement === lastFocusableElement) {
                        evt.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        };
        document.removeEventListener('keydown', focusTrap);
        menu.classList.toggle('show');
        if (menu.classList.contains('show')) {
            firstFocusableElement.setAttribute('aria-expanded', 'true');
            document.addEventListener('keydown', focusTrap);
        }
        else {
            firstFocusableElement.setAttribute('aria-expanded', 'false');
            document.removeEventListener('keydown', focusTrap);
        }
    };

    const coprCurrentYear = () => {
        const copyrightYear = document.getElementById('current-year');
        const date = new Date();
        copyrightYear.textContent = `${date.getFullYear()}`;
    };

    const logOut = () => {
        const userData = getUserData();
        userData.isLogged = false;
        localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
        window.location.replace('/');
    };

    const deleteAccount = () => {
        localStorage.removeItem('simpleAuthUser');
        window.location.replace('/');
    };

    registerServiceWorker();
    loggedHeader();
    coprCurrentYear();
    const profile = document.getElementById('profile');
    profile.addEventListener('click', toggleMenu);
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', logOut);
    const deleteBtn = document.getElementById('delete-acc');
    deleteBtn.addEventListener('click', deleteAccount);

}));
