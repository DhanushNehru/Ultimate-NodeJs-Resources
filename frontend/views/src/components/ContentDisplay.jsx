import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const ContentDisplay = ({ document }) => {
  return (
    <div className="content-display">
      <div className="content-header">
        <div className="content-title-section">
          <span className="content-icon">{document.icon}</span>
          <h1 className="content-title">{document.title}</h1>
        </div>
        <div className="content-meta">
          <span className="content-category">{document.category}</span>
          <span className="content-time">5 min read</span>
        </div>
      </div>
      
      <div className="content-body">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children }) => <h1 className="content-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="content-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="content-h3">{children}</h3>,
            p: ({ children }) => <p className="content-p">{children}</p>,
            ul: ({ children }) => <ul className="content-ul">{children}</ul>,
            ol: ({ children }) => <ol className="content-ol">{children}</ol>,
            li: ({ children }) => <li className="content-li">{children}</li>,
            blockquote: ({ children }) => <blockquote className="content-blockquote">{children}</blockquote>,
            a: ({ href, children }) => <a href={href} className="content-link" target="_blank" rel="noopener noreferrer">{children}</a>
          }}
        >
          {document.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default ContentDisplay