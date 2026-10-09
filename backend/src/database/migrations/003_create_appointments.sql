CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    patient_id UUID NOT NULL,

    created_by UUID NOT NULL,

    appointment_date TIMESTAMP NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'pending',

    reason TEXT NOT NULL,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
        REFERENCES patients(id)
        ON DELETE CASCADE,


    CONSTRAINT fk_created_by
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT
);