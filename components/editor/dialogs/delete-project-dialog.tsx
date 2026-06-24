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

interface DeleteProjectDialogProps {
  open: boolean
  projectName: string
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteProjectDialog({
  open,
  projectName,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{projectName}&rdquo;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
