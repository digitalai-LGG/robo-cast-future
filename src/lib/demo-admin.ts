export const LOCAL_ADMIN_BYPASS =
  import.meta.env.DEV && import.meta.env.VITE_LOCAL_ADMIN_BYPASS === "true";
export const DEMO_EMAIL = import.meta.env.VITE_DEMO_ADMIN_EMAIL ?? "admin@modtech.com";
export const DEMO_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD ?? "";
export const DEMO_MODE =
  LOCAL_ADMIN_BYPASS || (import.meta.env.DEV && Boolean(DEMO_EMAIL.trim() && DEMO_PASSWORD.trim()));

const SESSION_KEY = "modtech-demo-admin";
const DATA_KEY = "modtech-demo-admin-data";

export type DemoRow = Record<string, unknown> & { id?: string | number };

type DemoData = Record<string, DemoRow[]>;

const initialData: DemoData = {
  announcement_bar: [
    {
      id: 1,
      message:
        "Engineering manufacturing systems since 1990 — Investment Casting Machines & Robotic Automation",
      redirect_url: "/contact",
      is_visible: true,
      active_until: null,
      updated_at: "2026-10-03T17:30:00.000Z",
    },
  ],
  blog_posts: [
    {
      id: "demo-post-1",
      title: "Building repeatable investment casting workflows",
      slug: "repeatable-investment-casting-workflows",
      kind: "article",
      category: "casting",
      author: "Modtech Machine",
      read_minutes: 5,
      cover_url: "",
      excerpt: "A practical guide to improving process consistency across the foundry floor.",
      body: "Demo article content for local admin testing.",
      tags: ["casting", "process"],
      pinned: true,
      published: true,
      published_at: "2026-09-18T10:00:00.000Z",
      updated_at: "2026-09-18T10:00:00.000Z",
    },
  ],
  products: [
    {
      id: "demo-product-1",
      title: "Six Axis Robotic Cell",
      code: "MRC-600",
      slug: "six-axis-robotic-cell",
      category: "robotics",
      section: "flexible-industrial-automation",
      sort_order: 1,
      image_url: "/productsimg/robots/robot-6-axis.jpg",
      gallery_images: [],
      tagline: "Flexible automation for demanding production lines.",
      description: "Demo product used for local admin testing.",
      highlights: ["Flexible", "Repeatable", "Connected"],
      applications: ["Machine tending", "Material handling"],
      specs: [{ label: "Payload", value: "20 kg" }],
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
  ],
  news_items: [
    {
      id: "demo-news-1",
      title: "New automation cell commissioned",
      tag: "Company",
      category: "automation",
      date_label: "SEP 2026",
      sort_order: 1,
      image_url: "",
      excerpt: "Demo news entry for the local control centre.",
      body: "## Project overview\n\nA new automation cell has been commissioned for repeatable, high-throughput production.\n\n## Key outcomes\n\n- Improved cycle consistency\n- Better operator safety\n- Production data visibility",
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
  ],
  exhibitions: [
    {
      id: "demo-event-1",
      title: "Industrial Automation Expo",
      date_label: "NOV 2026",
      location: "Pune, India",
      sort_order: 1,
      image_url: "",
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
  ],
  career_vacancies: [
    ["Marketing Engineer","1","Service","Degree","2–5 Years","Industrial marketing, lead generation, customer visits, product presentations and coordination with sales and technical teams."],
    ["Service Engineer Support","1","Service","Degree","3–5 Years","Provide technical support, troubleshoot machine and equipment issues, coordinate service calls, prepare service reports and support field engineers."],
    ["Design Engineer IC","1","Design","Degree","2–3 Years","Prepare 2D/3D machine designs, develop component drawings, check dimensions and tolerances, revise drawings and coordinate with production."],
    ["Design Engineer Automation","1","Design","Degree","2–3 Years","Design automation systems and machine layouts, prepare 2D/3D drawings, select components and coordinate with electrical, PLC and production teams."],
    ["Design Engineer Automation (Senior)","1","Design","Degree","3–6 Years","Lead automation design activities, review concepts and drawings, guide junior designers and coordinate project execution."],
    ["Purchase Procurement Engineer","1","Purchase","Degree","3–5 Years","Source suppliers, obtain quotations, negotiate prices, release purchase orders, follow deliveries and maintain supplier records."],
    ["Senior Purchase Engineer – Costing","1","Purchase","Degree","4–7 Years","Prepare cost comparisons, analyse BOM and material costs, negotiate vendors and support cost-reduction initiatives."],
    ["Service Engineer","1","Service","Degree","3–5 Years","Install and commission machines, attend breakdowns, diagnose faults, perform maintenance, train customers and submit reports."],
    ["Store Executive","1","Store","Degree","1–2 Years","Handle material receipt and issue, maintain stock records, perform physical checks, update ERP entries and coordinate with departments."],
    ["SAP Operator","1","SAP","Degree","1–2 Years","Enter transactions in SAP, maintain data accuracy, generate reports and support inventory and procurement entries."],
    ["Purchase Engineer","1","Purchase","Degree","1–2 Years","Assist vendor development, collect quotations, process purchase orders, follow deliveries and maintain purchase documentation."],
    ["Robotics Engineer","1","Robotics","Degree","1–3 Years","Support robot programming and integration, troubleshoot robotic systems, assist commissioning and coordinate with PLC teams."],
    ["Design Engineer IC (Machine)","1","Design","Degree","2–3 Years","Prepare machine concepts, 2D/3D models and manufacturing drawings, check fitment and dimensions and coordinate with production."],
    ["Electrical Purchase Engineer","1","Purchase","Degree","4–6 Years","Procure electrical components, review specifications, compare quotations, negotiate prices and track deliveries."],
    ["Electrical Design Engineer","1","Design","Degree","2–4 Years","Prepare electrical schematics, wiring diagrams and panel layouts, select components and prepare BOMs."],
    ["Design Engineer IC (Pre-Sales)","1","Design","Degree","2–3 Years","Support pre-sales with concepts, layouts, technical drawings and costing inputs, and coordinate with sales and design teams."],
    ["Testing Engineer","1","Testing","Degree","1–3 Years","Carry out machine testing and inspections, record results, identify faults and coordinate corrective actions."],
    ["Testing Engineer (Electrical)","1","Testing","Degree","1–3 Years","Test electrical panels and machine wiring, verify safety circuits and prepare electrical test reports."],
    ["QC Engineer","1","Quality Control","Degree","2–3 Years","Inspect incoming and finished products, verify specifications and drawings and coordinate corrective actions."],
    ["QC Inspector","1","Quality Control","Degree","2–3 Years","Conduct dimensional and visual inspections, use measuring instruments and maintain inspection records."],
    ["Store Manager","1","Store","Degree","10–12 Years","Manage store operations and inventory, lead the team, ensure stock accuracy and oversee ERP records."],
    ["Spares Coordinator","1","Service","Degree","4–5 Years","Coordinate spare-parts requirements, identify parts from BOMs and monitor quotations and dispatch follow-ups."],
    ["Design Engineer IC (Shelling)","1","Design","Degree","2–3 Years","Develop shelling-machine components, prepare drawings, check dimensions and assembly fitment and coordinate changes."],
    ["Design Engineer IC (R&D)","1","Design","Degree","3–4 Years","Support product R&D, develop concepts and prototypes, test improvements and prepare technical documentation."],
    ["Design Engineer IC (Documentation)","1","Design","Degree","1–2 Years","Prepare engineering drawings and BOMs, manage revisions and ensure document accuracy and approvals."],
    ["Design Automation Engineer","1","Design","Degree","2–3 Years","Prepare automation layouts and drawings, support component selection and coordinate with electrical/PLC teams."],
    ["Mechanical Purchase Engineer","1","Purchase","Degree","2–3 Years","Procure mechanical parts, interpret drawings, compare quotations, negotiate suppliers and track deliveries."],
    ["Junior Accountant","1","Accounts","Degree","1–2 Years","Handle entries, invoices, vouchers and reconciliations and support GST/TDS records and reporting."],
  ].map((item, index) => ({
      id: `demo-career-${index + 1}`,
      title: item[0],
      openings: Number(item[1]),
      department: item[2],
      qualification: item[3],
      experience: item[4],
      responsibilities: item[5],
      sort_order: (index + 1) * 10,
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    })),
  gallery_items: [
    {
      id: "demo-gallery-1",
      title: "Office meets engineering",
      category: "office",
      location: "Modtech engineering campus",
      image_url: "/gallery/modtech-office-hero.webp",
      alt_text: "Contemporary office overlooking a robotics integration floor",
      caption: "Customer conversations, engineering decisions and execution happen side by side.",
      featured: true,
      sort_order: 1,
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
    {
      id: "demo-gallery-2",
      title: "Engineering design studio",
      category: "team",
      location: "Design & applications office",
      image_url: "/gallery/engineering-design-studio.webp",
      alt_text: "Automation engineers collaborating around a mechanical design workstation",
      caption: "Cross-functional teams develop machine concepts, tooling and controls.",
      featured: false,
      sort_order: 2,
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
    {
      id: "demo-gallery-3",
      title: "Project review room",
      category: "office",
      location: "Customer engineering centre",
      image_url: "/gallery/project-review-room.webp",
      alt_text: "Engineering leaders reviewing project drawings beside the automation floor",
      caption: "Structured project reviews connect design decisions to manufacturing reality.",
      featured: false,
      sort_order: 3,
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
    {
      id: "demo-gallery-4",
      title: "Ideas move faster together",
      category: "team",
      location: "Engineering collaboration lounge",
      image_url: "/gallery/team-collaboration.webp",
      alt_text: "Engineering and operations team discussing a project in a modern office",
      caption: "Mechanical, electrical, controls and operations expertise come together.",
      featured: false,
      sort_order: 4,
      published: true,
      updated_at: "2026-09-18T10:00:00.000Z",
    },
  ],
  enquiries: [
    {
      id: "demo-enquiry-1",
      name: "Demo Customer",
      company: "Example Manufacturing",
      email: "customer@example.com",
      phone: "+91 90000 00000",
      message: "We would like to discuss a robotic machine-tending cell.",
      status: "new",
      created_at: "2026-09-19T08:30:00.000Z",
    },
  ],
  site_settings: [
    { key: "admin_notify_email", value: "sales@modtech.example" },
    { key: "sender_email", value: "noreply@modtech.example" },
    { key: "sender_name", value: "Modtech Machine" },
  ],
};

export function hasDemoSession() {
  return DEMO_MODE && sessionStorage.getItem(SESSION_KEY) === "active";
}

export function startDemoSession() {
  sessionStorage.setItem(SESSION_KEY, "active");
}

export function endDemoSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function readData(): DemoData {
  const stored = localStorage.getItem(DATA_KEY);
  if (!stored) return structuredClone(initialData);
  try {
    return JSON.parse(stored) as DemoData;
  } catch {
    return structuredClone(initialData);
  }
}

function writeData(data: DemoData) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function getDemoRows(table: string) {
  return readData()[table] ?? [];
}

export function saveDemoRow(table: string, row: DemoRow) {
  const data = readData();
  const rows = data[table] ?? [];
  const next = { ...row, id: row.id ?? `demo-${crypto.randomUUID()}` };
  const index = rows.findIndex((item) => item.id === next.id);
  if (index >= 0) rows[index] = next;
  else rows.unshift(next);
  data[table] = rows;
  writeData(data);
}

export function deleteDemoRow(table: string, id: string | number) {
  const data = readData();
  data[table] = (data[table] ?? []).filter((item) => item.id !== id);
  writeData(data);
}

export function updateDemoRow(table: string, id: string | number, values: DemoRow) {
  const data = readData();
  data[table] = (data[table] ?? []).map((item) => (item.id === id ? { ...item, ...values } : item));
  writeData(data);
}

export function saveDemoSettings(values: Record<string, string>) {
  const data = readData();
  data.site_settings = Object.entries(values).map(([key, value]) => ({ key, value }));
  writeData(data);
}
