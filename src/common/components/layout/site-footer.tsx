import Link from "next/link";
import { siteContent } from "@data/site.mock";
import { BrandLogo } from "@/common/components/layout/brand-logo";

export function SiteFooter() {
  const { footer } = siteContent;

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <p className="font-heading text-xl font-bold tracking-[0.15em]">
                FLYNWEAR
              </p>
              <p className="text-sm text-muted-foreground">{footer.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            {footer.address}
            <br />
            {footer.email}
            <br />
            {footer.phone}
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Shop
          </p>
          <ul className="space-y-2 text-sm">
            {footer.links.shop.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Info
          </p>
          <ul className="space-y-2 text-sm">
            {footer.links.info.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            {footer.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} FLYNWEAR · Wear Your Freedom
      </div>
    </footer>
  );
}
