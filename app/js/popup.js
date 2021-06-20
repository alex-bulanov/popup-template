const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const closesPopup = document.querySelectorAll('.close-popup');
const timeout = 300;

let unlock = true;

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const element = lockPadding[index];
      element.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const element = lockPadding[index];
        element.style.paddingRight = '0px';
      }
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function popupClose(popup, doUnlock = true) {
  if (unlock) {
    popup.classList.remove('popup--open');

    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function popupOpen(popup) {
  if (popup && unlock) {
    const popupActive = document.querySelector('.popup--open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    popup.classList.add('popup--open');
    popup.addEventListener('click', (event) => {
      if (!event.target.closest('.popup__content')) {
        popupClose(event.target.closest('.popup'));
      }
    });
  }
}

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', (event) => {
      event.preventDefault();
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
    });
  }
}

if (closesPopup.length > 0) {
  for (let index = 0; index < closesPopup.length; index++) {
    const close = closesPopup[index];
    close.addEventListener('click', (event) => {
      event.preventDefault();
      popupClose(close.closest('.popup'));
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (event.which === 27) {
    const popupActive = document.querySelector('.popup--open');
    popupClose(popupActive);
  }
});
