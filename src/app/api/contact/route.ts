import { NextResponse } from "next/server";
import { di } from "../../../infrastructure/di";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Use Case očekává validaci z doménové vrstvy, proto vše delegujeme.
    await di.submitContactFormUseCase.execute({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Contact API Error]:", error);
    
    // Pokud je chyba vyvolaná doménovou validací, vracíme 400 Bad Request.
    // Pro jednoduchost (KISS) to teď testujeme dle typu nebo jen na základě zprávy, 
    // ideálně by error instance měla vlastní DomainError třídu.
    if (error instanceof Error && (error.message.includes("Chybí povinná pole") || error.message.includes("Neplatný formát"))) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Při zpracování zprávy došlo k chybě na serveru." },
      { status: 500 }
    );
  }
}
