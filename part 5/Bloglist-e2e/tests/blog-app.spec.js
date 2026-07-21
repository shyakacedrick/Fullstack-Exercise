const axios = require('axios')
const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await axios.post('http://localhost:3003/api/testing/reset')

   await axios.post('http://localhost:3003/api/users', {
      name: 'Test User',
      username: 'testuser',
      password: 'secret123',
    })

    await axios.post('http://localhost:3003/api/users', {
      name: 'Another User',
      username: 'anotheruser',
      password: 'secret123',
    })

    await axios.post('http://localhost:3003/api/users', user)

    await page.goto('http://localhost:5173')
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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('Username').fill('testuser')

      await page.getByLabel('Password').fill('secret123')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(
        page.getByRole('button', { name: 'Logout' })
      ).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()

      await page.getByLabel('Title').fill('Playwright Testing')

      await page.getByLabel('Author').fill('Full Stack Open')

      await page.getByLabel('URL').fill('https://playwright.dev')

      await page.getByRole('button', { name: 'Create' }).click()

      await expect(
        page.getByText('Playwright Testing')
      ).toBeVisible()
    })

    test('a user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()    

      await page.getByLabel('Title').fill('Playwright Blog')    

      await page.getByLabel('Author').fill('Full Stack Open')   

      await page.getByLabel('URL').fill('https://playwright.dev')   

      await page.getByRole('button', { name: 'Create' }).click()    

      await page.getByRole('button', { name: 'View' }).click()    

      await expect(
        page.getByText('Likes: 0')
      ).toBeVisible()   

      await page.getByRole('button', { name: 'Like' }).click()    

      await expect(
        page.getByText('Likes: 1')
      ).toBeVisible()
    })

    test('only the creator can delete a blog', async ({ page }) => {

      await page.getByLabel('Username').fill('testuser')

      await page.getByLabel('Password').fill('secret123')

      await page.getByRole('button', { name: 'Login' }).click()

      await page.getByRole('button', { name: 'New Blog' }).click()

      await page.getByLabel('Title').fill('Delete Test')

      await page.getByLabel('Author').fill('FSO')

      await page.getByLabel('URL').fill('https://fullstackopen.com')

      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'Logout' }).click()

      await page.getByLabel('Username').fill('anotheruser')

      await page.getByLabel('Password').fill('secret123')

      await page.getByRole('button', { name: 'Login' }).click()

      await page.getByRole('button', { name: 'View' }).click()

      await expect(
        page.getByRole('button', { name: 'Delete' })
      ).toHaveCount(0)
    })
  })
})