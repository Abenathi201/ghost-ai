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

interface RenameProjectDialogProps {
  open: boolean
  currentName: string
  name: string
  isSubmitting: boolean
  onNameChange: (value: string) => void
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
}

export function RenameProjectDialog({
  open,
  currentName,
  name,
  isSubmitting,
  onNameChange,
  onOpenChange,
  onSubmit,
}: RenameProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Renaming &ldquo;{currentName}&rdquo;.
          </DialogDescription>
        </DialogHeader>

        <Input
          autoFocus
          value={name}
          placeholder="Project name"
          onChange={(event) => onNameChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && name.trim()) {
              onSubmit()
            }
          }}
        />

        <DialogFooter>
          <Button
            disabled={!name.trim() || isSubmitting}
            onClick={onSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
