import { create } from 'zustand'

import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'

const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const user = persistentUser.getUser()

    if (user) {
      blogService.setToken(user.token)

      set({
        user,
      })
    }
  },

  login: (user) => {
    persistentUser.saveUser(user)

    blogService.setToken(user.token)

    set({
      user,
    })
  },

  logout: () => {
    persistentUser.removeUser()

    blogService.setToken(null)

    set({
      user: null,
    })
  },
}))

export default useUserStore