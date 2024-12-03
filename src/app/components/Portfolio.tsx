'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import {
  Code, Mail, Github, Hourglass, Zap, Brain, Atom,
  Linkedin, Twitter, MessageCircle, Send,
  Sun, Moon, Layout, Server, Paintbrush,
  Database, GitBranch, Box, Cloud,
  Terminal, Code2, FileText, ArrowRight
} from 'lucide-react'
import { VisitorLog } from './VisitorLog'
import { VisitorMap } from './VisitorMap'
import Link from 'next/link'
import Image from "next/legacy/image"

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

  const skills = [
    { category: 'Languages', icon: Code, items: ['C/C++', 'Java', 'Go', 'Python', 'PowerShell', 'Bash', 'JavaScript', 'HTML/CSS', 'SQL', 'LATEX'] },
    { category: 'Frameworks & Libraries', icon: Zap, items: ['React', 'Node.js', 'Express'] },
    { category: 'Developer Tools', icon: Brain, items: ['Unix', 'Linux/WSL', 'Windows', 'Docker', 'Kubernetes', 'Terraform', 'Git/GitHub', 'Firebase', 'Jenkins', 'Postman'] },
    { category: 'Core Skills', icon: Atom, items: ['Data Structures', 'Algorithms', 'Distributed Systems', 'Operating Systems', 'Computer Networks'] }
  ]

  const certifications = [
    {
      name: 'AWS Cloud Practitioner Essentials',
      logo: 'https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png',
      issuer: 'Coursera',
      date: '2024',
      link: 'https://www.credly.com/'
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

  const twProjects = [
    {
      name: 'ordo',
      description: 'A distributed container orchestration system built with Go, featuring custom PVM scheduler and RESTful APIs for cluster management.',
      tech: ['Go', 'Docker SDK', 'BoltDB']
    },
    {
      name: 'raftly',
      description: 'Implementation of Raft Consensus Algorithm in Java with monitoring using Prometheus and Grafana.',
      tech: ['Java', 'Maven', 'Prometheus', 'Grafana']
    }
  ];

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

    const animate = () => {
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

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isDarkMode, mounted])

  const renderHome = () => (
    <>
      <section id="about" className="min-h-screen flex items-center justify-center pt-0.1 md:pt-0 md:-mt-24 relative z-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3 md:gap-8">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start -mt-40 md:mt-0">
              <div className="aspect-square relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/profile.png"
                  alt="Sajal Kumar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left mt-2 sm:mt-4 md:mt-0">
              <div className="mb-1">
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-mono ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Sajal Kumar
                </h1>
                <p className={`text-base md:text-xl mt-1 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>
                  Developer in Progress
                  <br />
                  <br />
                </p>
                <p className={`text-xs md:text-base mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Bengaluru, India
                </p>
              </div>

              <div className="space-y-6">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm md:text-base space-y-4`}>
                  <p>👋 Hi there! I’m a third-year Information Science Engineering student who’s passionate about distributed systems, cybersecurity, and, of course, sharing the perfect meme at just the right time..</p>

                  <p></p>

                  <p>On the lookout for exciting projects & internships. let’s connect! 🚀</p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href="https://t.me/sajalkmr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' : 'bg-blue-700 hover:bg-blue-600 text-white'} px-4 py-1 rounded-md text-sm transition-colors duration-200 flex items-center gap-2`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-12 md:py-8">
        <h2 className={`text-lg md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Projects</h2>
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {twProjects.map((project) => (
                <div key={project.name} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-lg p-4 space-y-3`}>
                  <h3 className="text-base md:text-lg font-semibold">{project.name}</h3>
                  <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
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

      <section id="experience" className="py-12 md:py-8">
        <h2 className={`text-lg md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Experience</h2>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
            <div className="flex items-center space-x-2">
              <Hourglass className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`} />
              <span className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>
                May 2024 - Present
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                <span className="font-semibold">Student Developer</span>
                <span className="text-gray-400">•</span>
                <span>CMR Institute of Technology</span>
              </div>
              <ul className={`list-disc list-inside text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                <li>Developed STRbook to digitize student transformation records, reducing manual data entry by 80%</li>
                <li>Implemented JWT authentication system ensuring secure access for students and teachers</li>
                <li>Designed RESTful APIs for CRUD operations and integrated PostgreSQL database</li>
                <li>Automated CI/CD pipelines using Jenkins for smooth deployment</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
            <div className="flex items-center space-x-2">
              <Hourglass className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`} />
              <span className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>
                Aug 2023 - Nov 2024
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                <span className="font-semibold">Core Technical Team</span>
                <span className="text-gray-400">•</span>
                <span>Google Developer Student Club</span>
              </div>
              <ul className={`list-disc list-inside text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                <li>Contributed to club website development using React, Golang, and Firebase</li>
                <li>Improved uptime and reliability of web services in club's technical projects</li>
                <li>Conducted technical events on Golang and Web Security</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-12 md:py-8">
        <h2 className={`text-lg md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Skills</h2>

        <div className="space-y-6">
          <div>
            <h3 className={`text-base md:text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'C/C++', icon: <Code className="w-4 h-4" /> },
                { name: 'Java', icon: <Code className="w-4 h-4" /> },
                { name: 'Go', icon: <Code className="w-4 h-4" /> },
                { name: 'Python', icon: <Code className="w-4 h-4" /> },
                { name: 'PowerShell', icon: <Terminal className="w-4 h-4" /> },
                { name: 'Bash', icon: <Terminal className="w-4 h-4" /> },
                { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
                { name: 'HTML/CSS', icon: <Code className="w-4 h-4" /> },
                { name: 'SQL', icon: <Database className="w-4 h-4" /> },
                { name: 'LATEX', icon: <Code className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
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
                { name: 'Express', icon: <Server className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
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
              Developer Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'Unix', icon: <Terminal className="w-4 h-4" /> },
                { name: 'Linux/WSL', icon: <Terminal className="w-4 h-4" /> },
                { name: 'Windows', icon: <Layout className="w-4 h-4" /> },
                { name: 'Docker', icon: <Box className="w-4 h-4" /> },
                { name: 'Kubernetes', icon: <Box className="w-4 h-4" /> },
                { name: 'Terraform', icon: <Cloud className="w-4 h-4" /> },
                { name: 'Git/GitHub', icon: <GitBranch className="w-4 h-4" /> },
                { name: 'Firebase', icon: <Database className="w-4 h-4" /> },
                { name: 'Jenkins', icon: <Server className="w-4 h-4" /> },
                { name: 'Postman', icon: <Send className="w-4 h-4" /> }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
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

      <section id="certifications" className="py-12 md:py-8">
        <h2 className={`text-lg md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors duration-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
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

      <section id="analytics" className="py-12 md:py-8">
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Visitor Analytics</h2>
        <div className="space-y-8 sm:space-y-12">
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} p-4 sm:p-6 rounded`}>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Visitor Map</h3>
            <VisitorMap isDarkMode={isDarkMode} />
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} p-4 sm:p-6 rounded`}>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Visitor Log</h3>
            <VisitorLog isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      <footer id="contact" className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mt-12 md:mt-16 pt-16`}>
        <div className="mb-12 md:mb-16">
          <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-blue-700'}`}>Contact</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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
                className={`flex items-center gap-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } ${color} transition-all duration-200 hover:scale-[1.02]`}
              >
                <div className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-300/50'
                  } p-1.5 rounded-lg`}>
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
                {new Date().getFullYear()} sajal kumar
              </span>
              <span className={`hidden sm:inline-block ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
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
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>Last updated: 04/12/2024</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )

  return (
    <>
      <div className="fixed inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode
        ? 'bg-gray-900/90 text-gray-100'
        : 'bg-white/90 text-gray-900'
        } backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-300'
        } transition-colors duration-500 header-pattern ${isDarkMode ? 'dark-pattern' : 'light-pattern'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <h1 className="flex-shrink-0 ml-8">
              <a
                href="#"
                className={`text-sm sm:text-lg md:text-xl font-bold font-mono ${isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-blue-700 hover:text-blue-600'
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
                { name: 'experience', path: '#experience' },
                { name: 'skills', path: '#skills' },
                { name: 'analytics', path: '#analytics' },
                { name: 'contact', path: '#contact' }
              ].map(({ name, path }) => (
                <a
                  key={name}
                  href={path}
                  className={`text-sm ${isDarkMode
                    ? 'text-gray-300 hover:text-yellow-500'
                    : 'text-gray-600 hover:text-blue-700'
                    } transition-colors`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <a
                href="/sajal_resume.pdf#view=FitPage"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors duration-200 ${isDarkMode
                  ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                  : 'bg-blue-700/10 text-blue-700 hover:bg-blue-700/20'
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/sajal_resume.pdf#view=FitPage', '_blank', 'noopener,noreferrer');
                }}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Resume</span>
              </a>

              <button
                onClick={() => toggleTheme()}
                className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
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
                className={`sm:hidden p-2 rounded-lg ${isDarkMode
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
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'about', path: '#about' },
                  { name: 'projects', path: '/projects' },
                  { name: 'experience', path: '#experience' },
                  { name: 'skills', path: '#skills' },
                  { name: 'analytics', path: '#analytics' },
                  { name: 'contact', path: '#contact' }
                ].map(({ name, path }) => (
                  <a
                    key={name}
                    href={path}
                    className={`text-sm px-3 py-2 rounded-lg ${isDarkMode
                      ? 'hover:bg-gray-800/50 text-gray-300 hover:text-yellow-500'
                      : 'hover:bg-gray-200/50 text-gray-600 hover:text-blue-700'
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
        } pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 font-mono relative transition-colors duration-500`}>
        <div className="relative z-10 max-w-5xl mx-auto">
          {renderHome()}
        </div>
      </div>
    </>
  )
}