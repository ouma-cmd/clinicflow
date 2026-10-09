CREATE INDEX idx_patients_full_name
ON patients(full_name);

CREATE INDEX idx_patients_cin
ON patients(cin);

CREATE INDEX idx_appointments_date
ON appointments(appointment_date);

CREATE INDEX idx_appointments_status
ON appointments(status);

CREATE INDEX idx_appointments_patient
ON appointments(patient_id);