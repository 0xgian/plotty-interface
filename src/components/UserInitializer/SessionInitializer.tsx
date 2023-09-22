"use client";

import { useSessionInitializer } from "state/auth";
import { usePrivateLabelsInitializer } from "state/privateLabels";
import { SessionUser } from "state/types";

export default function SessionInitializer({
  sessionUser,
}: {
  sessionUser?: SessionUser;
}) {
  useSessionInitializer(sessionUser);
  usePrivateLabelsInitializer();
  return null;
}
