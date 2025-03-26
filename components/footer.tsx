import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6 px-4 md:px-6 border-t">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="font-bold text-primary">SL</span>
          </div>
          <span className="text-sm font-medium">Shreyas Arun Lakade</span>
        </div>

        <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</div>

        <nav className="flex gap-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  )
}

