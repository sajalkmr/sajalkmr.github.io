import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'leaflet/dist/leaflet.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "sajal",
  description: "personal portfolio",
  icons: {
    icon: '/favicon.ico'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "sajal | Portfolio",
    description: "Personal portfolio showcasing projects, skills, and experience of Sajal Kumar.",
    url: "https://sajalkmr.github.io/",
    siteName: "sajal | Portfolio",
    images: [
      {
        url: "https://sajalkmr.github.io/profile.png",
        width: 512,
        height: 512,
        alt: "Sajal Kumar profile picture"
      },
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "sajal | Portfolio",
    description: "Personal portfolio showcasing projects, skills, and experience of Sajal Kumar.",
    images: ["https://sajalkmr.github.io/profile.png"],
  },
  alternates: {
    canonical: "https://sajalkmr.github.io/"
  }
};

// Add structured data (JSON-LD)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sajal Kumar",
  "url": "https://sajalkmr.github.io/",
  "image": "https://sajalkmr.github.io/profile.png",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://github.com/sajalkmr",
    "https://www.linkedin.com/in/sajalkmr"
  ],
  "knowsAbout": ["Web Development", "React", "Next.js", "Python"]
};

const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Portfolio Website",
  "description": "Personal website built with Next.js featuring interactive visitor analytics and global map.",
  "url": "https://sajalkmr.github.io/",
  "creator": {
    "@type": "Person",
    "name": "Sajal Kumar"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-init-inline"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var persisted = localStorage.getItem('theme');
                  var hasPersistedPreference = typeof persisted === 'string';
                  var theme = 'dark';
                  if (hasPersistedPreference) {
                    theme = persisted;
                  } else {
                    var mql = window.matchMedia('(prefers-color-scheme: dark)');
                    theme = mql.matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                  document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}