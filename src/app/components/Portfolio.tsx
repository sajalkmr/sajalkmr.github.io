'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import {
  Code, Mail, Github, Zap, Brain,
  Linkedin, Twitter, MessageCircle,
  Sun, Moon, Layout, Server, Paintbrush,
  Database, GitBranch, Box, Cloud,
  Terminal, FileText, ArrowRight
} from 'lucide-react'
import { VisitorLog } from './VisitorLog'
import { DynamicVisitorMap } from './DynamicVisitorMap'
import { VisitorCounter } from './VisitorCounter'



import Link from 'next/link'
import Image from "next/image"
import { getOptimizedImageProps } from '../../lib/imageUtils'

export const SKILLS = [
  { category: 'Languages', icon: Code, items: ['C/C++', 'Java', 'Python', 'JavaScript', 'Go', 'SQL', 'HTML', 'CSS'] },
  { category: 'Frameworks & Libraries', icon: Zap, items: ['React', 'Node.js', 'Express.js'] },
  { category: 'Developer Tools & Technologies', icon: Brain, items: ['Linux/WSL', 'Docker', 'Kubernetes', 'Jenkins', 'Git/GitHub', 'Azure'] },
  { category: 'Data & Visualization Tools', icon: Database, items: ['Tableau', 'Power BI', 'Excel', 'LaTeX'] },
  { category: 'Databases', icon: Database, items: ['PostgreSQL', 'MongoDB', 'SQLite'] }
]

export const CERTIFICATIONS = [
  {
    name: 'AWS Cloud Practitioner Essentials',
    logo: 'https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png',
    issuer: 'Coursera',
    date: '2024',
    link: 'https://coursera.org/share/2d2d04c0cfca0b2edd632d68e88a6957'
  },
  {
    name: 'Network Automation Professional Certificate',
    logo: 'https://miro.co.za/img/m/46-large_brand.webp',
    issuer: 'Arista Networks',
    date: '2024',
    link: 'https://www.linkedin.com/learning/certificates/9bdc6a9f2e00ace906b135ba38534b9f93c5c18790e10206ac7092795a2529b7?trk=share_certificate'
  },
  {
    name: 'DevOps Professional Certificate',
    logo: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/pagerduty_logo_icon_169875.png',
    issuer: 'Pagerduty',
    date: '2023',
    link: 'https://www.linkedin.com/learning/certificates/e3c205c516875f02ab58b3f06b9dd501360f1526036b0936c2dd195c7353c3c5?trk=share_certificate'
  }
]

