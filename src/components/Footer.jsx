import { Link } from 'react-router-dom'
const Footer = () => {
  const links = [
    {
      title: "Future MedsAcademy", links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Courses", path: "/courses" },
        { name: "Blog", path: "/blog" },
      ]
    },
    {
      title: "Resources", links: [
        { name: "IMAT", path: "/imat" },
        { name: "Previous Year Papers", path: "/previous-year-papers" },
        { name: "Universities", path: "/universities" },
        { name: "Study Abroad", path: "/study-abroad" },
      ]
    }
  ]

  const socials = [
    { name: "Instagram", url: "https://www.instagram.com/futuremedsacademy/" },
    { name: "YouTube", url: "https://www.youtube.com/@theguyinwhitecoat" },
    { name: "WhatsApp", url: "https://chat.whatsapp.com/KqeGz58KHTJ1NfrnT5WkeX" },
    { name: "Telegram", url: "https://t.me/imat2025fma" },
  ]

  return (
    <footer className='footer bg-(--accent-light)'>
      <div className='flex flex-wrap px-8 py-12 max-w-7xl mx-auto gap-8'>
        <div className='flex-1 flex flex-wrap min-w-[250px] gap-8'>
          {
            links.map((section) => (
              <div key={section.title} className='flex-1 min-w-[150px]'>
                <h4 className='text-(--accent-dark) font-bold text-lg mb-4 whitespace-nowrap'>{section.title}</h4>
                <ul>
                  {
                    section.links.map((link) => (
                      <li key={link.name} className='my-1'>
                        <Link to={link.path} className="animated-link">
                          {link.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
        <div className='flex-1 min-w-[250px]'>
          <h4 className='text-(--accent-dark) font-bold text-lg mb-2'>Subscribe</h4>
          <p className='text-sm'>Stay informed about our newest courses and features — subscribe today!</p>
          <form onSubmit={(e) => e.preventDefault()} className='flex flex-row items-center flex-wrap max-w-lg gap-1 my-4'>
            <input type="email" required placeholder="Enter your email" className='w-full max-w-xs my-2 p-2 border border-[--accent-dark]' />
            <button type="submit" className="animated-button">
              <span className="label">Subscribe</span>
            </button>
          </form>
          <p className='text-sm text-(--accent-dark)'>By subscribing, you agree to our <Link to="/terms" className="animated-link">Terms of Service</Link> and <Link to="/privacy" className="animated-link">Privacy Policy</Link>.</p>
        </div>
      </div>
      <div className='flex flex-wrap gap-1 mb-8 px-4 max-w-7xl mx-auto'>
        {
          socials.map((s) => (
            <button key={s.name} className="animated-button border border-(--accent-dark) flex-1 min-w-[200px]">
              <span className='label'>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className='flex items-center justify-between'>
                  {s.name}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </span>
            </button>
          ))
        }
      </div>
      <div className='flex justify-between flex-wrap gap-4 bg-(--accent-dark) text-(--accent-light) p-8'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} FutureMedsAcademy. All rights reserved.</p>
        <div className='flex flex-wrap gap-4'>
          <Link to="/privacy-policy" className="animated-link text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="animated-link text-sm">
            Terms of Service
          </Link>
          <a href="https://adilshaikh.dev" target='_blank' rel="noopener noreferrer" className="animated-link text-sm">
            Developed by Adil Shaikh
          </a>
        </div>
      </div>
    </footer>
  )
};

export default Footer