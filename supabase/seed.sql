-- ============================================================
-- SEED: PHASES
-- ============================================================
insert into public.phases (id, name, description, start_date, end_date, status, order_num) values
  ('phase-1', 'Phase 1: Do Now',              'Start drawings, order anchor pins, place structure order, contact Oncor utility, begin USDA loan process, begin permit research, line up crews.',         '2026-04-07', '2026-05-01', 'in_progress', 1),
  ('phase-2', 'Phase 2: Pre-Close',           'Finalize drawings, submit permits, confirm structure delivery schedule, continue USDA appraisal, lock in grading contractor.',                           '2026-05-01', '2026-06-01', 'not_started', 2),
  ('phase-3', 'Phase 3: Foundation',          'Close on land June 1, grading begins, anchor pins and foundation layout, drainage and irrigation rough-in, foundation work.',                            '2026-06-01', '2026-07-15', 'not_started', 3),
  ('phase-4', 'Phase 4: Structure',           'Steel structure delivery from Rich VanWingerden, steel erection, ventilation system install, gutter and aluminum mounting. Kentucky crew on site.',       '2026-07-15', '2026-09-15', 'not_started', 4),
  ('phase-5', 'Phase 5: Glazing & Screens',   'Roof glazing, gable wall glazing, roll-up screen installation, twin gable screens, screen cloth.',                                                       '2026-09-15', '2026-10-31', 'not_started', 5),
  ('phase-6', 'Phase 6: MEP & Finishing',     'Unit heater installation, electrical for ventilation motors and controls, water and irrigation, 3-phase power connection from Oncor.',                   '2026-10-15', '2026-12-15', 'not_started', 6),
  ('phase-7', 'Phase 7: Commissioning',       'Systems testing, punch list, operational January 1, 2027.',                                                                                              '2026-12-15', '2027-01-01', 'not_started', 7)
on conflict (id) do nothing;

-- ============================================================
-- SEED: TASKS
-- ============================================================
-- Phase 1 — DO NOW
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-1', 'Contact Oncor Texas — 3-phase power run (~1 mile)',            'Samuel', '2026-04-10', 'not_started', 'CRITICAL: Could take 3–6 months. Start immediately. Run is approximately 1 mile from property.',                          true,  1),
  ('phase-1', 'Place full structure order with Rich VanWingerden',            'Samuel', '2026-04-25', 'not_started', 'CRITICAL: 2–3 month lead time. Must order by late April. Complete drawings first.',                                       true,  2),
  ('phase-1', 'Start drawings with Rich VanWingerden',                        'Samuel', '2026-04-10', 'not_started', 'Begin immediately. Drawings needed before permits can be submitted and structure order placed.',                           false, 3),
  ('phase-1', 'Order anchor pins',                                            'Art',    '2026-04-15', 'not_started', '2–3 week lead time. Order now so they are on site when foundation begins June 1.',                                        false, 4),
  ('phase-1', 'Contact USDA FSA Coryell County — begin loan application',     'Samuel', '2026-04-10', 'not_started', 'CRITICAL: 3–6 month process. Get contact info and begin application immediately. Includes appraisal, environmental review, and approval.', true,  5),
  ('phase-1', 'Schedule USDA land appraisal and evaluation',                  'Samuel', '2026-04-15', 'not_started', 'Required for USDA loan process. Schedule ASAP after initial contact.',                                                   false, 6),
  ('phase-1', 'Begin permit research with Coryell County',                    'Art',    '2026-04-15', 'not_started', 'CRITICAL: Research requirements now. Submit permits as soon as drawings are finalized.',                                  true,  7),
  ('phase-1', 'Get grading contractor quotes (15 acres)',                     'Titus',  '2026-04-25', 'not_started', 'CRITICAL: 2–4 feet of soil movement over 15 acres. Contractor must be locked in and ready to mobilize June 1.',          true,  8),
  ('phase-1', 'Identify and contract local Texas construction crew',          'Titus',  '2026-04-30', 'not_started', 'Local crew for general construction support throughout the build.',                                                       false, 9),
  ('phase-1', 'Line up Kentucky crew for steel erection window',              'Samuel', '2026-04-30', 'not_started', 'Kentucky crew needed on site during Phase 4 steel erection (July 15 – September 15, 2026).',                            false, 10)
