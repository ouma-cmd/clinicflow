INSERT INTO appointments
(
    patient_id,
    created_by,
    appointment_date,
    status,
    reason,
    notes
)
VALUES

-- 1
(
    'da618e91-df06-4a97-a3ac-c69a24381e03',
    '2a0be25b-c375-48b9-b77b-2d5032572eaa',
    '2026-10-15 10:00:00',
    'confirmed',
    'Consultation',
    'First consultation'
),

-- 2
(
    'da618e91-df06-4a97-a3ac-c69a24381e03',
    '82d0d572-7154-4ff7-80ba-f58678b379ff',
    '2026-10-16 14:30:00',
    'pending',
    'Control visit',
    'Waiting confirmation'
),

-- 3
(
    'd5e1ae46-ea18-4263-b8a8-d57b2d5dd5c2',
    '82d0d572-7154-4ff7-80ba-f58678b379ff',
    '2026-10-17 09:00:00',
    'confirmed',
    'Medical check',
    'Regular appointment'
),

-- 4
(
    'd5e1ae46-ea18-4263-b8a8-d57b2d5dd5c2',
    '2a0be25b-c375-48b9-b77b-2d5032572eaa',
    '2026-10-18 11:00:00',
    'cancelled',
    'Follow up',
    'Patient cancelled'
),

-- 5
(
    'f9ae70b5-8dd8-43b3-ae9c-9f82daf8bf69',
    '82d0d572-7154-4ff7-80ba-f58678b379ff',
    '2026-10-20 15:00:00',
    'pending',
    'Consultation',
    'New patient'
),

-- 6
(
    'f9ae70b5-8dd8-43b3-ae9c-9f82daf8bf69',
    '2a0be25b-c375-48b9-b77b-2d5032572eaa',
    '2026-10-22 10:30:00',
    'confirmed',
    'Analysis review',
    'Results discussion'
),

-- 7
(
    'd0725555-cfa2-47b1-a9c8-c3bfa004bcf8',
    '82d0d572-7154-4ff7-80ba-f58678b379ff',
    '2026-10-23 13:00:00',
    'pending',
    'General visit',
    'Waiting'
),

-- 8
(
    'd0725555-cfa2-47b1-a9c8-c3bfa004bcf8',
    '2a0be25b-c375-48b9-b77b-2d5032572eaa',
    '2026-10-24 16:00:00',
    'cancelled',
    'Consultation',
    'Cancelled by patient'
),

-- 9
(
    '5cf57be5-8a08-4878-9fc7-937788a1419d',
    '82d0d572-7154-4ff7-80ba-f58678b379ff',
    '2026-10-25 09:30:00',
    'confirmed',
    'Medical exam',
    'Completed'
),

-- 10
(
    '5cf57be5-8a08-4878-9fc7-937788a1419d',
    '2a0be25b-c375-48b9-b77b-2d5032572eaa',
    '2026-10-26 12:00:00',
    'pending',
    'Follow up',
    'Need confirmation'
);