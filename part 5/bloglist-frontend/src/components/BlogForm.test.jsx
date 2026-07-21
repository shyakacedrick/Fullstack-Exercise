import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import BlogForm from "./BlogForm"

test("calls createBlog with the correct blog data", async () => {
  const createBlog = vi.fn()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const user = userEvent.setup()

  await user.type(
    screen.getByLabelText(/title/i),
    "React Testing"
  )

  await user.type(
    screen.getByLabelText(/author/i),
    "Michael Chan"
  )

  await user.type(
    screen.getByLabelText(/url/i),
    "https://react.dev"
  )

  await user.click(
    screen.getByRole("button", {
      name: /create/i,
    })
  )

  expect(createBlog).toHaveBeenCalledTimes(1)

  const submittedBlog = createBlog.mock.calls[0][0]

  expect(submittedBlog.title).toBe("React Testing")
  expect(submittedBlog.author).toBe("Michael Chan")
  expect(submittedBlog.url).toBe("https://react.dev")
})