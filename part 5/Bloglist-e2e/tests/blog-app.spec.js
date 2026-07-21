const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page }) => {
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

    await page.getByLabel('Username').fill('innocent')

    await page.getByLabel('Password').fill('innocent1234')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(
      page.getByRole('button', { name: 'Logout' })
    ).toBeVisible()
  })

})