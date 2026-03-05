export function checkSuccessResponse(statusCode?: number): boolean {
    if (typeof statusCode !== "number") {
        return false;
    }
    return statusCode >= 200 && statusCode < 300;
}
