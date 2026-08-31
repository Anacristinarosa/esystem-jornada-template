import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { RegisterForm } from "@/components/auth/register-form";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Criar conta" };

export default function RegistoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-3">
              Começa a tua jornada
            </p>
            <h1 className="font-serif italic text-3xl gold-text-rich">Criar conta</h1>
          </div>
          <Card variant="rich">
            <RegisterForm />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
