/**
 * Generates a random alphanumeric string.
 * @param length - The desired length of the string (default 10).
 * @returns A random string of the given length.
 */
export function generateRandomId(length: number = 10): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}
