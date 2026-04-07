import { Fragment } from "react";
import type { FAQItem } from "@/types/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQAccordionProps = {
  items: FAQItem[];
  preserveLineBreaks?: boolean;
};

function linkifyText(text: string) {
  return text.split(/((?:https?:\/\/|mailto:)[^\s]+)/g).map((part, index) => {
    const isLink = /^(?:https?:\/\/|mailto:)/.test(part);

    if (!isLink) {
      return <Fragment key={`text-${index}`}>{part}</Fragment>;
    }

    let href = part;
    let trailing = "";

    while (/[),.;!?]$/.test(href)) {
      trailing = href.slice(-1) + trailing;
      href = href.slice(0, -1);
    }

    if (!href) {
      return <Fragment key={`empty-${index}`}>{part}</Fragment>;
    }

    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    return (
      <Fragment key={`link-${index}`}>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="font-semibold text-avanta-emerald underline decoration-avanta-emerald/55 underline-offset-2 transition hover:text-avanta-navy"
        >
          {href}
        </a>
        {trailing}
      </Fragment>
    );
  });
}

export function FAQAccordion({ items, preserveLineBreaks = false }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className={preserveLineBreaks ? "whitespace-pre-line" : undefined}>
            {linkifyText(item.answer)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
