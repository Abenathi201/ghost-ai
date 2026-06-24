"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateProjectDialogProps {
  open: boolean
  name: string
  slug: string
  isSubmitting: boolean
  onNameChange: (value: string) => void
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
}

export function CreateProjectDialog({
  open,
  name,
  slug,
  isSubmitting,
  onNameChange,
  onOpenChange,
  onSubmit,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Give your project a name. You can change it later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Input
            autoFocus
            value={name}
            placeholder="Project name"
            onChange={(event) => onNameChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && name.trim() && slug && !isSubmitting) {
                 onSubmit()
               }
            }}
          />
          <p className="text-xs text-copy-muted">
            {slug || "your-project-slug"}
          </p>
        </div>

        <DialogFooter>
          <Button
            disabled={!name.trim() || !slug || isSubmitting}
            onClick={onSubmit}
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
