import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, GhostCta, PageHero, PrimaryCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology & Infrastructure — ManuQube" },
      { name: "description", content: "PostgreSQL, Kubernetes (K3s), Longhorn, layered access controls and disciplined release practices behind ManuQube." },
      { property: "og:title", content: "Technology & Infrastructure — ManuQube" },
      { property: "og:description", content: "PostgreSQL, Kubernetes (K3s), Longhorn, layered access controls and disciplined release practices behind ManuQube." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tech,
});

const sections = [
  ["Data integrity", "Keep the rules close to the records", ["The self-hosted MES backend uses PostgreSQL with Supabase services for authentication, APIs, real-time updates and file storage. Relational records give production steps, material movements and operational evidence a structured foundation.", "Critical MES controls operate in the database, including permission checks on controlled transactions and checks on material consumption. Row-level access policies constrain which records authenticated users can access. These controls help maintain consistent rules when requests arrive through different screens or supported service interfaces."], "Greater confidence that operational records follow the same rules wherever a transaction starts."],
  ["Access governance", "Connect business authority to technical controls", ["AMS provides the platform's central place to manage users, roles and module permissions. Connected applications query that authority and enforce access within their own workflows. Server-side authorization and database access policies provide additional controls behind the interface.", "Infrastructure access has its own boundaries. Private VPN access, restricted management routes, HTTPS and backend credential management help protect the services supporting daily operations. Sensitive server credentials remain behind the application boundary."], "A clearer connection between who is authorized to act and how that authority is enforced."],
  ["Service resilience", "Manage the platform across nodes", ["The infrastructure configuration uses Kubernetes through K3s across a three-node cluster. Containerized services give technical teams a repeatable packaging and deployment model, while Kubernetes manages placement and restart behavior.", "Longhorn replicates persistent volume data. HAProxy and Keepalived provide a shared traffic entry point with failover configuration, and Traefik routes requests to the relevant application services. These mechanisms support resilience at different infrastructure layers.", "Recovery depends on the service, available capacity and failure conditions. The current self-hosted MES database has one active instance per environment; its recovery can require a restart and volume reattachment."], "Less dependence on individual components and a practical foundation for service recovery and managed maintenance."],
  ["Release discipline", "Check changes before they reach production", ["Development, staging and production use separate Kubernetes namespaces within the shared cluster. The self-hosted MES backend has independent database deployments, persistent volumes and credentials for each environment. Network policies, resource quotas and access permissions add boundaries around workloads.", "Defined build and release paths support repeatable application delivery. Staging provides a place to validate changes before production release. Database migrations follow a separate review process, keeping application delivery and database change authorization explicit."], "More control over changes that affect live manufacturing operations, with clearer responsibilities at each release stage."],
  ["Monitoring", "Give technical teams a shared view", ["Prometheus and Grafana monitoring configuration supports the collection and review of infrastructure health and resource usage. Rancher provides a Kubernetes management layer for technical operations.", "Manufacturing dashboards explain what is happening in production. Infrastructure monitoring helps technical teams investigate the systems behind those workflows, assess resource constraints and plan maintenance."], "Better evidence for troubleshooting, capacity planning and maintenance decisions."],
  ["Recovery planning", "Protect the ability to resume work", ["Replicated storage, recovery copies and configuration recovery serve different purposes. Longhorn provides a storage replication layer. The self-hosted MES backend also defines daily local database and file recovery copies with seven-day retention.", "The deployment recovery plan should establish acceptable downtime, acceptable data loss, off-site protection and restoration testing. Those decisions need to reflect the business impact of an interruption and the responsibilities agreed for the deployment."], "A concrete basis for setting recovery priorities before an incident occurs."],
  ["Growth", "Expand with an assessable foundation", ["Container packaging, Kubernetes workload management and namespace resource budgets give technical teams explicit tools for managing application demand. As modules and usage expand, teams can review service load, storage consumption and cluster capacity to plan the next stage.", "Established technologies and documented service interfaces support technical due diligence. Expansion requirements and performance targets can be assessed against the manufacturing workloads the business expects."], "A clearer basis for planning platform growth alongside operational adoption."],
] as const;

