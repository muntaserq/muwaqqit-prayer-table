export function buildApiUrl(baseUrl: string, params: Record<string, any>): string {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    return url.toString();
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
