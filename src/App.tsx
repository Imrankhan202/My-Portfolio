import { useState, useCallback } from 'react'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'

export type Page = 'home' | { type: 'project'; id: number }

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [fading, setFading] = useState(false)

  const navigate = useCallback((to: Page) => {
    if (to === 'home' && page === 'home') return
    setFading(true)
    setTimeout(() => {
      setPage(to)
      window.scrollTo({ top: 0 })
      setFading(false)
    }, 280)
  }, [page])

  const scrollToSection = useCallback((id: string) => {
    if (page !== 'home') {
      setFading(true)
      setTimeout(() => {
        setPage('home')
        window.scrollTo({ top: 0 })
        setFading(false)
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }, 280)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [page])

  return (
    <div style={{ backgroundColor: '#F3F0E9', minHeight: '100vh' }}>
      <CustomCursor />
      <Nav page={page} navigate={navigate} scrollToSection={scrollToSection} />

      <main className="page-transition" style={{ opacity: fading ? 0 : 1 }}>
        {page === 'home' && <HomePage navigate={navigate} />}
        {typeof page === 'object' && page.type === 'project' && (
          <ProjectPage id={page.id} navigate={navigate} />
        )}
      </main>

      <Footer navigate={navigate} scrollToSection={scrollToSection} />
    </div>
  )
}
