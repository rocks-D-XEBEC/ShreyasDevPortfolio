"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Code, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LogoAnimation from "./logo-animation"
import ClientWrapper from "./client-wrapper"

export default function Hero() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after logo animation
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Logo Animation - wrapped in ClientWrapper to avoid hydration issues */}
      <ClientWrapper>
        <LogoAnimation />
      </ClientWrapper>

      {/* Content that appears after animation */}
      <motion.div
        className="z-10 px-4 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center md:text-left max-w-xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
            initial={{ y: 20 }}
            animate={{ y: showContent ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Shreyas Arun Lakade
          </motion.h1>
          <motion.h2
            className="mt-4 text-xl md:text-2xl text-muted-foreground"
            initial={{ y: 20 }}
            animate={{ y: showContent ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SAP Developer | ABAP Specialist
          </motion.h2>
          <motion.p
            className="mt-6 text-muted-foreground max-w-md mx-auto md:mx-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showContent ? 0 : 20, opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transforming business processes through innovative SAP solutions and efficient ABAP development.
            Specializing in custom module development and system integration.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showContent ? 0 : 20, opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              About Me
              <ArrowDown size={16} />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              View Projects
              <Code size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showContent ? 0 : 20, opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1 text-primary">
                <Briefcase size={16} />
                <span className="font-bold">1+</span>
              </div>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1 text-primary">
                <Code size={16} />
                <span className="font-bold">10+</span>
              </div>
              <p className="text-xs text-muted-foreground">Projects Completed</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1 text-primary">
                <GraduationCap size={16} />
                <span className="font-bold">3+</span>
              </div>
              <p className="text-xs text-muted-foreground">Certifications</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showContent ? 1 : 0.8, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20">
            <Image
              src="/shreyas1.jpg"
              alt="Shreyas Arun Lakade"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"></div>
        </motion.div>
      </motion.div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background to-background z-0"></div>

      {/* Static particles in background - client-side only to avoid hydration issues */}
      <ClientWrapper>
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 20 }).map((_, i) => {
            // Use deterministic positions based on index instead of random
            const xPos = `${(i * 5) % 100}%`
            const yPos = `${(i * 7) % 100}%`
            const opacity = 0.3 + (i % 5) * 0.1

            return (
              <div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-primary/30"
                style={{
                  left: xPos,
                  top: yPos,
                  opacity: opacity,
                }}
              />
            )
          })}
        </div>
      </ClientWrapper>
    </section>
  )
}

