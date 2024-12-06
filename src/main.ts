import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MainApp from './main-app.vue'
import router from '@/router'
// import vue3GoogleLogin from 'vue3-google-login'

// unocss
import '@unocss/reset/tailwind.css'
import './assets/css/main.css'
import 'virtual:uno.css'
import 'uno.css'

// highlightjs

import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// notificaton
import Notifications from '@kyvg/vue3-notification'

// cleave
import Cleave from 'cleave.js'

// tippy
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const app = createApp(MainApp)
app.directive('cleave', {
  mounted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {})
  }
})
app.directive('click-outside', {
  mounted: function (element, binding, vnode) {
    element.clickOutsideEvent = function (event: any) {
      //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.props?.['on:onClickOutside']?.(event)
        // binding.value(); run the arg
      }
    }
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted: function (element) {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  }
})
app.use(VueTippy)
app.use(router)
app.use(hljsVuePlugin)
app.use(Notifications)
app.use(createPinia())
// app.use(vue3GoogleLogin, {
//   clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
// })

app.mount('#app')
