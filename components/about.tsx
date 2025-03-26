"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 items-center"
      >
        <div className="relative aspect-square max-w-sm mx-auto md:mx-0 overflow-hidden rounded-xl">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Shreyas Arun Lakade"
            width={400}
            height={400}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-muted-foreground">
            I am Shreyas Arun Lakade, a passionate SAP Developer specializing in ABAP module. With a strong foundation
            in enterprise software development, I create efficient and scalable solutions that drive business value.
          </p>
          <p className="text-muted-foreground">
            My expertise includes ABAP programming, SAP modules customization, and integration with various enterprise
            systems. I am dedicated to delivering high-quality code and continuously expanding my technical knowledge.
          </p>
          <div className="pt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">SAP</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">ABAP</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">ERP</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">S/4HANA</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">SAPUI5</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

