import { RegistroForm } from "@/components/registro-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Juventudes con Iván
          </h1>
          <p className="text-muted-foreground mt-2">
            Únete al movimiento juvenil
          </p>
        </div>
        <RegistroForm />
      </main>
    </div>
  );
}
