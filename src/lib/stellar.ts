// Stellar integration: certificate NFT minting on course completion.
// Signing happens server-side (the platform admin key never reaches the
// browser) — this just calls the /api/certificate routes.

export interface CertificateMetadata {
  recipient: string;
  courseSlug: string;
}

export class CertificateAlreadyMintedError extends Error {}

/**
 * Mint an on-chain completion certificate for a learner. The platform admin
 * signs the transaction after the frontend has confirmed local completion.
 * Returns the transaction hash on success.
 */
export async function mintCertificate(meta: CertificateMetadata): Promise<string> {
  const res = await fetch("/api/certificate/mint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learner: meta.recipient, course: meta.courseSlug }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 409) {
    throw new CertificateAlreadyMintedError(data.error ?? "Certificate already minted");
  }
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to mint certificate");
  }
  return data.txHash as string;
}

/**
 * Check whether a Stellar address holds a certificate for a given course.
 */
export async function hasCertificate(address: string, courseSlug: string): Promise<boolean> {
  const res = await fetch(
    `/api/certificate/status?learner=${encodeURIComponent(address)}&course=${encodeURIComponent(courseSlug)}`
  );
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  return Boolean(data.hasCertificate);
}
