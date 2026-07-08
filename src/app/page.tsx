import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { NotebookText, PlayCircle } from "lucide-react";
import Markdown from "react-markdown";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { RealTimeAge } from "@/components/RealTimeAge";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
            <div className="relative aspect-[3.6/1] w-full">
              <div className="absolute inset-0 overflow-hidden rounded-sm">
                <Image
                  src="/banner.jpg"
                  alt={`${DATA.name} banner`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-5 translate-y-1/4 sm:right-6 sm:translate-y-[38%]">
                <Avatar className="size-20 border-4 border-background shadow-sm sm:size-24">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </BlurFade>
          <div className="flex pt-5 sm:pt-6">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none"
                yOffset={8}
                text={`hi, i am devashish`}
              />
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="max-w-[600px] md:text-sm">
                  <RealTimeAge birthDate={DATA.birthDate} />
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">about</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">work</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="projects">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">proof of work</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 8.25 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  lightImage={project.lightImage}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="achievements">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 8.5}>
            <h2 className="text-xl font-bold">selected achievements</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3">
            {DATA.achievements.map((item, id) => (
              <BlurFade
                key={`${item.title}-${id}`}
                delay={BLUR_FADE_DELAY * 8.75 + id * 0.05}
              >
                <Card className="overflow-hidden border">
                  {item.image && (
                    <div className="px-4 pt-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1200}
                        height={675}
                        className="h-24 w-full rounded-md object-cover object-center opacity-90"
                      />
                    </div>
                  )}
                  <div className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 text-sm">
                    <Markdown className="prose prose-sm max-w-none font-sans text-muted-foreground dark:prose-invert prose-p:my-0 prose-a:no-underline hover:prose-a:underline">
                      {item.description}
                    </Markdown>
                  </CardContent>
                  </div>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="writing">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">writing / videos</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.writing.map((item, id) => (
              <BlurFade
                key={item.title}
                delay={BLUR_FADE_DELAY * 9.25 + id * 0.05}
                className="h-full"
              >
                <Link href={item.href} className="block">
                  <Card className="flex h-full min-h-32 flex-col overflow-hidden border transition-colors hover:bg-muted/40">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={640}
                        height={360}
                        className="h-32 w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center bg-muted/40">
                        {item.type === "Video" ? (
                          <PlayCircle className="size-8 text-muted-foreground" />
                        ) : (
                          <NotebookText className="size-8 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div className="p-4">
                    <CardHeader className="p-0">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-sm">{item.title}</CardTitle>
                        <Badge variant="secondary">{item.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pt-2 text-sm">
                      {item.description}
                    </CardContent>
                    </div>
                  </Card>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="newsletter">
        <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
          <h2 className="text-xl font-bold text-center sm:text-left">stay updated</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 9.75}>
          <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert text-center sm:text-left">
            subscribe to my email list
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <EmailSignupForm />
        </BlurFade>
      </section> */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 10.25}>
            <h2 className="text-xl font-bold">skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10.5 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16.25}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm"></div>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                say hello on{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  𝕏
                </Link>{" "}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
