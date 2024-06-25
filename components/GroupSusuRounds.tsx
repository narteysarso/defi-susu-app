import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CreditCard } from 'lucide-react'

function GroupSusuRounds({groupId}: {groupId: string}) {
    return (
        <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Susu Rounds</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                    Current round: <span>1</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default GroupSusuRounds