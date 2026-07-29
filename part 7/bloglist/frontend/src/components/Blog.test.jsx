import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import Blog from "./Blog"

describe("Blog component", () => {

  test("renders title and author but not url or likes by default", () => {

    const blog = {
      title: "React Patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com",
      likes: 12,
      user: {
        name: "John"
      }
    }

    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
      />
    )

        const [visibleTitle, hiddenTitle] = screen.getAllByText("React Patterns")
        expect(visibleTitle).toBeVisible()
        expect(hiddenTitle).not.toBeVisible()

        const authors = screen.getAllByText("Michael Chan")
        expect(authors[0]).toBeVisible()
        expect(authors[1]).not.toBeVisible()

    expect(
      screen.getByText("https://reactpatterns.com")
    ).not.toBeVisible()

    expect(
      screen.getByText(/Likes:/i)
    ).not.toBeVisible()

  })

  test("shows url and likes after clicking the view button", async () => {
  const blog = {
    title: "React Patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com",
    likes: 12,
    user: {
      name: "John",
    },
  }

  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
    />
  )

  const user = userEvent.setup()

  const button = screen.getByText("View")

  await user.click(button)

  expect(
    screen.getByText("https://reactpatterns.com")
  ).toBeVisible()

  expect(
    screen.getByText(/Likes:/i)
  ).toBeVisible()
})

test("calls the like event handler twice when the like button is clicked twice", async () => {
  const blog = {
    title: "React Patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com",
    likes: 12,
    user: {
      name: "John",
    },
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
    />
  )

  const user = userEvent.setup()

  await user.click(
    screen.getByText("View")
  )

  const likeButton = screen.getByRole("button", {
    name: /like/i,
  })

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
})