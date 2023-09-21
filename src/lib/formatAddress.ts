export function formatAddress(
  address?: string,
  options?: { leading?: number; trailing?: number }
): string {
  if (!address) return "";

  const leadingChars =
    typeof options?.leading === "number" ? options.leading : 6;
  const trailingChars =
    typeof options?.trailing === "number" ? options.trailing : 4;

  return address.length < leadingChars + trailingChars
    ? address
    : `${address.substring(0, leadingChars)}${
        leadingChars > 0 && trailingChars > 0 ? "\u2026" : ""
      }${address.substring(address.length - trailingChars)}`;
}

export function formatWithBrackets(label?: string): string {
  return label
    ? ` (${label.substring(0, 16)}${label.length > 16 ? "..." : ""})`
    : "";
}

export function formatUrl(url: string): { leading: string; trailing: string } {
  const removedProtocol = url.replace(/^https?:\/\//g, "");
  return {
    leading: removedProtocol.substring(0, 24),
    trailing: removedProtocol.substring(24),
  };
}
