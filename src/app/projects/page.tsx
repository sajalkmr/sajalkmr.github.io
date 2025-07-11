'use client'

import { useTheme } from '../hooks/useTheme';
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, GitBranch, ExternalLink, Sun, Moon } from 'lucide-react'

export default function Projects() {
  const { isDarkMode, toggleTheme } = useTheme();

  const projects = [
    {
      name: 'ordo',
      description: 'A distributed container orchestration system built with Go, featuring custom PVM scheduler and RESTful APIs for cluster management.',
      tech: ['Go', 'Docker SDK', 'BoltDB', 'RESTful API'],
      github: 'https://github.com/sajalkmr/ordo',
      details: [
        'Built a distributed container orchestration system for managing large-scale applications',
        'Implemented modular architecture with Go interfaces for customizable scheduling',
        'Designed RESTful APIs for worker and manager nodes',
        'Migrated from in-memory to BoltDB for persistent storage'
      ]
    },
    {
      name: 'raftly',
      description: 'Implementation of Raft Consensus Algorithm in Java with monitoring using Prometheus and Grafana.',
      tech: ['Java', 'Maven', 'Prometheus', 'Grafana'],
      github: 'https://github.com/sajalkmr/raftly',
      details: [
        'Implemented fault-tolerant Raft Consensus Algorithm for reliable log replication',
        'Created state machine to apply commands from replicated logs',
        'Developed efficient inter-node communication protocols',
        'Set up monitoring with Prometheus and Grafana'
      ]
    },
    {
      name: 'EndlOS',
      description: 'A minimalist operating system from scratch with custom bootloader and priority-based task scheduler.',
      tech: ['C', 'x86 Assembly', 'QEMU', 'Make'],
      github: 'https://github.com/sajalkmr/EndlOS',
      details: [
        'Developed a minimalist operating system from scratch',
        'Built custom bootloader transitioning from 16-bit to 32-bit modes',
        'Implemented memory management and task scheduler',
        'Designed modular graphics and window management system'
      ]
    },
    {
      name: 'STRbook',
      description: 'Digital platform for managing student transformation records with secure authentication and RESTful APIs.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Jenkins'],
      github: 'https://github.com/sajalkmr/strbook',
      details: [
        'Developed digital platform reducing manual data entry by 80%',
        'Implemented JWT authentication for secure access',
        'Designed RESTful APIs for CRUD operations',
        'Automated CI/CD pipelines using Jenkins'
      ]
    }
  ]

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-gray-100/95 text-gray-900'
    } font-mono transition-colors duration-500`}>
      <div className="fixed inset-0 w-full h-full -z-10">
        <canvas className="w-full h-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' 
                  : 'bg-blue-700/10 text-blue-700 hover:bg-blue-700/20'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">All Projects</h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-blue-700" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div 
              key={project.name}
              className={`${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
              } rounded-lg p-6 space-y-4 transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex justify-between items-start">
                <h2 className={`text-xl sm:text-2xl font-bold ${
                  isDarkMode ? 'text-yellow-500' : 'text-blue-700'
                }`}>
                  {project.name}
                </h2>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50' 
                        : 'hover:bg-gray-300/50'
                    }`}
                  >
                    <GitBranch className="w-5 h-5" />
                  </a>
                )}
              </div>

              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base`}>
                {project.description}
              </p>

              <ul className="list-disc list-inside space-y-2 pl-4">
                {project.details.map((detail, index) => (
                  <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className={`text-sm px-3 py-1 rounded-full ${
                      isDarkMode 
                        ? 'bg-gray-700/70 text-gray-300' 
                        : 'bg-gray-300/70 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 