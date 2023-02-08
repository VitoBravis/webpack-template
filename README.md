# Базовая документация

## Содержание
1. [Работа с локальной версией](#работа-с-локальной-версией)
    - [Установка](#установка)
    - [Создание и удаление страниц](#создание-и-удаление-страниц)
    - [Работа с компонентами](#работа-с-компонентами)
    - [Сборка проекта](#сборка-проекта)
    - [Настройка окружения](#настройка-окружения)

---

## Работа с локальной версией

### Установка

Запустите установку пакетов npm:

```bash
npm i
```

Для запуска проекта введите:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Вы можете начать редактировать страницы, изменив `src/pages/index/index.pug`. Страница сама обновиться по мере редактирования файла.


### Создание и удаление страниц

Для создания страницы введите команду `npm run page:create` с указанием названия файла и заголовка страницы (например, `npm run page:create index Главная`):

```bash
npm run page:create <pageName> <pageTitle>
```

Для удаления страницы введите `npm run page:remove` с указанием названия файла (например, `npm run page:remove index`):

```bash
npm run page:remove <pageName>
```

> Чтобы увидеть изменения после создания/удаления страницы, требуется перезапустить сборку, выполнив `npm run dev`.

### Работа с компонентами

Все компоненты делятся на отдельные типы в зависимости от своего назначения. По умолчанию предусмотрены 4 основных типа компонентов:
- **common** - Компоненты, которые образуют основную логику проекта (Например, Header, Sandwich, Footer, Preloader и др.)
- **sections** - Крупные компоненты из которых состоят страницы. Чаще всего корневой элементы таких компонентов выполнен HTML-тегом `<section>`
- **blocks** - Более мелкие компоненты, которые обычно не существуют сами по себе за пределами компонентов-секций
- **ui** - Элементы пользовательского интерфейса. Кнопки, текстовые поля, чекбоксы, ссылки и т.п.

Для создания компонента введите `npm run component:create` с указанием названия компонента и его типа (например, `npm run component:create header common`):
```bash
npm run component:create <componentName> <componentType>
```

Для удаления страницы введите `npm run component:remove` с указанием названия компонента и его типа (например, `npm run component:remove header common`):
```bash
npm run component:remove <componentName> <componentType>
```

Для вывода полного списка существующих компонентов введите `npm run component:list`
```bash
npm run component:list
```

Для вывода списка компонентов только по одному из типов можно указать дополнительным аргументом тип компонента
```bash
npm run component:list ui
```

> При создании/удалении компонента перезапускать сборку не требуется, страница сама обновиться по мере редактирования файла.

### Сборка проекта

Для сборки проекта введите:
```bash
npm run build
```

Все собранные файлы попадают в папку `/build`

При необходимости передать собранные файлы в бэкенд-репозиторий можно использовать скрипт копирования файлов, который скопирует все файлы и папки по путям, указанных в настройках окружения:
- `npm run copy` - Запуск копирования файлов
- `npm run build:copy` - Запуск production-сборки и последующего копирования файлов

> Скрипт копирования самостоятельно создаст все папки, если их не будет по указанному расположению

### Настройка окружения

Для работы дополнительных скриптов или настроек сборки может использоваться файл `env.config.js`. Пример полного наполнения файла представлен в файле `env.config.example.js`

При необходимости можно скопировать файл и внести необходимые настройки:
```bash
cp env.example.config.js env.config.js
```

Список возможных параметров `env.config.js`:
#### copy
Параметры копирования файлов
- `paths` - Массив путей для копирования всех вложенных файлов и папок. Элемент массива должен быть массивом из двух значений: исходной папки и целевой папки
Например:
  ```javascript
  copy: {
      paths: [
          ['build/css', '../local/template/projectName/css'],
          ['build/js', '../local/template/projectName/js'],
          ['build/assets', '../assets']
      ]
  }
  ```
- `options` - Дополнительные параметры
    - `clean` - Логическое значение, которое определяет необходимость очищения целевой директории перед копированием файлов
    Например:
  ```javascript
  copy: {
      options: {
          clean: true
      }
  }
  ```
