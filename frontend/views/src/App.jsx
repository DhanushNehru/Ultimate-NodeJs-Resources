import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ContentDisplay from './components/ContentDisplay'
import ResourcesLibrary from './components/ResourcesLibrary'
import resourcesLibrary from './data/resourcesLibrary.json'
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
  const [viewMode, setViewMode] = useState('topics')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const nextTheme = theme
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

  const isLibraryView = viewMode === 'library'

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-header-inner">
          <div className="app-header-text">
            <h1 className="app-title">Ultimate-NodeJs-Resources</h1>
            <p className="app-subtitle">Core Topics & Resources</p>
          </div>
          <div className="app-header-controls">
            <div className="view-toggle" role="tablist" aria-label="Select content view">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'topics'}
                className={`view-toggle-button ${viewMode === 'topics' ? 'active' : ''}`}
                onClick={() => setViewMode('topics')}
              >
                Core Topics
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isLibraryView}
                className={`view-toggle-button ${isLibraryView ? 'active' : ''}`}
                onClick={() => setViewMode('library')}
              >
                Resources Library
              </button>
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
      </div>
      <div className={`app-body ${isLibraryView ? 'library-mode' : ''}`}>
        {isLibraryView ? (
          <ResourcesLibrary resources={resourcesLibrary} />
        ) : (
          <>
            <Sidebar
              documents={documentsData}
              selectedDocument={selectedDocument}
              onDocumentSelect={setSelectedDocument}
            />
            <ContentDisplay document={selectedDocument} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
