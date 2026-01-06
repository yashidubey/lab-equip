export function getCSRFToken() {
  const match = document.cookie.match(
    /csrf-token=([^;]+)/
  );
  return match ? match[1] : "";
}
