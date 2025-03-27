// Простой виджет для перехода в Telegram бот бронирования
// Просто вставьте этот код прямо в HTML-страницу между тегами <script></script>

;(function () {
  // Создаем стили
  const style = document.createElement('style')
  style.textContent = `
        .telegram-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Arial', sans-serif;
            display: flex;
            align-items: center;
            pointer-events: none;
            transform: none !important; /* Предотвращаем центрирование */
        }
        
        .telegram-widget-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #0088cc radial-gradient(circle at 70% 30%, #29a9eb 0%, #0088cc 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 136, 204, 0.4);
            position: relative;
            z-index: 2;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
            animation: pulse 2s infinite;
            pointer-events: auto;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.4);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(0, 136, 204, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 136, 204, 0);
            }
        }
        
        .telegram-widget-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(0, 136, 204, 0.4);
        }
        
        .telegram-widget-icon svg {
            width: 30px;
            height: 30px;
            fill: #fff;
            filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
            transition: transform 0.3s ease;
        }
        
        .telegram-widget-icon:hover svg {
            transform: scale(1.1);
        }
        
        .telegram-widget-bubble {
            background-color: #fff;
            color: #333;
            border: 2px solid #0088cc;
            border-radius: 18px;
            padding: 12px 15px;
            font-size: 14px;
            line-height: 1.4;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-right: 15px;
            max-width: 240px;
            position: relative;
            opacity: 0;
            transform: translateX(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            cursor: pointer;
            pointer-events: auto;
        }
        
        .telegram-widget-bubble:hover {
            box-shadow: 0 6px 20px rgba(0, 136, 204, 0.15);
            border-color: #29a9eb;
        }
        
        .telegram-widget-bubble:after {
            content: '';
            position: absolute;
            right: -11px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 10px 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #fff;
            z-index: 2;
        }
        
        .telegram-widget-bubble:before {
            content: '';
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 12px 0 12px 12px;
            border-style: solid;
            border-color: transparent transparent transparent #0088cc;
            z-index: 1;
        }
        
        .telegram-widget-bubble:hover:before {
            border-color: transparent transparent transparent #29a9eb;
        }
        
        .telegram-widget-bubble.active {
            opacity: 1;
            transform: translateX(0);
        }
        
        .telegram-widget-title {
            font-weight: 700;
            font-size: 15px;
            margin: 0 0 4px 0;
            color: #0088cc;
        }
        
        .telegram-widget-subtitle {
            font-size: 12px;
            margin: 0;
            color: #555;
        }
        
        .telegram-widget-link {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 3;
            opacity: 0;
        }
        
        @keyframes wave {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(-15deg); }
            40% { transform: rotate(10deg); }
            60% { transform: rotate(-10deg); }
            80% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }
        
        .telegram-widget-icon.waving {
            animation: wave 1.2s ease-in-out;
            transform-origin: bottom center;
        }
        
        .telegram-widget-close {
            position: absolute;
            top: -7px;
            right: -7px;
            width: 18px;
            height: 18px;
            background: #0088cc;
            border-radius: 50%;
            color: white;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
            transform: scale(0.8);
            z-index: 4;
        }
        
        .telegram-widget-bubble:hover .telegram-widget-close {
            opacity: 1;
            transform: scale(1);
        }
        
        .telegram-widget-close:hover {
            background-color: #006699;
            transform: scale(1.1);
        }
        
        .telegram-widget-shadow {
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 10px;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            z-index: 1;
            opacity: 0.3;
        }

        .telegram-widget-top-left {
            top: var(--telegram-widget-offset, 20px) !important;
            left: 20px;
            right: auto;
            bottom: auto;
            flex-direction: row-reverse;
        }
        
        .telegram-widget-top-left .telegram-widget-bubble {
            margin-right: 0;
            margin-left: 15px;
        }
        
        .telegram-widget-top-left .telegram-widget-bubble:after {
            right: auto;
            left: -11px;
            border-width: 10px 10px 10px 0;
            border-color: transparent #fff transparent transparent;
        }
        
        .telegram-widget-top-left .telegram-widget-bubble:before {
            right: auto;
            left: -14px;
            border-width: 12px 12px 12px 0;
            border-color: transparent #0088cc transparent transparent;
        }
        
        .telegram-widget-top-left .telegram-widget-bubble:hover:before {
            border-color: transparent #29a9eb transparent transparent;
        }
        
        .telegram-widget-top-right {
            top: var(--telegram-widget-offset, 20px) !important;
            right: 20px;
            bottom: auto;
        }
        
        .telegram-widget-bottom-left {
            bottom: var(--telegram-widget-offset, 20px) !important;
            left: 20px;
            right: auto;
            flex-direction: row-reverse;
        }
        
        .telegram-widget-bottom-left .telegram-widget-bubble {
            margin-right: 0;
            margin-left: 15px;
        }
        
        .telegram-widget-bottom-left .telegram-widget-bubble:after {
            right: auto;
            left: -11px;
            border-width: 10px 10px 10px 0;
            border-color: transparent #fff transparent transparent;
        }
        
        .telegram-widget-bottom-left .telegram-widget-bubble:before {
            right: auto;
            left: -14px;
            border-width: 12px 12px 12px 0;
            border-color: transparent #0088cc transparent transparent;
        }
        
        .telegram-widget-bottom-left .telegram-widget-bubble:hover:before {
            border-color: transparent #29a9eb transparent transparent;
        }

        .telegram-widget-bottom-right {
            bottom: var(--telegram-widget-offset, 20px) !important;
            right: 20px;
        }

        /* Стили для тёмной темы */
        .telegram-widget-dark .telegram-widget-bubble {
            background-color: #2a2a2a;
            color: #f0f0f0;
            border-color: #0088cc;
        }
        
        .telegram-widget-dark .telegram-widget-title {
            color: #29a9eb;
        }
        
        .telegram-widget-dark .telegram-widget-subtitle {
            color: #cccccc;
        }
        
        .telegram-widget-dark .telegram-widget-bubble:after {
            border-color: transparent transparent transparent #2a2a2a;
        }
        
        .telegram-widget-dark.telegram-widget-top-left .telegram-widget-bubble:after,
        .telegram-widget-dark.telegram-widget-bottom-left .telegram-widget-bubble:after {
            border-color: transparent #2a2a2a transparent transparent;
        }
        
        /* Градиентная рамка */
        .telegram-widget-gradient-border .telegram-widget-bubble {
            border: none;
            position: relative;
            background-clip: padding-box;
            padding: 13px 16px;
        }
        
        .telegram-widget-gradient-border .telegram-widget-bubble::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -2px;
            border-radius: 20px;
            background: linear-gradient(45deg, #0088cc, #29a9eb);
        }
        
        /* Дополнительная анимация для привлечения внимания */
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
        }
        
        .telegram-widget-icon.bouncing {
            animation: bounce 2s ease infinite;
        }
        
        /* Эффект свечения для иконки */
        @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(0, 136, 204, 0.6); }
            50% { box-shadow: 0 0 20px rgba(0, 136, 204, 0.9); }
            100% { box-shadow: 0 0 5px rgba(0, 136, 204, 0.6); }
        }
        
        .telegram-widget-icon.glowing {
            animation: glow 1.5s infinite;
        }
        
        /* Анимация появления */
        @keyframes TelegramFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .telegram-widget-container {
            animation: TelegramFadeIn 0.5s ease forwards;
        }
        
        @media (max-width: 480px) {
            .telegram-widget-bubble {
                max-width: 180px;
                padding: 10px 12px;
                font-size: 12px;
                margin-right: 10px;
            }
            .telegram-widget-title {
                font-size: 13px;
                margin-bottom: 2px;
            }
            .telegram-widget-subtitle {
                font-size: 11px;
            }
            .telegram-widget-icon {
                width: 50px;
                height: 50px;
            }
            .telegram-widget-icon svg {
                width: 25px;
                height: 25px;
            }
            .telegram-widget-container.telegram-widget-bottom-left .telegram-widget-bubble,
            .telegram-widget-container.telegram-widget-top-left .telegram-widget-bubble {
                margin-left: 10px;
            }
        }

        /* Добавляем стили для кастомного отступа */
        .telegram-widget-custom-offset {
            bottom: var(--telegram-widget-offset, 20px) !important;
            top: var(--telegram-widget-offset, auto) !important;
        }
    `

  document.head.appendChild(style)

  // Создаем HTML виджета
  const container = document.createElement('div')
  container.className = 'telegram-widget-container'

  // Создаем текстовый пузырь
  const bubble = document.createElement('div')
  bubble.className = 'telegram-widget-bubble'
  bubble.innerHTML = `
        <div class="telegram-widget-close">✕</div>
        <p class="telegram-widget-title">Бот бронирования</p>
        <p class="telegram-widget-subtitle">и общения на тему проживания...</p>
    `

  // Создаем иконку с улучшенным SVG
  const icon = document.createElement('div')
  icon.className = 'telegram-widget-icon'
  icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9.8,18.4l0.4-5.4l9.7-8.7c0.4-0.4-0.1-0.6-0.6-0.2L7.5,12.3L2.3,10.8c-1.1-0.3-1.1-1.1,0.3-1.6L20.9,3 c0.9-0.4,1.8,0.2,1.4,1.6L19,18.2c-0.3,1.1-1,1.4-2.1,0.9l-5.8-4.3l-2.8,2.7C8,17.7,7.8,18.4,9.8,18.4z"/>
        </svg>
        <div class="telegram-widget-shadow"></div>
    `

  // Создаем ссылку для перехода в телеграм
  const link = document.createElement('a')
  link.className = 'telegram-widget-link'
  link.href = 'https://t.me/your_bot_username'
  link.target = '_blank'

  // Добавляем все элементы в DOM
  container.appendChild(bubble)
  container.appendChild(icon)
  icon.appendChild(link)
  document.body.appendChild(container)

  // Настройки по умолчанию
  const defaultSettings = {
    telegramUsername: 'your_bot_username', // имя пользователя в Telegram
    title: 'Бот бронирования', // заголовок виджета
    subtitle: 'и общения на тему проживания...', // подзаголовок
    position: 'bottom-right', // положение виджета: top-left, top-right, bottom-left, bottom-right
    offset: 20, // отступ от края экрана в пикселях
    showDelay: 1000, // задержка появления пузыря при загрузке страницы (мс)
    hideDelay: 10000, // время до скрытия пузыря (мс)
    waveDelay: 15000, // задержка до начала махания иконкой (мс)
    waveInterval: 30000, // интервал между маханиями (мс)
    waveStrength: 'medium', // сила махания: 'light', 'medium', 'strong'
    attentionEffect: 'wave', // эффект для привлечения внимания: 'wave', 'bounce', 'glow', 'none'
    color: '#0088cc', // основной цвет виджета
    borderColor: '#0088cc', // цвет рамки пузыря
    titleColor: '#0088cc', // цвет заголовка пузыря
    subtitleColor: '#555', // цвет подзаголовка
    autoOpen: true, // автоматически открывать пузырь при загрузке
    rememberState: false, // запоминать состояние (если пользователь закрыл, не показывать снова)
    darkMode: false, // использовать темную тему
    gradientBorder: false, // использовать градиентную рамку вместо сплошной
    zIndex: 9999, // z-index контейнера виджета
    autoHide: true // автоматически скрывать пузырь после показа
  }

  // Текущие настройки виджета
  let settings = { ...defaultSettings }

  // Получение параметров из дата-атрибутов скрипта
  function getScriptParams() {
    try {
      const scripts = document.getElementsByTagName('script')
      const currentScript = scripts[scripts.length - 1]

      // Получаем все data-атрибуты
      const dataset = currentScript.dataset || {}

      // Обрабатываем каждый параметр
      const params = {}
      for (const key in dataset) {
        let value = dataset[key]

        // Преобразуем строковые значения в нужные типы
        if (value === 'true') value = true
        else if (value === 'false') value = false
        else if (!isNaN(Number(value)) && value !== '') value = Number(value)

        params[key] = value
      }

      return params
    } catch (e) {
      return {}
    }
  }

  // Объединяем настройки по умолчанию с параметрами из дата-атрибутов
  const scriptParams = getScriptParams()
  if (Object.keys(scriptParams).length > 0) {
    settings = { ...settings, ...scriptParams }
  }

  const closeButton = bubble.querySelector('.telegram-widget-close')
  let widgetClosed = false
  let waveTimer = null

  // Закрытие пузыря при клике на крестик
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      bubble.classList.remove('active')
      widgetClosed = true

      // Если настроено запоминание состояния, сохраняем в localStorage
      if (settings.rememberState) {
        localStorage.setItem('telegramWidgetClosed', 'true')
      }
    })
  }

  // Проверяем, был ли виджет закрыт ранее
  if (settings.rememberState && localStorage.getItem('telegramWidgetClosed') === 'true') {
    widgetClosed = true
  }

  // Функция для установки положения виджета
  function setPosition(position) {
    container.className = 'telegram-widget-container'
    if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
      container.classList.add('telegram-widget-' + position)
    } else {
      // По умолчанию - правый нижний угол
      container.classList.add('telegram-widget-bottom-right')
    }

    // Применяем кастомный отступ
    container.style.setProperty('--telegram-widget-offset', `${settings.offset}px`)

    // Применяем дополнительные классы если нужно
    if (settings.darkMode) {
      container.classList.add('telegram-widget-dark')
    }

    if (settings.gradientBorder) {
      container.classList.add('telegram-widget-gradient-border')
    }

    // Устанавливаем z-index если указан
    if (settings.zIndex) {
      container.style.zIndex = settings.zIndex
    }
  }

  // Установка интенсивности махания
  function setWaveStrength(strength) {
    const waveAnimations = {
      light: `@keyframes wave {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                50% { transform: rotate(3deg); }
                75% { transform: rotate(-3deg); }
                100% { transform: rotate(0deg); }
            }`,
      medium: `@keyframes wave {
                0% { transform: rotate(0deg); }
                20% { transform: rotate(-15deg); }
                40% { transform: rotate(10deg); }
                60% { transform: rotate(-10deg); }
                80% { transform: rotate(10deg); }
                100% { transform: rotate(0deg); }
            }`,
      strong: `@keyframes wave {
                0% { transform: rotate(0deg); }
                20% { transform: rotate(-25deg); }
                40% { transform: rotate(20deg); }
                60% { transform: rotate(-20deg); }
                80% { transform: rotate(15deg); }
                100% { transform: rotate(0deg); }
            }`
    }

    // Добавляем стиль с нужной анимацией, удаляя старый, если был
    const oldStyle = document.getElementById('telegram-wave-animation')
    if (oldStyle) oldStyle.remove()

    const waveStyle = document.createElement('style')
    waveStyle.id = 'telegram-wave-animation'
    waveStyle.textContent = waveAnimations[strength] || waveAnimations.medium
    document.head.appendChild(waveStyle)
  }

  // Показываем пузырь через определенное время после загрузки
  function showBubble() {
    if (!widgetClosed) {
      bubble.classList.add('active')

      // Скрываем пузырь через указанное время, но только если autoHide = true и hideDelay > 0
      if (settings.autoHide !== false && settings.hideDelay > 0) {
        setTimeout(() => {
          if (!container.querySelector(':hover')) {
            bubble.classList.remove('active')
          }

          // После скрытия пузыря, запускаем анимацию для привлечения внимания через какое-то время
          if (!waveTimer && !widgetClosed) {
            waveTimer = setTimeout(() => {
              playAttentionAnimation()
            }, settings.waveDelay)
          }
        }, settings.hideDelay)
      } else {
        // Если autoHide = false, то всё равно запускаем анимацию через некоторое время
        if (!waveTimer && !widgetClosed) {
          waveTimer = setTimeout(() => {
            playAttentionAnimation()
          }, settings.waveDelay)
        }
      }
    }
  }

  // Функция для воспроизведения анимации привлечения внимания
  function playAttentionAnimation() {
    if (widgetClosed) return

    // Выбираем анимацию в зависимости от настроек
    switch (settings.attentionEffect) {
      case 'wave':
        icon.classList.add('waving')
        setTimeout(() => icon.classList.remove('waving'), 1200)
        break

      case 'bounce':
        icon.classList.add('bouncing')
        setTimeout(() => icon.classList.remove('bouncing'), 2000)
        break

      case 'glow':
        icon.classList.add('glowing')
        setTimeout(() => icon.classList.remove('glowing'), 1500)
        break

      case 'none':
      default:
        // Ничего не делаем
        break
    }

    // Показываем пузырь при анимации, но только если он не должен быть всегда виден
    if (!bubble.classList.contains('active')) {
      bubble.classList.add('active')

      // Если нужно автоматически скрывать пузырь
      if (settings.autoHide !== false && settings.hideDelay > 0) {
        setTimeout(() => {
          if (!container.querySelector(':hover') && !widgetClosed) {
            bubble.classList.remove('active')
          }
        }, 5000)
      }
    }

    // Запускаем анимацию снова через некоторое время
    waveTimer = setTimeout(() => {
      if (!container.querySelector(':hover') && !widgetClosed) {
        playAttentionAnimation()
      }
    }, settings.waveInterval)
  }

  // Если включено автооткрытие, показываем пузырь после задержки
  if (settings.autoOpen) {
    setTimeout(showBubble, settings.showDelay)
  }

  // Применяем начальные настройки положения
  setPosition(settings.position)

  // Устанавливаем силу махания
  setWaveStrength(settings.waveStrength)

  // Показываем/скрываем пузырь при наведении на иконку
  icon.addEventListener('mouseenter', () => {
    if (!widgetClosed) {
      bubble.classList.add('active')

      // Убираем все анимационные классы при наведении
      icon.classList.remove('waving', 'bouncing', 'glowing')

      // Сбрасываем таймер анимации
      if (waveTimer) {
        clearTimeout(waveTimer)
        waveTimer = null
      }
    }
  })

  // Если autoHide = true, скрываем пузырь при уходе мыши с виджета
  if (settings.autoHide !== false && settings.hideDelay > 0) {
    container.addEventListener('mouseleave', () => {
      if (!widgetClosed) {
        setTimeout(() => {
          if (!container.querySelector(':hover')) {
            bubble.classList.remove('active')
          }
        }, 1000)
      }
    })
  }

  // Обработчик клика по пузырю (переход в телеграм)
  bubble.addEventListener('click', (e) => {
    // Проверяем, что клик был не по крестику
    const target = e.target
    if (target && (!target.classList || !target.classList.contains('telegram-widget-close'))) {
      window.open(link.href, '_blank')
    }
  })

  // Обрабатываем клик по иконке
  icon.addEventListener('click', () => {
    if (widgetClosed) {
      // Если пузырь был закрыт, показываем его снова при клике на иконку
      widgetClosed = false
      localStorage.removeItem('telegramWidgetClosed')
      bubble.classList.add('active')
    } else {
      window.open(link.href, '_blank')
    }
  })

  // Функция для настройки виджета
  function configureTelegramWidget(config) {
    if (!config) return

    // Обновляем настройки
    if (typeof config === 'object') {
      settings = { ...settings, ...config }
    }

    const titleElement = container.querySelector('.telegram-widget-title')
    const subtitleElement = container.querySelector('.telegram-widget-subtitle')

    // Применяем новые настройки
    if (settings.telegramUsername) {
      link.href = 'https://t.me/' + settings.telegramUsername
    }

    if (settings.title && titleElement) {
      titleElement.textContent = settings.title
    }

    if (settings.subtitle && subtitleElement) {
      subtitleElement.textContent = settings.subtitle
    }

    // Устанавливаем позицию и отступ
    setPosition(settings.position)

    // Применяем дополнительные классы если нужно
    if (settings.darkMode) {
      container.classList.add('telegram-widget-dark')
    } else {
      container.classList.remove('telegram-widget-dark')
    }

    if (settings.gradientBorder) {
      container.classList.add('telegram-widget-gradient-border')
    } else {
      container.classList.remove('telegram-widget-gradient-border')
    }

    // Устанавливаем z-index если указан
    if (settings.zIndex) {
      container.style.zIndex = settings.zIndex
    }

    // Устанавливаем силу махания
    setWaveStrength(settings.waveStrength)

    // Применяем цвета
    if (settings.color) {
      const lighterColor = lightenColor(settings.color, 20)
      icon.style.background = `${settings.color} radial-gradient(circle at 70% 30%, ${lighterColor} 0%, ${settings.color} 100%)`
      icon.style.boxShadow = `0 4px 12px ${settings.color}66` // 66 = 40% opacity
    }

    if (settings.borderColor && !settings.gradientBorder) {
      bubble.style.borderColor = settings.borderColor

      // Обновляем цвет треугольника
      const beforeStyle = document.createElement('style')
      beforeStyle.id = 'telegram-bubble-before-style'
      beforeStyle.textContent = `
        .telegram-widget-bubble:before {
          border-color: transparent transparent transparent ${settings.borderColor} !important;
        }
        .telegram-widget-container.telegram-widget-top-left .telegram-widget-bubble:before,
        .telegram-widget-container.telegram-widget-bottom-left .telegram-widget-bubble:before {
          border-color: transparent ${settings.borderColor} transparent transparent !important;
        }
      `

      // Удаляем старый стиль если был
      const oldStyle = document.getElementById('telegram-bubble-before-style')
      if (oldStyle) oldStyle.remove()

      document.head.appendChild(beforeStyle)
    }

    if (settings.titleColor && titleElement) {
      titleElement.style.color = settings.titleColor
    }

    if (settings.subtitleColor && subtitleElement) {
      subtitleElement.style.color = settings.subtitleColor
    }

    // Если hideDelay = 0 или autoHide = false, явно отключаем автоскрытие
    if (settings.hideDelay === 0) {
      settings.autoHide = false
    }
  }

  // Экспортируем функцию настройки в глобальную область
  if (typeof window !== 'undefined') {
    // @ts-ignore - игнорируем ошибку типа
    window.configureTelegramWidget = configureTelegramWidget
  }

  // Применяем начальные настройки
  configureTelegramWidget(settings)

  // Вспомогательная функция для осветления цвета (для градиента)
  function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }
})()

/*
ИНСТРУКЦИЯ ПО ИСПОЛЬЗОВАНИЮ:

1. ПРОСТОЙ ВАРИАНТ:
   Просто скопируйте весь этот код и вставьте его прямо в HTML-страницу между тегами <script></script>
   
   <script>
     // Вставьте весь код сюда
   </script>

2. НАСТРОЙКА ЧЕРЕЗ DATA-АТРИБУТЫ:
   Вы можете настроить виджет, добавив data-атрибуты к тегу script:
   
   <script 
     src="simple-telegram-widget.js"
     data-telegram-username="your_bot_username"
     data-title="Бот бронирования"
     data-subtitle="и общения на тему проживания..."
     data-color="#0088cc"
     data-position="bottom-right"
     data-offset="50"
     data-wave-strength="strong"
     data-dark-mode="false"
     data-auto-hide="true"
   ></script>

3. НАСТРОЙКА ЧЕРЕЗ JAVASCRIPT:
   После загрузки виджета вы можете настроить его вызовом функции:
   
   <script>
     configureTelegramWidget({
       telegramUsername: 'your_bot_username',
       title: 'Бот бронирования',
       subtitle: 'и общения на тему проживания...',
       color: '#0088cc',
       borderColor: '#0088cc',
       position: 'bottom-right',
       offset: 50, // отступ от края экрана в пикселях
       waveStrength: 'strong',
       attentionEffect: 'bounce',
       darkMode: true,
       gradientBorder: true,
       autoHide: false // Пузырь не будет скрываться автоматически
     });
   </script>

ДОСТУПНЫЕ ПАРАМЕТРЫ:
- telegramUsername: ваше имя пользователя в Telegram (обязательно)
- title: заголовок пузыря
- subtitle: подзаголовок пузыря
- position: положение на странице (top-left, top-right, bottom-left, bottom-right)
- offset: отступ от края экрана в пикселях (по умолчанию 20)
- showDelay: задержка появления пузыря при загрузке (мс)
- hideDelay: время до скрытия пузыря (мс), 0 = не скрывать
- autoHide: автоматически скрывать пузырь (true/false) 
- waveDelay: задержка до начала анимации (мс)
- waveInterval: интервал между анимациями (мс)
- waveStrength: сила махания (light, medium, strong)
- attentionEffect: тип анимации (wave, bounce, glow, none)
- color: основной цвет виджета
- borderColor: цвет рамки пузыря
- titleColor: цвет заголовка
- subtitleColor: цвет подзаголовка
- autoOpen: автоматически показывать пузырь при загрузке (true/false)
- rememberState: запоминать, если пользователь закрыл виджет (true/false)
- darkMode: использовать темную тему (true/false)
- gradientBorder: использовать градиентную рамку (true/false)
- zIndex: z-index контейнера виджета
*/
