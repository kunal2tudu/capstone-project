# Land Stack: Integrated GIS-Based Digital Public Infrastructure

> **An Integrated GIS-Based Digital Public Infrastructure for Transparent, Interoperable, and Citizen-Centric Land Governance**  
> *Applied Research • Full-Stack Software Development • 3D GIS Prototype*  
> **Source Problem Statement:** Department of Land Resources (DoLR), Government of India (DILRMP 3.0 / Bhu-Aadhaar / Naksha)  
> **Technology Readiness Level (TRL):** TRL 2 (Formulated) ➔ **Target TRL 4 (Validated Prototype)**  
> **Target SDGs:** **SDG 16** (*Peace, Justice, Strong Institutions* - Primary), **SDG 9** (*Industry & Infrastructure*), **SDG 11** (*Sustainable Cities*)

---

## 🏛️ Project Overview

Land information in India is historically siloed across disconnected departments: Revenue (Record of Rights / 7/12), Registration (Deeds & Encumbrances), Municipal Corporations (Property Tax & Building Sanctions), Town Planning (Master Plan Zoning), and Utility providers.

**Land Stack** demonstrates a **parcel-centric Digital Public Infrastructure (DPI)** where the **ULPIN (Unique Land Parcel Identification Number — "Bhu-Aadhaar")** acts as the universal primary key.

### Key Architectural Innovation: *Interoperability Without Replacement*
Instead of replacing existing legacy government software, Land Stack connects departments via an **OpenAPI Gateway and Schema-Mapping Layer**, enabling a single, unified view of every land parcel without forcing departments to scrap their legacy databases.

---

## 📂 Project Structure

```
capstone-project/
│
├── index.html                   # Main entry point for the 3D Web GIS Application
│
├── assets/                      # Application frontend assets
│   ├── css/
│   │   └── styles.css           # Modern dark glassmorphic design system
│   └── js/
│       └── app.js               # MapLibre GL 3D engine, parcel cadastre & UI logic
│
├── docs/                        # Complete project documentation & reports
│   ├── Land Stack - Project Report.docx     # Master Project Report
│   └── reports/                             # Specialized track reports for each member
│       ├── Land Stack - Report 1 - Full-Stack Frontend GIS and Citizen Portal.docx
│       ├── Land Stack - Report 2 - Full-Stack Backend API and Integration.docx
│       ├── Land Stack - Report 3 - Full-Stack Geospatial Database and Data Engineering.docx
│       ├── Land Stack - Report 4 - Full-Stack Officer Dashboard Workflow and Security.docx
│       ├── Land Stack - Report 5 - AI-ML Geospatial Analytics.docx
│       └── Land Stack - Report 6 - Cloud DevOps and Infrastructure.docx
│
└── media/                       # Media, videos, and reference 3D animations
    └── earth-studio/            # Google Earth Studio fly-in flight project
        ├── earth1 .esp          # Earth Studio project file
        ├── earth1 .jsx          # After Effects camera track script
        ├── vid1.mp4             # High-res orbital-to-ground zoom video
        ├── ImagerySources.txt   # Satellite imagery attributions
        └── footage/             # 301 rendered video frame sequence (.jpeg)
```

---

## 👥 Team Work Distribution (6 Members)

| Track | Member & Role | Deliverable |
| :--- | :--- | :--- |
| **Full-Stack** | **Member 1**: Frontend GIS & Citizen Portal | Web GIS map viewer (MapLibre), parcel detail panel, ULPIN search, citizen self-service UI. |
| **Full-Stack** | **Member 2**: Backend API & Integration Layer | Central API Gateway, ULPIN service, schema mapper, and mock REST APIs for 6 departments. |
| **Full-Stack** | **Member 3**: Geospatial Database & Data Eng. | PostGIS spatial schema, ETL pipeline, ULPIN simulation from centroid coords, vector tile server. |
| **Full-Stack** | **Member 4**: Officer Dashboard & Security | Authentication (OAuth2/OIDC), Role-Based Access Control, multi-dept workflow, tamper-evident audit logs. |
| **AI / ML** | **Member 5**: Geospatial AI/ML Analytics | Satellite change detection (U-Net), unauthorized construction alerts cross-referenced with permits, spatial risk scoring. |
| **Cloud** | **Member 6**: DevOps & Cloud Infrastructure | Docker containers, Kubernetes / Compose orchestration, CI/CD, object storage, monitoring (Prometheus/Grafana). |

