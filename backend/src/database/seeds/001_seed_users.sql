INSERT INTO users
(
    full_name,
    email,
    password_hash,
    role
)
VALUES
(
    'Admin Clinic',
    'admin@clinicflow.com',
    '$2b$10$8Yx6JjZ3hQ4GQq7zWnM8Ue4Yw7lJ0f6j0zXq9Qy4uQx8k0m0W8K5G',
    'admin'
),

(
    'Staff One',
    'staff1@clinicflow.com',
    '$2b$10$8Yx6JjZ3hQ4GQq7zWnM8Ue4Yw7lJ0f6j0zXq9Qy4uQx8k0m0W8K5G',
    'staff'
),

(
    'Staff Two',
    'staff2@clinicflow.com',
    '$2b$10$8Yx6JjZ3hQ4GQq7zWnM8Ue4Yw7lJ0f6j0zXq9Qy4uQx8k0m0W8K5G',
    'staff'
);