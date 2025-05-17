export default {
  title: 'HR Manager System',
  description: 'Документация веб-приложения для учета сотрудников в организациях',
  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Установка', link: '/install' },
      { text: 'Структура проекта', link: '/structure' },
      { text: 'API', link: '/api' },
      { text: 'Роли и доступы', link: '/roles' }
    ],
    sidebar: [
      {
        text: 'Общее',
        items: [
          { text: 'Введение', link: '/' },
          { text: 'Установка и запуск', link: '/install' },
          { text: 'Структура проекта', link: '/structure' }
        ]
      },
      {
        text: 'Разработка',
        items: [
          { text: 'API и CRUD', link: '/api' }
        ]
      },
      {
        text: 'Безопасность и роли',
        items: [
          { text: 'Роли и доступы', link: '/roles' }
        ]
      }
    ]
  }
}
