'use client';

import { BrowserProvider, JsonRpcSigner } from "ethers";

export function getProvider() {
    const provider = new BrowserProvider(window.ethereum);
    return provider;
}
