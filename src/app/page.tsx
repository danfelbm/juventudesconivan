import { RegistroForm } from "@/components/registro-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 md:py-16">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Juventudes con Iván
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Únete al movimiento juvenil
          </p>
        </div>
        <RegistroForm />
      </main>
    </div>
  );
}
