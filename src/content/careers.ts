/**
 * Canonical list of open positions, taken from the HR requisition sheet.
 *
 * Compensation is deliberately not part of this model: the budgeted CTC is an
 * internal figure and is never published on the website. Salary is discussed
 * with shortlisted candidates directly.
 *
 * The Careers page prefers published rows from Supabase and falls back to this
 * list, so the page still shows real openings when the CMS is unreachable.
 */
export type Vacancy = {
  id: string;
  title: string;
  openings: number;
  department: string;
  qualification: string;
  experience: string;
  responsibilities: string;
};

type VacancySeed = Omit<Vacancy, "id">;

const vacancySeeds: VacancySeed[] = [
  {
    title: "Design Engineer IC",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Prepare 2D/3D machine designs, develop component drawings, check dimensions and tolerances, revise drawings and coordinate with production.",
  },
  {
    title: "Design Engineer IC (Machine)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Prepare machine design concepts, 2D/3D models and manufacturing drawings, check fitment and design feasibility and coordinate with production.",
  },
  {
    title: "Design Engineer IC (Shelling)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Develop shelling-machine design components, prepare 2D/3D drawings, check dimensions and assembly fitment and coordinate design changes with production.",
  },
  {
    title: "Design Engineer IC (Pre-Sales)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Support pre-sales with machine concepts, layouts, technical drawings and costing inputs, understand customer requirements and coordinate with sales and design teams.",
  },
  {
    title: "Design Engineer IC (R&D)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "3–4 Years",
    responsibilities:
      "Support product research and development, develop design concepts and prototypes, test design improvements, prepare technical documentation and coordinate validation.",
  },
  {
    title: "Design Engineer IC (Documentation)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "1–2 Years",
    responsibilities:
      "Prepare and maintain engineering drawings, BOMs and technical documents, manage revisions, ensure document accuracy and coordinate approvals.",
  },
  {
    title: "Design Engineer Automation",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Design automation systems and machine layouts, prepare 2D/3D drawings, select components and coordinate with electrical, PLC and production teams.",
  },
  {
    title: "Design Engineer Automation (Senior)",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "3–6 Years",
    responsibilities:
      "Lead automation design activities, review machine concepts and drawings, guide junior designers, ensure design feasibility and coordinate project execution.",
  },
  {
    title: "Design Automation Engineer",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Prepare automation machine layouts and design drawings, support component selection, coordinate with electrical and PLC teams and ensure design readiness for manufacturing.",
  },
  {
    title: "Electrical Design Engineer",
    openings: 1,
    department: "Design",
    qualification: "Degree",
    experience: "2–4 Years",
    responsibilities:
      "Prepare electrical schematics, wiring diagrams and panel layouts, select electrical components, prepare BOMs and support testing and commissioning.",
  },
  {
    title: "Robotics Engineer",
    openings: 1,
    department: "Robotics",
    qualification: "Degree",
    experience: "1–3 Years",
    responsibilities:
      "Support robot programming and integration, troubleshoot robotic systems, assist commissioning, coordinate with PLC and electrical teams and maintain technical documentation.",
  },
  {
    title: "Service Engineer",
    openings: 1,
    department: "Service",
    qualification: "Degree",
    experience: "3–5 Years",
    responsibilities:
      "Install and commission machines, attend breakdowns, diagnose faults, perform preventive maintenance, provide customer training and submit service reports.",
  },
  {
    title: "Service Engineer Support",
    openings: 1,
    department: "Service",
    qualification: "Degree",
    experience: "3–5 Years",
    responsibilities:
      "Provide technical support to customers, troubleshoot machine and equipment issues, coordinate service calls, prepare service reports and support field engineers.",
  },
  {
    title: "Spares Coordinator",
    openings: 1,
    department: "Service",
    qualification: "Degree",
    experience: "4–5 Years",
    responsibilities:
      "Coordinate spare-parts requirements, identify parts from BOMs, prepare quotations and dispatch plans, monitor stock and follow up with customers and internal teams.",
  },
  {
    title: "Marketing Engineer",
    openings: 1,
    department: "Service",
    qualification: "Degree",
    experience: "2–5 Years",
    responsibilities:
      "Industrial marketing, lead generation, customer visits, product presentations and coordination with sales and technical teams.",
  },
  {
    title: "Purchase Procurement Engineer",
    openings: 1,
    department: "Purchase",
    qualification: "Degree",
    experience: "3–5 Years",
    responsibilities:
      "Source suppliers, obtain and compare quotations, negotiate prices, release purchase orders, follow up deliveries and maintain supplier records.",
  },
  {
    title: "Senior Purchase Engineer – Costing",
    openings: 1,
    department: "Purchase",
    qualification: "Degree",
    experience: "4–7 Years",
    responsibilities:
      "Prepare cost comparisons, analyse BOM and material costs, negotiate with vendors, evaluate alternate suppliers and support cost-reduction initiatives.",
  },
  {
    title: "Electrical Purchase Engineer",
    openings: 1,
    department: "Purchase",
    qualification: "Degree",
    experience: "4–6 Years",
    responsibilities:
      "Procure electrical components, review technical specifications, compare vendor quotations, negotiate prices, track delivery and coordinate with design and electrical teams.",
  },
  {
    title: "Mechanical Purchase Engineer",
    openings: 1,
    department: "Purchase",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Procure mechanical parts and fabricated items, interpret drawings and specifications, compare quotations, negotiate with suppliers and track material delivery.",
  },
  {
    title: "Purchase Engineer",
    openings: 1,
    department: "Purchase",
    qualification: "Degree",
    experience: "1–2 Years",
    responsibilities:
      "Assist in vendor development, quotation collection, purchase order processing, delivery follow-up and purchase documentation.",
  },
  {
    title: "Testing Engineer",
    openings: 1,
    department: "Testing",
    qualification: "Degree",
    experience: "1–3 Years",
    responsibilities:
      "Carry out machine testing, functional checks and quality inspections, record test results, identify faults and coordinate corrective actions before dispatch.",
  },
  {
    title: "Testing Engineer (Electrical)",
    openings: 1,
    department: "Testing",
    qualification: "Degree",
    experience: "1–3 Years",
    responsibilities:
      "Test electrical panels and machine wiring, verify electrical components and safety circuits, troubleshoot faults and prepare electrical test reports.",
  },
  {
    title: "QC Engineer",
    openings: 1,
    department: "Quality Control",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Inspect incoming, in-process and final products, verify specifications and drawings, document non-conformities and coordinate corrective and preventive actions.",
  },
  {
    title: "QC Inspector",
    openings: 1,
    department: "Quality Control",
    qualification: "Degree",
    experience: "2–3 Years",
    responsibilities:
      "Conduct dimensional and visual inspections, use measuring instruments, maintain inspection records and report deviations to the quality team.",
  },
  {
    title: "Store Manager",
    openings: 1,
    department: "Store",
    qualification: "Degree",
    experience: "10–12 Years",
    responsibilities:
      "Manage stores and inventory operations, lead the store team, control inward and outward material, ensure stock accuracy and oversee ERP records.",
  },
  {
    title: "Store Executive",
    openings: 1,
    department: "Store",
    qualification: "Degree",
    experience: "1–2 Years",
    responsibilities:
      "Handle material receipt and issue, maintain stock records, perform physical stock checks, update ERP entries and coordinate with purchase and production.",
  },
  {
    title: "SAP Operator",
    openings: 1,
    department: "SAP",
    qualification: "Degree",
    experience: "1–2 Years",
    responsibilities:
      "Enter and update transactions in SAP, maintain data accuracy, generate reports, support inventory and procurement entries and coordinate with relevant departments.",
  },
  {
    title: "Junior Accountant",
    openings: 1,
    department: "Accounts",
    qualification: "Degree",
    experience: "1–2 Years",
    responsibilities:
      "Handle accounting entries, invoices, vouchers and reconciliations, assist with GST and TDS records and support routine accounts reporting.",
  },
];

export const careerVacancies: Vacancy[] = vacancySeeds.map((seed, index) => ({
  id: `modtech-role-${index + 1}`,
  ...seed,
}));

/** Filter order follows the catalogue order above, so the chips stay stable. */
export const careerDepartments = Array.from(
  new Set(careerVacancies.map((vacancy) => vacancy.department)),
);
