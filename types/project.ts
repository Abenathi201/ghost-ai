export interface Project {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "Checkout Service", slug: "checkout-service", isOwner: true },
  { id: "2", name: "Notification Pipeline", slug: "notification-pipeline", isOwner: true },
]

export const MOCK_SHARED_PROJECTS: Project[] = [
  { id: "3", name: "Billing Platform", slug: "billing-platform", isOwner: false },
]
