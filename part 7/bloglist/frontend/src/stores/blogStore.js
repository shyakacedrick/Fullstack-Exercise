import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set, get) => ({
  blogs: [],

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()

    set({
      blogs: blogs.sort((a, b) => b.likes - a.likes),
    })
  },

  createBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject)

    set({
      blogs: [...get().blogs, newBlog].sort(
        (a, b) => b.likes - a.likes
      ),
    })

    return newBlog
  },

  likeBlog: async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    const returnedBlog = await blogService.update(
      blog.id,
      updatedBlog
    )

    set({
      blogs: get()
        .blogs
        .map((b) =>
          b.id === returnedBlog.id
            ? returnedBlog
            : b
        )
        .sort((a, b) => b.likes - a.likes),
    })

    return returnedBlog
  },

  deleteBlog: async (blog) => {
    await blogService.remove(blog.id)

    set({
      blogs: get().blogs.filter(
        (b) => b.id !== blog.id
      ),
    })
  },
}))

export default useBlogStore