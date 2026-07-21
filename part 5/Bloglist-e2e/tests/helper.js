const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await expect(
    page.getByRole('button', { name: 'Logout' })
  ).toBeVisible()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', {
    name: 'New Blog'
  }).click()

  await page.getByLabel('Title').fill(blog.title)
  await page.getByLabel('Author').fill(blog.author)
  await page.getByLabel('URL').fill(blog.url)

  await page.getByRole('button', {
    name: 'Create'
  }).click()
}

module.exports = {
  loginWith,
  createBlog
}