const table = [
  ["PostgreSQL and Supabase services in the MES backend", "Structured data, authentication, APIs, real-time updates and files", "A coherent foundation for operational records and application services"],
  ["Database rules and row-level policies", "Data-layer validation and access enforcement", "Consistent controls across supported transaction paths"],
  ["AMS and application authorization", "Central access governance with application enforcement", "Clearer ownership of user authority across modules"],
  ["Kubernetes / K3s and containers", "Managed placement, restarts and deployment", "Repeatable operations and service recovery"],
  ["Longhorn replicated storage", "Persistent volume replication", "An additional resilience layer for stateful workloads"],
  ["HAProxy, Keepalived and Traefik", "Traffic routing and entry-point failover configuration", "Managed access to services across cluster nodes"],
  ["Separate environments and reviewed migrations", "Validation and change boundaries", "Greater control over production releases"],
  ["VPN, HTTPS and backend secrets", "Restricted management access and protected credentials", "Reduced exposure of privileged services"],
  ["Prometheus, Grafana and Rancher", "Monitoring and cluster management", "Evidence for troubleshooting and capacity decisions"],
  ["Recovery copies and restoration planning", "Preparation for service restoration", "Recovery priorities aligned with business needs"],
];

function Tech() {
  return (
    <>
      <PageHero eyebrow="Technology & Infrastructure" position="center 82%" tone="neutral" title="A serious foundation for the factory you are building." sub="Manufacturing software needs more than a clear interface. ManuQube brings established database technology, container orchestration, layered access controls and disciplined release practices together to support trustworthy records and controlled operations.">
        <div className="flex flex-wrap gap-3"><PrimaryCta to="/contact">Book a platform walkthrough</PrimaryCta><GhostCta to="/contact">Discuss your IT requirements</GhostCta></div>
      </PageHero>
      <section className="container-x grid gap-10 pb-20 lg:grid-cols-2">
        <Reveal><h2 className="text-4xl">Technology with a business purpose</h2></Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-muted-foreground">
          <p>Every production transaction has a consequence: material is consumed, an order advances, a quality decision is recorded or a user receives authority to act. The platform beneath those transactions needs to preserve data, enforce rules and give technical teams visibility into service health.</p>
          <p>ManuQube's infrastructure foundation addresses those needs across the application, database, network and delivery layers. Business leaders gain a clearer basis for assessing operational risk. IT teams gain recognizable building blocks they can examine and manage.</p>
        </Reveal>
      </section>
      <section className="container-x">
        {sections.map(([k, t, ps, v], i) => (
          <div key={k} className="grid gap-8 border-t border-border py-16 lg:grid-cols-[1fr_2fr]">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")} / {k}</div>
              <h3 className="mt-3 text-3xl">{t}</h3>
            </Reveal>
            <Reveal delay={0.1} className="space-y-5 text-lg text-muted-foreground">
              {ps.map((p) => <p key={p}>{p}</p>)}
              <div className="rounded-xl border-l-2 border-primary bg-card p-5 text-foreground"><span className="eyebrow mr-2 text-primary">Business value</span>{v}</div>
            </Reveal>
          </div>
        ))}
      </section>
      <section className="container-x py-20">
        <Reveal><h2 className="text-4xl">The foundation at a glance</h2></Reveal>
        <Reveal delay={0.1} className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[48rem] text-left">
            <thead className="bg-card font-mono text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Technology or practice</th><th className="p-4">Platform role</th><th className="p-4">Business relevance</th></tr></thead>
            <tbody>{table.map((r) => <tr key={r[0]} className="border-t border-border hover:bg-card/60">{r.map((c, j) => <td key={j} className={`p-4 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </Reveal>
      </section>
      <ClosingCta title="Bring your IT team. Bring your operational requirements." text="Explore application boundaries, AMS permissions, environment separation, integrations, monitoring and recovery requirements in a platform walkthrough. Establish what your rollout needs and how those requirements will be verified." button="Arrange a technical discovery session" />
    </>
  );
}
