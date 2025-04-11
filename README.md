Верстка интерактивного слайд-шоу

Разработано адаптивное веб-приложение с горизонтальными слайдами, управляемыми свайпами, и кнопкой возврата на первый слайд.

Совместимость: Тестирование в Chrome в режиме эмуляции iPad (1024×768).

Навигация:

- Горизонтальный свайп (на ПК — перетаскивание мышью) для переключения слайдов.

- Кнопка "Домик" (иконка дома) мгновенно возвращает на первый слайд.

Анимации: Плавные переходы между слайдами.

Технологии: Чистый JavaScript, SCSS, HTML5 (без сторонних библиотек).


Технические детали:
Структура:

- Один полноэкранный контейнер с горизонтально скроллируемыми слайдами (overflow-x: hidden + JS-обработчик свайпов).

- Фиксированная кнопка "Домик" в углу экрана.

Свайп-логика:

- Определение начала/конца касания (touchstart, touchend).

- Расчет направления для переключения слайда.

Адаптивность:

- Фиксированные размеры под 1024×768.
