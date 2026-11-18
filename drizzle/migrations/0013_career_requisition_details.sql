-- Extend career vacancies with department and role responsibilities.
ALTER TABLE public.career_vacancies
  ADD COLUMN IF NOT EXISTS department text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS responsibilities text NOT NULL DEFAULT '';

INSERT INTO public.career_vacancies
  (title, openings, department, qualification, experience, responsibilities, sort_order, published)
VALUES
  ('Marketing Engineer', 1, 'Service', 'Degree', '2–5 Years', 'Industrial marketing, lead generation, customer visits, product presentations and coordination with sales and technical teams.', 10, true),
  ('Service Engineer Support', 1, 'Service', 'Degree', '3–5 Years', 'Provide technical support to customers, troubleshoot machine and equipment issues, coordinate service calls, prepare service reports and support field engineers.', 20, true),
  ('Design Engineer IC', 1, 'Design', 'Degree', '2–3 Years', 'Prepare 2D/3D machine designs, develop component drawings, check dimensions and tolerances, revise drawings and coordinate with production.', 30, true),
  ('Design Engineer Automation', 1, 'Design', 'Degree', '2–3 Years', 'Design automation systems and machine layouts, prepare 2D/3D drawings, select components and coordinate with electrical, PLC and production teams.', 40, true),
  ('Design Engineer Automation (Senior)', 1, 'Design', 'Degree', '3–6 Years', 'Lead automation design activities, review machine concepts and drawings, guide junior designers, ensure design feasibility and coordinate project execution.', 50, true),
  ('Purchase Procurement Engineer', 1, 'Purchase', 'Degree', '3–5 Years', 'Source suppliers, obtain and compare quotations, negotiate prices, release purchase orders, follow up deliveries and maintain supplier records.', 60, true),
  ('Senior Purchase Engineer – Costing', 1, 'Purchase', 'Degree', '4–7 Years', 'Prepare cost comparisons, analyse BOM and material costs, negotiate with vendors, evaluate alternate suppliers and support cost-reduction initiatives.', 70, true),
  ('Service Engineer', 1, 'Service', 'Degree', '3–5 Years', 'Install and commission machines, attend breakdowns, diagnose faults, perform preventive maintenance, provide customer training and submit service reports.', 80, true),
  ('Store Executive', 1, 'Store', 'Degree', '1–2 Years', 'Handle material receipt and issue, maintain stock records, perform physical stock checks, update ERP entries and coordinate with purchase and production.', 90, true),
  ('SAP Operator', 1, 'SAP', 'Degree', '1–2 Years', 'Enter and update transactions in SAP, maintain data accuracy, generate reports, support inventory and procurement entries and coordinate with relevant departments.', 100, true),
  ('Purchase Engineer', 1, 'Purchase', 'Degree', '1–2 Years', 'Assist in vendor development, quotation collection, purchase order processing, delivery follow-up and purchase documentation.', 110, true),
  ('Robotics Engineer', 1, 'Robotics', 'Degree', '1–3 Years', 'Support robot programming and integration, troubleshoot robotic systems, assist commissioning and coordinate with PLC and electrical teams.', 120, true),
  ('Design Engineer IC (Machine)', 1, 'Design', 'Degree', '2–3 Years', 'Prepare machine design concepts, 2D/3D models and manufacturing drawings, check fitment and dimensions, assess design feasibility and coordinate with production.', 130, true),
  ('Electrical Purchase Engineer', 1, 'Purchase', 'Degree', '4–6 Years', 'Procure electrical components, review technical specifications, compare vendor quotations, negotiate prices and track deliveries.', 140, true),
  ('Electrical Design Engineer', 1, 'Design', 'Degree', '2–4 Years', 'Prepare electrical schematics, wiring diagrams and panel layouts, select electrical components, prepare BOMs and support testing and commissioning.', 150, true),
  ('Design Engineer IC (Pre-Sales)', 1, 'Design', 'Degree', '2–3 Years', 'Support pre-sales with machine concepts, layouts, technical drawings and costing inputs, understand customer requirements and coordinate with sales and design teams.', 160, true),
  ('Testing Engineer', 1, 'Testing', 'Degree', '1–3 Years', 'Carry out machine testing, functional checks and quality inspections, record test results, identify faults and coordinate corrective actions before dispatch.', 170, true),
  ('Testing Engineer (Electrical)', 1, 'Testing', 'Degree', '1–3 Years', 'Test electrical panels and machine wiring, verify electrical components and safety circuits, troubleshoot faults and prepare electrical test reports.', 180, true),
  ('QC Engineer', 1, 'Quality Control', 'Degree', '2–3 Years', 'Inspect incoming, in-process and final products, verify specifications and drawings, document non-conformities and coordinate corrective and preventive actions.', 190, true),
  ('QC Inspector', 1, 'Quality Control', 'Degree', '2–3 Years', 'Conduct dimensional and visual inspections, use measuring instruments, maintain inspection records and report deviations.', 200, true),
  ('Store Manager', 1, 'Store', 'Degree', '10–12 Years', 'Manage stores and inventory operations, lead the store team, control inward and outward material, ensure stock accuracy and oversee ERP records.', 210, true),
  ('Spares Coordinator', 1, 'Service', 'Degree', '4–5 Years', 'Coordinate spare-parts requirements, identify parts from BOMs, prepare quotations and dispatch plans, monitor stock and follow up with customers and internal teams.', 220, true),
  ('Design Engineer IC (Shelling)', 1, 'Design', 'Degree', '2–3 Years', 'Develop shelling-machine design components, prepare 2D/3D drawings, check dimensions and assembly fitment, and coordinate design changes with production.', 230, true),
  ('Design Engineer IC (R&D)', 1, 'Design', 'Degree', '3–4 Years', 'Support product research and development, develop design concepts and prototypes, test design improvements and prepare technical documentation.', 240, true),
  ('Design Engineer IC (Documentation)', 1, 'Design', 'Degree', '1–2 Years', 'Prepare and maintain engineering drawings, BOMs and technical documents, manage revisions, ensure document accuracy and coordinate approvals.', 250, true),
  ('Design Automation Engineer', 1, 'Design', 'Degree', '2–3 Years', 'Prepare automation machine layouts and design drawings, support component selection and coordinate with electrical and PLC teams.', 260, true),
  ('Mechanical Purchase Engineer', 1, 'Purchase', 'Degree', '2–3 Years', 'Procure mechanical parts and fabricated items, interpret drawings and specifications, compare quotations, negotiate with suppliers and track delivery.', 270, true),
  ('Junior Accountant', 1, 'Accounts', 'Degree', '1–2 Years', 'Handle accounting entries, invoices and vouchers, perform reconciliations and support GST, TDS records and routine accounts reporting.', 280, true);
