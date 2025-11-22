import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConvertAI - Optimización UX con IA",
  description: "Duplica tu tasa de conversión con análisis automatizado por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
