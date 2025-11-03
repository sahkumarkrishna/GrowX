import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ListChecks, PlayCircle, Search, Sparkles, ExternalLink } from "lucide-react";

// --- Data ------------------------------------------------------

const ROADMAP = {
  fundamentals: [
    { 
      title: "HTML Tutorial",
      url: "https://youtu.be/rklidcZ-aLU?si=Xr_OBUs0FrIjkwGD",
      tag: "HTML",
      img: "https://img.youtube.com/vi/rklidcZ-aLU/hqdefault.jpg"
    },
    { 
      title: "CSS Tutorial",
      url: "https://youtu.be/ESnrn1kAD4E?si=mBdiIOu4luKt5ge3",
      tag: "CSS",
      img: "https://img.youtube.com/vi/ESnrn1kAD4E/hqdefault.jpg"
    },
 
  ],
  frontend: [
    {
      title: "React.js Tutorial",
      url: "https://youtu.be/eILUmCJhl64?si=jfEEFZmXe6ay_MI0",
      tag: "React",
      img: "https://img.youtube.com/vi/eILUmCJhl64/hqdefault.jpg"
    },
    {
      title: "Angular Tutorial",
      url: "https://youtu.be/44b90hAMMIo?si=SrPn1jqWYnuSPoO6",
      tag: "Angular",
      img: "https://img.youtube.com/vi/44b90hAMMIo/hqdefault.jpg"
    },
  
    {
      title: "Bootstrap Tutorial",
      url: "https://youtu.be/fB00t4At0rk?si=hVw4ZQsT7tyYXRrU",
      tag: "Bootstrap",
      img: "https://img.youtube.com/vi/fB00t4At0rk/hqdefault.jpg"
    },
    {
      title: "Tailwind CSS Tutorial",
      url: "https://youtu.be/lT5SkATRWGQ?si=6KHKJlOBecCibeka",
      tag: "Tailwind",
      img: "https://img.youtube.com/vi/lT5SkATRWGQ/hqdefault.jpg"
    },
    {
      title: "Material UI Tutorial",
      url: "https://youtu.be/GE9bRdg4NTQ?si=4proBFy0yilZxUCe",
      tag: "Material UI",
      img: "https://img.youtube.com/vi/GE9bRdg4NTQ/hqdefault.jpg"
    },
  ],
  "App Development":[
      {
      title: "React Native Tutorial",
      url: "https://youtu.be/LuNPCSNr-nE?si=WLJ4zHUwJBFjXmqH",
      tag: "React Native",
      img: "https://img.youtube.com/vi/LuNPCSNr-nE/hqdefault.jpg"
    },
    {
      title: "Flutter Tutorial",
      url: "https://youtu.be/1bQwDO88Gyw?si=TGY1g2HCh0N5iwZk",
      tag: "Flutter",
      img: "https://img.youtube.com/vi/1bQwDO88Gyw/hqdefault.jpg"
    },
  ],
  backend: [
    {
      title: "Node.js Tutorial",
      url: "https://youtu.be/gxHXPmePnvo?si=uyRzCfT9FdCk-9SM",
      tag: "Node.js",
      img: "https://img.youtube.com/vi/gxHXPmePnvo/hqdefault.jpg"
    },
    {
      title: "Spring Boot Tutorial",
      url: "https://youtu.be/fmX84zu-5gs?si=Hkch607ITCBp8T6r",
      tag: "Spring Boot",
      img: "https://img.youtube.com/vi/fmX84zu-5gs/hqdefault.jpg"
    },
    {
      title: "Django Tutorial",
      url: "https://youtu.be/6tdfhlIoxOw?si=5dLF5K9BSHbBxMKQ",
      tag: "Django",
      img: "https://img.youtube.com/vi/6tdfhlIoxOw/hqdefault.jpg"
    },
  ],
  databases: [
    {
      title: "MongoDB Tutorial",
      url: "https://youtu.be/tww-gbNPOcA?si=xDO8hIaJPNlCDdwW",
      tag: "MongoDB",
      img: "https://img.youtube.com/vi/tww-gbNPOcA/hqdefault.jpg"
    },
    {
      title: "Firebase Tutorial",
      url: "https://youtu.be/SOoGd4Ult1o?si=oPe63bqXuMu-3CS8",
      tag: "Firebase",
      img: "https://img.youtube.com/vi/SOoGd4Ult1o/hqdefault.jpg"
    },
    {
      title: "MySQL Tutorial",
      url: "https://youtu.be/hlGoQC332VM?si=SrR8GqjvtAky6R-N",
      tag: "MySQL",
      img: "https://img.youtube.com/vi/hlGoQC332VM/hqdefault.jpg"
    },
  ],
  languages: [
    {
      title: "C Tutorial",
      url: "https://youtu.be/irqbmMNs2Bo?si=8MHDIc-9Gk5SFaag",
      tag: "C",
      img: "https://img.youtube.com/vi/irqbmMNs2Bo/hqdefault.jpg"
    },
    {
      title: "C++ Tutorial",
      url: "https://youtu.be/e7sAf4SbS_g?si=DVPuDUfi0NFmPgrO",
      tag: "C++",
      img: "https://img.youtube.com/vi/e7sAf4SbS_g/hqdefault.jpg"
    },
    {
      title: "Java Tutorial",
      url: "https://youtu.be/yRpLlJmRo2w?si=0XXiQdf8f1J7bxEG",
      tag: "Java",
      img: "https://img.youtube.com/vi/yRpLlJmRo2w/hqdefault.jpg"
    },
    {
      title: "Python Tutorial",
      url: "https://youtu.be/ERCMXc8x7mc?si=5T7ucEakAqvTbKpX",
      tag: "Python",
      img: "https://img.youtube.com/vi/ERCMXc8x7mc/hqdefault.jpg"
    },
       { 
      title: "JavaScript Tutorial",
      url: "https://youtu.be/cpoXLj24BDY?si=-I2sGZasbJjC6bqs",
      tag: "JavaScript",
      img: "https://img.youtube.com/vi/cpoXLj24BDY/hqdefault.jpg"
    },
    { 
      title: "TypeScript Tutorial",
      url: "https://youtu.be/oTam-6tHew4?si=NWy5MO4e4uK_vAq6",
      tag: "TypeScript",
      img: "https://img.youtube.com/vi/oTam-6tHew4/hqdefault.jpg"
    },
  ],
  tools: [
    {
      title: "GitHub Tutorial",
      url: "https://youtu.be/Ez8F0nW6S-w?si=pw_-sgNZGPxaRDRH",
      tag: "GitHub",
      img: "https://img.youtube.com/vi/Ez8F0nW6S-w/hqdefault.jpg"
    },
    {
      title: "Docker Tutorial",
      url: "https://youtu.be/exmSJpJvIPs?si=gML_V7z7d9PbV-pv",
      tag: "Docker",
      img: "https://img.youtube.com/vi/exmSJpJvIPs/hqdefault.jpg"
    },
  ],
  projects: [
    {
      title: "MERN Stack Project",
      url: "https://youtu.be/JMvWrx_rLw4?si=_dF_q0SIRi63O8nj",
      tag: "MERN",
      img: "https://img.youtube.com/vi/JMvWrx_rLw4/hqdefault.jpg"
    },
    {
      title: "Spring Boot + Java Project",
      url: "https://youtu.be/7SBcUjgZRoY?si=WMj2UIjf7n2FSRVo",
      tag: "Spring Boot",
      img: "https://img.youtube.com/vi/7SBcUjgZRoY/hqdefault.jpg"
    },
    {
      title: "Django Project",
      url: "https://youtu.be/5n8FKv19os0?si=Rn7Eqgx4FF0qsBDo",
      tag: "Django",
      img: "https://img.youtube.com/vi/5n8FKv19os0/hqdefault.jpg"
    },
  ],
};