on conflict do nothing;

-- Phase 2 — PRE-CLOSE
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-2', 'Finalize drawings with Rich VanWingerden',                     'Samuel', '2026-05-15', 'not_started', 'Finalized drawings required before county permit submission.',                                                            false, 1),
  ('phase-2', 'Submit permits to Coryell County',                             'Art',    '2026-05-20', 'not_started', 'CRITICAL: Submit as soon as drawings are finalized.',                                                                    true,  2),
  ('phase-2', 'Confirm structure delivery schedule with Rich VanWingerden',   'Samuel', '2026-05-15', 'not_started', 'Target delivery: July 15, 2026. Confirm timing.',                                                                       false, 3),
  ('phase-2', 'USDA appraisal underway — follow up',                          'Samuel', '2026-05-15', 'not_started', 'Ensure appraisal is scheduled and in progress.',                                                                        false, 4),
  ('phase-2', 'Lock in grading contractor — ready to mobilize June 1',        'Titus',  '2026-05-25', 'not_started', 'CRITICAL: Contractor must be committed and ready to roll June 1.',                                                      true,  5),
  ('phase-2', 'Continue Oncor utility engagement — get timeline estimate',    'Samuel', '2026-06-01', 'not_started', 'Follow up on 3-phase power run timeline. Must know estimated completion date.',                                          false, 6)
on conflict do nothing;

-- Phase 3 — FOUNDATION
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-3', 'Close on land — June 1',                                       'Samuel', '2026-06-01', 'not_started', 'Property in Oglesby, Texas, Coryell/McLennan County area near Waco.',                                                    false, 1),
  ('phase-3', 'Mobilize grading contractor immediately',                      'Titus',  '2026-06-02', 'not_started', 'Begin grading 15 acres, 2–4 feet of soil movement.',                                                                    false, 2),
  ('phase-3', 'Anchor pins on site and foundation layout begins',             'Art',    '2026-06-15', 'not_started', 'Layout the anchor pin grid for the 5-acre greenhouse footprint.',                                                        false, 3),
  ('phase-3', 'Drainage and irrigation rough-in',                             'Titus',  '2026-07-01', 'not_started', 'Install drainage and irrigation infrastructure during foundation phase.',                                                 false, 4),
  ('phase-3', 'Foundation work complete',                                     'Art',    '2026-07-15', 'not_started', 'No in-floor heat — simpler foundation than typical greenhouse build.',                                                   false, 5)
on conflict do nothing;

-- Phase 4 — STRUCTURE
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-4', 'Steel structure delivery from Rich VanWingerden',              'Samuel', '2026-07-15', 'not_started', '5-acre commercial glass greenhouse structure. Coordinate delivery logistics.',                                            false, 1),
  ('phase-4', 'Steel erection',                                               'Titus',  '2026-08-15', 'not_started', 'Kentucky crew on site during this window. Coordinate schedules.',                                                        false, 2),
  ('phase-4', 'Ventilation system installation',                              'Art',    '2026-08-31', 'not_started', 'Roll-up screens and full ventilation system.',                                                                           false, 3),
  ('phase-4', 'Gutter and aluminum mounting',                                 'Art',    '2026-09-10', 'not_started', 'Gutter system and aluminum glazing frame mounting.',                                                                     false, 4)
on conflict do nothing;

-- Phase 5 — GLAZING & SCREENS
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-5', 'Roof glazing',                                                 'Titus',  '2026-10-01', 'not_started', 'Full glass glazing for greenhouse roof.',                                                                               false, 1),
  ('phase-5', 'Gable wall glazing',                                           'Titus',  '2026-10-15', 'not_started', 'Glass glazing for gable end walls.',                                                                                    false, 2),
  ('phase-5', 'Roll-up screen installation',                                  'Art',    '2026-10-20', 'not_started', 'Install roll-up shade/ventilation screens.',                                                                            false, 3),
  ('phase-5', 'Twin gable screen installation',                               'Art',    '2026-10-25', 'not_started', 'Install twin gable end screens.',                                                                                       false, 4),
  ('phase-5', 'Screen cloth installation',                                    'Titus',  '2026-10-31', 'not_started', 'Install screen cloth throughout.',                                                                                      false, 5)
