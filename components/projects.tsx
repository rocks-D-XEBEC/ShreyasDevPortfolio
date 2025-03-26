"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code, ExternalLink, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "SAP ERP Optimization",
      description:
        "Optimized SAP ERP system for a manufacturing client, resulting in 30% faster processing times and improved user experience.",
      image: "/saperpopt.jpg?height=400&width=600",
      tags: ["SAP", "ABAP", "Performance Optimization"],
      link: "#",
    },
    {
      title: "Custom ABAP Reporting Tool",
      description:
        "Developed a custom reporting solution that automated data extraction and visualization, saving 20+ hours of manual work weekly.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["ABAP", "Reporting", "Data Visualization"],
      link: "#",
    },
    {
      title: "SAP Integration Framework",
      description:
        "Built an integration framework connecting SAP with third-party systems, enabling seamless data flow and business process automation.",
      image: "/sap-logo.jpg?height=400&width=600",
      tags: ["Integration", "API", "Middleware"],
      link: "#",
    },
    {
      title: "SAPUI5 Dashboard",
      description:
        "Created an interactive dashboard using SAPUI5 to provide real-time insights into business operations and KPIs.",
      image: "/ui5.jpg?height=400&width=600",
      tags: ["SAPUI5", "Frontend", "Dashboard"],
      link: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 md:px-6 max-w-6xl mx-auto bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="mt-2 text-muted-foreground">Showcasing my work and contributions</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeProject === index
                    ? "bg-primary/10 border-l-4 border-primary"
                    : "hover:bg-muted border-l-4 border-transparent"
                }`}
                onClick={() => setActiveProject(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{project.title}</h3>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 ${activeProject === index ? "rotate-90 text-primary" : ""}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Image
              src={projects[activeProject].image || "/placeholder.svg"}
              alt={projects[activeProject].title}
              width={600}
              height={400}
              className="object-cover w-full aspect-video rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold">{projects[activeProject].title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{projects[activeProject].description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {projects[activeProject].tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-background/80 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={projects[activeProject].link}
                className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
              >
                View Project <ExternalLink size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Code size={18} />
            Interested in working together?
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

