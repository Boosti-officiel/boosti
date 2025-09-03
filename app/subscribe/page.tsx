"use client";
import { useState } from "react";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const goCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", { method: "POST" });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url; // redirection Stripe Checkout
    } catch (e) {
      alert("Impossible d’ouvrir le paiement. Réessaie.");
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Abonnement Défi Jour</h1>
      <p>1,99 € / mois — résiliable à tout moment.</p>
      <button onClick={goCheckout} disabled={loading}
        style={{ padding: "12px 16px", borderRadius: 10, fontWeight: 800 }}>
        {loading ? "Ouverture…" : "Passer au paiement sécurisé"}
      </button>
    </main>
  );
}
