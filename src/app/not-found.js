"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section
        className="container"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="handwritten-lg">oops... page not found</h1>
        <p className="margin-note" style={{ marginTop: "16px" }}>
          (I probably moved it and forgot to update the link)
        </p>
        <Link
          href="/"
          className="contact-link"
          style={{ marginTop: "32px" }}
        >
          <ArrowLeft size={16} />
          <span>back to the notebook</span>
        </Link>
      </section>
    </Layout>
  );
}
