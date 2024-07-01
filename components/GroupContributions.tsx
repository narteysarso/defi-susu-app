import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { BigNumberish } from 'ethers'
import MemberIdentity from './MemberIdentity'
import { useTableland } from '@/tableland'


function GroupContributions({ groupId, roundId = 0 }: {groupId:  `0x${string}`, roundId: BigNumberish }) {

    const [currentRound, setCurrentRound] = useState();
    const [roundContributors, setRoundContributors] = useState([]);
    const {readRoundContributions} = useTableland();

    

    return (
        <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
            <CardHeader className="flex flex-row items-center ">
                <div className="grid gap-2 w-full ">
                    <CardTitle>Contributions</CardTitle>
                    <CardDescription className='flex justify-between items-center w-full '>
                        <div className='flex gap-4 items-center'>
                            Current Round:
                            <Select defaultValue={roundId.toString()} onValueChange={async (_roundId) => {
                                const contribs = await readRoundContributions(groupId, _roundId);
                                // console.log('paym', contribs);
                                setRoundContributors(contribs)
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select round" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem>Select Round</SelectItem>
                                    {(roundId > 0n) &&
                                        Array(roundId)
                                            .fill(0)
                                            .map((i) => <SelectItem value={i} key={i}>{i}</SelectItem>)
                                    }

                                </SelectContent>
                            </Select>
                        </div>
                        <Button>Make payment</Button>

                    </CardDescription>
                </div>

            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            roundContributors?.length > 0 ? roundContributors.map(({address,amount}, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <MemberIdentity address={address} />
                                    </TableCell>
                                    
                                    <TableCell className="text-right">${amount}</TableCell>
                                </TableRow>
                            )) : (
                                <div className="flex flex-col items-center  gap-1 text-center mx-2 my-2 py-4 px-4">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        No round contributions yet.
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Start a round and make contibutions :)
                                    </p>
                                </div>
                            )
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default GroupContributions