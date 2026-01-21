"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PoliticaPrivacidadModalProps {
  trigger: React.ReactNode;
}

export function PoliticaPrivacidadModal({
  trigger,
}: PoliticaPrivacidadModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[85vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Política de Privacidad</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 px-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 140px)" }}>
          <div className="space-y-4 text-sm pb-4">
            <h3 className="font-bold text-base">
              1. Responsable del Tratamiento
            </h3>
            <p>
              Juventudes con Iván Cepeda es responsable del tratamiento de los
              datos personales que usted proporcione a través de este
              formulario.
            </p>

            <h3 className="font-bold text-base">
              2. Finalidad del Tratamiento
            </h3>
            <p>Los datos personales recabados serán utilizados para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestionar su participación en las actividades del movimiento</li>
              <li>Enviar información sobre eventos, campañas y actividades</li>
              <li>Mantener comunicación relacionada con iniciativas políticas y sociales</li>
              <li>Elaborar estadísticas internas</li>
            </ul>

            <h3 className="font-bold text-base">3. Datos Recopilados</h3>
            <p>
              Recopilamos los siguientes datos: nombre completo, correo
              electrónico, teléfono, localidad, organización, redes sociales,
              profesión, género, edad y perfil de participación.
            </p>

            <h3 className="font-bold text-base">4. Derechos del Titular</h3>
            <p>
              Usted tiene derecho a conocer, actualizar, rectificar y suprimir
              sus datos personales, así como a revocar la autorización otorgada.
            </p>

            <h3 className="font-bold text-base">5. Seguridad</h3>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y
              físicas para proteger sus datos personales contra daño, pérdida,
              alteración, destrucción o uso no autorizado.
            </p>

            <h3 className="font-bold text-base">6. Contacto</h3>
            <p>
              Para ejercer sus derechos o realizar consultas sobre el
              tratamiento de sus datos, puede contactarnos a través de los
              canales oficiales del movimiento.
            </p>

            <p className="text-muted-foreground mt-6 text-xs">
              Al aceptar esta política, usted autoriza expresamente el
              tratamiento de sus datos personales conforme a los términos aquí
              descritos.
            </p>
          </div>
        </ScrollArea>
        <div className="flex justify-end px-6 py-4 border-t bg-background">
          <DialogTrigger asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
