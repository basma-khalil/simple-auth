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

    const coprCurrentYear = () => {
        const copyrightYear = document.getElementById('current-year');
        const date = new Date();
        copyrightYear.textContent = `${date.getFullYear()}`;
    };

    const accessibility = () => {
        const signinForm = document.getElementById('signin-form');
        const signinFormElements = [...signinForm.elements];
        const signinFormLinks = [...signinForm.querySelectorAll('a')];
        const signupForm = document.getElementById('signup-form');
        const signupFormElements = [...signupForm.elements];
        const signupFormLinks = [...signupForm.querySelectorAll('a')];
        const signupTip = document.querySelector('.signup-tip');
        const signupTipBtn = [document.querySelector('.signup-tip button')];
        const signinTip = document.querySelector('.signin-tip');
        const signinTipBtn = [document.querySelector('.signin-tip button')];
        const enableTabKey = (elements) => {
            elements.forEach((element) => {
                element.removeAttribute('tabindex');
            });
        };
        const disableTabKey = (elements) => {
            elements.forEach((element) => {
                element.setAttribute('tabindex', ' -1');
            });
        };
        const ariaShow = (element) => {
            element.setAttribute('aria-hidden', 'false');
        };
        const ariaHide = (element) => {
            element.setAttribute('aria-hidden', 'true');
        };
        if (document.body.classList.contains('signup-mode')) {
            enableTabKey(signinTipBtn);
            enableTabKey(signupFormElements);
            enableTabKey(signupFormLinks);
            disableTabKey(signupTipBtn);
            disableTabKey(signinFormElements);
            disableTabKey(signinFormLinks);
            ariaShow(signupForm);
            ariaShow(signinTip);
            ariaHide(signinForm);
            ariaHide(signupTip);
            signupTipBtn[0].setAttribute('aria-expanded', 'true');
            signinTipBtn[0].setAttribute('aria-expanded', 'false');
        }
        else {
            enableTabKey(signupTipBtn);
            enableTabKey(signinFormElements);
            enableTabKey(signinFormLinks);
            disableTabKey(signinTipBtn);
            disableTabKey(signupFormElements);
            disableTabKey(signupFormLinks);
            ariaShow(signinForm);
            ariaShow(signupTip);
            ariaHide(signupForm);
            ariaHide(signinTip);
            signupTipBtn[0].setAttribute('aria-expanded', 'false');
            signinTipBtn[0].setAttribute('aria-expanded', 'true');
        }
    };

    const switchMood = () => {
        const body = document.body;
        body.classList.toggle('signup-mode');
        accessibility();
    };

    const isRegistered = () => 'simpleAuthUser' in localStorage;

    const getUserData = () => isRegistered()
        ? JSON.parse(localStorage.getItem('simpleAuthUser'))
        : false;

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

    const logIn = (evt) => {
        const usernameInput = document.getElementById('signin-username');
        const passwordInput = document.getElementById('signin-password');
        const usernameMessage = usernameInput.nextElementSibling;
        const passwordMessage = passwordInput.nextElementSibling;
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const userData = getUserData();
        let errMessage = '';
        const signinForm = document.getElementById('signin-form');
        const formInputs = [usernameInput, passwordInput];
        evt.preventDefault();
        signinForm.classList.add('submitted');
        usernameInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
        validateForm(formInputs);
        if (signinForm.checkValidity()) {
            if (username !== userData.userName) {
                usernameInput.classList.add('invalid');
                errMessage = 'a user with this user name does not exist';
                usernameMessage.textContent = errMessage;
                return;
            }
            else {
                errMessage = '';
                usernameMessage.textContent = errMessage;
            }
            if (password !== userData.userPassword) {
                passwordInput.classList.add('invalid');
                errMessage = 'wrong password! This password does not match your username';
                passwordMessage.textContent = errMessage;
                return;
            }
            else {
                errMessage = '';
                passwordMessage.textContent = errMessage;
            }
            signinForm.classList.remove('submitted');
            userData.isLogged = true;
            localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
            signinForm.reset();
            window.location.replace('/');
        }
    };

    const register = (evt) => {
        const usernameInput = document.getElementById('signup-username');
        const emailInput = document.getElementById('signup-email');
        const passwordInput = document.getElementById('signup-password');
        const userName = usernameInput.value.trim();
        const userEmail = emailInput.value.trim();
        const userPassword = passwordInput.value.trim();
        const userThumb = '/images/user.svg';
        const signupForm = document.getElementById('signup-form');
        const formInputs = [usernameInput, emailInput, passwordInput];
        evt.preventDefault();
        signupForm.classList.add('submitted');
        validateForm(formInputs);
        if (signupForm.checkValidity()) {
            const user = {
                userName,
                userEmail,
                userPassword,
                userThumb,
                isLogged: true,
            };
            signupForm.classList.remove('submitted');
            localStorage.setItem('simpleAuthUser', JSON.stringify(user));
            signupForm.reset();
            window.location.replace('/');
        }
    };

    registerServiceWorker();
    coprCurrentYear();
    accessibility();
    const signupTipBtn = document.querySelector('.signup-tip button');
    const signinTipBtn = document.querySelector('.signin-tip button');
    signupTipBtn.addEventListener('click', switchMood);
    signinTipBtn.addEventListener('click', switchMood);
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', logIn);
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', register);

}));
