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

1. **🛰️ Earth Fly-In (Cinematic Zoom)**:
   * Replays the exact camera trajectory from your Google Earth Studio render in `media/earth-studio/`, zooming in from low Earth orbit over India directly into the land parcels.
2. **🏢 3D Parcel Extrusions**:
   * Renders cadastral parcels as 3D extruded blocks displaying height, land use, and spatial occupancy.
   * Toggle smoothly between flat 2D cadastral survey view and 3D perspective pitch.
3. **🔍 Unified Land Parcel Record (Bhu-Aadhaar)**:
   * Click any parcel or search an ULPIN (`IN-JH-8619-2272-001`) to view connected records:
     * **Revenue:** Owner, 7/12 RoR mutations, co-sharers.
     * **Registration:** Registered deed number, bank liens / mortgages.
     * **Municipal:** Property tax status, building permit sanction numbers.
     * **AI Analytics:** Satellite Sentinel-2 change detection flags.
     * **Audit Trail:** Tamper-evident cryptographic verification log.
4. **🗺️ Thematic Layers & Basemaps**:
   * Switch between **Satellite (Earth)**, **Hybrid**, and **Dark DPI** basemaps.
   * Toggle cadastral boundaries, zoning overlays, AI alert envelopes, and road/utility setback corridors.
