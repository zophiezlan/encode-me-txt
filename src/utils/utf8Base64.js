// UTF-8-safe Base64 helpers. Plain `btoa(str)` throws InvalidCharacterError
// on any code unit > 0xFF — which means a JSON payload containing emoji or
// non-Latin1 characters crashes. These helpers funnel through TextEncoder /
// TextDecoder so any Unicode string round-trips cleanly.

export const utf8ToBase64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

export const base64ToUtf8 = (b64) => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
};
