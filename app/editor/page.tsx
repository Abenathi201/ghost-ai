"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const projectDialogs = useProjectDialogs()

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />

      <div className="relative flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCreateProject={projectDialogs.openCreateDialog}
          onRenameProject={projectDialogs.openRenameDialog}
          onDeleteProject={projectDialogs.openDeleteDialog}
        />

        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-lg font-medium text-copy-primary">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-copy-muted">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button onClick={projectDialogs.openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <CreateProjectDialog
        open={projectDialogs.dialog === "create"}
        name={projectDialogs.name}
        slug={projectDialogs.slug}
        isSubmitting={projectDialogs.isSubmitting}
        onNameChange={projectDialogs.setName}
        onOpenChange={(open) => {
          if (!open) projectDialogs.closeDialog()
        }}
        onSubmit={projectDialogs.submitCreate}
      />

      <RenameProjectDialog
        open={projectDialogs.dialog === "rename"}
        currentName={projectDialogs.activeProject?.name ?? ""}
        name={projectDialogs.name}
        isSubmitting={projectDialogs.isSubmitting}
        onNameChange={projectDialogs.setName}
        onOpenChange={(open) => {
          if (!open) projectDialogs.closeDialog()
        }}
        onSubmit={projectDialogs.submitRename}
      />

      <DeleteProjectDialog
        open={projectDialogs.dialog === "delete"}
        projectName={projectDialogs.activeProject?.name ?? ""}
        isSubmitting={projectDialogs.isSubmitting}
        onOpenChange={(open) => {
          if (!open) projectDialogs.closeDialog()
        }}
        onConfirm={projectDialogs.submitDelete}
      />
    </div>
  )
}
