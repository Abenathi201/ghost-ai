"use client"

import type { ReactNode } from "react"

import { FolderKanban, Plus, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function ProjectSidebar({
  isOpen,
  onClose,
  className,
}: ProjectSidebarProps) {
  return (
    <aside
      className={cn(
        "absolute top-0 left-0 z-40 flex h-full w-72 flex-col border-r border-surface-border bg-surface/95 backdrop-blur-sm transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex-1 overflow-hidden px-4 pt-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects" className="mt-3">
          <EmptyState
            icon={<FolderKanban className="h-8 w-8" />}
            message="No projects yet."
          />
        </TabsContent>

        <TabsContent value="shared" className="mt-3">
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            message="No shared projects yet."
          />
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border p-4">
        <Button className="w-full" size="default">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}

function EmptyState({
  icon,
  message,
}: {
  icon: ReactNode
  message: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-surface-border-subtle py-10 text-center">
      <span className="text-copy-muted">{icon}</span>
      <p className="text-sm text-copy-muted">{message}</p>
    </div>
  )
}
