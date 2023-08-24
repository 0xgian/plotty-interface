import textProcessor from "twitter-text";

/** #### Note: Per RFC 3886, URL must begin with a scheme (not limited to http/https), e. g.:

- www.example.com is not valid URL (missing scheme)
- javascript:void(0) is valid URL, although not an HTTP one
- http://.. is valid URL with the host being .. (whether it resolves depends on your DNS)
- https://example..com is valid URL, same as above */
export const isValidUrl = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export const isSupportMedia = (url: string) => {
  if (!url) return false;
  if (!isValidUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return !!ext && ["png", "jpeg", "gif"].includes(ext);
};

export const isValidHashOrCashtag = (word: string) => {
  return (
    textProcessor.isValidHashtag(word) || textProcessor.isValidCashtag(word)
  );
};

export default textProcessor;
