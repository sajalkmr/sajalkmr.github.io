'use client'

import { useTheme } from '../hooks/useTheme';
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, GitBranch, ExternalLink, Sun, Moon } from 'lucide-react'

export default function Projects() {
  const { isDarkMode, toggleTheme } = useTheme();

  const projects = [
    {
      name: 'BackDash',
      description: 'Full-stack quantitative backtesting platform.',
      tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'OKX API'],
      github: 'https://github.com/sajalkmr/backdash',
      details: [
        'Built full-stack platform with React/TypeScript frontend and Python/FastAPI backend',
        'Integrated real-time OKX market data with 10+ technical indicators',
        'Interactive dashboard with equity curves and performance metrics'
      ]
    },
    {
      name: 'LLM-based Cyber Threat Intelligence',
      description: 'AI-driven network traffic analysis for threat detection.',
      tech: ['Python', 'LangChain', 'ChromaDB', 'Streamlit', 'Google Gemini'],
      github: 'https://github.com/sajalkmr/LLM-network-analysis',
      details: [
        'AI-driven network traffic analysis using LLMs and ChromaDB',
        'RAG pipeline with LangChain integrating Google Gemini and local models',
        'Achieved 75% classification accuracy on malware datasets'
      ]
    },
    {
      name: 'STRbook',
      description: 'Student Record Management System.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'GitHub Actions'],
      github: 'https://github.com/sajalkmr/strbook',
      details: [
        'Digitized student transformation records reducing manual data entry',
        'JWT authentication with secure access for students and teachers',
        'RESTful APIs with optimized PostgreSQL queries and CI/CD pipelines'
      ]
    },
    {
      name: 'ordo',
      description: 'Distributed container orchestration system.',
      tech: ['Go', 'Docker SDK', 'BoltDB', 'RESTful API'],
      github: 'https://github.com/sajalkmr/ordo',
      details: [
        'Distributed container orchestration for large-scale applications',
        'Custom Enhanced PVM scheduler with modular Go architecture',
        'RESTful APIs for worker/manager nodes with BoltDB persistence'
      ]
    },
    {
      name: 'raftly',
      description: 'Raft Consensus Algorithm implementation.',
      tech: ['Java', 'Maven'],
      github: 'https://github.com/sajalkmr/raftly',
      details: [
        'Fault-tolerant Raft Consensus Algorithm for log replication and leader election',
        'State machine for consistent operations across distributed nodes',
        'Efficient inter-node communication with RPC handling'
      ]
    },
    {
      name: 'unLost',
      description: 'Lost and Found web application for college campus.',
      tech: ['Python Flask', 'SQLite', 'HTML', 'CSS'],
      github: 'https://github.com/sajalkmr/unlost',
      details: [
        'Flask web application with 15+ item categories and image uploads',
        'Secure authentication with password hashing and role-based access',
        'Claim verification system with proof-of-ownership and real-time messaging'
      ]
    },
    {
      name: 'go-api',
      description: 'LLM-Integrated REST API Service with AI summarization.',
      tech: ['Go', 'Gorilla Mux', 'Ollama'],
      github: 'https://github.com/sajalkmr/student-api-go',
      details: [
        'RESTful API in Go with full CRUD support and standardized error handling',
        'Mutex-based locking for thread-safe data access with LLaMA3 integration',
        'Modular architecture with routing, models, storage, and AI components'
      ]
    },
    {
      name: 'EndlOS',
      description: 'Custom operating system built from scratch.',
      tech: ['C', 'x86 Assembly', 'NASM', 'QEMU'],
      github: 'https://github.com/sajalkmr/EndlOS',
      details: [
        'GUI-based OS with custom bootloader, VBE graphics mode, and memory management',
        'Priority-based task scheduler with concurrent applications and interrupt-driven input',
        'Modular window management system with protected mode and cross-platform testing'
      ]
    },
    {
      name: 'SkillSwap',
      description: 'Full-stack skill exchange platform with matching system.',
      tech: ['Next.js 15', 'TypeScript', 'Prisma', 'SQLite', 'JWT'],
      github: 'https://github.com/sajalkmr/skilldoo',
      details: [
        'Skill exchange platform with 50+ predefined skills and comprehensive request management',
        'Secure JWT authentication with bcrypt hashing and role-based access control',
        'Advanced matching system with bidirectional skill matching and 5-star rating system'
      ]
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-gray-100/95 text-gray-900'
      } font-mono transition-colors duration-500`}>
      <div className="fixed inset-0 w-full h-full -z-10">
        <canvas className="w-full h-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-200 ${isDarkMode
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
            className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
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
              className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                } rounded-lg p-6 transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Project content */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'
                      }`}>
                      {project.name}
                    </h2>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors duration-200 lg:hidden ${isDarkMode
                          ? 'hover:bg-gray-700/50'
                          : 'hover:bg-gray-300/50'
                          }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
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
                        className={`text-sm px-3 py-1 rounded-full ${isDarkMode
                          ? 'bg-gray-700/70 text-gray-300'
                          : 'bg-gray-300/70 text-gray-700'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side - Project image and GitHub link */}
                <div className="lg:w-64 flex flex-col items-center gap-4">
                  <div className="w-full aspect-square relative rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                    <Image
                      src="/profile.png"
                      alt={`${project.name} preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 256px"
                      className="object-cover"
                    />
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${isDarkMode
                        ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                        : 'bg-gray-300/50 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 