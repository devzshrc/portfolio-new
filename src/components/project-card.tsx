import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  lightImage?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  lightImage,
  video,
  links,
  className,
}: Props) {
  const hasMedia = Boolean(video || image || lightImage);

  return (
    <Card className="flex h-full flex-col overflow-hidden border bg-card/80 transition-all duration-300 ease-out hover:border-foreground/20 hover:shadow-xl">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-44 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className={cn(
              "h-44 w-full overflow-hidden object-cover object-top",
              lightImage ? "hidden dark:block" : "block"
            )}
          />
        )}
        {lightImage && (
          <Image
            src={lightImage}
            alt={`${title} light mode`}
            width={500}
            height={300}
            className="h-44 w-full overflow-hidden object-cover object-top dark:hidden"
          />
        )}
        <CardHeader className={cn("space-y-3 p-5", hasMedia && "pt-4")}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <CardTitle className="text-base leading-tight">{title}</CardTitle>
              <time className="font-sans text-xs text-muted-foreground">
                {dates}
              </time>
            </div>
            {href && href !== "#" && (
              <span className="mt-0.5 rounded-md border p-1.5 text-muted-foreground transition-colors group-hover:text-foreground">
                <ArrowUpRight className="size-3.5" />
              </span>
            )}
          </div>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose prose-sm max-w-none font-sans text-sm leading-6 text-muted-foreground dark:prose-invert prose-p:my-0">
            {description}
          </Markdown>
        </CardHeader>
      </Link>
      <CardContent className="mt-auto flex flex-1 flex-col px-5 pb-5 pt-0">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-0.5 text-[11px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t px-5 py-4">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-2 px-2.5 py-1 text-[11px]"
                  variant="outline"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
