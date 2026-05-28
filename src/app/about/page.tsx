import { aboutContent } from "@data/about.mock";
import { Separator } from "@/common/components/ui/separator";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        About FLYNWEAR
      </p>
      <h1 className="font-heading mt-4 text-5xl tracking-wide sm:text-6xl">
        {aboutContent.headline}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        {aboutContent.subheadline}
      </p>
      <Separator className="my-10" />
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        {aboutContent.story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <Separator className="my-10" />
      <div className="grid gap-8 sm:grid-cols-3">
        {aboutContent.values.map((v) => (
          <div key={v.title}>
            <h3 className="font-heading text-xl tracking-wide text-foreground">
              {v.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        Founded {aboutContent.founded} · {aboutContent.location}
      </p>
    </main>
  );
}
