import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-3">
              Bem-vinda de volta
            </p>
            <h1 className="font-serif italic text-3xl gold-text-rich">Entrar</h1>
          </div>
          <Card variant="rich">
            <LoginForm />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
