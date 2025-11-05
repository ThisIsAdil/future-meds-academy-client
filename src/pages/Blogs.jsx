import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { blogService } from '../services/blog';

// const blogsContent = [
//   {
//     _id: "66f2a1b5c8d4e5f6a7b8c9d0",
//     thumbnail: "/assets/universities/thumbnail/turin.webp",
//     title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
//     description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
//     tag: "Universities in Italy",
//     publishedAt: "2025-09-24T10:30:00Z", // This will come from backend
//     author: "Amir Akhtar"
//   },
//   {
//     _id: "66f2a1b5c8d4e5f6a7b8c9d1",
//     thumbnail: "/assets/universities/thumbnail/turin.webp",
//     title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
//     description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
//     tag: "Universities in Italy",
//     publishedAt: "2025-09-23T14:15:00Z", // This will come from backend
//     author: "Amir Akhtar"
//   },
//   {
//     _id: "66f2a1b5c8d4e5f6a7b8c9d2",
//     thumbnail: "/assets/universities/thumbnail/turin.webp",
//     title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
//     description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
//     tag: "Universities in Italy",
//     publishedAt: "2025-09-22T09:45:00Z", // This will come from backend
//     author: "Amir Akhtar"
//   },
//   {
//     _id: "66f2a1b5c8d4e5f6a7b8c9d3",
//     thumbnail: "/assets/universities/thumbnail/turin.webp",
//     title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
//     description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
//     tag: "Universities in Italy",
//     publishedAt: "2025-09-21T16:20:00Z", // This will come from backend
//     author: "Amir Akhtar"
//   },
//   {
//     _id: "66f2a1b5c8d4e5f6a7b8c9d4",
//     thumbnail: "/assets/universities/thumbnail/turin.webp",
//     title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
//     description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
//     tag: "Universities in Italy",
//     publishedAt: "2025-09-20T11:00:00Z", // This will come from backend
//     author: "Amir Akhtar"
//   },
// ]

const Blogs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sortOrder, setSortOrder] = useState("newest");
  const [blogsContent, setBlogsContent] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAll();
      setBlogsContent(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  React.useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <div className='space-y-8 py-16'>
      <div className='w-full text-center space-y-2 px-4 pb-8'>
        <h2 className='text-3xl text-(--accent-dark) font-bold'>Future MedsAcademy Blogs</h2>
        <p>Guides, strategies, and resources to help you prepare for IMAT and
          study medicine in Italy.</p>
      </div>
      <div className='flex flex-wrap justify-between items-center max-w-7xl mx-auto px-4 gap-4'>
        <div className='space-x-2'>
          Sort by: <select name="sort" id="sort" className='border-none outline-none rounded-sm px-2 py-1' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className='grid gap-4 grid-cols-1 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3'>
        {
          blogsContent.sort((a, b) => {
            if (sortOrder === "newest") {
              return new Date(b.publishedAt) - new Date(a.publishedAt);
            } else {
              return new Date(a.publishedAt) - new Date(b.publishedAt);
            }
          }).map((blog, index) => (
            <Link to={`/blogs/${blog._id}`} key={index} className='flex flex-col p-4 gap-2 bg-(--accent-light) rounded-md cursor-pointer'>
              <div className='relative'>
                {
                  !blog.thumbnail.url ? <div className="w-full aspect-video rounded-md bg-gray-200 flex items-center justify-center">No Image Available</div> : <img src={blog.thumbnail.url} alt={blog.title} className='w-full aspect-video object-cover rounded-md' />
                }
                <span className='absolute top-0 left-0 bg-white py-1 px-2 m-1 text-xs rounded-sm'>{blog.tag}</span>
              </div>
              <div className='flex justify-between text-sm text-(--accent-dark) mx-2 mb-1'>
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' })}</span>
                <span>By {blog.author}</span>
              </div>
              <div className='p-2 space-y-1'>
                <h2 className='text-lg font-semibold'>{blog.title}</h2>
                <p className='text-justify text-gray-600'>{blog.description}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Blogs