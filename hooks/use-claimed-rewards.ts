import { useAccount, useReadContract } from "wagmi"
import { REWARD_DISTRIBUTOR_ABI } from "@/lib/contract-abi"
import { REWARD_DISTRIBUTOR_ADDRESS, REWARD_ID_MAP } from "@/lib/contract-config"

export function useClaimedRewards() {
  const { address } = useAccount()

  // Call hooks at top level for each reward
  const claim1 = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: "claimed",
    args: [BigInt(REWARD_ID_MAP[1]), address || "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8"],
    query: { enabled: !!address && REWARD_DISTRIBUTOR_ADDRESS !== "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8" },
  })

  const claim2 = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: "claimed",
    args: [BigInt(REWARD_ID_MAP[2]), address || "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8"],
    query: { enabled: !!address && REWARD_DISTRIBUTOR_ADDRESS !== "" },
  })

  const claim3 = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: "claimed",
    args: [BigInt(REWARD_ID_MAP[3]), address || ""],
    query: { enabled: !!address && REWARD_DISTRIBUTOR_ADDRESS !== "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8" },
  })

  const claim4 = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: "claimed",
    args: [BigInt(REWARD_ID_MAP[4]), address || "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8"],
    query: { enabled: !!address && REWARD_DISTRIBUTOR_ADDRESS !== "0x28e831e506c645d255A9A2f68Cf273eb47Ea63c8" },
  })

  return {
    claimedMap: {
      1: claim1.data ?? false,
      2: claim2.data ?? false,
      3: claim3.data ?? false,
      4: claim4.data ?? false,
    },
    isLoading: claim1.isLoading || claim2.isLoading || claim3.isLoading || claim4.isLoading,
  }
}
