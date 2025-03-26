"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Award, Calendar } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experienceItems = [
    /*
    {
      position: "Senior SAP ABAP Developer",
      company: "Enterprise Solutions Inc.",
      period: "2021 - Present",
      description:
        "Leading ABAP development for key clients, implementing custom solutions and optimizing existing systems.",
    },*/
    {
      position: "SAP ABAP Developer",
      company: "TechKN Consulting Services ltd.",
      period: "Sep 2024 - Present",
      description: "Developed and maintained ABAP programs, reports, and interfaces for SAP ERP systems.",
    },
    {
      position: "Trainee Developer",
      company: "TechKN Consulting Services ltd.",
      period: "Jul 2024 - Sep 2024",
      description: "Started career with internship and junior role focusing on basic programming and system support.",
    },
  ]

  const achievements = [
    {
      title: "SAP Innovation Award",
      year: "2022",
      description: "Recognized for developing an innovative solution that improved client's business processes by 40%.",
    },
    {
      title: "Best Performance Award",
      year: "2021",
      description: "Awarded for exceptional performance and dedication to project delivery.",
    },
    {
      title: "Certification Excellence",
      year: "2020",
      description: "Achieved top scores in SAP ABAP certification program.",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="space-y-16"
      >
        {/* Work Experience */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Work Experience</h2>
            <p className="mt-2 text-muted-foreground">My professional journey</p>
          </div>

          <div className="space-y-8">
            {experienceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <Briefcase size={14} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{item.position}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{item.company}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Achievements</h2>
            <p className="mt-2 text-muted-foreground">Recognition and accomplishments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-muted/30 p-6 rounded-xl hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-full bg-primary/10">
                    <Award size={20} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.year}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

