import { http, createConfig } from "wagmi"
import { base, baseSepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    // This works with MetaMask, Coinbase Wallet, and other browser extensions
    injected(),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
