'use client'

import { useState, useMemo } from 'react'
import type { Course } from '@/modules/courses/types'

export function useCourseFilters(courses: Course[], currentTab: string) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Filtrar por búsqueda
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Filtrar por estado (tab)
        const matchesTab =
          currentTab === 'all' ||
          (currentTab === 'published' && course.status === 'published') ||
          (currentTab === 'draft' && course.status === 'draft') ||
          (currentTab === 'archived' && course.status === 'archived')

        return matchesSearch && matchesTab
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          case 'oldest':
            return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          default:
            return 0
        }
      })
  }, [courses, searchQuery, sortBy, currentTab])

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCourses,
  }
}
