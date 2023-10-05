'use client'

import React, { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

function Feed() {
  const [allPosts, setAllPosts] = useState([])

  // search states
  const [searchedText, setSearchedText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  // fetching data from the API
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt ')
      const data = await response.json()
      setAllPosts(data)
    }
    fetchPost()
  }, [])

  // filtering helper function

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i')
    // regex filter results
    return allPosts.filter(
      (p) =>
        regex.test(p.creator.username) ||
        regex.test(p.tag) ||
        regex.test(p.prompt)
    )
  }

  // tagClick

  const handleTagClick = (tag) => {
    setSearchedText(tag)
    setSearchResults(filterPrompts(tag))
  }

  // handling search form with input
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchedText(e.target.value)
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        {/* for searching */}
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchedText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>

      {/* rendering components based on the presence of searchedText  */}

      {searchedText ? (
        <PromptCardList data={searchResults} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}
export default Feed
