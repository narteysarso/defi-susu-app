import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DollarSign } from 'lucide-react'

function GroupTotalContributions({groupId}: {groupId: string}) {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Disbursments
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>

                <div className="text-1xl font-bold mt-2">Amount Per Head: </div>
                <p className="text-xs text-muted-foreground">
                $45,231.89
                </p>
            </CardContent>
        </Card>
    )
}

export default GroupTotalContributions