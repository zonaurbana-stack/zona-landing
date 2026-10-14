import { sendGAEvent } from "@next/third-parties/google";

// No hace nada si GA no está configurado (sin NEXT_PUBLIC_GA_ID) o si falla.
export function trackEvent(name: string, params?: Record<string, string>) {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    try {
        sendGAEvent("event", name, params ?? {});
    } catch {
        // Analytics nunca debe romper la UX
    }
}