on conflict do nothing;

-- Phase 6 — MEP & FINISHING
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-6', 'Unit heater installation',                                     'Art',    '2026-11-15', 'not_started', 'Propane or gas TBD. No in-floor heat. Unit heaters only.',                                                              false, 1),
  ('phase-6', 'Electrical — ventilation motors and controls',                 'Titus',  '2026-11-30', 'not_started', 'Electrical connection for all ventilation motors and environmental controls.',                                            false, 2),
  ('phase-6', 'Water and irrigation technical installation',                  'Titus',  '2026-12-01', 'not_started', 'Install water distribution and irrigation system throughout greenhouse.',                                                 false, 3),
  ('phase-6', 'Connect 3-phase power from Oncor',                            'Samuel', '2026-12-01', 'not_started', 'Oncor power run should be complete by this point if started in April. Coordinate final connection.',                     false, 4)
on conflict do nothing;

-- Phase 7 — COMMISSIONING
insert into public.tasks (phase_id, title, assignee, due_date, status, notes, is_critical_path, order_num) values
  ('phase-7', 'Systems testing — heat, ventilation, irrigation, electrical',  'Samuel', '2026-12-20', 'not_started', 'Test all systems end-to-end before operational date.',                                                                  false, 1),
  ('phase-7', 'Punch list',                                                   'Art',    '2026-12-28', 'not_started', 'Identify and complete all outstanding items.',                                                                           false, 2),
  ('phase-7', 'Operational — January 1, 2027',                               'Samuel', '2027-01-01', 'not_started', 'Greenhouse fully operational. Goal date.',                                                                               false, 3)
on conflict do nothing;

-- ============================================================
-- SEED: CONTACTS
-- ============================================================
insert into public.contacts (name, role, phone, email, notes, order_num) values
  ('Samuel',                       'Owner / Partner',               '', '', 'One of three owners. Primary point of contact for structure, USDA loan, and utility.', 1),
  ('Art',                          'Owner / Partner',               '', '', 'One of three owners. Focused on permits, foundation, and screens.', 2),
  ('Titus',                        'Owner / Partner',               '', '', 'One of three owners. Leading crew coordination, grading, and structural erection.', 3),
  ('Rich VanWingerden',            'Greenhouse Structure Supplier', '', '', '5-acre commercial glass greenhouse structure. Includes unit heaters, roll-up screens, ventilation, gutters, and full glazing. 2–3 month lead time on order.', 4),
  ('USDA FSA Coryell County',      'Loan & Appraisal',             '', '', 'Contact for USDA loan application and land appraisal. Process can take 3–6 months. Start immediately.', 5),
  ('Oncor Texas',                  '3-Phase Power Utility',        '', '', '3-phase power run approximately 1 mile to property. Contact immediately — could take 3–6 months. Critical path item.', 6),
  ('Coryell County Permitting',    'Building Permits',             '', '', 'Submit permits as soon as drawings are finalized. Begin permit research now.', 7),
  ('Grading Contractor',           'Earthwork / Site Prep',        '', '', 'TBD. 15 acres, 2–4 feet of soil movement. Must be locked in and ready to mobilize June 1.', 8),
  ('Local Texas Construction Crew','General Construction',         '', '', 'TBD. Local crew for general construction support.', 9),
  ('Kentucky Crew',                'Steel Erection Specialists',   '', '', 'TBD. On site during Phase 4 steel erection window: July 15 – September 15, 2026.', 10)
on conflict do nothing;

-- ============================================================
-- SEED: UPDATES (activity feed)
-- ============================================================
insert into public.updates (message, author) values
  ('Project Hub launched. Kelston Way Greenhouse targeting January 1, 2027 operational date.', 'System'),
  ('Phase 1 is active. Five critical path items identified: Oncor 3-phase power, structure order with Rich VanWingerden, USDA FSA loan, Coryell County permits, and grading contractor.', 'System')
on conflict do nothing;
