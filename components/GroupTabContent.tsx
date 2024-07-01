'use client';

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useTableland } from '@/tableland';
import { useAccount } from 'wagmi';
import { group } from 'console';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';



function GroupTabContent() {

    const { readUserGroups } = useTableland();
    const { address } = useAccount();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (!address) return;
        (async () => {
            const result = await readUserGroups("0x70997970c51812dc3a010c7d01b50e0d17dc79c8")

            if (result?.length < 1) setGroups([]);

            setGroups(result);

        })();
    }, [address]);

    return (
        <section className='w-full h-full'>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Groups</CardTitle>
                    <CardDescription>
                        These are Susu Group your created/join
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Group Name</TableHead>
                            <TableHead>Group Address</TableHead>
                            <TableHead>
                                Action
                            </TableHead>
                        </TableRow>
                        <TableBody>
                            {groups?.map((group, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <div className="font-medium">Emma Brown</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            emma@example.com
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        Group Name
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {group?.groupId}
                                    </TableCell>
                                    
                                    <TableCell className="text-right">
                                        <Link href={`./groups/${group?.groupId}`} > view </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    )
}

export default GroupTabContent