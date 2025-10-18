export const REWARD_DISTRIBUTOR_ADDRESS =
  process.env.NEXT_PUBLIC_REWARD_DISTRIBUTOR_ADDRESS || "0x0000000000000000000000000000000000000000"

// Map reward IDs to their on-chain IDs
export const REWARD_ID_MAP: Record<number, number> = {
  1: 0, // Welcome Bonus
  2: 1, // Daily Check-in
  3: 2, // Achievement Unlock
  4: 3, // Referral Bonus
}
