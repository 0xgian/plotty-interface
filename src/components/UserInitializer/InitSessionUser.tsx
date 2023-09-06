"use client";

import { useEffect } from "react";
import { useAuthStore } from "state/auth";
import { SessionUser } from "state/types";

export default function InitSessionUser({
  sessionUser,
}: {
  sessionUser?: SessionUser;
}) {
  const { setSession } = useAuthStore();

  useEffect(() => {
    setSession(sessionUser);
  }, [sessionUser, setSession]);

  return null;
}
