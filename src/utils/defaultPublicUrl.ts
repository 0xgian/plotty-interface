export default function defaultPublicUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_URL;
  return process.env.NODE_ENV !== "production"
    ? "http://app.localhost:3000"
    : envUrl !== undefined
    ? `https://app.${envUrl}`
    : `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/app`;
}