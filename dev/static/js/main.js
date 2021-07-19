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

  getMap();
})();
