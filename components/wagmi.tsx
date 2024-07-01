import { http, createConfig } from 'wagmi';
import { base, baseSepolia, hardhat } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
 
export const wagmiConfig = createConfig({
  chains: [base, baseSepolia, hardhat],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: 'Susu DApp',
      preference: 'all',
      version: '4',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [hardhat.id]: http(),
  },
});