import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerMentora } from "@/lib/auth";
import { getAlunasComProgresso } from "@/lib/data/admin";
import { formatarData } from "@/lib/utils";
import { Users, TrendingUp, Clock } from "lucide-react";

export const metadata = { title: "Painel da mentora" };

export default async function AdminPage() {
  await requerMentora();
  const alunas = await getAlunasComProgresso();

  const totalAlunas = alunas.length;
  const alunasAtivas = alunas.filter((a) => a.conteudos_feitos > 0).length;
  const paradasHa7dias = alunas.filter((a) => {
    if (!a.ultima_atividade) return false;
    const dias =
      (Date.now() - new Date(a.ultima_atividade).getTime()) / (1000 * 60 * 60 * 24);
    return dias > 7 && a.conteudos_feitos > 0 && a.conteudos_feitos < a.conteudos_totais;
  }).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Painel da mentora
              </p>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl gold-text-rich mb-3">
              As tuas alunas
            </h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-10">
            <MetricCard
              icone={Users}
              titulo="Alunas registadas"
              valor={totalAlunas}
              cor="gold"
            />
            <MetricCard
              icone={TrendingUp}
              titulo="Ativas"
              valor={alunasAtivas}
              cor="success"
            />
            <MetricCard
              icone={Clock}
              titulo="Precisam da tua atenção"
              valor={paradasHa7dias}
              cor="warn"
              nota="Paradas há +7 dias"
            />
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-gold-200">
                <tr>
                  <Th>Aluna</Th>
                  <Th>Email</Th>
                  <Th>Registo</Th>
                  <Th>Última atividade</Th>
                  <Th right>Progresso</Th>
                </tr>
              </thead>
              <tbody>
                {alunas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-ink-soft py-10">
                      Ainda não tens alunas registadas.
                    </td>
                  </tr>
                ) : (
                  alunas.map((a) => (
                    <tr key={a.id} className="border-b border-gold-100 last:border-0">
                      <Td>
                        <span className="font-serif italic text-lg">
                          {a.nome ?? "—"}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-sm text-ink-soft">{a.email}</span>
                      </Td>
                      <Td>
                        <span className="text-xs text-ink-faint">
                          {formatarData(a.criada_em)}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-xs text-ink-faint">
                          {a.ultima_atividade ? formatarData(a.ultima_atividade) : "—"}
                        </span>
                      </Td>
                      <Td right>
                        <span className="font-serif italic text-base text-gold-700">
                          {a.conteudos_feitos}/{a.conteudos_totais}
                        </span>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MetricCard({
  icone: Icone,
  titulo,
  valor,
  cor,
  nota,
}: {
  icone: React.ElementType;
  titulo: string;
  valor: number;
  cor: "gold" | "success" | "warn";
  nota?: string;
}) {
  const corMap = {
    gold: "text-gold-700 bg-gold-gradient",
    success: "text-success bg-cream-100",
    warn: "text-amber-700 bg-amber-50",
  };
  return (
    <div className="rounded-2xl bg-cream-50 gold-border gold-shadow p-6">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${corMap[cor]}`}>
        <Icone className="w-5 h-5" />
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-ink-faint mb-1">
        {titulo}
      </p>
      <p className="font-serif italic text-4xl gold-text-rich">{valor}</p>
      {nota && <p className="text-[11px] text-ink-faint mt-1">{nota}</p>}
    </div>
  );
}

function Th({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-6 py-4 text-[10px] tracking-[0.2em] uppercase text-gold-600 font-medium ${
        right ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return <td className={`px-6 py-4 ${right ? "text-right" : ""}`}>{children}</td>;
}
