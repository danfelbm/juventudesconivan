import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { registroFormSchema } from "@/lib/validations";
import { getEmailTemplate } from "@/lib/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos con Zod
    const validationResult = registroFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Crear cliente Supabase
    const supabase = createServerClient();

    // Insertar registro principal
    const { data: registro, error: registroError } = await supabase
      .from("juventudesivan_registros")
      .insert({
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        localidad: data.localidad,
        organizacion: data.organizacion || null,
        profesion: data.profesion || null,
        genero: data.genero,
        edad: data.edad,
        perfil: data.perfil,
        acepta_politica: data.aceptaPolitica,
      })
      .select("id")
      .single();

    if (registroError) {
      console.error("Error inserting registro:", registroError);

      // Verificar si es error de email duplicado
      if (registroError.code === "23505") {
        return NextResponse.json(
          { error: "Este email ya está registrado" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Error al guardar el registro" },
        { status: 500 }
      );
    }

    // Insertar redes sociales si hay
    if (data.redesSociales && data.redesSociales.length > 0) {
      const redesInsert = data.redesSociales.map((red) => ({
        registro_id: registro.id,
        red_social: red.red_social,
        valor: red.valor,
      }));

      const { error: redesError } = await supabase
        .from("juventudesivan_redes_sociales")
        .insert(redesInsert);

      if (redesError) {
        console.error("Error inserting redes sociales:", redesError);
        // No retornamos error, el registro principal ya se guardó
      }
    }

    // Enviar email de confirmación
    try {
      await resend.emails.send({
        from: "Juventudes con Iván <onboarding@resend.dev>",
        to: data.email,
        subject: "Confirmación de Registro - Juventudes con Iván",
        html: getEmailTemplate({
          nombres: data.nombres,
          apellidos: data.apellidos,
        }),
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // No retornamos error, el registro ya se guardó
    }

    return NextResponse.json(
      { success: true, message: "Registro exitoso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
