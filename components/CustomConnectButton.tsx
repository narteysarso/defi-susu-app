'use client';

import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from './ui/button';
import { Forward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function CustomConnectButton({className}: {className: string}) {
    const { address, status } = useAccount();
    const { connectors, connect } = useConnect();
    const { disconnect } = useDisconnect();
    const connector = connectors[0];
    const router = useRouter();

    if(address){
        router.push("./dashboard")
    }

    if (status === 'disconnected' || status === 'connecting')
    return (

        <Button className={cn("", className)} onClick={() => connect({ connector })}>
            Get started with Base Smart Wallet <Forward />
        </Button>
    )

    return null;
}

export default CustomConnectButton