import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { siteBlogPosts } from "@/data/site-blog-content";
import { BlogPostCard } from "@/components/blog-post-card";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryTabs = [
  { value: "all", label: "Все статьи" },
  { value: "equipment", label: "Оборудование" },
  { value: "news", label: "Новости" },
  { value: "promotions", label: "Акции" },
  { value: "law", label: "Безопасность и закон" },
] as const;

const postsByCategory = {
  all: siteBlogPosts,
  equipment: siteBlogPosts.filter((post) => post.category === "Оборудование"),
  news: siteBlogPosts.filter((post) => post.category === "Новости"),
  promotions: siteBlogPosts.filter((post) => post.category === "Акции"),
  law: siteBlogPosts.filter((post) => post.category === "Безопасность и закон"),
};

export function SiteBlogPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Блог</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Новости, полезные статьи и материалы Аванта Телеком
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
              Здесь собраны новые публикации, популярные материалы и заметки про интернет, телевидение и
              смарт-сервисы компании.
            </p>
            <a
              href="https://avanta-telecom.ru/blog/"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Открыть архив
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Категории"
              title="Статьи по темам"
              description="Откройте публикации по оборудованию, новостям, акциям и вопросам безопасности."
            />
          </Reveal>

          <Tabs defaultValue="all" className="mt-8">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-3 rounded-[28px] bg-white/90 p-3 shadow-panel">
              {categoryTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categoryTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {postsByCategory[tab.value].map((post, index) => (
                    <Reveal key={post.slug} delay={index * 0.04}>
                      <BlogPostCard post={post} compact />
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </motion.div>
  );
}

