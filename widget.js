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
    if (d.getElementById('vc-widget-loader-styles')) return

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
    if (loader) return

    loader = d.createElement('div')
    loader.className = 'vc-widget-loader-container'
    loader.innerHTML = '<div class="vc-widget-loader"></div>'

    if (d.body) {
      d.body.appendChild(loader)
    } else {
      d.addEventListener(
        'DOMContentLoaded',
        function () {
          d.body.appendChild(loader)
        },
        { once: true }
      )
    }
  }

  function hideLoader() {
    if (loader) loader.remove()
  }

  d.addEventListener(
    'click',
    function (e) {
      const target = e.target
      const link = target && target.closest ? target.closest('a[href^="#ePROBA"]') : null
      if (link && !isWidgetReady) showLoader()
    },
    true
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

  js.onerror = function () {
    hideLoader()
  }

  fjs.parentNode.insertBefore(js, fjs)
})(window, document, 'script', 'ePROBA', 'https://cabinet.vivacrm.ru/vc-widget-group-classes.js')

// Конфигурация и инициализация СНАРУЖИ onload (через очередь команд)
;(function () {
  const config = {
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

  // Вызываем init через очередь команд - widget.js обработает её после загрузки
  function onDomReady(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb, { once: true })
    } else {
      cb()
    }
  }

  onDomReady(function () {
    window['ePROBA']('init', config)
  })
})()
