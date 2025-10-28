import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    if (email) {
      router.push(`/dashboard?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🔐 Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>Entrar</button>
      </form>
    </main>
  );
}
