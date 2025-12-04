import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
