'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MemberIdentity from './MemberIdentity';
import { DISBURSMENT_DUMMY_DATA } from '@/data/dummy-data';


function GroupDisbursments({ groupId }: { groupId: string }) {
    const [disbursments, setDisbursments] = useState(DISBURSMENT_DUMMY_DATA||[]);
    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Recent Disbursments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {
                    disbursments?.map(({address, amount}, idx) => (
                        <div className="flex items-center gap-4">
                            <MemberIdentity address={address} />
                            <div className="ml-auto font-medium">+$ {amount} </div>
                        </div>
                    ))
                }
                
            </CardContent>
        </Card>
    )
}

export default GroupDisbursments