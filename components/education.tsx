"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar } from "lucide-react"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const educationItems = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Mumbai University",
      year: "2021 - 2024",
      description: "Graduated with honors, focusing on software development and database management systems.",
    },
    {
      degree: "SAP ABAP Certification",
      institution: "SAP Education",
      year: "2024",
      description: "Professional certification in ABAP programming and SAP module development.",
    },
    {
      degree: "Advanced SAP Development",
      institution: "Enterprise Solutions Academy",
      year: "2024",
      description: "Specialized training in advanced SAP development techniques and best practices.",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 md:px-6 max-w-6xl mx-auto bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Education</h2>
          <p className="mt-2 text-muted-foreground">My academic background and professional certifications</p>
        </div>

        <div className="space-y-8">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
            >
              <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <GraduationCap size={14} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.degree}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{item.institution}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.year}
                  </span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

