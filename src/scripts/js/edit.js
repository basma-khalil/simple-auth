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

    const updateImage = (evt) => {
        if (!isRegistered())
            return;
        const avatar = document.getElementById('avatar');
        const imgAlert = document.getElementById('img-alert');
        const input = evt.target;
        const maxSize = 3000000;
        const userData = getUserData();
        imgAlert.textContent = '';
        if (!input.files)
            return;
        const img = input.files[0];
        if (img.size > maxSize) {
            imgAlert.textContent = `image is too big, Please select an image less than ${maxSize / 1000000} MB`;
            return;
        }
        avatar.src = URL.createObjectURL(img);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.addEventListener('load', () => {
            const delImgBtn = document.getElementById('remove');
            const imgUrl = reader.result;
            userData.userThumb = imgUrl;
            delImgBtn.classList.remove('invisible');
            localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
        });
    };

    const validateForm = (formInputs) => {
        const setErrMessage = (ErrMessageElement, ErrMessage) => {
            ErrMessageElement.textContent = ErrMessage;
        };
        const inputValidation = (input, inputErrMessage) => setErrMessage(inputErrMessage, input.validationMessage);
        formInputs.forEach((input) => {
            inputValidation(input, input.nextElementSibling);
            input.addEventListener('input', (evt) => inputValidation(input, input.nextElementSibling));
        });
    };

    const updateAccount = (evt) => {
        evt.preventDefault();
        if (!isRegistered())
            return;
        const usernameInput = document.getElementById('update-username');
        const emailInput = document.getElementById('update-email');
        const passwordInput = document.getElementById('update-password');
        const newName = usernameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const newPassword = passwordInput.value.trim();
        const { userThumb } = getUserData();
        const updateForm = document.getElementById('update-form');
        const formInputs = [usernameInput, emailInput, passwordInput];
        updateForm.classList.add('submitted');
        validateForm(formInputs);
        if (updateForm.checkValidity()) {
            const user = {
                userName: newName,
                userEmail: newEmail,
                userPassword: newPassword,
                userThumb,
                isLogged: true,
            };
            updateForm.classList.remove('submitted');
            localStorage.setItem('simpleAuthUser', JSON.stringify(user));
            window.location.reload();
        }
    };

    const deleteImage = () => {
        const avatar = document.getElementById('avatar');
        const delImgBtn = document.getElementById('remove');
        const userData = getUserData();
        const defaultImg = '/images/user.svg';
        avatar.src = defaultImg;
        delImgBtn.classList.add('invisible');
        userData.userThumb = defaultImg;
        localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    };

    registerServiceWorker();
    loggedHeader();
    coprCurrentYear();
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', toggleMenu);
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', logOut);
    const deleteBtn = document.getElementById('delete-acc');
    deleteBtn.addEventListener('click', deleteAccount);
    const fileInput = document.getElementById('file');
    fileInput.addEventListener('change', updateImage);
    const userData = getUserData();
    const { userName, userEmail, userPassword, userThumb } = userData;
    const usernameHeader = document.getElementById('username');
    usernameHeader.textContent = userName;
    const usernameInput = document.getElementById('update-username');
    const emailInput = document.getElementById('update-email');
    const passwordInput = document.getElementById('update-password');
    const avatar = document.getElementById('avatar');
    const defaultImg = '/images/user.svg';
    // User Initial Values
    usernameInput.value = userName || '';
    emailInput.value = userEmail || '';
    passwordInput.value = userPassword || '';
    avatar.src = userThumb || defaultImg;
    const updateForm = document.getElementById('update-form');
    updateForm.addEventListener('submit', updateAccount);
    const delImgBtn = document.getElementById('remove');
    (userThumb !== defaultImg && userThumb !== undefined) && delImgBtn.classList.remove('invisible');
    delImgBtn.addEventListener('click', deleteImage);

}));
