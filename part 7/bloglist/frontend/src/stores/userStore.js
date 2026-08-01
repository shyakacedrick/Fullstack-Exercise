import { create } from 'zustand'

import blogService from '../services/blogs'

const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const loggedUserJSON =
      window.localStorage.getItem(
        'loggedBlogAppUser'
      )

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)

      set({
        user,
      })
    }
  },

  login: (user) => {
    window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(user)
    )

    blogService.setToken(user.token)

    set({
      user,
    })
  },

  logout: () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )

    blogService.setToken(null)

    set({
      user: null,
    })
  },
}))

export default useUserStore