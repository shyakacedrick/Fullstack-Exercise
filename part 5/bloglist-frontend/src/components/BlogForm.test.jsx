import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import BlogForm from "./BlogForm"

test("calls createBlog with correct data", async () => {
  const createBlog = vi.fn()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)

  await user.type(titleInput, "React Testing")
  await user.type(authorInput, "Michael Chan")
  await user.type(urlInput, "https://react.dev")

  await user.click(
    screen.getByRole("button", {
      name: /create/i,
    })
  )

  expect(createBlog).toHaveBeenCalledTimes(1)

  expect(createBlog).toHaveBeenCalledWith({
    title: "React Testing",
    author: "Michael Chan",
    url: "https://react.dev",
  })
})