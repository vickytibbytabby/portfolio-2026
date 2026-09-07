import Link from "next/link";

export default function NotFound() {
  return (
    <main className="inset" style={{ paddingBlock: "18vh", textAlign: "center" }}>
      <h1 className="sectionTitle">[Not found]</h1>
      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ fontFamily: "var(--hand)", fontSize: "var(--fs-ui)" }}>
          &larr; Home
        </Link>
      </p>
    </main>
  );
}
