!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }); // end foreach

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
});

/////////To Top button & stickup menu //////////////
const toTop = document.getElementById('toTop');
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    toTop.style.display = 'flex';
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }

  if (scrollTop > 0 && header) {
    header.classList.add('sticky');
  } else if (header) {
    header.classList.remove('sticky');
  }
});

toTop.addEventListener('click', function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

/// menu smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('.desktop-menu_link');
  const logoLink = document.querySelector('.logo');

  function smoothScroll(target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  function handleClick(e) {
    if (this.hash !== '') {
      e.preventDefault();

      const hash = this.hash;
      const targetElement = document.querySelector(hash);

      smoothScroll(targetElement);
    }
  }

  menuLinks.forEach(function (link) {
    link.addEventListener('click', handleClick);
  });

  logoLink.addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll(document.documentElement);
  });
});
