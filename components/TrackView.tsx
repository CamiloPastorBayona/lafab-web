"use client";

// Dispara el evento view_item / ViewContent una vez al montar (para páginas de
// producto renderizadas en el servidor).

import { useEffect, useRef } from "react";
import { trackViewItem } from "@/lib/analytics";

export default function TrackView({
  id,
  name,
  price,
}: {
  id: number | string;
  name: string;
  price: number;
}) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    trackViewItem({ id, name, price });
  }, [id, name, price]);
  return null;
}
