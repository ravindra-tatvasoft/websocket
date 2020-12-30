export function IsValidUrl(url) {
    return  url.startsWith("wss://")
}

            
export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}