---

## 🚀 How to Run the 3D Interactive Web App

### Option A: Using the Built-in Local Server (Recommended)
1. Run the Python lightweight HTTP server from the project directory:
   ```bash
   python -m http.server 3000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

### Option B: Direct Launch
* Simply double-click [`index.html`](file:///d:/capstone%20project/index.html) in Windows File Explorer to open it in your default browser.

---

## 🌟 Interactive Features in the 3D GIS Portal

1. **🛰️ Pan-India Earth Fly-In (Cinematic Orbit Zoom)**:
   * Replays the exact camera trajectory from your Google Earth Studio render in `media/earth-studio/`, zooming out to low Earth orbit over the Indian subcontinent and curving straight down into **ANY location in India**!
   * Use the **"🇮🇳 India Fly-In Hubs"** selector to quickly dive into New Delhi, Mumbai, Pune, Bengaluru, Hyderabad, Kolkata, Jamshedpur, Jaipur, Lucknow, Ahmedabad, or Chennai.
   * Click **any point on the map** or search any city/village to launch an orbital fly-in directly to that ground coordinate.

2. **📋 Existing ULPIN Registry (National Bhu-Aadhaar Directory)**:
   * Dedicated modal section (`Existing ULPINs`) indexing parcels across 8 Indian States (Maharashtra, Jharkhand, Karnataka, Uttar Pradesh, Telangana, Rajasthan, Gujarat, and Delhi NCR).
   * Filterable by State, Title Status (Clear, AI Alert, Mortgage Lien, Court Dispute), and Land Use (Agricultural, Commercial, Industrial, Residential, Forest).
   * Real-time KPI Ribbon tracking Total Indexed ULPINs, Clear RoR Titles, Active AI Alerts, and Total Land Area.
   * Direct **"🚀 Earth Fly-In"** and **"📄 Open Dossier"** actions for every single registered parcel in India.
   * **➕ Mint / Register New ULPIN Tool**: Easily calculate and register a verified 14-digit ULPIN for any coordinates in India according to Department of Land Resources (DoLR) specifications.

3. **🗺️ Contextual GIS Layers (Roads, Places, 3D Buildings)**:
   * **Roads & Highways (NH/SH)**: Overlays National Highways (NH-44, NH-48, NH-33, etc.), state highways, and local road networks.
   * **Places, Cities & Admin Labels**: Overlays village panchayats, taluks/tehsils, districts, and state borders.
   * **3D Buildings & Urban Extrusions**: 3D height-extruded structures displaying volumetric zoning and building footprints.
   * **Cadastral Boundaries & ULPIN**: High-visibility glowing borders and centroid identification codes.
   * **Master Plan Zoning & Land Use**: Color-coded parcels for Industrial, Commercial, Agricultural, and Eco-Sensitive reserves.
   * **AI Unauthorized Construction Alerts**: Red-flagged polygons where Sentinel-2 change masks conflict with municipal approvals.

4. **📍 Real-Time Location Intelligence (Click Anywhere in India)**:
   * Click anywhere on open ground in India to inspect that territory.
   * Automatically reverse-geocodes place name, sub-district (tehsil/taluk), district, state, and postal PIN code.
   * Calculates elevation and dynamically derives the standard 14-character Bhu-Aadhaar ULPIN.
   * Provides immediate **"🚀 Orbit Fly-In Here"** and **"📋 Register into ULPIN Directory"** shortcuts.

5. **🔍 Unified Land Parcel Record (Bhu-Aadhaar)**:
   * Click any parcel or search an ULPIN (`IN-JH-8619-2272-001`, `IN-MH-7372-1859-101`) to view connected records:
     * **Revenue:** Owner, 7/12 RoR mutations, co-sharers.
     * **Registration:** Registered deed number, bank liens / mortgages.
     * **Municipal:** Property tax status, building permit sanction numbers.
     * **AI Analytics:** Satellite Sentinel-2 change detection flags.
     * **Audit Trail:** Tamper-evident cryptographic verification log.

