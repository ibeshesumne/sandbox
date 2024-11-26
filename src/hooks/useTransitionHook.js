// src/hooks/useTransitionHook.js
import { useTransition } from "react";

export function useTransitionHook() {
  const [startTransition, isPending] = useTransition();

  startTransition(() => {
    console.log("Opt-in to React Router future flags");
  });

  return { isPending };
}