const TAB_META = {
  fundamentals: { label: "Fundamentals", emoji: "🌐", hint: "Start here" },
  frontend: { label: "Frontend", emoji: "⚛️", hint: "UI frameworks & styling" },
  "App Development": { label: "App Development", emoji: "📱" },
  backend: { label: "Backend", emoji: "⚙️", hint: "APIs & Servers" },
  databases: { label: "Databases", emoji: "🗄️", hint: "Data layer" },
  languages: { label: "Languages", emoji: "💻" },
  tools: { label: "Tools & DevOps", emoji: "🛠️" },
  projects: { label: "Projects", emoji: "🚀", hint: "Build & deploy" },
};

// --- Helpers ---------------------------------------------------
const STORAGE_KEY = "study-roadmap-progress:v1";

function useProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { }
  }, [progress]);

  const toggle = (url) => setProgress((p) => ({ ...p, [url]: !p[url] }));
  const reset = () => setProgress({});

  const stats = useMemo(() => {
    const all = Object.values(ROADMAP).flat();
    const done = all.filter((i) => progress[i.url]).length;
    return {
      done,
      total: all.length,
      pct: all.length ? Math.round((100 * done) / all.length) : 0,
    };
  }, [progress]);

  return { progress, toggle, reset, stats };
}

