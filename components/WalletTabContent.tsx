'use client';

import React from 'react'
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Countdown from 'react-countdown';
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MoreHorizontal } from 'lucide-react'
import MemberIdentity from './MemberIdentity'

import { TEST_ADDRESS } from '@/data/dummy-data';

type address = `0x${string}`;
enum WalletStatus {
    ACTIVE = "Active",
    ENDED = "Ended",
    UNVESTED = "Unvested"
}
interface IDataRow {
    status: WalletStatus,
    contribution: number,
    dueDate: number,
    beneficiary: address,
    walletAddress: address,
    amount: number
}

function DataRow({ status, contribution, dueDate, beneficiary, walletAddress, amount }: IDataRow) {
    const renderer = ({ days,hours, minutes, seconds, completed } : { days: string,hours: string, minutes: string, seconds: string, completed: boolean }) => {
        if (completed) {
          // Render a completed state
          return <Button>Withdraw</Button>;
        } else {
          // Render a countdown
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
      };

    return (
        <TableRow>
            <TableCell colSpan={2} className="font-medium">
                <MemberIdentity address={walletAddress} />
            </TableCell>
            <TableCell>
                <Badge variant="outline">{status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                ${amount}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                ${contribution}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <Countdown 
                date={dueDate}
                renderer={
                    renderer
                }
                 />
                
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem disabled={dueDate > Date.now()}>Withdraw</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

function WalletTabContent() {
    return (
        <section className="w-full h-full">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Susu Collections</CardTitle>
                    <CardDescription>
                        These are Susu contributions you can claim
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Wallet Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Amount Due
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Contributions
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Due Date
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                TEST_ADDRESS.map((address) => (<DataRow walletAddress={address} status={WalletStatus.ACTIVE} amount={2344} contribution={2344} dueDate={1722902400000} />))
                            }

                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        products
                    </div>
                </CardFooter>
            </Card>
        </section>
    )
}

export default WalletTabContent