// Stellar integration: certificate NFT minting on course completion

const NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet";
const RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org";
const CONTRACT_ID = process.env.NEXT_PUBLIC_CERTIFICATE_CONTRACT_ID ?? "";

export interface CertificateMetadata {
  recipient: string;
  courseSlug: string;
  completedAt: string;
}

/**
 * Mint an on-chain NFT certificate for a learner who completed a course.
 * Requires the learner to sign the transaction with their Stellar wallet.
 */
export async function mintCertificate(meta: CertificateMetadata): Promise<string> {
  // TODO: build and submit Soroban transaction to mint certificate NFT
  // Returns the transaction hash on success
  throw new Error("mintCertificate not yet implemented");
}

/**
 * Check whether a Stellar address holds a certificate for a given course.
 */
export async function hasCertificate(address: string, courseSlug: string): Promise<boolean> {
  // TODO: query certificate contract storage
  return false;
}
