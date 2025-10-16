import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ContentDisplay from './components/ContentDisplay'
import { documentsData } from './data/documentsData'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem('node-resources-theme')

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  const prefersDark = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false

  return prefersDark ? 'dark' : 'light'
}

function App() {
  const [selectedDocument, setSelectedDocument] = useState(documentsData[0])
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const nextTheme = theme === 'dark' ? 'dark' : 'light'
    const { body, documentElement } = document

    if (!body || !documentElement) {
      return
    }

    documentElement.setAttribute('data-theme', nextTheme)
    body.setAttribute('data-theme', nextTheme)
    window.localStorage.setItem('node-resources-theme', nextTheme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-header-inner">
          <div className="app-header-text">
            <h1 className="app-title">Ultimate-NodeJs-Resources</h1>
            <p className="app-subtitle">Core Topics & Resources</p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'} mode</span>
          </button>
        </div>
      </div>
      <div className="app-body">
        <Sidebar
          documents={documentsData}
          selectedDocument={selectedDocument}
          onDocumentSelect={setSelectedDocument}
        />
        <ContentDisplay document={selectedDocument} />
      </div>
    </div>
  )
}

export default App
