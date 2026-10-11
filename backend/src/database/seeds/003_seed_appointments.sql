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
(
    '2343d963-5980-4929-a51e-4fa20ae3d01d',
    '89fe53f2-b908-413f-979e-265b0eb0c4b8',
    '2026-10-15 10:00:00',
    'confirmed',
    'Consultation',
    'First consultation'
),
(
    'db3fb010-ab3a-494e-91bf-3b5b3360b868',
    '890fc88c-cc96-4ebc-a3ee-db41bfe8de3b',
    '2026-10-16 14:30:00',
    'pending',
    'Control visit',
    'Waiting confirmation'
),
(
    '2343d963-5980-4929-a51e-4fa20ae3d01d',
    '89fe53f2-b908-413f-979e-265b0eb0c4b8',
    '2026-10-17 09:00:00',
    'confirmed',
    'Medical check',
    'Regular appointment'
),
(
    'db3fb010-ab3a-494e-91bf-3b5b3360b868',
    '890fc88c-cc96-4ebc-a3ee-db41bfe8de3b',
    '2026-10-18 11:00:00',
    'cancelled',
    'Follow up',
    'Patient cancelled'
);