# ClinicFlow — Gestion Patients & Rendez-vous

Application web de gestion d'une petite clinique développée avec la stack **PERN** :

- **PostgreSQL** : Base de données
- **Express.js + Node.js** : API Backend
- **React + Vite** : Interface Frontend
- **JWT** : Authentification
- **Tailwind CSS** : Design UI

---

# Fonctionnalités

## Authentification & rôles

- Connexion avec email et mot de passe
- Authentification JWT
- Hash des mots de passe avec bcrypt
- Gestion des rôles :
  - Admin
  - Staff

Permissions :

- Admin :
  - Supprimer un patient
  - Gestion complète

- Staff :
  - Gestion des patients et rendez-vous selon les permissions

---

# Gestion des patients

Fonctionnalités :

- Ajouter un patient
- Modifier un patient
- Consulter les informations d'un patient
- Supprimer un patient (Admin uniquement)
- Recherche par :
  - Nom complet
  - CIN

- Pagination

Informations patient :

- Nom complet
- CIN
- Téléphone
- Date de naissance
- Adresse
- Date de création

---

# Gestion des rendez-vous

Fonctionnalités :

- Créer un rendez-vous
- Modifier un rendez-vous
- Changer le statut
- Annuler un rendez-vous
- Filtrer par statut

Statuts disponibles :

- pending
- confirmed
- cancelled

Règle métier :

Un patient ne peut pas avoir deux rendez-vous confirmés dans une fenêtre de 30 minutes.

---

# Dashboard

Statistiques affichées :

- Nombre total des patients
- Rendez-vous du jour
- Nombre de rendez-vous confirmés
- Nombre de rendez-vous en attente
- Nombre de rendez-vous annulés

---

# Architecture du projet

```
ClinicFlow
│
├── backend
│   │
│   ├── src
│   │   ├── config
│   │   │   └── database.js
│   │   │
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── modules
│   │   │   │
│   │   │   ├── auth
│   │   │   ├── users
│   │   │   ├── patients
│   │   │   ├── appointments
│   │   │   └── dashboard
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
│
└── frontend
    │
    ├── src
    │   ├── api
    │   ├── components
    │   ├── pages
    │   ├── routes
    │   └── services
    │
    └── package.json
```

---

# Base de données

Tables principales :

## users

Contient les utilisateurs de l'application.

Champs principaux :

- id (UUID)
- full_name
- email
- password_hash
- role

---

## patients

Contient les informations des patients.

Champs principaux :

- id (UUID)
- full_name
- CIN
- phone
- birth_date
- address
- deleted_at

---

## appointments

Contient les rendez-vous.

Champs principaux :

- id (UUID)
- patient_id
- created_by
- appointment_date
- status
- reason
- notes

Relations :

```
users 1 -------- N appointments

patients 1 ----- N appointments
```

---

# Installation

## Prérequis

Installer :

- Node.js
- PostgreSQL

---

# Backend

Entrer dans le dossier :

```bash
cd backend
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` :

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/clinicflow

JWT_SECRET=my_secret_key
```

Lancer le serveur :

Mode développement :

```bash
npm run dev
```

ou :

```bash
node src/server.js
```

API disponible :

```
http://localhost:5000
```

---

# Frontend

Entrer dans le dossier :

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer React :

```bash
npm run dev
```

Application disponible :

```
http://localhost:5173
```

---

# API Endpoints

## Auth

Login :

```
POST /api/auth/login
```

Current user :

```
GET /api/auth/me
```

---

## Patients

Créer :

```
POST /api/patients
```

Liste :

```
GET /api/patients?search=&page=&limit=
```

Détails :

```
GET /api/patients/:id
```

Modifier :

```
PUT /api/patients/:id
```

Supprimer :

```
DELETE /api/patients/:id
```

(Admin uniquement)

---

## Appointments

Créer :

```
POST /api/appointments
```

Liste :

```
GET /api/appointments?status=
```

Détails :

```
GET /api/appointments/:id
```

Modifier :

```
PUT /api/appointments/:id
```

Changer statut :

```
PATCH /api/appointments/:id/status
```

Annuler :

```
PATCH /api/appointments/:id/cancel
```

---

# Validation & Sécurité

Le projet utilise :

- Zod pour validation des données
- bcrypt pour sécuriser les mots de passe
- JWT pour l'authentification
- Middleware de protection des routes
- Gestion des erreurs HTTP :

```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Server Error
```

---

# Database Migration

Créer la base :

```sql
CREATE DATABASE clinicflow;
```

Exécuter les migrations :

```bash
psql -U postgres -d clinicflow -f migrations.sql
```

---

# Données de test

Le projet contient :

- Utilisateur Admin
- Utilisateurs Staff
- Patients de test
- Rendez-vous de test

---

# Technologies utilisées

## Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- JWT
- bcrypt
- Zod

## Frontend

- React
- Vite
- Axios
- React Router
- Tailwind CSS

Auteur

Projet réalisé dans le cadre d'un test technique Full Stack PERN.

ClinicFlow — Gestion Patients & Rendez-vous
