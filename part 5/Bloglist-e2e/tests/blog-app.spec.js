const axios = require('axios')
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

    beforeEach(async ({ page }) => {
    
      await axios.post('http://localhost:3003/api/testing/reset')
    
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'secret123'
      }
    
      await axios.post(
        'http://localhost:3003/api/users',
        user
      )
    
      await page.goto('/')
    })

  test('Login form is shown', async ({ page }) => {

    await expect(
      page.getByRole('heading', { name: /log in/i })
    ).toBeVisible()

    await expect(
      page.getByLabel('Username')
    ).toBeVisible()

    await expect(
      page.getByLabel('Password')
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Login' })
    ).toBeVisible()

  })

  test('user can log in', async ({ page }) => {

    await page.getByLabel('Username').fill('testuser')

    await page.getByLabel('Password').fill('secret123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(
      page.getByRole('button', { name: 'Logout' })
    ).toBeVisible()
  })

})