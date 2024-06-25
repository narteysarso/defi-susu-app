'use client';

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronsUpDown, Users } from 'lucide-react'
import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
import MemberIdentity from './MemberIdentity';
import { TEST_ADDRESS } from '@/data/dummy-data';

const MAX_SHOWN_CONTRIBUTORS = 5;

function GroupContributors({ groupId }: { groupId: string }) {
    const [contributors, setContributors] = useState(TEST_ADDRESS || []);
    return (
        <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Contributors
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                </p>
                <div className='flex items-center py-1'>
                    {
                        contributors?.slice(0, MAX_SHOWN_CONTRIBUTORS).map((address, idx) => {
                            return (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Avatar
                                                address={address}

                                                loadingComponent={(
                                                    <div className="h-8 w-8">
                                                        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <polygon points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6" fill="yellow" stroke="yellow" stroke-width="1" />
                                                        </svg>
                                                    </div>
                                                )}
                                                defaultComponent={(
                                                    <div className="h-8 w-8">
                                                        <Users />
                                                    </div>
                                                )}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Name address={address} />
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            )
                        })
                    }
                    {
                        contributors.length > MAX_SHOWN_CONTRIBUTORS && <>
                            &nbsp;
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flex'>
                                    <h2>+{contributors.length - MAX_SHOWN_CONTRIBUTORS}</h2>  <ChevronsUpDown />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Additional Contributors</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {
                                        contributors?.slice(MAX_SHOWN_CONTRIBUTORS).map((address, idx) => {
                                            return (
                                                <DropdownMenuItem>
                                                  <MemberIdentity address={address} />
                                                </DropdownMenuItem>

                                            )
                                        })
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    }
                </div>


            </CardContent>
        </Card>

    )
}

export default GroupContributors