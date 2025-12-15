"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VehicleTable } from "@/modules/vehicle/components/vehicle-table"
import { AddVehicleDialog } from "@/modules/vehicle/components/add-vehicle-dialog"

export default function VehiclePage() {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/vehicles', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if(res.ok) {
                const data = await res.json();
                const formattedData = data.map(v => ({ 
                    ...v, 
                    id: v._id, 
                    name: v.vehicleName, 
                    type: v.vehicleType 
                })); 
                setVehicles(formattedData);
            }
        } catch (error) {
            console.error("Failed to fetch vehicles", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, [])

    const dynamicVehicleStats = useMemo(() => {
        const total = vehicles.length;
        const active = vehicles.filter(v => v.status === 'active').length;
        const maintenance = vehicles.filter(v => v.status === 'maintenance').length;

        return [
            { title: "Total Vehicles", value: total, change: "Based on current database" },
            { title: "Active Vehicles", value: active, change: `${Math.round((active / total) * 100) || 0}% of fleet` },
            { title: "In Maintenance", value: maintenance, change: "Need follow-up" },
            { title: "Average Mileage", value: (vehicles.reduce((sum, v) => sum + v.mileage, 0) / total).toFixed(0) + ' km' || '0 km', change: "Fleet average" },
        ];
    }, [vehicles]);


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Vehicle Fleet</h1>
                    <p className="text-muted-foreground">Manage and monitor your vehicle fleet</p>
                </div>
                
                <AddVehicleDialog onSuccess={fetchVehicles} />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dynamicVehicleStats.map((stat) => (
                    <Card key={stat.title} className="bg-card border-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <p className="text-xs text-primary mt-1">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <VehicleTable vehicles={vehicles} onRefresh={fetchVehicles} loading={loading} />
        </div>
    )
}