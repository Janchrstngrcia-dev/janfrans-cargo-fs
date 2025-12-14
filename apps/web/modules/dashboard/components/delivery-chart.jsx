"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export function DeliveryChart({ data }) {

  const revenueColor = "hsl(var(--chart-2))"
  return (
    <div className="flex flex-col w-full h-full">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Monthly Deliveries & Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[370px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}> 
                
                <defs>
                  {/* GRADIENT 1: DELIVERIES (Green to Red) */}
                  <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94B4C1" stopOpacity={0.8} /> 
                    <stop offset="95%" stopColor="#94B4C1" stopOpacity={0.2} /> 
                  </linearGradient>

                  {/* GRADIENT 2: REVENUE (Blue to Transparent) */}
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#213448" stopOpacity={0.8} /> 
                    <stop offset="95%" stopColor="#213448" stopOpacity={0} /> 
                  </linearGradient>
                </defs>

                <XAxis 
                  dataKey="month" 
                  stroke="#666" 
                  fontSize={14}
                  tickLine={false}
                  axisLine={false}
                />               
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value, name, props) => {
                    if (name === 'revenue') {
                      return [`$${value.toLocaleString()}`, 'Monthly Revenue'];
                    }
                    return [value, 'Deliveries'];
                  }}
                />               
                <Area 
                  yAxisId="deliveries"
                  type="monotone" 
                  dataKey="deliveries" 
                  stroke={revenueColor}
                  fillOpacity={1} 
                  fill="url(#colorDeliveries)" 
                />
                
                <Area 
                  yAxisId="revenue" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={revenueColor} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}