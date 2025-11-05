import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { useParams, Link } from 'react-router-dom'
import { Loader } from '../components'
import { blogService } from '../services/blog'

const Blog = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogService.getById(id)
        const data = res?.data?.data || null
        if (!data) throw new Error('No blog found')

        // ✅ Extract YouTube video ID (supports multiple formats)
        let youtubeEmbedId = ''
        if (data.youtubeUrl) {
          const match = data.youtubeUrl.match(
            /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/i
          )
          youtubeEmbedId = match ? match[1] : ''
        }

        setBlog({
          ...data,
          youtubeEmbedId,
        })
      } catch (error) {
        console.error('Failed to load blog:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])
  console.log('Fetched blog:', blog)

  if (loading) return <Loader />
  if (!blog) return <div className="text-center py-20 text-gray-500">Blog not found.</div>

  return (
    <div className="max-w-4xl mx-auto my-16">
      <div className="space-y-2 px-4 py-4">
        {blog.youtubeEmbedId && (
          <iframe
            className="aspect-video rounded-lg my-8 w-full"
            src={`https://www.youtube.com/embed/${blog.youtubeEmbedId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <ul className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
          <li className="border-r border-gray-400 pr-4">
            Date:{' '}
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
              : '—'}
          </li>
          <li className="border-r border-gray-400 pr-4">
            Author: {blog.author}
          </li>
          <li>Tag: {blog.tag || '—'}</li>
        </ul>
      </div>

      {
        blog.description && (
          <div className="px-4 pb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-justify whitespace-pre-line">{blog.description}</p>
          </div>
        )
      }

      {blog.content && (
        <div className="px-4 pb-8">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-3xl font-bold mt-6 mb-4 text-gray-900" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-2xl font-semibold mt-5 mb-3 text-gray-900" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-xl font-semibold mt-4 mb-2 text-gray-900" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="text-base leading-relaxed text-gray-700 mb-4" />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-inside text-gray-700 mb-4 ml-4" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal list-inside text-gray-700 mb-4 ml-4" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="mb-1" />
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    {...props}
                    className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                  />
                ) : (
                  <pre
                    {...props}
                    className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"
                  />
                ),
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg my-4 max-w-full mx-auto" alt="" />
              ),
              hr: ({ node, ...props }) => (
                <hr {...props} className="my-6 border-gray-300" />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>

        </div>
      )}

      <div className="px-4 pb-16 text-end text-gray-600">
        <Link to="/blogs" className="animated-button">
          <span className="label">Back to Blogs</span>
        </Link>
      </div>
    </div>
  )
}

export default Blog
