import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

interface NavProps {
  autenticado?: boolean;
}

export function Nav({ autenticado = false }: NavProps) {
  return (
    <nav
      className="border-b backdrop-blur-sm"
      style={{
        borderColor: "rgba(237, 217, 150, 0.4)",
        backgroundColor: "rgba(253, 251, 245, 0.8)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          {autenticado ? (
            <>
              <Button href="/jornada" variant="ghost" size="sm">
                A minha jornada
              </Button>
              <form action="/api/auth/logout" method="post">
                <Button variant="outline" size="sm" type="submit">
                  Sair
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">
                Entrar
              </Button>
              <Button href="/registo" size="sm">
                Criar conta
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
