;(function (w, d, s, o, f, js, fjs) {
  w[o] =
    w[o] ||
    function () {
      ;(w[o].q = w[o].q || []).push(arguments)
    }
  w[o].q = w[o].q || []

  let isWidgetReady = false
  let loader

  function addLoaderStyles() {
    const style = d.createElement('style')
    style.innerHTML = `
      :root {
        --accent-color: #6A59E9;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .vc-widget-loader {
        display: inline-block;
        width: 40px;
        height: 40px;
        animation: spin 1.4s linear infinite;
        position: relative;
      }

      .vc-widget-loader::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50px;
        padding: 4px;
        background: linear-gradient(45deg, var(--accent-color, #6A59E9), #ffffff);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }

      .vc-widget-loader-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
    `
    d.head.appendChild(style)
  }

  function showLoader() {
    if (!loader) {
      loader = d.createElement('div')
      loader.className = 'vc-widget-loader-container'
      loader.innerHTML = '<div class="vc-widget-loader"></div>'
      d.body.appendChild(loader)
    }
  }

  function hideLoader() {
    if (loader) loader.remove()
  }

  const links = document.querySelectorAll('a[href^="#ePROBA"]')
  links?.forEach(link =>
    link.addEventListener('click', function (e) {
      if (!isWidgetReady) {
        showLoader()
      }
    })
  )

  addLoaderStyles()

  js = d.createElement(s)
  fjs = document.currentScript || d.getElementsByTagName(s)[0]
  js.id = o
  js.src = f
  js.defer = true

  js.onload = function () {
    isWidgetReady = true
    hideLoader()
  }

  fjs.parentNode.insertBefore(js, fjs)
})(window, document, 'script', 'ePROBA', 'https://cabinet.vivacrm.ru/vc-widget-group-classes.js')

// Конфигурация и инициализация СНАРУЖИ onload (через очередь команд)

// Специальная логика для виджетов с переопределением staticWidgetMode
;(function () {
  // Читаем параметры из script тега (СНАРУЖИ onload - currentScript работает!)
  const currentScript =
    document.currentScript || document.querySelector('script[src*="3faa4c0c-036e-4e9f-b145-2f143356ff40.js"]')
  let overrideStaticMode = undefined

  if (currentScript) {
    // Проверяем атрибут staticwidgetmode
    const staticModeAttr = currentScript.getAttribute('staticwidgetmode')
    if (staticModeAttr !== null) {
      overrideStaticMode = staticModeAttr === 'true'
    }

    // Проверяем URL параметры
    const scriptSrc = currentScript.src
    if (scriptSrc) {
      const url = new URL(scriptSrc)
      const staticModeParam = url.searchParams.get('staticwidgetmode')
      if (staticModeParam !== null) {
        overrideStaticMode = staticModeParam === 'true'
      }
    }
  }

  const originalConfig = {
    year: 2025,
    month: 1,
    theme: 'light',
    title: 'Расписание',
    blocks: [],
    channel: 'cascade',
    filters: ['STUDIO', 'TRAINERS', 'TIME', 'DIRECTIONS'],
    currency: 'RUB',
    darkLogo: '',
    language: 'ru',
    lightLogo: '',
    tenantKey: 'LcCRkN',
    vocabulary: {
      room: 'зал',
      class: 'занятие',
      place: 'локация',
      action: 'записаться',
      master: 'тренер',
      service: 'пробная тренировка',
    },
    bookingDays: 14,
    defaultView: 'day',
    description: '',
    borderRadius: true,
    refundMethod: 'SERVICE',
    userContacts: {
      requestLastName: true,
      lastNameRequired: false,
      requestFirstName: true,
      firstNameRequired: false,
    },
    widgetStyles: {
      fontFamily: 'Onest',
      accentColor: '#6A59E9',
      secondColor: '#39d2c0',
      tertiaryColor: '#EE8B60',
      backgroundColor: '#ffffff',
    },
    //exercisesType: {
    //  id: 6,
    //  text: 'Бесплатно',
    //},
    hideselectors: false,
    isMonthlyMode: false,
    //availableTypes: [1198],
    showTimePicker: false,
    masterServiceId: 'null',
    multipleBooking: false,
    publicOfferLink: 'https://smstretching.ru/public-offer/',
    roomNamesHidden: false,
    //availableStudios: ['069594fe-3c07-4858-ba17-b93389792f6f'],
    roomPrefixHidden: false,
    staticWidgetMode: true,
    timeBeforeBooking: [
      {
        id: '1',
        time: 0,
        timeWithoutTrainer: 0,
      },
    ],
    hideAvailableSpots: false,
    phoneInputSettings: {
      code: '+7',
      country: 'ru',
    },
    showClassesDuration: true,
    importantExerciseText: ['Тем кто в первый раз, необходим документ удостоверяющий личность'],
    isExerciseTimeVisible: true,
    successfulBookingText:
      'Мы списали одно занятие и отправили на почту все подробности. Не забудь, что приехать нужно за 15 минут до начала. Это важно!',
    firstDirectionIsActive: false,
    showExerciseDirections: true,
    personalDataProcessingPolicyLink: 'https://smstretching.ru/sm-pages/private-policy',
  }
  const finalConfig = { ...originalConfig }

  // Применяем переопределение staticWidgetMode если есть
  if (overrideStaticMode !== undefined) {
    finalConfig.staticWidgetMode = overrideStaticMode
  }

  // Вызываем init через очередь команд - widget.js обработает её после загрузки
  function onDomReady(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb, { once: true })
    } else {
      cb()
    }
  }

  onDomReady(function () {
    window['ePROBA']('init', finalConfig)
  })
})()

// Добавляем popup-collection поддержку для всех основных виджетов в попап режиме

// Универсальная логика для работы с popup-collection (всегда активна)
;(function () {
  console.log('🔧 Enabling popup-collection support for:', 'ePROBA')

  // Добавляем обработчик hashchange для активации виджета
  const hashChangeHandler = function () {
    if (window.location.hash === '#ePROBA') {
      console.log('🚀 Hash changed to #ePROBA, attempting to show widget')

      if (window['ePROBA'] && typeof window['ePROBA'] === 'function') {
        console.log('🚀 Popup-collection: Activating widget via hashchange:', 'ePROBA')
        try {
          window['ePROBA']('show')
          console.log('✅ Widget show() called successfully')
        } catch (e) {
          console.error('❌ Error calling widget show():', e)
        }
      } else {
        console.error('❌ Widget function not found:', 'ePROBA')
      }
    }
  }

  // Добавляем обработчик
  window.addEventListener('hashchange', hashChangeHandler)

  // Проверяем текущий hash при загрузке
  if (window.location.hash === '#ePROBA') {
    setTimeout(() => {
      if (window['ePROBA'] && typeof window['ePROBA'] === 'function') {
        console.log('🚀 Popup-collection: Activating widget on load:', 'ePROBA')
        window['ePROBA']('show')
      }
    }, 100)
  }

  console.log('✅ Popup-collection support enabled for:', 'ePROBA')
})()
