"use client";

import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { COURSES, lessonId } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";
import { connectFreighter, FreighterNotAvailableError } from "@/lib/freighter";
import { CertificateAlreadyMintedError, hasCertificate, mintCertificate } from "@/lib/stellar";
import { StrKey } from "@stellar/stellar-sdk";

const BEGINNER = COURSES[0];
const REQUIRED_BEGINNER = BEGINNER.lessons.length;

type MintState = "idle" | "checking" | "minting" | "minted" | "error";

export default function CertificatePage() {
  const { completed, walletAddress, setWalletAddress } = useProgress();

  const [addressInput, setAddressInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [mintState, setMintState] = useState<MintState>("idle");
  const [mintError, setMintError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const beginnerDone = BEGINNER.lessons.filter((l) => completed[lessonId(BEGINNER.slug, l.slug)]).length;
  const unlocked = beginnerDone >= REQUIRED_BEGINNER;
  const progressPct = Math.round((beginnerDone / REQUIRED_BEGINNER) * 100);

  useEffect(() => {
    if (!unlocked || !walletAddress) return;
    // Kicking off a fetch on address change and tracking its loading state
    // is the canonical use of an effect here, not a render-time derivation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMintState("checking");
    hasCertificate(walletAddress, BEGINNER.slug)
      .then((minted) => setMintState(minted ? "minted" : "idle"))
      .catch(() => setMintState("idle"));
  }, [unlocked, walletAddress]);

  async function handleConnect() {
    setWalletError(null);
    setConnecting(true);
    try {
      const address = await connectFreighter();
      setWalletAddress(address);
    } catch (err) {
      setWalletError(
        err instanceof FreighterNotAvailableError
          ? "Freighter extension not detected — paste your address instead."
          : "Couldn't connect to Freighter."
      );
    } finally {
      setConnecting(false);
    }
  }

  function handleUseManualAddress() {
    if (!StrKey.isValidEd25519PublicKey(addressInput.trim())) {
      setWalletError("That doesn't look like a valid Stellar address.");
      return;
    }
    setWalletError(null);
    setWalletAddress(addressInput.trim());
  }

  async function handleMint() {
    if (!walletAddress) return;
    setMintState("minting");
    setMintError(null);
    try {
      const hash = await mintCertificate({ recipient: walletAddress, courseSlug: BEGINNER.slug });
      setTxHash(hash);
      setMintState("minted");
    } catch (err) {
      if (err instanceof CertificateAlreadyMintedError) {
        setMintState("minted");
        return;
      }
      setMintError(err instanceof Error ? err.message : "Mint failed");
      setMintState("error");
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 flex flex-col gap-6 items-center">
      <h2 className="m-0 self-start text-2xl font-bold text-ink">Certificate</h2>

      {unlocked ? (
        <>
          <div
            className="w-full aspect-[1.6] rounded-card flex flex-col items-center justify-center gap-3.5 p-8 box-border shadow-card-hover"
            style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
          >
            <div className="text-xs tracking-widest uppercase text-white/80">
              Stellar Testnet · On-chain certificate
            </div>
            <div className="text-2xl font-extrabold text-center text-white">{BEGINNER.title}</div>
            <div className="text-[13px] text-white/85">
              {walletAddress ? `Awarded to ${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)}` : "Awarded to you"}
            </div>
          </div>

          {!walletAddress && (
            <div className="w-full flex flex-col gap-3 items-center">
              <button
                type="button"
                onClick={handleConnect}
                disabled={connecting}
                className="cursor-pointer px-6 py-3 bg-accent text-white text-sm font-bold rounded-btn hover:bg-accent-hover transition disabled:opacity-60"
              >
                {connecting ? "Connecting…" : "Connect Freighter"}
              </button>
              <div className="text-xs text-ink-muted">or paste your Stellar address</div>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="G..."
                  className="flex-1 bg-surface border border-border rounded-btn px-3 py-2 text-sm font-mono text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={handleUseManualAddress}
                  className="cursor-pointer px-4 py-2 bg-surface-alt border border-border text-ink text-sm font-semibold rounded-btn hover:border-accent transition"
                >
                  Use
                </button>
              </div>
              {walletError && <div className="text-xs text-accent">{walletError}</div>}
            </div>
          )}

          {walletAddress && mintState === "checking" && (
            <div className="text-[13px] text-ink-muted">Checking certificate status…</div>
          )}

          {walletAddress && mintState === "minted" && (
            <div className="text-[13px] text-ink-muted">
              Certificate minted to your wallet ✓
              {txHash && <span className="block text-xs mt-1 font-mono opacity-70">tx: {txHash}</span>}
            </div>
          )}

          {walletAddress && (mintState === "idle" || mintState === "error") && (
            <div className="flex flex-col gap-2 items-center">
              <button
                type="button"
                onClick={handleMint}
                className="cursor-pointer px-6 py-3 bg-accent text-white text-sm font-bold rounded-btn hover:bg-accent-hover transition"
              >
                Mint certificate NFT
              </button>
              {mintError && <div className="text-xs text-accent">{mintError}</div>}
            </div>
          )}

          {walletAddress && mintState === "minting" && (
            <div className="text-[13px] text-ink-muted">Minting — waiting for the transaction to confirm…</div>
          )}
        </>
      ) : (
        <div className="w-full border border-border rounded-card p-10 flex flex-col gap-3.5 items-center text-center bg-surface-alt">
          <div className="text-[15px] text-ink-muted">Complete the Beginner path to unlock your certificate.</div>
          <div className="w-full max-w-xs">
            <ProgressBar percent={progressPct} />
          </div>
          <div className="text-xs text-ink-muted">
            {beginnerDone}/{REQUIRED_BEGINNER} lessons
          </div>
        </div>
      )}
    </div>
  );
}
