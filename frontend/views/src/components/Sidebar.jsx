import React from 'react'

const Sidebar = ({ documents, selectedDocument, onDocumentSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Core Topics</h3>
      </div>
      
      <nav className="sidebar-nav">
        {documents.map((doc, index) => (
          <button
            key={index}
            className={`nav-item ${selectedDocument.id === doc.id ? 'active' : ''}`}
            onClick={() => onDocumentSelect(doc)}
          >
            <span className="nav-icon">{doc.icon}</span>
            <span className="nav-title">{doc.title}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar