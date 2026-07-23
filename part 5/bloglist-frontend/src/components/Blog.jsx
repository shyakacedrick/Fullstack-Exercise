import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? "none" : ""}
  const showWhenVisible = { display: visible ? "" : "none"}

  
  const toggleVisibility = () => { setVisible(!visible) }

  const blogOwner =
    typeof blog.user === "object"
      ? blog.user.username
      : null
  const canDelete =
    currentUser &&
    blogOwner === currentUser.username

  return (
     <article className="card blog-card" aria-label={`Blog ${blog.title}`}>
       {!visible ? (
         <>
           <div className="blog-header">
             <div>
               <h3 className="blog-title">{blog.title}</h3>
               <p className="blog-author">
                 {blog.author}
               </p>
             </div>   

             <button
               className="btn btn-secondary"
               onClick={toggleVisibility}
             >
               View
             </button>
           </div>   

           <div className="blog-footer">
             <span className="likes-pill">
               👍 {blog.likes}
             </span>
           </div>
         </>
       ) : (
         <>
           <div className="blog-header">
             <div>
               <h3 className="blog-title">
                 {blog.title}
               </h3>  

               <p className="blog-author">
                 {blog.author}
               </p>
             </div>   

             <button
               className="btn btn-secondary"
               onClick={toggleVisibility}
             >
               Hide
             </button>
           </div>   

           <div className="blog-details">   

             <div className="detail-row">
               <span className="detail-label">
                 URL
               </span>  

               <a
                 href={blog.url}
                 target="_blank"
                 rel="noreferrer"
                 className="blog-url"
               >
                 {blog.url}
               </a>
             </div>   

             <div className="detail-row">   

               <span className="detail-label">
                 Likes
               </span>  

               <div className="likes-section">  

                 <span className="likes-number">
                   {blog.likes}
                 </span>  

                 <button
                   className="btn btn-primary btn-small"
                   onClick={() => handleLike(blog)}
                 >
                   👍 Like
                 </button>  

               </div>   

             </div>   

             <div className="detail-row">
               <span className="detail-label">
                 Added by
               </span>  

               <span>
                 {blog.user?.name || "Unknown"}
               </span>
             </div>   

             {canDelete && (
               <button
                 className="btn btn-danger remove-btn"
                 onClick={() => handleDelete(blog)}
               >
                 Remove Blog
               </button>
             )}   

           </div>
         </>
       )}
     </article>
  )
}

export default Blog
