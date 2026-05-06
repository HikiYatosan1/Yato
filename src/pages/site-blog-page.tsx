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
        <section className="relative overflow-hidden rounded-[38px] border border-avanta-green/12 bg-[linear-gradient(135deg,#f8fcfa_0%,#eef6f2_52%,#e7f0ec_100%)] px-6 py-8 shadow-float sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(24,58,99,0.1),transparent_42%)]" />
          <Reveal>
            <div className="relative z-10 max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-avanta-emerald">Блог</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                Новости, полезные статьи и материалы Аванта Телеком
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-lg">
                Здесь собраны новые публикации, популярные материалы и заметки про интернет, телевидение и
                смарт-сервисы компании.
              </p>
              <a
                href="https://avanta-telecom.ru/blog/"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-avanta-emerald transition hover:text-avanta-navy"
              >
                Открыть архив
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
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
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-[28px] border-avanta-navy/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(238,245,241,0.93))] p-[6px] shadow-panel">
              {categoryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative rounded-[16px] px-6 py-3 text-base font-semibold text-avanta-graphite/85 transition-all duration-300 hover:bg-white hover:text-avanta-navy data-[state=active]:bg-white data-[state=active]:text-avanta-navy data-[state=active]:shadow-[inset_0_0_0_1px_rgba(23,81,131,0.18),0_10px_26px_-22px_rgba(23,81,131,0.4)] after:absolute after:bottom-[6px] after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-avanta-green after:transition-all after:duration-300 hover:after:w-[46%] data-[state=active]:after:w-[58%]"
                >
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
