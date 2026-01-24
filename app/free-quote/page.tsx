import { Suspense } from "react";
import FreeQuoteClient from "./FreeQuoteClient";

export default function FreeQuotePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <FreeQuoteClient />
    </Suspense>
  );
}
