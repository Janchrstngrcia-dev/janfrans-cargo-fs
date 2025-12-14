"use client"

import { useState, useEffect } from "react"
import { DeliveriesTable } from "@/modules/deliveries/components/deliveries-table"
import { AddDeliveryDialog } from "@/modules/deliveries/components/add-deliveries-dialog"
import { toast } from "sonner"

export default function DeliveriesPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDeliveries = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/deliveries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!res.ok) throw new Error("Failed to fetch")
      
      const deliveries = await res.json()
      setData(deliveries)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeliveries()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deliveries</h1>
          <p className="text-muted-foreground">Track and manage all cargo deliveries</p>
        </div>
        <AddDeliveryDialog onSuccess={fetchDeliveries} />
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DeliveriesTable deliveries={data} />
      )}
    </div>
  )
}