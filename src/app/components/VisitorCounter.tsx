'use client'

import { useEffect, useState } from 'react'
import { Users, Activity } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { VisitorCounterProps } from '../types/visitor'

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  isDarkMode,
  initialCount = 0
}) => {
  const [totalVisitors, setTotalVisitors] = useState(initialCount)
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

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <Activity className="w-4 h-4 animate-spin" />
        <span className="text-sm">...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Total visitors */}
      <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">{totalVisitors.toLocaleString()}</span>
        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          visitors
        </span>
      </div>
    </div>
  )
} 