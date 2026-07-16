import { render, screen } from "@testing-library/react"
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

})