export const TW_PROJECTS = [
  {
    name: 'BackDash',
    description: 'Full-stack quantitative backtesting platform with React/TypeScript frontend and Python/FastAPI backend, featuring real-time OKX market data integration and 10+ technical indicators.',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'OKX API'],
    github: 'https://github.com/sajalkmr/backdash'
  },
  {
    name: 'LLM-based Cyber Threat Intelligence',
    description: 'AI-driven network traffic analysis system using LLMs and ChromaDB for automated threat detection and classification from PCAP logs with 75% accuracy.',
    tech: ['Python', 'LangChain', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/sajalkmr/LLM-network-analysis'
  }
];

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function Portfolio() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSection, setActiveSection] = useState<string>('about')


  const [totalVisitors, setTotalVisitors] = useState(0)


  useEffect(() => {
    setMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Star[] = []
    const numStars = 200
    const maxLineDistance = 125
    const starSpeed = 0.3

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * starSpeed,
        vy: (Math.random() - 0.5) * starSpeed,
        radius: Math.random() * 1.2 + 0.3
      })
    }

    let lastFrame = 0
    const fpsInterval = 1000 / 30

    const animate = (time: number) => {
      if (window.innerWidth < 768) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        requestAnimationFrame(animate)
        return
      }

      if (time - lastFrame < fpsInterval) {
        requestAnimationFrame(animate)
        return
      }
      lastFrame = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = isDarkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(243, 244, 246, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)'
        ctx.fill()
      })

      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.6)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxLineDistance * (window.innerWidth < 768 ? 0.8 : 1)) {
            const opacity = (1 - distance / maxLineDistance) * (isDarkMode ? 0.5 : 0.7)
            ctx.strokeStyle = isDarkMode
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`

            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isDarkMode, mounted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) setActiveSection(id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const renderHome = () => (
    <>
      <section id="about" className="min-h-screen flex items-center justify-center pt-4 sm:pt-8 md:pt-0 md:-mt-24 relative z-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-8">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="aspect-square relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
                <Image
                  {...getOptimizedImageProps("/profile.png", "Sajal Kumar", "profile")}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="mb-4">
                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-mono ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Sajal Kumar
                </h1>
                <p className={`text-sm sm:text-base md:text-xl mt-2 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>
                  Developer in Progress
                </p>
                <p className={`text-xs sm:text-sm md:text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Bengaluru, India
                </p>
              </div>

              <div className="space-y-6">
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base space-y-4`}>
                  <p>👋 Hi there! I’m a final-year Information Science Engineering student who’s passionate about distributed systems, cybersecurity, and, of course, sharing the perfect meme at just the right time..</p>



                  <p>On the lookout for exciting projects & internships. let’s connect! 🚀</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <a
                    href="https://t.me/sajalkmr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' : 'bg-blue-700 hover:bg-blue-600 text-white'} px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Contact Me
                  </a>

                  <a
                    href="mailto:sajalkmr@proton.me"
                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-300 hover:bg-gray-400 text-gray-900'} px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center`}
                  >
                    <Mail className="w-4 h-4" />
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-8 sm:py-10 md:py-12">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Projects</h2>
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {TW_PROJECTS.map((project) => (
                <div key={project.name} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-lg p-4 space-y-3`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-base md:text-lg font-semibold">{project.name}</h3>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200' 
                            : 'hover:bg-gray-300/50 text-gray-600 hover:text-gray-800'
                        }`}
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Link
              href="/projects"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors duration-200 ${isDarkMode
                ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                : 'bg-blue-700/10 text-blue-700 hover:bg-blue-700/20'
                }`}
            >
              <span className="text-sm font-medium">View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>



      <section id="skills" className="py-8 sm:py-10 md:py-12">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Skills</h2>

        <div className="space-y-6">
          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'C/C++', icon: <Code className="w-4 h-4" /> },
                { name: 'Java', icon: <Code className="w-4 h-4" /> },
                { name: 'Python', icon: <Code className="w-4 h-4" /> },
                { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
                { name: 'Go', icon: <Code className="w-4 h-4" /> },
                { name: 'SQL', icon: <Database className="w-4 h-4" /> },
                { name: 'HTML', icon: <Code className="w-4 h-4" /> },
                { name: 'CSS', icon: <Paintbrush className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg min-h-[48px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    } ${isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700'
                    } transition-colors duration-200`}
                >
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Frameworks & Libraries
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'React', icon: <Layout className="w-4 h-4" /> },
                { name: 'Node.js', icon: <Server className="w-4 h-4" /> },
                { name: 'Express.js', icon: <Server className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg min-h-[48px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    } ${isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700'
                    } transition-colors duration-200`}
                >
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Developer Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'Linux/WSL', icon: <Terminal className="w-4 h-4" /> },
                { name: 'Docker', icon: <Box className="w-4 h-4" /> },
                { name: 'Kubernetes', icon: <Box className="w-4 h-4" /> },
                { name: 'Jenkins', icon: <Server className="w-4 h-4" /> },
                { name: 'Git/GitHub', icon: <GitBranch className="w-4 h-4" /> },
                { name: 'Azure', icon: <Cloud className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg min-h-[48px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    } ${isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700'
                    } transition-colors duration-200`}
                >
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Data & Visualization Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'Tableau', icon: <Database className="w-4 h-4" /> },
                { name: 'Power BI', icon: <Database className="w-4 h-4" /> },
                { name: 'Excel', icon: <FileText className="w-4 h-4" /> },
                { name: 'LaTeX', icon: <Code className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg min-h-[48px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    } ${isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700'
                    } transition-colors duration-200`}
                >
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Databases
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'PostgreSQL', icon: <Database className="w-4 h-4" /> },
                { name: 'MongoDB', icon: <Database className="w-4 h-4" /> },
                { name: 'SQLite', icon: <Database className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-3 rounded-lg min-h-[48px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                    } ${isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700'
                    } transition-colors duration-200`}
                >
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="py-8 sm:py-10 md:py-12">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors duration-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <h3 className="font-semibold">{cert.name}</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {cert.issuer}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {cert.date}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block mt-2 text-sm ${isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-blue-700 hover:text-blue-600'
                    }`}
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="analytics" className="py-8 sm:py-10 md:py-12">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Visitor Analytics</h2>
        <div className="space-y-8 sm:space-y-12">
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} p-4 sm:p-6 rounded`}>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Visitor Map</h3>
            <DynamicVisitorMap isDarkMode={isDarkMode} />
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} p-4 sm:p-6 rounded`}>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Visitor Log</h3>
            <VisitorLog
              isDarkMode={isDarkMode}
              onVisitorCountChange={(count) => setTotalVisitors(count)}
            />
          </div>
        </div>
      </section>

      <footer id="contact" className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mt-12 md:mt-16 pt-16`}>
        <div className="mb-12 md:mb-16">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                href: "mailto:sajalkmr@proton.me",
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
                color: isDarkMode ? 'hover:text-yellow-500' : 'hover:text-blue-700'
              },
              {
                href: "https://github.com/sajalkmr",
                icon: <Github className="w-4 h-4" />,
                label: "GitHub",
                color: isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'
              },
              {
                href: "https://linkedin.com/in/sajalkmr",
                icon: <Linkedin className="w-4 h-4" />,
                label: "LinkedIn",
                color: 'hover:text-blue-500'
              },
              {
                href: "https://twitter.com/sajalkmrx",
                icon: <Twitter className="w-4 h-4" />,
                label: "Twitter",
                color: 'hover:text-blue-400'
              },
              {
                href: "https://t.me/sajalkmr",
                icon: <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Telegram logo" className="w-4 h-4">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>,
                label: "Telegram",
                color: 'hover:text-sky-500'
              },
              {
                href: "https://www.discordapp.com/users/785875026007294022",
                icon: <MessageCircle className="w-4 h-4" />,
                label: "Discord",
                color: 'hover:text-indigo-400'
              }
            ].map(({ href, icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-lg min-h-[60px] ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } ${color} transition-all duration-200 hover:scale-[1.02]`}
              >
                <div className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-300/50'
                  } p-2 rounded-lg`}>
                  {icon}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mt-12 md:mt-16 pt-8 md:pt-12 pb-12 md:pb-16`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date().getFullYear()} sajal
              </span>
              <span className={`hidden sm:inline-block ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>•</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                source code{' '}
                <a
                  href="https://github.com/sajalkmr/sajalkmr.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}
                >
                  github.com/sajalkmr
                </a>
              </span>
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              <span>Last updated: 01/08/2025</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )

  return (
    <>
      <div className="fixed inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full hidden md:block" />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode
        ? 'bg-gray-900/90 text-gray-100'
        : 'bg-white/90 text-gray-900'
        } backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-300'
        } transition-colors duration-500 header-pattern ${isDarkMode ? 'dark-pattern' : 'light-pattern'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
            <h1 className="flex-shrink-0 ml-0 sm:ml-8">
              <a
                href="#"
                className={`text-base sm:text-lg md:text-xl font-bold font-mono ${isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-blue-700 hover:text-blue-600'
                  } transition-colors duration-200`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                sajal
              </a>
            </h1>

            <nav className="hidden sm:flex items-center space-x-6 flex-grow justify-center">
              {[
                { name: 'about', path: '#about' },
                { name: 'projects', path: '#projects' },
                { name: 'skills', path: '#skills' },
                { name: 'analytics', path: '#analytics' },
                { name: 'contact', path: '#contact' }
              ].map(({ name, path }) => (
                <a
                  key={name}
                  href={path}
                  className={`text-sm transition-colors ${activeSection === name
                    ? (isDarkMode ? 'text-yellow-500 font-semibold' : 'text-blue-700 font-semibold')
                    : (isDarkMode ? 'text-gray-300 hover:text-yellow-500' : 'text-gray-600 hover:text-blue-700')}`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
            </nav>

            {/* Visitor Counter */}
            <div className="hidden lg:flex">
              <VisitorCounter
                isDarkMode={isDarkMode}
                initialCount={totalVisitors}
              />
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <a
                href="https://drive.google.com/file/d/1Y0hyNXn47Z-zPCFVGqffrQo21YYmIFno/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg transition-colors duration-200 min-h-[44px] ${isDarkMode
                  ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                  : 'bg-blue-700/10 text-blue-700 hover:bg-blue-700/20'
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://drive.google.com/file/d/1Y0hyNXn47Z-zPCFVGqffrQo21YYmIFno/view?usp=sharing', '_blank', 'noopener,noreferrer');
                }}
              >
                <FileText className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">Resume</span>
              </a>

              <button
                onClick={() => toggleTheme()}
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                className={`p-2 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-700" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`sm:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] ${isDarkMode
                  ? 'hover:bg-gray-800/20'
                  : 'hover:bg-gray-200/50'
                  }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className={`sm:hidden py-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-1">
                {[
                  { name: 'about', path: '#about' },
                  { name: 'projects', path: '/projects' },
                  { name: 'skills', path: '#skills' },
                  { name: 'analytics', path: '#analytics' },
                  { name: 'contact', path: '#contact' }
                ].map(({ name, path }) => (
                  <a
                    key={name}
                    href={path}
                    className={`text-base px-4 py-3 rounded-lg min-h-[44px] flex items-center ${activeSection === name
                      ? (isDarkMode ? 'bg-gray-800/60 text-yellow-500' : 'bg-gray-200 text-blue-700')
                      : (isDarkMode ? 'hover:bg-gray-800/50 text-gray-300 hover:text-yellow-500' : 'hover:bg-gray-200/50 text-gray-600 hover:text-blue-700')
                      } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900/80 text-gray-100' : 'bg-gray-100/80 text-gray-900'
        } pt-20 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 font-mono relative transition-colors duration-500`}>
        <div className="relative z-10 max-w-5xl mx-auto">
          {renderHome()}
        </div>
      </div>




    </>
  )
}
