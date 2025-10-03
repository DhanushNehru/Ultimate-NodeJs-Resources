import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ContentDisplay from './components/ContentDisplay'
import { documentsData } from './data/documentsData'

function App() {
  const [selectedDocument, setSelectedDocument] = useState(documentsData[0])

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">Ultimate-NodeJs-Resources</h1>
        <p className="app-subtitle">Core Topics & Resources</p>
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
