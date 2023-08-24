"use client";

import { useEffect } from "react";
import { useAuthStatusStore } from "state/authStatus";
import { SessionUser } from "state/types";

export default function SetSessionUser({
  sessionUser,
}: {
  sessionUser?: SessionUser;
}) {
  const { setSession } = useAuthStatusStore();

  useEffect(() => {
    setSession(sessionUser);
  }, [sessionUser, setSession]);

  return null;
}
