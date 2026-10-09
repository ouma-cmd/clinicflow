INSERT INTO users (
    full_name,
    email,
    password_hash,
    role
)
VALUES
(
    'Admin Clinic',
    'admin@clinicflow.com',
    '$2b$10$SkVQoYOuAUkUv9atNqjJNePTWxbOMqPABUnONBIgqfVac/2v0Yzg6',
    'admin'
),
(
    'Staff One',
    'staff1@clinicflow.com',
    '$2b$10$itzV4/zNhEp1v0iBflspWu1FbP6.ak57LXU7ZILecnTPZu2hJkIaG',
    'staff'
);