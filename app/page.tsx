import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PLATAFORMA } from "@/lib/config";
import { getUtilizador } from "@/lib/auth";

export default async function LandingPage() {
  const user = await getUtilizador();
  const autenticado = !!user;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado={autenticado} />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 gold-divider" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
              {PLATAFORMA.mentora.nome}
            </p>
            <div className="w-8 gold-divider" />
          </div>

          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            <span className="gold-text-rich">{PLATAFORMA.fraseAncora}</span>
          </h1>

          <p className="text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed mb-10">
            {PLATAFORMA.subtitulo}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {autenticado ? (
              <Button href="/jornada" size="lg">
                A minha jornada
              </Button>
            ) : (
              <>
                <Button href="/registo" size="lg">
                  Começar agora
                </Button>
                <Button href="/login" variant="outline" size="lg">
                  Já tenho conta
                </Button>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
