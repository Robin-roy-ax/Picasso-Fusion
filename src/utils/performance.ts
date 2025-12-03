/**
 * Performance utility functions for optimizing event handlers
 */

/**
 * Throttles a function to only execute once per specified delay
 * @param func - Function to throttle
 * @param delay - Minimum delay between executions in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;

        if (timeSinceLastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                func.apply(this, args);
            }, delay - timeSinceLastCall);
        }
    };
}

/**
 * Debounces a function to only execute after a specified delay of inactivity
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>) {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Request animation frame throttle - ensures function runs at most once per frame
 * @param func - Function to throttle
 */
export function rafThrottle<T extends (...args: any[]) => any>(
    func: T
): (...args: Parameters<T>) => void {
    let rafId: number | null = null;
    let latestArgs: Parameters<T> | null = null;

    return function (this: any, ...args: Parameters<T>) {
        latestArgs = args;

        if (rafId === null) {
            rafId = requestAnimationFrame(() => {
                if (latestArgs) {
                    func.apply(this, latestArgs);
                }
                rafId = null;
                latestArgs = null;
            });
        }
    };
}
