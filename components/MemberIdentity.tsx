import React from 'react'
import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
function MemberIdentity({address}: {address: `0x${string}`}) {
    return (
        <Identity
            address={address}
            schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
        >
            <Avatar />
            <Name />
            <Address />
        </Identity>
    )
}

export default MemberIdentity