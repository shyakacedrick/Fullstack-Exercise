import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()

    set({
      blogs,
    })
  },

  createBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject)

    set((state) => ({
      blogs: state.blogs.concat(newBlog),
    }))

    return newBlog
  },

  likeBlog: async (blog) => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    const returnedBlog =
      await blogService.update(blog.id, updated)

    set((state) => ({
      blogs: state.blogs.map((b) =>
        b.id === returnedBlog.id
          ? returnedBlog
          : b
      ),
    }))
  },

  deleteBlog: async (blog) => {
    await blogService.remove(blog.id)

    set((state) => ({
      blogs: state.blogs.filter(
        (b) => b.id !== blog.id
      ),
    }))
  },
}))

export default useBlogStore