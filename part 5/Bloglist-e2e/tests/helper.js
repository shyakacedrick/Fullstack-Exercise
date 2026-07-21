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