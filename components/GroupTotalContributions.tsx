import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DollarSign } from 'lucide-react'
import { formatAmount } from '@/lib/utils'

function GroupTotalContributions({groupId, data = 0}: {groupId: string, data: number}) {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Amount Per Head
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatAmount(data)}</div>
                {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p> */}

            </CardContent>
        </Card>
    )
}

export default GroupTotalContributions