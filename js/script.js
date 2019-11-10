var link = document.querySelector(".enter-link");
var popup = document.querySelector(".letters");
var close = popup.querySelector(".modal-close");
var userName = document.querySelector("[name=user_name]");
var email = popup.querySelector("[name=user_email]");
var letter = popup.querySelector("[name=letter]");
var form = popup.querySelector("form");
var isStorageSupport = true;
var storageName = "";
var storageEmail = "";
var popupWrapper = document.querySelector(".letters-wrp");
var popupOverlay = document.querySelector(".letters-overlay");


function closeLetter () {
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
  popupWrapper.classList.remove("letters-wrp-show");
}

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}


link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    popupWrapper.classList.add("letters-wrp-show");
    if (storageName) {
      userName.value = storageName;
    } else {
      userName.focus();
    }

    if (storageEmail) {
      email.value = storageEmail;
    }

    if(storageName && !storageEmail) {
        email.focus();
    }
});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    closeLetter();

});

form.addEventListener("submit", function (evt) {
    if (!userName.value || !email.value || !letter.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
      } else {
        if (isStorageSupport) {
          localStorage.setItem("name", userName.value);
          localStorage.setItem("email", email.value);
        }
      }
});

window.addEventListener("keydown", function (evt) {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        closeLetter();
      }
    }
});

popupOverlay.addEventListener("click", function (evt) {
  closeLetter();
});