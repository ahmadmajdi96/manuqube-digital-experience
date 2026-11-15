import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClosingCta, PageHero } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ManuQube Manufacturing Operating System" },
      { name: "description", content: "Answers about MOM, modules, ERP, machines, regulated industries, implementation, offline use and the technology behind ManuQube." },
      { property: "og:title", content: "FAQ — ManuQube Manufacturing Operating System" },
      { property: "og:description", content: "Answers about MOM, modules, ERP, machines, regulated industries, implementation, offline use and the technology behind ManuQube." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: P,
});
const faq = [
  ["What is a MOM platform?", "Manufacturing Operations Management covers ISA-95 Level 3: production, quality, inventory, scheduling, recipes and tracking, between ERP and machines."],
  ["Do I need all nine modules?", "No. Each module works on its own and gets stronger as you connect more."],
  ["Does ManuQube replace my ERP?", "No. ManuQube complements ERP — it receives orders and master data and returns confirmations, receipts and consumption."],
  ["Can it connect to my machines?", "Yes, through the ManuQube edge gateway with 11 industrial protocols and safety sign-off before commands."],
  ["Is it suitable for regulated industries?", "Yes — electronic signatures with reason, approval workflows, hash-chained audit and retention policies are built in."],
  ["How long does implementation take?", "A single module can typically go live in weeks; the full platform is rolled out in phases."],
  ["Can it run on multiple plants?", "Yes — shared master data with per-plant lines, time zones, shifts and warehouses."],
  ["Does it work offline?", "Critical shop-floor actions such as waste recording keep working offline and sync when the connection returns."],
  ["What technology supports ManuQube?", "The reviewed infrastructure uses Kubernetes through K3s, Longhorn storage, HAProxy and Traefik traffic management, and Prometheus/Grafana monitoring. The self-hosted MES backend uses PostgreSQL with Supabase services for authentication, APIs, real-time updates and file storage."],
  ["How does AMS relate to infrastructure security?", "AMS manages users, roles and module permissions. Connected applications enforce that authority, while infrastructure controls protect network access, management services and backend credentials. These layers address different parts of platform protection."],
  ["How are changes checked before production?", "Separate development, staging and production environments support validation through defined release paths. Database changes have a separate review process."],
  ["Does replicated infrastructure guarantee uninterrupted operation?", "Recovery depends on the component and deployment design. The current MES backend has one active database instance per environment, so database recovery can involve downtime. Availability and recovery targets should be agreed for the deployment."],
  ["How are recovery copies handled?", "The MES backend defines daily local database and file recovery copies with seven-day retention, alongside replicated persistent storage. Off-site protection, restoration testing and recovery objectives should be established in the deployment recovery plan."],
];
function P() {
  return (<>
    <PageHero eyebrow="FAQ" position="78% 30%" tone="neutral" title="Questions, answered precisely." />
    <section className="container-x max-w-4xl pb-12">
      <Reveal><Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
        {faq.map(([q, a], k) => (
          <AccordionItem key={q} value={String(k)} className="border-0">
            <AccordionTrigger className="py-6 text-left text-xl hover:no-underline"><span><span className="mr-4 font-mono text-sm text-primary">{String(k + 1).padStart(2, "0")}</span>{q}</span></AccordionTrigger>
            <AccordionContent className="pb-6 pl-10 text-lg text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion></Reveal>
    </section>
    <ClosingCta />
  </>);
}
