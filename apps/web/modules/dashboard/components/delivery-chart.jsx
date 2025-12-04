"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts"

export function DeliveryChart({ data }) {
  return (
      <div className="flex flex-col w-full h-full">
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Monthly Deliveries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[370px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#666"/>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="deliveries" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
