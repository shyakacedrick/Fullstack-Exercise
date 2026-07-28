import { create } from 'zustand'

let timeoutId = null

export const useNotificationStore = create((set) => ({
  notification: '',

  showNotification: (message) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    set({
      notification: message,
    })

    timeoutId = setTimeout(() => {
      set({
        notification: '',
      })
    }, 5000)
  },
}))