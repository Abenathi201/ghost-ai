"use client"

import type { ReactNode } from "react"

import { FolderKanban, Pencil, Plus, Trash2, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { MOCK_PROJECTS, MOCK_SHARED_PROJECTS, type Project } from "@/types/project"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: () => void
  onRenameProject: (project: Project) => void
  onDeleteProject: (project: Project) => void
  className?: string
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  className,
}: ProjectSidebarProps) {
  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={cn(
          "absolute inset-0 z-30 bg-black/40 transition-opacity lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        aria-hidden={!isOpen}
        className={cn(
          "absolute top-0 left-0 z-40 flex h-full w-72 flex-col border-r border-surface-border bg-surface/95 backdrop-blur-sm transition-transform duration-200",
          isOpen
            ? "translate-x-0 visible"
            : "-translate-x-full invisible pointer-events-none",
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
            {MOCK_PROJECTS.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {MOCK_PROJECTS.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onRenameProject}
                    onDelete={onDeleteProject}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<FolderKanban className="h-8 w-8" />}
                message="No projects yet."
              />
            )}
          </TabsContent>

          <TabsContent value="shared" className="mt-3">
            {MOCK_SHARED_PROJECTS.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {MOCK_SHARED_PROJECTS.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onRenameProject}
                    onDelete={onDeleteProject}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<Users className="h-8 w-8" />}
                message="No shared projects yet."
              />
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t border-surface-border p-4">
          <Button className="w-full" size="default" onClick={onCreateProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: Project
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}) {
  return (
    <li className="group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 hover:bg-elevated">
      <span className="truncate text-sm text-copy-primary">{project.name}</span>

      {project.isOwner && (
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Rename ${project.name}`}
            onClick={() => onRename(project)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Delete ${project.name}`}
            onClick={() => onDelete(project)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </li>
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