// --- UI --------------------------------------------------------

export default function StudyRoadmap() {
  const [query, setQuery] = useState("");
  const { progress, toggle, reset, stats } = useProgress();

  return (
    <div className="min-h-screen w-full  via-muted/40 to-transparent py-10 mt-5">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Sparkles className="h-7 w-7" />
              Study Roadmap
            </h1>
            <p className="text-gray-600 text-sm mt-4 mb-4">
              Curated YouTube playlist for Web, Mobile, and Backend. Track your learning progress.
            </p>

            <div className="max-w-md flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topic, tag, or URL…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Progress Summary */}
          <Card className="w-full md:w-[380px] shadow-md border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ListChecks className="h-4 w-4" /> Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">{stats.done} / {stats.total}</span>
              </div>
              <Progress value={stats.pct} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{stats.pct}%</span>
                <Button variant="ghost" size="sm" onClick={reset} className="h-7 px-2">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-6" />

        {/* Tabs */}
        <Tabs defaultValue="fundamentals" className="w-full">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide justify-start md:justify-center gap-2 rounded-xl p-2 bg-muted/40">
            {Object.entries(TAB_META).map(([key, meta]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm rounded-lg transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span>{meta.emoji}</span>
                {meta.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(ROADMAP).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <CategoryGrid
                items={items.filter((i) =>
                  [i.title, i.tag].join(" ").toLowerCase().includes(query.toLowerCase())
                )}
                progress={progress}
                onToggle={toggle}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function CategoryGrid({ items, progress, onToggle }) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          No results. Try a different search.
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[560px] rounded-2xl border bg-card/40 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.url}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.02 * idx }}
          >
            <Card className={cn("h-full transition-shadow hover:shadow-lg", progress[item.url] && "border-primary/60 shadow-primary/30")}>
              
              {/* Thumbnail */}
              {item.img && (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              )}

              <CardHeader className="pb-3 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base leading-6 font-semibold">{item.title}</CardTitle>
                    {item.tag && <Badge variant="secondary" className="rounded-full mt-2">{item.tag}</Badge>}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button asChild variant="outline" size="icon" className="shrink-0">
                          <a href={item.url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Open on YouTube</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <PlayCircle className="h-4 w-4" />
                  <span>Video lesson • YouTube</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`check-${idx}`}
                      checked={!!progress[item.url]}
                      onCheckedChange={() => onToggle(item.url)}
                    />
                    <label htmlFor={`check-${idx}`} className="text-sm">
                      Mark as done
                    </label>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    variant={progress[item.url] ? "secondary" : "default"}
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                      <PlayCircle className="h-5 w-5" /> Watch
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}
