/** Default interval between SSE keep-alive comment frames. */
export const DEFAULT_SSE_KEEP_ALIVE_MS = 15_000;

/** Largest delay accepted by JavaScript timers without overflow clamping. */
const MAX_TIMER_DELAY_MS = 2_147_483_647;

/**
 * Arms an SSE keep-alive timer when `intervalMs` is a valid timer delay.
 *
 * Invalid delays disable keep-alive. In Node.js, sub-millisecond, non-finite,
 * and overflowing delays are clamped to roughly 1 ms, which would otherwise
 * flood every open stream with comment frames.
 *
 * @returns The timer handle, or `undefined` when keep-alive is disabled.
 */
export function armSseKeepAlive(intervalMs: number, onTick: () => void): ReturnType<typeof setInterval> | undefined {
    if (!Number.isFinite(intervalMs) || intervalMs < 1 || intervalMs > MAX_TIMER_DELAY_MS) {
        return undefined;
    }

    const timer = setInterval(onTick, intervalMs);
    // Node.js timers expose `unref`; browser and Workers timers are numbers.
    (timer as { unref?: () => void }).unref?.();
    return timer;
}
