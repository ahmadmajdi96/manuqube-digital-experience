import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, PageHero, SectionHead } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security, compliance & integrations — ManuQube" },
      { name: "description", content: "Single access hub, least privilege, tamper-evident records, electronic signatures and secure integrations with ERP, machines and carriers." },
      { property: "og:title", content: "Security, compliance & integrations — ManuQube" },
      { property: "og:description", content: "Single access hub, least privilege, tamper-evident records, electronic signatures and secure integrations with ERP, machines and carriers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: P,
});
function G({ items, cols = "lg:grid-cols-3" }: { items: string[][]; cols?: string }) {
  return (
    <Stagger className={`mt-12 grid gap-5 md:grid-cols-2 ${cols}`}>
      {items.map(([t, d], k) => (
        <StaggerItem key={t} className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary">
          <div className="font-mono text-xs text-primary">{String(k + 1).padStart(2, "0")}</div>
          <h3 className="mt-6 text-2xl">{t}</h3>
          <p className="mt-3 text-muted-foreground">{d}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
const sec = [["Single access hub", "One identity and role model for all modules, with idle sign-out."], ["Least privilege", "Permissions checked per person, per module and per action."], ["Tamper-evident records", "Hash-chained audit log with verification and export."], ["Electronic signatures", "Password and reason, signature meaning, blocked self-approval."], ["Data retention & legal hold", "Configurable per record type."], ["Secure integrations", "Signed messages, hashed API keys, idempotent processing."], ["Machine safety", "Commands blocked until safety sign-off is valid; sign-off auto-voids on change."]];
const integ = [["ERP", "Orders and master data in; confirmations, goods receipts and consumption out."], ["Sales channels & e-commerce", "Orders into OMS."], ["Carriers", "Shipment and tracking links."], ["CMMS / maintenance", "Asset status, spare parts and maintenance requests."], ["Machines & PLCs", "11 industrial protocols via the edge gateway."], ["Files & spreadsheets", "CSV, JSON and Excel import/export with preview."], ["Open API", "REST endpoints, webhooks and message logs with retry."]];
function P() {
  return (<>
    <PageHero eyebrow="Security & compliance" title="Every action has an owner, a reason and a record." />
    <section className="container-x pb-20"><G items={sec} /></section>
    <section className="container-x grid gap-10 pb-24 lg:grid-cols-2">
      <SectionHead eyebrow="Behind the application" title="Infrastructure controls behind the application." />
      <Reveal className="space-y-5 text-lg text-muted-foreground"><p>Private management access, network policies, HTTPS, backend credential management and separate deployment environments complement AMS and application permissions. Together, they support protection across the user interface, backend services and infrastructure.</p><p>Security and compliance requirements should be assessed against the customer's processes, deployment scope and validation evidence. Technology controls support that assessment; certifications and regulatory acceptance require their own evidence.</p></Reveal>
    </section>
    <section className="border-t border-border bg-card/40 py-24"><div className="container-x"><SectionHead eyebrow="Integrations" title="Open at every edge." /><G items={integ} cols="lg:grid-cols-4" /></div></section>
    <ClosingCta />
  </>);
}
