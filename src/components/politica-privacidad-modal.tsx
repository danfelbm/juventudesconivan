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
      <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[85vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Política de Tratamiento de Datos Personales</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className="flex-1 px-6 overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 140px)" }}
        >
          <div className="space-y-6 text-sm pb-6">
            {/* Identificación del Responsable */}
            <section>
              <h3 className="font-bold text-base mb-2">
                1. Identificación del Responsable del Tratamiento
              </h3>
              <p className="mb-2">
                <strong>Responsable:</strong> Juventudes con Iván - Movimiento
                Pacto Histórico
              </p>
              <p className="mb-1">
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:contacto@juventudesconivan.co"
                  className="underline"
                >
                  contacto@juventudesconivan.co
                </a>
              </p>
              <p>
                <strong>Domicilio:</strong> Bogotá D.C., Colombia
              </p>
            </section>

            {/* Marco Legal */}
            <section>
              <h3 className="font-bold text-base mb-2">2. Marco Legal</h3>
              <p>
                Esta política se rige por la Constitución Política de Colombia
                (Artículo 15), la Ley Estatutaria 1581 de 2012, el Decreto
                Reglamentario 1377 de 2013 (compilado en el Decreto 1074 de
                2015), y demás normas que las modifiquen, adicionen o
                complementen, incluyendo las circulares emitidas por la
                Superintendencia de Industria y Comercio (SIC).
              </p>
            </section>

            {/* Datos Recopilados */}
            <section>
              <h3 className="font-bold text-base mb-2">
                3. Datos Personales Recopilados
              </h3>
              <p className="mb-2">Recopilamos los siguientes datos:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>
                  <strong>Datos de identificación:</strong> nombres, apellidos
                </li>
                <li>
                  <strong>Datos de contacto:</strong> correo electrónico,
                  teléfono
                </li>
                <li>
                  <strong>Datos demográficos:</strong> localidad (Bogotá),
                  género, edad, profesión
                </li>
                <li>
                  <strong>Datos de redes sociales:</strong> perfiles públicos
                  (opcional)
                </li>
                <li>
                  <strong>Datos organizacionales:</strong> organización a la que
                  pertenece (opcional)
                </li>
                <li>
                  <strong>Perfil de participación:</strong> Expedicionario,
                  Analista o Inmunólogo
                </li>
              </ul>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-semibold text-xs mb-1">
                  AVISO SOBRE DATOS SENSIBLES:
                </p>
                <p className="text-xs">
                  De conformidad con el Artículo 5 de la Ley 1581 de 2012, los
                  datos que revelen orientación política o pertenencia a
                  organizaciones políticas son considerados{" "}
                  <strong>datos sensibles</strong>. Su suministro es{" "}
                  <strong>voluntario</strong> y usted{" "}
                  <strong>no está obligado</strong> a proporcionarlos. El
                  tratamiento de estos datos requiere su autorización expresa.
                </p>
              </div>
            </section>

            {/* Finalidades */}
            <section>
              <h3 className="font-bold text-base mb-2">
                4. Finalidades del Tratamiento
              </h3>
              <p className="mb-2">
                Sus datos personales serán utilizados para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Gestionar su registro y participación en las actividades del
                  movimiento Juventudes con Iván y el Pacto Histórico
                </li>
                <li>
                  Enviar información sobre eventos, campañas, actividades
                  políticas y convocatorias
                </li>
                <li>
                  Mantener comunicación relacionada con iniciativas políticas,
                  sociales y legislativas
                </li>
                <li>
                  Elaborar estadísticas internas y análisis demográficos
                  agregados (no individualizados)
                </li>
                <li>
                  Contactarlo para actividades de voluntariado y participación
                  ciudadana
                </li>
                <li>
                  Cumplir con obligaciones legales derivadas de la actividad
                  política
                </li>
              </ul>
            </section>

            {/* Derechos del Titular */}
            <section>
              <h3 className="font-bold text-base mb-2">
                5. Derechos del Titular (Derechos ARCO)
              </h3>
              <p className="mb-2">
                De acuerdo con el Artículo 8 de la Ley 1581 de 2012, usted tiene
                derecho a:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Acceso:</strong> Conocer los datos personales que
                  obren en nuestras bases de datos
                </li>
                <li>
                  <strong>Rectificación:</strong> Actualizar y rectificar datos
                  parciales, inexactos, incompletos o que induzcan a error
                </li>
                <li>
                  <strong>Cancelación:</strong> Solicitar la supresión de sus
                  datos cuando no se respeten los principios, derechos y
                  garantías constitucionales y legales
                </li>
                <li>
                  <strong>Oposición:</strong> Revocar la autorización otorgada
                  y/u oponerse al tratamiento
                </li>
                <li>
                  Solicitar prueba de la autorización otorgada, salvo las
                  excepciones previstas en la ley
                </li>
                <li>
                  Ser informado sobre el uso que se ha dado a sus datos
                  personales
                </li>
                <li>
                  Presentar quejas ante la Superintendencia de Industria y
                  Comercio por infracciones a la ley
                </li>
                <li>
                  Acceder de forma gratuita a sus datos personales al menos una
                  vez cada mes calendario
                </li>
              </ul>
            </section>

            {/* Procedimiento */}
            <section>
              <h3 className="font-bold text-base mb-2">
                6. Procedimiento para Ejercer sus Derechos
              </h3>
              <p className="mb-2">
                Para ejercer cualquiera de sus derechos, puede comunicarse a:
              </p>
              <p className="mb-3">
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:contacto@juventudesconivan.co"
                  className="underline"
                >
                  contacto@juventudesconivan.co
                </a>
              </p>
              <p className="mb-2">
                <strong>Plazos de respuesta (según Ley 1581 de 2012):</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Consultas:</strong> Máximo 10 días hábiles desde la
                  recepción. Si no es posible atenderla en dicho término, se
                  informará al interesado los motivos y la fecha de respuesta,
                  que no podrá superar los 5 días hábiles siguientes.
                </li>
                <li>
                  <strong>Reclamos:</strong> Máximo 15 días hábiles desde la
                  recepción. Si no es posible atenderla en dicho término, se
                  informará al interesado los motivos y la fecha de respuesta,
                  que no podrá superar los 8 días hábiles siguientes.
                </li>
              </ul>
            </section>

            {/* Seguridad */}
            <section>
              <h3 className="font-bold text-base mb-2">
                7. Medidas de Seguridad
              </h3>
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y
                físicas para proteger sus datos personales contra pérdida,
                alteración, destrucción, acceso no autorizado o uso fraudulento.
                Nuestros sistemas utilizan encriptación y protocolos de
                seguridad acordes con los estándares de la industria. El acceso
                a los datos está restringido a personal autorizado que requiere
                dicha información para cumplir con sus funciones.
              </p>
            </section>

            {/* Conservación */}
            <section>
              <h3 className="font-bold text-base mb-2">
                8. Conservación de los Datos
              </h3>
              <p>
                Sus datos personales serán conservados durante el tiempo
                necesario para cumplir con las finalidades descritas en esta
                política. Una vez cumplida la finalidad o cuando usted solicite
                su supresión, procederemos a eliminar sus datos de nuestras
                bases de datos, salvo que exista un deber legal o contractual
                que requiera su conservación.
              </p>
            </section>

            {/* Transferencias */}
            <section>
              <h3 className="font-bold text-base mb-2">
                9. Transferencia de Datos
              </h3>
              <p>
                Sus datos podrán ser compartidos con las organizaciones que
                componen el movimiento Pacto Histórico y sus fuerzas aliadas,
                exclusivamente para las finalidades descritas en esta política.
                No transferimos ni vendemos sus datos a terceros con fines
                comerciales. En caso de ser necesaria alguna transferencia
                adicional, se le informará previamente y se solicitará su
                autorización expresa.
              </p>
            </section>

            {/* Menores de edad */}
            <section>
              <h3 className="font-bold text-base mb-2">
                10. Tratamiento de Datos de Menores de Edad
              </h3>
              <p>
                El tratamiento de datos de niños, niñas y adolescentes se
                realizará respetando el interés superior de los menores y
                asegurando el respeto de sus derechos fundamentales. Para
                menores de 14 años se requiere autorización del representante
                legal. Los adolescentes entre 14 y 18 años pueden otorgar
                autorización, siempre que el tratamiento responda a sus derechos
                fundamentales.
              </p>
            </section>

            {/* Modificaciones */}
            <section>
              <h3 className="font-bold text-base mb-2">
                11. Modificaciones a la Política
              </h3>
              <p>
                Nos reservamos el derecho de modificar esta política en
                cualquier momento. Las modificaciones serán comunicadas a través
                de nuestros canales oficiales y/o al correo electrónico
                registrado. El uso continuado de nuestros servicios después de
                dichas modificaciones constituye su aceptación de los cambios.
              </p>
            </section>

            {/* Autorización */}
            <section>
              <h3 className="font-bold text-base mb-2">12. Autorización</h3>
              <p>
                Al marcar la casilla de aceptación de esta política y enviar el
                formulario de registro, usted declara que:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Ha leído y comprendido esta política en su totalidad</li>
                <li>
                  Autoriza de manera previa, expresa e informada el tratamiento
                  de sus datos personales
                </li>
                <li>
                  Autoriza expresamente el tratamiento de datos sensibles
                  relacionados con su orientación política
                </li>
                <li>
                  Conoce que puede revocar esta autorización en cualquier
                  momento
                </li>
              </ul>
            </section>

            {/* Contacto y quejas */}
            <section>
              <h3 className="font-bold text-base mb-2">13. Contacto y Quejas</h3>
              <p className="mb-2">
                Para cualquier consulta, reclamo o solicitud relacionada con el
                tratamiento de sus datos personales:
              </p>
              <p className="mb-3">
                <strong>Correo:</strong>{" "}
                <a
                  href="mailto:contacto@juventudesconivan.co"
                  className="underline"
                >
                  contacto@juventudesconivan.co
                </a>
              </p>
              <p className="text-xs text-muted-foreground">
                Si considera que sus derechos han sido vulnerados, puede
                presentar una queja ante la Superintendencia de Industria y
                Comercio (SIC) -{" "}
                <a
                  href="https://www.sic.gov.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  www.sic.gov.co
                </a>
              </p>
            </section>

            {/* Vigencia */}
            <section className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                <strong>Fecha de entrada en vigencia:</strong> Enero de 2025
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Última actualización:</strong> Enero de 2025
              </p>
            </section>
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
