import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPost;
  compact?: boolean;
};

export function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  const isExternal = post.href.startsWith("http");
  const content = (
    <Card
      className={cn(
        "h-full overflow-hidden p-0",
        post.featured && !compact && "bg-gradient-to-br from-white via-white to-avanta-green/10",
      )}
    >
      {post.imageUrl ? (
        <div className="relative h-48 overflow-hidden border-b border-avanta-navy/10 bg-gradient-to-br from-avanta-mist via-white to-avanta-green/10 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.15),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.2),rgba(24,58,99,0.06))]" />
          <img
            src={post.imageUrl}
            alt=""
            className="relative h-full w-full rounded-[24px] object-cover"
            style={{ objectPosition: post.imagePosition ?? "center" }}
          />
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge>{post.category}</Badge>
            <h3
              className={cn(
                "font-display font-bold text-avanta-navy",
                compact ? "text-xl leading-snug" : "text-3xl leading-tight",
              )}
            >
              {post.title}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-avanta-emerald" />
        </div>
      </div>
    </Card>
  );

  if (isExternal) {
    return (
      <motion.a
        href={post.href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="block h-full"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
      <Link to={post.href} className="block h-full">
        {content}
      </Link>
    </motion.div>
  );
}
