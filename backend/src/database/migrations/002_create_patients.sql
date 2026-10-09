CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,

    cin VARCHAR(20) UNIQUE NOT NULL,

    phone VARCHAR(20) NOT NULL,

    birth_date DATE NOT NULL,

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);