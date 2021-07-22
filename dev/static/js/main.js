(function () {
  'use strict';
  const getMap = () => {
    const complexMap = document.querySelector('#about-map');
    if (complexMap) {
      ymaps.ready(function () {
        const map = new ymaps.Map(complexMap, {
          center: [59.850509, 30.304028],
          zoom: 14,
          controls: [],
        });
        const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        );
        const myPlacemark = new ymaps.Placemark(
          map.getCenter(),
          {
            hintContent: 'Офис e-logistic',
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            // iconImageHref: './static/images/common/icon-marker.svg',
            // Размеры метки.
            iconImageSize: [31, 40],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [15, 40],
          }
        );
        map.geoObjects.add(myPlacemark);
      });
    }
  };
  const getGormValidation = () => {
    const forms = document.querySelectorAll('.need-validate');
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  };
  const getFixedHeader = () => {
    const header = document.querySelector('.header-top');
    const headerPlaceholder = document.querySelector('.header__placeholder');
    if (header) {
      document.addEventListener('scroll', e => {
        if (window.pageYOffset > 0) {
          header.style.position = 'fixed';
          headerPlaceholder.style.display = 'block';
        } else {
          header.style.position = 'relative';
          headerPlaceholder.style.display = 'none';
        }
      });
    }
  };
  const getSlider = () => {
    const reviewSlider = new Swiper('.reviews-slider', {
      direction: 'horizontal',
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
      navigation: {
        nextEl: '.reviews-slider__button--next',
        prevEl: '.reviews-slider__button--prev'
      },
      breakpoints: {
        // when window width is >= 320px
        1280: {
          slidesPerView: 'auto',
          spaceBetween: 40,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0
        },
      },
    });
  };

  // getMap();
  getGormValidation();
  getFixedHeader();
  getSlider();
})();
