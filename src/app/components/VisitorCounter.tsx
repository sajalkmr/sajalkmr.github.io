'use client'

import { useEffect, useState } from 'react'
import { Users, Activity } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

interface VisitorCounterProps {
  isDarkMode: boolean
  initialCount?: number
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  isDarkMode,
  initialCount = 0
}) => {
  const [totalVisitors, setTotalVisitors] = useState(initialCount)
  const [activeViewers, setActiveViewers] = useState(1) // Assuming current user is viewing
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      // If parent is providing the count, use that instead of fetching
      if (initialCount > 0) {
        setTotalVisitors(initialCount)
        setIsLoading(false)
        return
      }

      if (!supabase) {
        // Fallback to localStorage with deduplication
        const storedLog = localStorage.getItem('visitorLog')
        if (storedLog) {
          const log = JSON.parse(storedLog)
          const uniqueVisitors = new Set<string>()
          
          for (const visitor of log) {
            const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`
            uniqueVisitors.add(key)
          }
          
          setTotalVisitors(uniqueVisitors.size)
        }
        setIsLoading(false)
        return
      }

      try {
        // Fetch all visitor records to deduplicate client-side
        const { data: allVisitors, error } = await supabase
          .from('visitors')
          .select('*')
          .order('timestamp', { ascending: false })

        if (error) {
          console.error('Error fetching visitor data:', error)
        } else if (allVisitors) {
          // Client-side deduplication: count unique visitors by IP+browser+OS
          const uniqueVisitors = new Set<string>()
          
          for (const visitor of allVisitors) {
            const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`
            uniqueVisitors.add(key)
          }
          
          setTotalVisitors(uniqueVisitors.size)
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVisitorCount()
  }, [initialCount])



  // Simulate active viewers fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(1, prev + change) // Minimum 1 (current user)
      })
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <Activity className="w-4 h-4 animate-spin" />
        <span className="text-sm">...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Total visitors */}
      <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">{totalVisitors.toLocaleString()}</span>
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          visitors
        </span>
      </div>

      {/* Active viewers indicator */}
      <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>
        <div className="relative">
          <Activity className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <span className="text-sm font-medium">{activeViewers}</span>
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {activeViewers === 1 ? 'viewer' : 'viewers'}
        </span>
      </div>
    </div>
  )
} 