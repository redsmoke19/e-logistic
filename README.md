# E-logistic - верстка

Установка:
**npm install**

* Запуск проекта:
    * Для разработки - `gulp`
    * Для продакшена:
      * Сначал запустить в терминале `npm run build`
### _Собранный проект хранится в папке `dist`_
---

* Структура проекта:
   - Папка **dev** - основная папка где храняться все файлы проекта
   - Папка **dist** - создается после запуска скрипта gulp, в данную папку помещаются все скомпилированные файлы, минифицированные и пр. и она запускается в browser-sync
   - Папка **pug** - папка для всех файлов pug, которые в последующем преобразовываются в html. В корне данной папки храняться файлы всех страниц сайта. 
       - Папка layout - шаблон страницы
       - Папка modules - всевозможные модули на страницы,  которые можно реиспользовать
       - Папка pages - файлы которые относятся только к определенной станицы
   - Папка **static** - основаная папка для шрифтов, js, scss и картинок
        - Папка images - Папка для картинок (common - не контентные изображения, content - контентные изображения, sprite - папка в которой храняться png и svg спрайты) В папке pug/helpers есть миксин, добавляющий svg на страницу.
   - Папка **gulp** - в ней храняться все таски для галпа
