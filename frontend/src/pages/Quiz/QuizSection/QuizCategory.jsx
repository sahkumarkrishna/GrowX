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

const QUIZ_ROADMAP = {
    fundamentals: [
        {
            title: "HTML Quiz",
            url: "htmlQuiz",
            tag: "HTML",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s"
        },
        {
            title: "CSS Quiz",
            url: "cssQuiz",
            tag: "CSS",
            img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
        },
    ],
    frontend: [
        {
            title: "React.js Quiz",
            url: "https://youtu.be/eILUmCJhl64?si=jfEEFZmXe6ay_MI0",
            tag: "React",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        },
        {
            title: "Angular Quiz",
            url: "angularQuiz",
            tag: "Angular",
            img: "https://angular.dev/assets/images/ng-image.jpg"
        },
        {
            title: "Bootstrap Quiz",
            url: "bootstrapQuiz",
            tag: "Bootstrap",
            img: "https://getbootstrap.com/docs/5.3/assets/img/bootstrap-icons.png"
        },
        {
            title: "Tailwind CSS Quiz",
            url: "tailwindQuiz",
            tag: "Tailwind",
            img: "https://cdnblog.webkul.com/blog/wp-content/uploads/2024/05/tailwindcss-1633184775.webp"
        },
        {
            title: "Material UI Quiz",
            url: "materialUIQuiz",
            tag: "Material UI",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7sZB3eX_sc0Z3qY2o87uBT7EwPwtbCiZ6w&s"
        },
    ],
    "App Development": [
        {
            title: "React Native Quiz",
            url: "reactNativeQuiz",
            tag: "React Native",
            img: "https://www.okoone.com/wp-content/uploads/2024/06/React-native-2-logo.png"
        },
        {
            title: "Flutter Quiz",
            url: "flutterQuiz",
            tag: "Flutter",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"
        },
    ],
    backend: [
        {
            title: "Node.js Quiz",
            url: "nodejsQuiz",
            tag: "Node.js",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2JEBlTE9UUk_6dL6oWeY4qYp7cexriJ5AcA&s"
        },
        {
            title: "Spring Boot Quiz",
            url: "springBootQuiz",
            tag: "Spring Boot",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNou7-DlVcN5nOVq73_RDi6OAYZAzOknfzQw&s"
        },
        {
            title: "Django Quiz",
            url: "djangoQuiz",
            tag: "Django",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg"
        },
    ],
    databases: [
        {
            title: "MongoDB Quiz",
            url: "mongodbQuiz",
            tag: "MongoDB",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWh_qaH98Lx2Qdy0hXfk8HusBO0zlJRNldQ&s"
        },
        {
            title: "Firebase Quiz",
            url: "firebaseQuiz",
            tag: "Firebase",
            img: "https://i.ytimg.com/vi/rAcWLPQIL38/maxresdefault.jpg"
        },
        {
            title: "MySQL Quiz",
            url: "mySqlQuiz",
            tag: "MySQL",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc5niSKZpZhcw5Cxk4e5k_-_TNIeaRfu2fgw&s"
        },
    ],
    languages: [
        {
            title: "C Quiz",
            url: "cQuiz",
            tag: "C",
            img: "https://img-c.udemycdn.com/course/480x270/700012_a499_9.jpg"
        },
        {
            title: "C++ Quiz",
            url: "cppQuiz",
            tag: "C++",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg"
        },
        {
            title: "Java Quiz",
            url: "javaQuiz",
            tag: "Java",
            img: "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png"
        },
        {
            title: "Python Quiz",
            url: "pythonQuiz",
            tag: "Python",
            img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
        },
        {
            title: "JavaScript Quiz",
            url: "javaScriptQuiz",
            tag: "JavaScript",
            img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
        },
        {
            title: "TypeScript Quiz",
            url: "typeScriptQuiz",
            tag: "TypeScript",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9kdHGSDSbnY369AAZvAfFkcxqT80oKtY0A&s"
        },
    ],
    tools: [
        {
            title: "GitHub Quiz",
            url: "gitHubQuiz",
            tag: "GitHub",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fTvBqEpyLmHNzZVx0YlKR5wOxFoLRAtZxA&s"
        },
        {
            title: "Docker Quiz",
            url: "dockerQuiz",
            tag: "Docker",
            img: "https://bunnyacademy.b-cdn.net/what-is-docker.png"
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

};

// --- Helpers ---------------------------------------------------
// --- Progress Hook --------------------------------------------------------
const STORAGE_KEY = "quiz-roadmap-progress:v1";

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
        const all = Object.values(QUIZ_ROADMAP).flat();
        const done = all.filter((i) => progress[i.url]).length;
        return { done, total: all.length, pct: all.length ? Math.round((100 * done) / all.length) : 0 };
    }, [progress]);

    return { progress, toggle, reset, stats };
}

// --- Quiz Dashboard Component ---------------------------------------------
export default function QuizDashboard() {
    const [query, setQuery] = useState("");
    const { progress, toggle, reset, stats } = useProgress();

    return (
        <div className="min-h-screen w-full ia-muted/40 to-transparent py-10 ">
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
                            <Sparkles className="h-7 w-7" /> Quiz Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm mt-4 mb-4">
                            Curated quizzes to test your skills. Track your quiz progress.
                        </p>
                        <div className="max-w-md flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search quiz, tag, or URL…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Progress Summary */}
                    <Card className="w-full md:w-[380px] shadow-md border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <ListChecks className="h-4 w-4" /> Quiz Progress
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

                    {Object.entries(QUIZ_ROADMAP).map(([key, items]) => (
                        <TabsContent key={key} value={key} className="mt-6">
                            <CategoryGrid items={items.filter((i) =>
                                [i.title, i.tag].join(" ").toLowerCase().includes(query.toLowerCase())
                            )} progress={progress} onToggle={toggle} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

// --- Category Grid --------------------------------------------------------
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
                            {item.img && (
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto my-3 rounded-lg shadow-sm"
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
                                            <TooltipContent>Open Quiz</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <PlayCircle className="h-4 w-4" />
                                    <span>Quiz • MCQs</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id={`check-${idx}`} checked={!!progress[item.url]} onCheckedChange={() => onToggle(item.url)} />
                                        <label htmlFor={`check-${idx}`} className="text-sm">Mark as completed</label>
                                    </div>
                                    <Button asChild size="sm" variant={progress[item.url] ? "secondary" : "default"}>
                                        <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                                            <PlayCircle className="h-5 w-5" /> Start Quiz
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
