"use client"

import { useState } from "react"

import { slugify } from "@/lib/utils"
import type { Project } from "@/types/project"

type DialogType = "create" | "rename" | "delete" | null

export function useProjectDialogs() {
  const [dialog, setDialog] = useState<DialogType>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slug = slugify(name)

  function openCreateDialog() {
    setActiveProject(null)
    setName("")
    setDialog("create")
  }

  function openRenameDialog(project: Project) {
    setActiveProject(project)
    setName(project.name)
    setDialog("rename")
  }

  function openDeleteDialog(project: Project) {
    setActiveProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
    setActiveProject(null)
    setName("")
    setIsSubmitting(false)
  }

  async function submitCreate() {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    closeDialog()
  }

  async function submitRename() {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    closeDialog()
  }

  async function submitDelete() {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    closeDialog()
  }

  return {
    dialog,
    activeProject,
    name,
    slug,
    isSubmitting,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  }
}
