const loginWith = async (page, username, password) => {

  const response = await page.request.post(
    'http://localhost:3003/api/login',
    {
      data: {
        username,
        password,
      },
    }
  )

  const user = await response.json()

  await page.evaluate(user => {
    localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(user)
    )
  }, user)

  await page.goto('http://localhost:5173')
}


const createBlog = async (page, blog) => {

  const loggedUserJSON = await page.evaluate(() =>
    localStorage.getItem('loggedBlogAppUser')
  )

  const user = JSON.parse(loggedUserJSON)

  await page.request.post(
    'http://localhost:3003/api/blogs',
    {
      data: blog,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )

  await page.goto('http://localhost:5173')
}