import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">About Us</Badge>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
          >
            Empowering Learners Everywhere
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            We believe education should be accessible, engaging, and practical. 
            Our mission is to provide project-based learning experiences that 
            help learners build real-world skills and succeed in their careers.
          </motion.p>
        </div>

        {/* Values Section */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Hands-On Learning", desc: "Every course is designed around real-world projects so you learn by building." },
            { title: "Expert Mentorship", desc: "Guidance from industry professionals ensures you’re always on the right path." },
            { title: "Career Growth", desc: "Build a portfolio and skills that employers are actively looking for." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="shadow-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
