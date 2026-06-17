import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validace
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Chybí povinná pole (jméno, email nebo zpráva)." },
        { status: 400 }
      );
    }

    // Jednoduché ověření formátu e-mailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Neplatný formát e-mailové adresy." },
        { status: 400 }
      );
    }

    // Simulace zpoždění odesílání e-mailu (např. odeslání přes Nodemailer / SendGrid)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Zde by v produkci bylo např. odeslání e-mailu:
    console.log(`[Contact API] Nová zpráva od ${name} (${email}):`);
    console.log(`Předmět: ${subject || "Bez předmětu"}`);
    console.log(`Text: ${message}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Při zpracování zprávy došlo k chybě na serveru." },
      { status: 500 }
    );
  }
}
