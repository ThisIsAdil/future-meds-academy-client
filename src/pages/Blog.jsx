import React from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const blog = {
    _id: "66f2a1b5c8d4e5f6a7b8c9d0",
    meta: {
      thumbnail: "/assets/universities/thumbnail/turin.webp",
      youtubeEmbedId: "geejWrV0UMo",
      tag: "Universities in Italy",
      publishedAt: "2025-09-24T10:30:00Z",
      author: "Amir Akhtar"
    },
    title: "IMAT Preparation Tips 2025: Study Smarter, Not Harder",
    description: "Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.",
    content: {
      introduction: "Preparing for the IMAT exam can feel overwhelming. In this guide, I walk you through a 3-month strategy to stay consistent, improve scores, and reduce stress — using real student examples and proven methods.",
      main: [
        {
          "headline": "Plan Your Study Schedule",
          "p": "A structured study plan helps you avoid last-minute stress and ensures every subject is covered. Without a schedule, it’s easy to over-focus on one subject and neglect others.",
          "ul": [
            "Start with a full diagnostic test",
            "Divide the IMAT syllabus into weekly modules",
            "Keep buffer days for revision and practice"
          ]
        },
        {
          "headline": "Practice with Past Year Questions",
          "p": "Past IMAT papers are the most valuable resource to understand the exam pattern and difficulty level. Treat them like real exams to get the most benefit.",
          "ul": [
            "Download official IMAT papers from past years",
            "Take them under timed exam-like conditions",
            "Review mistakes thoroughly and create error notes"
          ],
          "quote": "The best way to predict your future score is by analyzing your past mistakes."
        },
        {
          "headline": "Use Mock Tests for Feedback",
          "p": "Mocks help simulate the real exam experience and highlight weak areas. Ranking systems allow you to compare your performance with other aspirants.",
          "ul": [
            "Take bi-weekly full-length mocks",
            "Track recurring problem areas",
            "Adapt your study plan based on results"
          ]
        },
        {
          "headline": "Improve Time Management & Strategy",
          "p": "Even if you know the concepts, poor time management can cost you valuable marks. The key is knowing what to solve first and when to skip.",
          "ul": [
            "Answer easy questions first to secure quick marks",
            "Use shortcuts for logical reasoning",
            "Skip and return to tough questions later"
          ],
          "quote": "Don’t get stuck on a single problem—move forward and come back later.",
          "cta": {
            "label": "Join Our Free IMAT Strategy Webinar",
            "link": "/webinars/imat-strategy"
          }
        }
      ],
      relatedLinks: [
        {
          title: "Official IMAT Past Papers",
          url: "https://www.universitaly.it/index.php/medicina-in-italia/imat",
          description: "Download past IMAT exam papers directly from the official Universitaly website."
        },
        {
          title: "Top 10 IMAT Preparation Books",
          url: "https://futuremedsacademy.com/imat-books",
          description: "A curated list of the best books to help you prepare effectively for the IMAT exam."
        }
      ],
      tags: ["IMAT", "Study Tips", "Exam Preparation", "Medical School"]
    }
  }


  return (
    <div className='max-w-4xl mx-auto'>
      <div className='space-y-2 px-4 py-4'>
        <iframe className=' aspect-video rounded-lg my-8' src={`https://www.youtube.com/embed/${blog.meta.youtubeEmbedId}?si=UEMvm-0RLx8_MCJP`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h1 className='text-2xl font-bold'>{blog.title}</h1>
        <ul className='flex items-center gap-4 text-sm text-gray-600 flex-wrap'>
          <li className='border-r border-gray-400 pr-4'>Date: {new Date(blog.meta.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
          <li className='border-r border-gray-400 pr-4'>Author: {blog.meta.author}</li>
          <li>Tag: {blog.meta.tag}</li>
        </ul>
      </div>
      <div className='px-4 pb-8'>
        <h2 className='text-xl font-semibold'>Introduction:</h2>
        <p className='text-justify'>{blog.content.introduction}</p>
      </div>
      <div className='px-4 space-y-2 pb-8'>
        {blog.content.main.map((section, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-lg font-semibold">{section.headline}</h2>
            {section.p && <p>{section.p}</p>}
            {section.ul && (
              <ul className="list-disc ml-6 my-2">
                {section.ul.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            )}
            {section.quote && (
              <blockquote className="border-l-4 pl-4 italic text-gray-600 my-3">
                {section.quote}
              </blockquote>
            )}
            {section.cta && (
              <div className="my-8">
                <a href={section.cta.link} className="animated-button">
                  <span className='label'>{section.cta.label}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      {
        blog.content.relatedLinks && (
          <div className='px-4 space-y-2 pb-8'>
            <h2 className='text-lg font-semibold'>Related Links:</h2>
            {blog.content.relatedLinks.map((link, index) => (
              <div key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className='text-(--accent-dark) underline'>{link.title}</a>
                <p className='text-justify'>{link.description}</p>
              </div>
            ))}
          </div>
        )
      }
      {
        blog.content.tags && (
          <div className='px-4 pb-8 flex items-center flex-wrap gap-2'>
            <h2 className='text-lg font-semibold'>Tags:</h2>
            {blog.content.tags.map((tag, index) => (
              <span key={index} className='bg-(--accent-light) text-(--accent-dark) px-3 py-1 rounded-full text-sm'>{tag}</span>
            ))}
          </div>
        )
      }
      <div className='px-4 pb-16 text-end text-gray-600'>
        <Link to="/blogs" className='animated-button'><span className='label'>Back to Blogs</span></Link>
      </div>
    </div>
  )
}

export default Blog