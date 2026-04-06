import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { siteBlogArticles, siteBlogPosts } from "@/data/site-blog-content";
import { BlogPostCard } from "@/components/blog-post-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

type ArticleLoadState = "idle" | "loading" | "success" | "error";

export function SiteBlogArticlePage() {
  const { slug } = useParams();
  const { to } = useSiteMode();
  const article = siteBlogArticles.find((item) => item.slug === slug);
  const relatedPosts = siteBlogPosts.filter((post) => post.slug !== slug).slice(0, 3);
  const [contentHtml, setContentHtml] = useState("");
  const [loadState, setLoadState] = useState<ArticleLoadState>("idle");

  useEffect(() => {
    let ignore = false;

    async function loadArticleContent() {
      if (!article?.contentUrl) {
        setContentHtml("");
        setLoadState(article?.sections?.length ? "success" : "idle");
        return;
      }

      setLoadState("loading");

      try {
        const response = await fetch(article.contentUrl);
        if (!response.ok) {
          throw new Error(`Failed to load article content: ${response.status}`);
        }

        const html = await response.text();
        if (!ignore) {
          setContentHtml(html);
          setLoadState("success");
        }
      } catch {
        if (!ignore) {
          setContentHtml("");
          setLoadState("error");
        }
      }
    }

    void loadArticleContent();

    return () => {
      ignore = true;
    };
  }, [article]);

  if (!article) {
    return (
      <div className="container py-20">
        <Card className="p-8">
          <h1 className="font-display text-3xl font-bold text-avanta-navy">Статья не найдена</h1>
          <p className="mt-4 text-avanta-graphite">
            Возможно, материал был перенесён. Вернитесь в блог и выберите другую публикацию.
          </p>
          <Button asChild className="mt-6">
            <Link to={to("/blog")}>Вернуться в блог</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const canRenderHtml = Boolean(contentHtml);
  const canRenderSections = Boolean(article.sections?.length);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-12 pt-10">
        <div>
          <Link
            to={to("/blog")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-avanta-navy/70 transition hover:text-avanta-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад в блог
          </Link>
        </div>

        <Reveal>
          <section className="space-y-8">
            <div className="max-w-5xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">{article.category}</p>
              <h1 className="font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                {article.title}
              </h1>
            </div>

            {article.imageUrl ? (
              <div className="flex justify-center">
                <div className="inline-block max-w-full overflow-hidden rounded-[28px] border border-avanta-navy/10 bg-white/96 p-1.5 shadow-panel">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="block h-auto max-h-[440px] w-auto max-w-full rounded-[22px]"
                    style={{ objectPosition: article.imagePosition ?? "center" }}
                  />
                </div>
              </div>
            ) : null}
          </section>
        </Reveal>

        <section className="space-y-8">
          {loadState === "loading" ? (
            <Reveal>
              <Card className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-avanta-emerald">
                  Материал загружается
                </p>
                <p className="mt-5 text-base leading-8 text-avanta-graphite">
                  Подтягиваем полный текст статьи из локального архива блога.
                </p>
              </Card>
            </Reveal>
          ) : null}

          {canRenderHtml ? (
            <Reveal>
              <Card className="p-6 sm:p-8">
                <div
                  className="article-content text-avanta-graphite [&_a]:font-semibold [&_a]:text-avanta-emerald [&_a]:underline-offset-4 hover:[&_a]:text-avanta-navy [&_a:hover]:underline [&_figure]:mx-auto [&_figure]:my-8 [&_figure]:inline-flex [&_figure]:w-fit [&_figure]:max-w-full [&_figure]:justify-center [&_figure]:overflow-hidden [&_figure]:rounded-[24px] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-avanta-navy [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-avanta-navy [&_img]:mx-auto [&_img]:my-8 [&_img]:block [&_img]:h-auto [&_img]:max-h-[520px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-[22px] [&_img]:border [&_img]:border-avanta-navy/10 [&_img]:bg-white [&_img]:shadow-panel [&_li]:mt-2 [&_li]:text-base [&_li]:leading-8 [&_li]:text-avanta-graphite [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:marker:text-avanta-green [&_p]:mt-4 [&_p]:text-base [&_p]:leading-8 [&_p]:text-avanta-graphite [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-avanta-green"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </Card>
            </Reveal>
          ) : null}

          {!canRenderHtml && canRenderSections ? (
            article.sections!.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.05}>
                <Card className="p-6 sm:p-8">
                  <h2 className="font-display text-3xl font-bold text-avanta-navy">{section.title}</h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-avanta-graphite">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul className="mt-6 space-y-3 text-sm leading-7 text-avanta-navy">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-avanta-green" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              </Reveal>
            ))
          ) : null}

          {loadState === "error" ? (
            <Reveal>
              <Card className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-avanta-emerald">
                  Не удалось загрузить архив статьи
                </p>
                <p className="mt-5 text-base leading-8 text-avanta-graphite">
                  Оригинал материала всё равно доступен на официальном сайте. Можно открыть его по ссылке ниже.
                </p>
              </Card>
            </Reveal>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">Источник</p>
              <p className="mt-4 text-sm leading-7 text-avanta-graphite">{article.heroNote}</p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-avanta-emerald transition hover:text-avanta-navy"
              >
                Открыть оригинал на сайте
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">Подключение</p>
              <h3 className="mt-4 text-2xl font-bold text-avanta-navy">Хотите обсудить подключение?</h3>
              <p className="mt-3 text-sm leading-7 text-avanta-graphite">
                Вернитесь на главную, проверьте адрес и оставьте заявку на подключение или консультацию.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to={to("/?action=connect#application")}>Оставить заявку</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
                </Button>
              </div>
            </Card>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">Ещё из блога</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-avanta-navy">Похожие материалы</h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <BlogPostCard post={post} compact />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

