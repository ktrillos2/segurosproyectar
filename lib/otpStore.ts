// In-memory store for OTPs. Uses globalThis to persist across Next.js HMR reloads.
type OtpRecord = {
  code: string;
  expiresAt: number;
}

const globalAny = globalThis as any;

if (!globalAny.otpStore) {
  globalAny.otpStore = new Map<string, OtpRecord>();
}

export const otpStore: Map<string, OtpRecord> = globalAny.otpStore;
