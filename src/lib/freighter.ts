"use client";

import { isConnected, requestAccess } from "@stellar/freighter-api";

export class FreighterNotAvailableError extends Error {}

/**
 * Prompts the Freighter browser extension for access and returns the
 * learner's public address. Throws FreighterNotAvailableError if the
 * extension isn't installed.
 */
export async function connectFreighter(): Promise<string> {
  const { isConnected: available } = await isConnected();
  if (!available) {
    throw new FreighterNotAvailableError("Freighter extension not detected");
  }

  const { address, error } = await requestAccess();
  if (error || !address) {
    throw new Error(error ?? "Freighter did not return an address");
  }
  return address;
}
