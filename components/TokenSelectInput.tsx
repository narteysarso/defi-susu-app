'use client';

import React, { useCallback } from 'react'

import { TokenSelectDropdown, Token } from '@coinbase/onchainkit/token';


function TokenSelectInput({ onSelect, ...props }: { onSelect: () => {} }) {

    function setToken(value: Token){
        console.log(value)
    }

    return (
        <div>
            <TokenSelectDropdown
                setToken={onSelect}
                options={[
                    {
                        name: 'USDC',
                        address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
                        symbol: 'USDC',
                        decimals: 6,
                        image:
                            'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
                        chainId: 8453,
                    },
                    {
                        name: 'Dai',
                        address: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
                        symbol: 'DAI',
                        decimals: 18,
                        image:
                            'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/d0/d7/d0d7784975771dbbac9a22c8c0c12928cc6f658cbcf2bbbf7c909f0fa2426dec-NmU4ZWViMDItOTQyYy00Yjk5LTkzODUtNGJlZmJiMTUxOTgy',
                        chainId: 8453,
                    },
                ]}

                {...props}
            />
        </div>
    )
}

export default TokenSelectInput