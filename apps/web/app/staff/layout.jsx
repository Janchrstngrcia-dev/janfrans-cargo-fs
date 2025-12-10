import { AdminLayout } from "@/components/layout/admin-layout"

export default function StaffLayout({ children }) {
  return <AdminLayout requiredRole="staff">{children}</AdminLayout>
}