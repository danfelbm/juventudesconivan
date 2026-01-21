import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, valor } = body as { tipo: string; valor: string };

    if (!tipo || !valor) {
      return NextResponse.json(
        { error: "Tipo y valor son requeridos" },
        { status: 400 }
      );
    }

    if (tipo !== "email" && tipo !== "telefono") {
      return NextResponse.json(
        { error: "Tipo debe ser 'email' o 'telefono'" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    let query = supabase
      .from("juventudesivan_registros")
      .select("id")
      .limit(1);

    if (tipo === "email") {
      query = query.eq("email", valor);
    } else {
      query = query.eq("telefono", valor);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error checking duplicate:", error);
      return NextResponse.json(
        { error: "Error al verificar" },
        { status: 500 }
      );
    }

    const existe = data && data.length > 0;

    return NextResponse.json({ existe });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
