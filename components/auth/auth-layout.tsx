import type { ReactNode } from "react"

import { FileText, Share2, Sparkles } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-base">
      <div className="hidden w-1/2 flex-col justify-between bg-surface px-16 py-16 lg:flex">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-brand" />
            <span className="text-lg font-bold text-copy-primary">
              Ghost AI
            </span>
          </div>

          <h1 className="mt-24 text-4xl font-bold leading-tight text-copy-primary">
            Design systems at the
            <br />
            speed of thought.
          </h1>
          <p className="mt-6 max-w-md text-base text-copy-secondary">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-12 space-y-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-dim text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-copy-primary">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-copy-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-copy-faint">
          © {new Date().getFullYear()} Ghost AI. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-center justify-center bg-base px-6 lg:w-1/2">
        {children}
      </div>
    </div>
  )
}
