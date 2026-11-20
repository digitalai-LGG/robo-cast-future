-- Career vacancies: department + responsibilities.
--
-- 0013_career_requisition_details.sql was never applied to the live database -
-- two different migrations were both numbered 0013, so one of them was skipped.
-- Production still has career_vacancies without these two columns, which makes
-- every save from the admin Careers screen fail, because the form requires both.
--
-- Safe to re-run: columns are added only when missing and the seed only fills an
-- empty table, so applying this after 0013 changes nothing.
ALTER TABLE public.career_vacancies
  ADD COLUMN IF NOT EXISTS department text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS responsibilities text NOT NULL DEFAULT '';

INSERT INTO public.career_vacancies
  (title, openings, department, qualification, experience, responsibilities, sort_order, published)
SELECT * FROM (VALUES
  ('Marketing Engineer', 1, 'Service', 'Degree', '2-5 Years', 'Industrial marketing, lead generation, customer visits, product presentations and coordination with sales and technical teams.', 10, true),
  ('Service Engineer Support', 1, 'Service', 'Degree', '3-5 Years', 'Provide technical support to customers, troubleshoot machine and equipment issues, coordinate service calls, prepare service reports and support field engineers.', 20, true),
  ('Design Engineer IC', 1, 'Design', 'Degree', '2-3 Years', 'Prepare 2D/3D machine designs, develop component drawings, check dimensions and tolerances, revise drawings and coordinate with production.', 30, true),
  ('Design Engineer Automation', 1, 'Design', 'Degree', '2-3 Years', 'Design automation systems and machine layouts, prepare 2D/3D drawings, select components and coordinate with electrical, PLC and production teams.', 40, true),
  ('Purchase Procurement Engineer', 1, 'Purchase', 'Degree', '3-5 Years', 'Source suppliers, obtain and compare quotations, negotiate prices, release purchase orders, follow up deliveries and maintain supplier records.', 50, true),
  ('Service Engineer', 1, 'Service', 'Degree', '3-5 Years', 'Install and commission machines, attend breakdowns, diagnose faults, perform preventive maintenance, provide customer training and submit service reports.', 60, true),
  ('Store Executive', 1, 'Store', 'Degree', '1-2 Years', 'Handle material receipt and issue, maintain stock records, perform physical stock checks, update ERP entries and coordinate with purchase and production.', 70, true),
  ('Robotics Engineer', 1, 'Robotics', 'Degree', '1-3 Years', 'Support robot programming and integration, troubleshoot robotic systems, assist commissioning and coordinate with PLC and electrical teams.', 80, true),
  ('Electrical Design Engineer', 1, 'Design', 'Degree', '2-4 Years', 'Prepare electrical schematics, wiring diagrams and panel layouts, select electrical components, prepare BOMs and support testing and commissioning.', 90, true),
  ('QC Engineer', 1, 'Quality Control', 'Degree', '2-3 Years', 'Inspect incoming, in-process and final products, verify specifications and drawings, document non-conformities and coordinate corrective and preventive actions.', 100, true)
) AS seed(title, openings, department, qualification, experience, responsibilities, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM public.career_vacancies);
