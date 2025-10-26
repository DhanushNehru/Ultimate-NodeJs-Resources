import React, { useMemo, useState } from 'react'

const normalize = (value = '') => value.toLowerCase()

const ResourcesLibrary = ({ resources = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTags, setActiveTags] = useState([])

  const availableTags = useMemo(() => {
    const tagSet = new Set()
    resources.forEach((category) => {
      category.items.forEach((item) => {
        (item.tags || []).forEach((tag) => tagSet.add(tag))
      })
    })
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  }, [resources])

  const activeTagSet = useMemo(() => new Set(activeTags), [activeTags])
  const normalizedSearch = normalize(searchTerm.trim())

  const filteredCategories = useMemo(() => {
    return resources
      .map((category) => {
        const matchingItems = category.items.filter((item) => {
          const textMatches = !normalizedSearch
            || normalize(item.name).includes(normalizedSearch)
            || normalize(item.description).includes(normalizedSearch)
            || normalize(category.title).includes(normalizedSearch)
            || (item.type && normalize(item.type).includes(normalizedSearch))
          const tagMatches = activeTagSet.size === 0
            || (item.tags || []).some((tag) => activeTagSet.has(tag))
          return textMatches && tagMatches
        })

        if (matchingItems.length === 0) {
          return null
        }

        return {
          ...category,
          items: matchingItems
        }
      })
      .filter(Boolean)
  }, [resources, normalizedSearch, activeTagSet])

  const toggleTag = (tag) => {
    setActiveTags((current) => (
      current.includes(tag)
        ? current.filter((existing) => existing !== tag)
        : [...current, tag]
    ))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setActiveTags([])
  }

  return (
    <div className="library-container">
      <section className="library-toolbar" aria-label="Resource filters">
        <div className="library-search">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, type, or description"
            aria-label="Search resources"
          />
          {(searchTerm || activeTags.length > 0) && (
            <button
              type="button"
              className="library-clear"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
        <div className="library-tags" aria-label="Filter by tag">
          {availableTags.map((tag) => {
            const isActive = activeTagSet.has(tag)
            return (
              <button
                key={tag}
                type="button"
                className={`tag-pill ${isActive ? 'tag-pill-active' : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={isActive}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {filteredCategories.length === 0 ? (
        <div className="library-empty">
          <p>No resources match your filters yet. Try adjusting the tags or search term.</p>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <section key={category.id} className="library-section">
            <header className="library-section-header">
              <h2>{category.title}</h2>
              {category.description && <p>{category.description}</p>}
            </header>
            <div className="library-grid">
              {category.items.map((item) => (
                <article key={item.id} className="library-card">
                  <div className="library-card-header">
                    <span className="library-card-type">{item.type}</span>
                    <h3>
                      <a href={item.url} target="_blank" rel="noreferrer noopener">
                        {item.name}
                      </a>
                    </h3>
                  </div>
                  <p className="library-card-description">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="library-card-tags">
                      {item.tags.map((tag) => {
                        const isActive = activeTagSet.has(tag)
                        return (
                          <button
                            key={`${item.id}-${tag}`}
                            type="button"
                            className={`tag-badge ${isActive ? 'tag-badge-active' : ''}`}
                            onClick={() => toggleTag(tag)}
                            aria-pressed={isActive}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

export default ResourcesLibrary
