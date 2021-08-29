(function () {
  'use strict';
  const body = document.querySelector('body');
  let unlock = true;
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };
  function dynamicAdaptiv() {
    // Dynamic Adapt v.1
    // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
    // e.x. data-da=".item,992,2"
    // Andrikanych Yevhen 2020
    // https://www.youtube.com/c/freelancerlifestyle

    function DynamicAdapt(type) {
      this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = document.querySelectorAll('[data-da]');

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (item) {
          return (
            '(' +
            this.type +
            '-width: ' +
            item.breakpoint +
            'px),' +
            item.breakpoint
          );
        },
        this
      );
      this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        }
      );

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(
          this.оbjects,
          function (item) {
            return item.breakpoint === mediaBreakpoint;
          }
        );
        matchMedia.addListener(function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
      } else {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
          }
        }
      }
    };

    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
      }
      if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
    };

    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
        parent.insertAdjacentElement('beforeend', element);
      }
    };

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === 'max') {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    };

    const da = new DynamicAdapt('max');
    da.init();
  }
  function bodyLock(delay) {
    const body = document.querySelector('body');
    if (body.classList.contains('_lock')) {
      bodyLockRemove(delay);
    } else {
      bodyLockAdd(delay);
    }
  }
  function bodyLockRemove(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, delay);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }
  function bodyLockAdd(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
      body.classList.add('_lock');

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }
  const getPageVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  function getResize() {
    const breakpointTablet = window.matchMedia('(min-width: 1280px)');
    const breakpointMobile = window.matchMedia('(min-width: 768px)');
    const nav = document.querySelector('.nav');
    const sandwich = document.querySelector('.sandwich');
    const subNavList = document.querySelectorAll('.nav__sub-list');
    if (breakpointTablet.matches === false) {
    }
    if (breakpointMobile.matches === false) {
    }
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 88);
      }
    }
    function actualResizeHandler() {
      getPageVh();
      if (nav.classList.contains('_active')) {
        nav.classList.remove('_active');
        sandwich.classList.remove('_active');
        body.classList.remove('_overlay');
      }
      if (subNavList.length > 0) {
        subNavList.forEach(item => {
          item.classList.remove('_active');
        });
      }
      if (breakpointTablet.matches === false) {
      }
    }
  }
  const getSubMenu = () => {
    if (isMobile.any()) {
      body.classList.add('touch');
      const arrow = document.querySelectorAll('.nav__arrow');
      const subMenus = document.querySelectorAll('.nav__sub-list');
      arrow.forEach(item => {
        const parentLink = item.parentElement;
        const subMenu = parentLink.nextElementSibling;
        item.addEventListener('click', () => {
          if (!subMenu.classList.contains('_active')) {
            subMenus.forEach(item => {
              if (item.classList.contains('_active')) {
                item.classList.remove('_active');
              }
            });
          }
          subMenu.classList.toggle('_active');
        });
      });
    } else {
      body.classList.add('mouse');
    }
  };
  const getSendwich = () => {
    const sandwich = document.querySelector('.sandwich');
    const nav = document.querySelector('.nav');
    const subMenus = document.querySelectorAll('.nav__sub-list');

    if (sandwich != null) {
      const delay = 500;
      sandwich.addEventListener('click', function (e) {
        if (unlock) {
          bodyLock(delay);
          sandwich.classList.toggle('_active');
          nav.classList.toggle('_active');
          body.classList.toggle('_overlay');
        }
      });
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('_active')) return;
        if (!e.target.closest('._active')) {
          bodyLock(delay);
          nav.classList.remove('_active');
          sandwich.classList.remove('_active');
          body.classList.remove('_overlay');
          subMenus.forEach(item => {
            item.classList.remove('_active');
          });
        }
      });
    }
  };
  const getMap = () => {
    const complexMap = document.querySelector('#about-map');
    if (complexMap) {
      ymaps.ready(function () {
        const map = new ymaps.Map(complexMap, {
          center: [59.850509, 30.304028],
          zoom: 14,
          controls: []
        });
        const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        );
        const myPlacemark = new ymaps.Placemark(
          map.getCenter(),
          {
            hintContent: 'Офис e-logistic'
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
            iconImageOffset: [15, 40]
          }
        );
        map.geoObjects.add(myPlacemark);
      });
    }
  };
  const getGormValidation = () => {
    const forms = document.querySelectorAll('.need-validate');
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        },
        false
      );
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
    const breakpointMobile = window.matchMedia('(min-width: 1280px)');
    const certificatesSlider = document.querySelector('.certificates__slider');
    const deliverysRussiansSlider = document.querySelector('.delivery-russia-advantages__slider');
    let certificateSlider;
    let deliveryRussiaSlider;

    const breakpointChecker = function () {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          resizeHandlerDesktop();
        }, 100);
      }

      function resizeHandlerDesktop() {
        if (breakpointMobile.matches === true) {
          if (certificateSlider !== undefined) {
            certificateSlider.destroy(true, true);
          }
          if (deliveryRussiaSlider !== undefined) {
            deliveryRussiaSlider.destroy(true, true);
          }
        } else if (breakpointMobile.matches === false) {
          enableSubMenu();
        }
      }
    };

    const enableSubMenu = function () {
      if (certificatesSlider) {
        certificateSlider = new Swiper('.certificates__slider', {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0
            }
          },
          pagination: {
            el: '.certificates-pagination',
            type: 'bullets',
            bulletClass: 'certificates-pagination__bullet',
            bulletActiveClass: 'certificates-pagination__bullet--active',
            clickable: true
          }
        });
      };
      if (deliverysRussiansSlider) {
        deliveryRussiaSlider = new Swiper('.delivery-russia-advantages__slider', {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0
            }
          },
          pagination: {
            el: '.delivery-russia-advantages-pagination',
            type: 'bullets',
            bulletClass: 'delivery-russia-advantages-pagination__bullet',
            bulletActiveClass: 'delivery-russia-advantages-pagination__bullet--active',
            clickable: true
          }
        });
      };
    };

    const rewiesSlider = document.querySelector('.reviews-slider');
    if (rewiesSlider) {
      const reviewSlider = new Swiper('.reviews-slider', {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 1,
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        navigation: {
          nextEl: '.reviews-slider__button--next',
          prevEl: '.reviews-slider__button--prev'
        },
        pagination: {
          el: '.reviews-pagination',
          type: 'bullets',
          bulletClass: 'reviews-pagination__bullet',
          bulletActiveClass: 'reviews-pagination__bullet--active',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          1280: {
            slidesPerView: 'auto',
            spaceBetween: 40,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          }
        }
      });
    }

    breakpointMobile.addListener(breakpointChecker);
    breakpointChecker();
  };
  dynamicAdaptiv();
  getPageVh();
  getResize();
  getSubMenu();
  getSendwich();
  getMap();
  getGormValidation();
  getFixedHeader();
  getSlider();
})();
