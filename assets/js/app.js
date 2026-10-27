/**
 * Land Stack 3D - Integrated GIS Digital Public Infrastructure
 * Core Web GIS Application powered by MapLibre GL JS
 * Multi-State Pan-India Cadastre, Universal Earth Fly-In, Contextual GIS Layers,
 * Location Intelligence & National Bhu-Aadhaar (ULPIN) Directory
 */

// Global MapLibre GL alias compatibility
if (typeof window !== 'undefined') {
  if (typeof maplibregl !== 'undefined' && typeof maplibreGl === 'undefined') {
    window.maplibreGl = maplibregl;
  }
}

// Indian Subcontinent Centers
const INDIA_CENTER = [82.0, 22.0];
const SPACE_CENTER = [82.0, 21.0];
const DEFAULT_CADASTRE_CENTER = [86.1924, 22.7268]; // Jamshedpur showcase

// Major India Regional Hubs for 3D Navigation
const INDIA_HUBS = {
  jamshedpur: { name: 'Jamshedpur (Jharkhand Cadastre)', coords: [86.1924, 22.7268], zoom: 16.4, pitch: 62, bearing: 35 },
  pune: { name: 'Pune (Maharashtra Bhu-Naksha)', coords: [73.7180, 18.5910], zoom: 16.8, pitch: 65, bearing: 42 },
  mumbai: { name: 'Mumbai (BKC / Financial Hub)', coords: [72.8656, 19.0657], zoom: 16.5, pitch: 60, bearing: 20 },
  delhi: { name: 'New Delhi (National Capital)', coords: [77.2090, 28.6139], zoom: 16.2, pitch: 58, bearing: 0 },
  bengaluru: { name: 'Bengaluru (Karnataka Bhoomi)', coords: [77.5946, 12.9716], zoom: 16.6, pitch: 64, bearing: 30 },
  hyderabad: { name: 'Hyderabad (Telangana Dharani)', coords: [78.3750, 17.4435], zoom: 16.7, pitch: 62, bearing: 45 },
  kolkata: { name: 'Kolkata (New Town / Bengal)', coords: [88.4312, 22.5804], zoom: 16.5, pitch: 60, bearing: 15 },
  jaipur: { name: 'Jaipur (Rajasthan Apna Khata)', coords: [75.7873, 26.9124], zoom: 16.4, pitch: 60, bearing: 25 },
  lucknow: { name: 'Lucknow (Uttar Pradesh Bhulekh)', coords: [80.9462, 26.8467], zoom: 16.5, pitch: 58, bearing: 10 },
  ahmedabad: { name: 'Ahmedabad (GIFT City / Gujarat)', coords: [72.6840, 23.1610], zoom: 16.8, pitch: 65, bearing: 35 },
  chennai: { name: 'Chennai (OMR Corridor)', coords: [80.2484, 12.9815], zoom: 16.5, pitch: 60, bearing: 20 }
};

// Application State
let map = null;
let currentBasemap = 'satellite';
let is3DMode = true;
let isExtrusionsEnabled = true;
let selectedParcelId = null;
let hoverPopup = null;
let currentInspectedLocation = null;
let activeLocationMarker = null;

// Multi-State Pan-India Cadastral Dataset (Bhu-Aadhaar National Registry)
const cadastralData = {
  type: 'FeatureCollection',
  features: [
    // --- JHARKHAND (East Singhbhum / Jamshedpur Showcase - Sundernagar Mouza) ---
    // Mapped precisely to physical satellite features: Industrial campus, Highway corridor, Khets, Abadi & Reserve
    {
      type: 'Feature',
      id: 1,
      properties: {
        ulpin: 'IN-JH-8619-2272-001',
        survey_no: '104/1',
        owner: 'Sardar Gurpreet Singh & Brothers',
        coowners: '2 Co-Sharers (Equal 50% Share)',
        area_sqm: '14,850 m² (3.67 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Industrial',
        zoning: 'Industrial Belt (IND-2)',
        status: 'verified',
        height: 26,
        color: '#38bdf8',
        tax_status: 'Cleared (Receipt #TX-88219)',
        permit: 'Approved: BP-2023-7410 (Factory Sheds & Yard)',
        far: '1.75 / 2.0 (Compliant)',
        deed: 'DEED-2018-0912 (Registered Conveyance)',
        mortgage: 'Lien: Punjab National Bank (₹65,00,000)',
        mutation: '04-Oct-2022 (7/12 RoR Mutation Verified)',
        ai_change: 'Structural footprint matches approved factory shed plan',
        ai_permit: 'Compliant with Approved Municipal Sanction',
        ai_risk: 'Low (0.09) - Clear of Hazard Buffers'
      },
      geometry: {
        type: 'Polygon',
        // Traces the actual industrial manufacturing plant compound, perimeter wall & internal access yard
        coordinates: [[
          [86.1875, 22.7262],
          [86.1905, 22.7266],
          [86.1912, 22.7252],
          [86.1910, 22.7235],
          [86.1882, 22.7232],
          [86.1870, 22.7245],
          [86.1875, 22.7262]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 2,
      properties: {
        ulpin: 'IN-JH-8619-2272-002',
        survey_no: '104/2-B',
        owner: 'Sunita Devi Murmu',
        coowners: 'Sole Proprietor',
        area_sqm: '6,240 m² (1.54 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Commercial',
        zoning: 'Commercial Mixed (C-1)',
        status: 'verified',
        height: 34,
        color: '#10b981',
        tax_status: 'Cleared (Receipt #TX-99014)',
        permit: 'Approved: BP-2024-1188 (Highway Commercial G+3)',
        far: '2.10 / 2.25 (Compliant)',
        deed: 'DEED-2021-3482 (Registered)',
        mortgage: 'None (Clean Commercial Title)',
        mutation: '19-Jan-2024 (Regular Mutation Verified)',
        ai_change: 'Construction progress matches declared commercial phase',
        ai_permit: 'Height within 15m municipal zoning limit',
        ai_risk: 'Low (0.14) - Safe Highway Setback Compliant'
      },
      geometry: {
        type: 'Polygon',
        // Fronts the curving western verge of the Tata-Hata Road
        coordinates: [[
          [86.1942, 22.7285],
          [86.1965, 22.7282],
          [86.1958, 22.7265],
          [86.1935, 22.7268],
          [86.1942, 22.7285]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 3,
      properties: {
        ulpin: 'IN-JH-8619-2272-003',
        survey_no: '105/A',
        owner: 'Apex Logistics & Warehousing Pvt Ltd',
        coowners: 'Corporate Title',
        area_sqm: '11,200 m² (2.76 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Agricultural',
        zoning: 'Agricultural Buffer Zone (A-2)',
        status: 'unauthorized_alert',
        height: 20,
        color: '#f43f5e',
        tax_status: 'Overdue Notice Served (₹38,400 Penal Assessment)',
        permit: 'DENIED / NO VALID MUNICIPAL SANCTION',
        far: 'Unregulated Encroachment',
        deed: 'DEED-2019-1144 (Agricultural Only)',
        mortgage: 'Under Dispute / Revenue Court Stay Order',
        mutation: 'Flagged by Land Revenue Officer (LRO)',
        ai_change: 'CRITICAL ALERT: 850m² concrete shed detected without building permit!',
        ai_permit: 'Cross-check failed: No approval on record for Commercial use',
        ai_risk: 'High (0.87) - Agricultural Zone Encroachment'
      },
      geometry: {
        type: 'Polygon',
        // Traces the agricultural parcel where unapproved commercial warehouse structure encroaches
        coordinates: [[
          [86.1918, 22.7265],
          [86.1935, 22.7268],
          [86.1940, 22.7250],
          [86.1922, 22.7248],
          [86.1918, 22.7265]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 4,
      properties: {
        ulpin: 'IN-JH-8619-2272-004',
        survey_no: '106/1',
        owner: 'Manoj Kumar Mahto',
        coowners: 'Joint Family Title',
        area_sqm: '13,500 m² (3.34 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Agricultural',
        zoning: 'Primary Agriculture (A-1)',
        status: 'verified',
        height: 5,
        color: '#84cc16',
        tax_status: 'Exempt (Agricultural RoR)',
        permit: 'Exempt / Farmhouse Eligible',
        far: 'N/A',
        deed: 'Inheritance RoR (7/12 Register)',
        mortgage: 'Kisan Credit Card (SBI: ₹2,50,000)',
        mutation: '11-Aug-2020 (Heir Succession Confirmed)',
        ai_change: 'Crop pattern regular; active paddy cultivation verified',
        ai_permit: 'No unauthorized structures detected',
        ai_risk: 'Low (0.05) - Stable Agricultural Soil Profile'
      },
      geometry: {
        type: 'Polygon',
        // Traces the real earthen bunds (aars), farm pond, and cultivated khets east of the highway
        coordinates: [[
          [86.1948, 22.7248],
          [86.1975, 22.7255],
          [86.1982, 22.7235],
          [86.1955, 22.7230],
          [86.1945, 22.7238],
          [86.1948, 22.7248]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 5,
      properties: {
        ulpin: 'IN-JH-8619-2272-005',
        survey_no: '107/3',
        owner: 'Jharkhand State Industrial Dev Corp (JSIDC)',
        coowners: 'Government Allotment',
        area_sqm: '16,800 m² (4.15 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Government',
        zoning: 'Public & Semi-Public (PSP)',
        status: 'government',
        height: 18,
        color: '#6366f1',
        tax_status: 'Government Property (Exempt)',
        permit: 'State Cabinet Approval #GC-441',
        far: '2.50 (Water Sump & Substation Facility)',
        deed: 'Govt Gazette Notification 2017',
        mortgage: 'None (State Asset)',
        mutation: 'Permanent Government Vesting',
        ai_change: 'Boundary wall and access road detected; matches public works records',
        ai_permit: 'Approved state utility project',
        ai_risk: 'Zero Risk'
      },
      geometry: {
        type: 'Polygon',
        // Traces the municipal water works, pumping facility & electrical utility yard
        coordinates: [[
          [86.1895, 22.7232],
          [86.1922, 22.7235],
          [86.1925, 22.7218],
          [86.1898, 22.7215],
          [86.1895, 22.7232]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 6,
      properties: {
        ulpin: 'IN-JH-8619-2272-006',
        survey_no: '108/P',
        owner: 'Pradeep Verma & Anr.',
        coowners: 'Under Partition Litigation',
        area_sqm: '7,800 m² (1.93 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Residential',
        zoning: 'Residential Medium Density (R-2)',
        status: 'disputed',
        height: 14,
        color: '#a855f7',
        tax_status: 'Partial (Arrears of ₹11,200)',
        permit: 'Hold: Injunction by Civil Court',
        far: '1.50',
        deed: 'DEED-2016-0819',
        mortgage: 'Title In Dispute (Civil Suit #412/2023)',
        mutation: 'Contested in SDM Revenue Court',
        ai_change: 'Partial excavation detected; flagged against injunction notice',
        ai_permit: 'Alert: Work on disputed parcel halted by revenue officer',
        ai_risk: 'Moderate (0.64) - Legal Injunction Active'
      },
      geometry: {
        type: 'Polygon',
        // Traces the rural settlement abadi cluster with ancestral courtyard homes & village lanes
        coordinates: [[
          [86.1965, 22.7285],
          [86.1988, 22.7290],
          [86.1992, 22.7270],
          [86.1968, 22.7268],
          [86.1965, 22.7285]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 7,
      properties: {
        ulpin: 'IN-JH-8619-2272-007',
        survey_no: '109/2',
        owner: 'Forest Department, Gov of Jharkhand',
        coowners: 'Protected Eco-Reserve',
        area_sqm: '28,500 m² (7.04 Acres)',
        village: 'Sundernagar',
        district: 'East Singhbhum',
        state: 'Jharkhand',
        landuse: 'Forest',
        zoning: 'Eco-Sensitive Forest Zone (ENV-1)',
        status: 'government',
        height: 4,
        color: '#059669',
        tax_status: 'Exempt',
        permit: 'Strict No-Construction Zone',
        far: '0.00',
        deed: 'Indian Forest Act Reserved Forest Notification',
        mortgage: 'Inalienable State Asset',
        mutation: 'Protected Green Cover Record',
        ai_change: 'Sentinel-2 NDVI confirms dense canopy; no deforestation detected',
        ai_permit: 'Clear from encroachments',
        ai_risk: 'Zero Risk'
      },
      geometry: {
        type: 'Polygon',
        // Traces the dense tree canopy edge and natural ridgeline slope along the western hill
        coordinates: [[
          [86.1868, 22.7288],
          [86.1895, 22.7282],
          [86.1902, 22.7266],
          [86.1875, 22.7262],
          [86.1862, 22.7275],
          [86.1868, 22.7288]
        ]]
      }
    },

    // --- MAHARASHTRA (Pune / Hinjawadi IT Corridor) ---
    {
      type: 'Feature',
      id: 8,
      properties: {
        ulpin: 'IN-MH-7372-1859-101',
        survey_no: '48/1-A',
        owner: 'Sahyadri IT Infrastructure Developers',
        coowners: 'MIDC Joint Venture Allotment',
        area_sqm: '14,200 m² (3.51 Acres)',
        village: 'Hinjawadi',
        district: 'Pune',
        state: 'Maharashtra',
        landuse: 'Commercial',
        zoning: 'IT Special Economic Zone (SEZ-IT)',
        status: 'verified',
        height: 48,
        color: '#10b981',
        tax_status: 'Cleared (PMRDA Assessment 2025-26)',
        permit: 'Approved: PMRDA/BP/2023/8922 (12-Storey Tech Park)',
        far: '2.50 / 2.75 (Sanctioned)',
        deed: 'DEED-PUN-2019-8812',
        mortgage: 'Consortium Lien: HDFC & ICICI Bank (₹240 Cr)',
        mutation: '22-Mar-2023 (E-Ferfar Digital RoR 7/12 Certified)',
        ai_change: 'Structural completion 85%; matches PMRDA approved footprint',
        ai_permit: 'Clearance within limits',
        ai_risk: 'Low (0.11)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[73.7165, 18.5925], [73.7190, 18.5928], [73.7195, 18.5905], [73.7170, 18.5902], [73.7165, 18.5925]]]
      }
    },
    {
      type: 'Feature',
      id: 9,
      properties: {
        ulpin: 'IN-MH-7372-1859-102',
        survey_no: '48/2',
        owner: 'Balasaheb Shinde & Family',
        coowners: 'Ancestral Gat Pravarg',
        area_sqm: '5,600 m² (1.38 Acres)',
        village: 'Hinjawadi',
        district: 'Pune',
        state: 'Maharashtra',
        landuse: 'Agricultural',
        zoning: 'Rural / Green Buffer Zone',
        status: 'unauthorized_alert',
        height: 18,
        color: '#f43f5e',
        tax_status: 'Agricultural Cess Paid (Unassessed Commercial Shed)',
        permit: 'NO PERMIT / UNAPPROVED WAREHOUSE',
        far: 'Encroachment Violation',
        deed: 'Ancestral 7/12 Gat Book',
        mortgage: 'None',
        mutation: 'Agricultural Heir Record',
        ai_change: 'CRITICAL ALERT: 1,200m² prefabricated shed erected without PMRDA Non-Agri conversion!',
        ai_permit: 'Violation of Maharashtra Land Revenue Code Sec 44',
        ai_risk: 'High (0.84)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[73.7190, 18.5928], [73.7215, 18.5932], [73.7218, 18.5912], [73.7195, 18.5905], [73.7190, 18.5928]]]
      }
    },

    // --- KARNATAKA (Bengaluru Rural / Devanahalli) ---
    {
      type: 'Feature',
      id: 10,
      properties: {
        ulpin: 'IN-KA-7759-1294-201',
        survey_no: '112/4',
        owner: 'Karnataka Industrial Areas Dev Board (KIADB)',
        coowners: 'Aerospace Park SEZ Allocation',
        area_sqm: '22,000 m² (5.43 Acres)',
        village: 'Devanahalli',
        district: 'Bengaluru Rural',
        state: 'Karnataka',
        landuse: 'Industrial',
        zoning: 'Aerospace & Defence Hub',
        status: 'verified',
        height: 26,
        color: '#38bdf8',
        tax_status: 'KIADB Industrial Assessment Paid',
        permit: 'Approved: BIAAPA-IND-2023-4410',
        far: '1.80 / 2.0',
        deed: 'KIADB Acquisition Gazette #114',
        mortgage: 'State Asset (Leasehold 99 Yrs)',
        mutation: 'Bhoomi RTC Mutation Clean (#MR-4491)',
        ai_change: 'Hangars and precision manufacturing plant built to plan',
        ai_permit: 'Clear from encroachment',
        ai_risk: 'Low (0.07)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[77.5925, 12.9730], [77.5960, 12.9735], [77.5965, 12.9705], [77.5930, 12.9700], [77.5925, 12.9730]]]
      }
    },

    // --- UTTAR PRADESH (Lucknow / Amar Shaheed Path) ---
    {
      type: 'Feature',
      id: 11,
      properties: {
        ulpin: 'IN-UP-8094-2684-301',
        survey_no: '892/1',
        owner: 'Ram Swaroop Yadav & Sons',
        coowners: 'Khatedar Joint Family',
        area_sqm: '16,500 m² (4.07 Acres)',
        village: 'Mohanlalganj',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        landuse: 'Agricultural',
        zoning: 'Prime Crop Agriculture (F-1)',
        status: 'verified',
        height: 4,
        color: '#84cc16',
        tax_status: 'UP Bhulekh Land Revenue Clean',
        permit: 'Exempt Agricultural Land',
        far: 'N/A',
        deed: 'UP Zamindari Abolition Khatauni #00412',
        mortgage: 'Kisan Gold Card (BoB: ₹4,00,000)',
        mutation: 'Virasat Verified by Revenue Inspector',
        ai_change: 'Sentinel-2 NDVI confirms wheat/mustard seasonal cycle',
        ai_permit: 'Zero unauthorized construction',
        ai_risk: 'Low (0.04)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[80.9430, 26.8480], [80.9470, 26.8485], [80.9475, 26.8450], [80.9435, 26.8445], [80.9430, 26.8480]]]
      }
    },

    // --- DELHI NCR (Najafgarh / Dwarka Expressway) ---
    {
      type: 'Feature',
      id: 12,
      properties: {
        ulpin: 'IN-DL-7703-2861-401',
        survey_no: '42/1',
        owner: 'National Capital Logistics Consortium',
        coowners: 'DDA Approved Land Pooling Joint Venture',
        area_sqm: '7,500 m² (1.85 Acres)',
        village: 'Najafgarh',
        district: 'South West Delhi',
        state: 'Delhi',
        landuse: 'Commercial',
        zoning: 'Master Plan Delhi 2041 Mixed Use',
        status: 'verified',
        height: 34,
        color: '#10b981',
        tax_status: 'MCD Property Tax Up to Date (FY 2025-26)',
        permit: 'DDA Sanctioned Plan #DDA/EZ/2024/110',
        far: '2.00 / 2.00',
        deed: 'Registered Conveyance Deed 2022',
        mortgage: 'Term Loan: State Bank of India (₹42 Cr)',
        mutation: 'Delhi Revenue Department Digitally Signed RoR',
        ai_change: 'Basement and 4-tier commercial structure active',
        ai_permit: 'Boundary verified against DDA land pooling cadastre',
        ai_risk: 'Low (0.12)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[77.2065, 28.6150], [77.2105, 28.6155], [77.2110, 28.6120], [77.2070, 28.6115], [77.2065, 28.6150]]]
      }
    },

    // --- TELANGANA (Hyderabad / HITEC City) ---
    {
      type: 'Feature',
      id: 13,
      properties: {
        ulpin: 'IN-TG-7838-1744-501',
        survey_no: '104',
        owner: 'Telangana State Industrial Infrastructure (TSIIC)',
        coowners: 'FinTech Hub Allocation',
        area_sqm: '18,900 m² (4.67 Acres)',
        village: 'Gachibowli',
        district: 'Rangareddy',
        state: 'Telangana',
        landuse: 'Commercial',
        zoning: 'IT Financial District Zone',
        status: 'verified',
        height: 56,
        color: '#10b981',
        tax_status: 'GHMC Property Tax Cleared',
        permit: 'Approved: HMDA-TS-2023-9912',
        far: '3.00 (High-Rise Sanctioned)',
        deed: 'TSIIC Registered Allotment #TS-881',
        mortgage: 'Clean Corporate Title',
        mutation: 'Dharani Integrated Cadastre Certified',
        ai_change: 'Tower superstructure compliant with elevation plan',
        ai_permit: 'Clear from lake buffer restrictions',
        ai_risk: 'Low (0.08)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[78.3725, 17.4450], [78.3765, 17.4455], [78.3770, 17.4420], [78.3730, 17.4415], [78.3725, 17.4450]]]
      }
    },

    // --- RAJASTHAN (Jaipur / Sanganer Industrial Zone) ---
    {
      type: 'Feature',
      id: 14,
      properties: {
        ulpin: 'IN-RJ-7578-2691-601',
        survey_no: '340/2',
        owner: 'Pink City Handloom Exporters Ltd',
        coowners: 'RIICO Industrial Plot Allottee',
        area_sqm: '12,000 m² (2.96 Acres)',
        village: 'Sanganer',
        district: 'Jaipur',
        state: 'Rajasthan',
        landuse: 'Industrial',
        zoning: 'RIICO Industrial Estate Zone',
        status: 'verified',
        height: 22,
        color: '#38bdf8',
        tax_status: 'JDA / RIICO Service Charges Paid',
        permit: 'Approved: RIICO/JPR/2022/410',
        far: '1.50 / 1.75',
        deed: 'RIICO 99-Yr Lease Deed 2017',
        mortgage: 'Lien: Bank of Baroda (₹18 Cr)',
        mutation: 'Apna Khata Certified Digital Jamabandi',
        ai_change: 'Solar rooftop installation detected; no unauthorized footprint',
        ai_permit: 'Fully compliant',
        ai_risk: 'Low (0.09)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[75.7850, 26.9140], [75.7890, 26.9145], [75.7895, 26.9110], [75.7855, 26.9105], [75.7850, 26.9140]]]
      }
    },

    // --- GUJARAT (Ahmedabad / GIFT City Daskroi) ---
    {
      type: 'Feature',
      id: 15,
      properties: {
        ulpin: 'IN-GJ-7257-2302-701',
        survey_no: '77/P',
        owner: 'GIFT Global FinTech Hub Developers',
        coowners: 'International Financial Services Centre (IFSC)',
        area_sqm: '15,400 m² (3.80 Acres)',
        village: 'Ratanpur',
        district: 'Gandhinagar',
        state: 'Gujarat',
        landuse: 'Commercial',
        zoning: 'GIFT IFSC Global Financial Zone',
        status: 'verified',
        height: 64,
        color: '#10b981',
        tax_status: 'GIFT Urban Development Authority Clean',
        permit: 'Approved: GIFT-UDA/IFSC/2023/102 (Twin Towers)',
        far: '3.50 (Special IFSC Zone)',
        deed: 'Registered State Government Lease',
        mortgage: 'Syndicated International Consortium Lien',
        mutation: 'AnyRoR Gujarat Certified Record of Rights',
        ai_change: 'Facade and construction footprint matches laser scan model',
        ai_permit: 'Zero deviation from Master Plan',
        ai_risk: 'Low (0.06)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[72.6820, 23.1625], [72.6860, 23.1630], [72.6865, 23.1595], [72.6825, 23.1590], [72.6820, 23.1625]]]
      }
    }
  ]
};

// Utilities & Linear Corridors (Statutory Right-of-Way & Transmission Buffers)
const utilitiesData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'NH-33 / Tata-Hata Road Corridor',
        type: 'National / State Highway',
        buffer: '30m Statutory Building Setback'
      },
      geometry: {
        type: 'LineString',
        // Follows the actual curvature of the paved Tata-Hata Road visible on satellite
        coordinates: [
          [86.1985, 22.7305],
          [86.1970, 22.7288],
          [86.1958, 22.7265],
          [86.1948, 22.7242],
          [86.1940, 22.7218]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: '132kV High Tension Power Transmission Grid',
        type: 'CEA Utility Easement',
        buffer: '15m Hazardous Clearance Safe Corridor'
      },
      geometry: {
        type: 'LineString',
        // Traces the regional power transmission line clearance swath
        coordinates: [
          [86.1875, 22.7300],
          [86.1915, 22.7275],
          [86.1955, 22.7252],
          [86.1988, 22.7225]
        ]
      }
    }
  ]
};

// Basemap Styles
const basemapSources = {
  satellite: {
    version: 8,
    sources: {
      'esri-satellite': {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Esri, Maxar, Earthstar Geographics'
      }
    },
    layers: [
      { id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite', paint: { 'raster-opacity': 1 } }
    ]
  },
  hybrid: {
    version: 8,
    sources: {
      'esri-satellite': {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256
      },
      'esri-labels': {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256
      }
    },
    layers: [
      { id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite' },
      { id: 'esri-labels-layer', type: 'raster', source: 'esri-labels', paint: { 'raster-opacity': 0.9 } }
    ]
  },
  dark: {
    version: 8,
    sources: {
      'esri-dark': {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Esri, HERE, Garmin'
      },
      'esri-dark-ref': {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256
      }
    },
    layers: [
      { id: 'esri-dark-layer', type: 'raster', source: 'esri-dark' },
      { id: 'esri-dark-ref-layer', type: 'raster', source: 'esri-dark-ref', paint: { 'raster-opacity': 0.8 } }
    ]
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setupUIEventListeners();
  renderRegistryTable();
});

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: basemapSources.satellite,
    center: DEFAULT_CADASTRE_CENTER,
    zoom: 16.3,
    pitch: 58,
    bearing: 30,
    antialias: true,
    maxPitch: 82
  });

  // Navigation & Scale Controls
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
  map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left');

  // Track Telemetry
  map.on('move', updateTelemetry);

  map.on('load', () => {
    addContextualLayers();
    addCadastralLayers();
    updateTelemetry();
  });
}

/**
 * Add Contextual GIS Layers:
 * - Roads / National Highways Network (ESRI World Transportation)
 * - Places / Administrative Labels (ESRI World Boundaries & Places)
 */
function addContextualLayers() {
  // 1. Roads & Highways Tile Source
  if (!map.getSource('roads-network-source')) {
    map.addSource('roads-network-source', {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256
    });

    map.addLayer({
      id: 'context-roads-layer',
      type: 'raster',
      source: 'roads-network-source',
      paint: { 'raster-opacity': 0.95 }
    });
  }

  // 2. Places, Cities & Admin Boundaries Source
  if (!map.getSource('places-labels-source')) {
    map.addSource('places-labels-source', {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256
    });

    map.addLayer({
      id: 'context-places-layer',
      type: 'raster',
      source: 'places-labels-source',
      paint: { 'raster-opacity': 0.95 }
    });
  }
}

/**
 * Add Cadastral & DPI Thematic Layers
 */
function addCadastralLayers() {
  // Parcels GeoJSON source
  if (!map.getSource('cadastral-parcels')) {
    map.addSource('cadastral-parcels', {
      type: 'geojson',
      data: cadastralData
    });
  } else {
    map.getSource('cadastral-parcels').setData(cadastralData);
  }

  // Utilities GeoJSON source
  if (!map.getSource('utilities-lines')) {
    map.addSource('utilities-lines', {
      type: 'geojson',
      data: utilitiesData
    });
  }

  // 1. 3D Parcel Fill Extrusions (Blocks)
  if (!map.getLayer('parcels-3d-extrusion')) {
    map.addLayer({
      id: 'parcels-3d-extrusion',
      type: 'fill-extrusion',
      source: 'cadastral-parcels',
      paint: {
        'fill-extrusion-color': [
          'case',
          ['==', ['get', 'status'], 'unauthorized_alert'], '#f43f5e',
          ['==', ['get', 'status'], 'disputed'], '#a855f7',
          ['==', ['get', 'status'], 'government'], '#6366f1',
          ['get', 'color']
        ],
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.75
      }
    });
  }

  // 2. 2D Parcel Fill (active when extrusions toggled off)
  if (!map.getLayer('parcels-2d-fill')) {
    map.addLayer({
      id: 'parcels-2d-fill',
      type: 'fill',
      source: 'cadastral-parcels',
      layout: { visibility: 'none' },
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.45
      }
    });
  }

  // 3. Vibrant Cadastral Boundary Stroke
  if (!map.getLayer('parcels-stroke')) {
    map.addLayer({
      id: 'parcels-stroke',
      type: 'line',
      source: 'cadastral-parcels',
      paint: {
        'line-color': '#38bdf8',
        'line-width': 2.5,
        'line-opacity': 0.95
      }
    });
  }

  // 4. AI Unauthorized Alert Glowing Outline
  if (!map.getLayer('parcels-ai-alert-stroke')) {
    map.addLayer({
      id: 'parcels-ai-alert-stroke',
      type: 'line',
      source: 'cadastral-parcels',
      filter: ['==', ['get', 'status'], 'unauthorized_alert'],
      paint: {
        'line-color': '#f43f5e',
        'line-width': 4.5,
        'line-dasharray': [2, 1]
      }
    });
  }

  // 5. Encumbered / Disputed Parcels Warning Outline
  if (!map.getLayer('parcels-dispute-stroke')) {
    map.addLayer({
      id: 'parcels-dispute-stroke',
      type: 'line',
      source: 'cadastral-parcels',
      filter: ['==', ['get', 'status'], 'disputed'],
      paint: {
        'line-color': '#c084fc',
        'line-width': 4.0,
        'line-dasharray': [3, 2]
      }
    });
  }

  // 6. Utilities & Road Buffers
  if (!map.getLayer('utilities-layer')) {
    map.addLayer({
      id: 'utilities-layer',
      type: 'line',
      source: 'utilities-lines',
      paint: {
        'line-color': '#f59e0b',
        'line-width': 3.5,
        'line-dasharray': [3, 2]
      }
    });
  }

  setupMapInteractions();
}

/**
 * Setup Map Interaction Events
 */
function setupMapInteractions() {
  hoverPopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 15
  });

  // Hover over parcels
  map.on('mousemove', 'parcels-3d-extrusion', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    if (e.features && e.features.length > 0) {
      const feat = e.features[0].properties;
      const coords = e.lngLat;
      const statusBadge = feat.status === 'unauthorized_alert'
        ? '<span class="popup-badge danger">AI ALERT: Unauthorized Construction</span>'
        : (feat.status === 'disputed'
          ? '<span class="popup-badge danger">Civil Court Injunction</span>'
          : '<span class="popup-badge success">Bhu-Aadhaar Verified</span>');

      hoverPopup.setLngLat(coords).setHTML(`
        <div class="popup-title">${feat.ulpin}</div>
        <div class="popup-sub">${feat.village}, ${feat.district} (${feat.state})</div>
        <div class="popup-sub">Survey No: <strong>${feat.survey_no}</strong> • ${feat.landuse}</div>
        <div>${statusBadge}</div>
      `).addTo(map);
    }
  });

  map.on('mouseleave', 'parcels-3d-extrusion', () => {
    map.getCanvas().style.cursor = '';
    hoverPopup.remove();
  });

  // Click on Map
  map.on('click', (e) => {
    // 1. Check if clicked on a known parcel
    const parcelFeatures = map.queryRenderedFeatures(e.point, {
      layers: ['parcels-3d-extrusion', 'parcels-2d-fill'].filter(id => map.getLayer(id))
    });

    if (parcelFeatures.length > 0) {
      // User clicked a known cadastral parcel
      selectParcel(parcelFeatures[0]);
      closeLocationDrawer();
    } else {
      // 2. User clicked ANY other point on the map in India!
      // Trigger Location Intelligence & reverse geocoding
      handleMapGroundClick(e.lngLat);
    }
  });
}

/**
 * Validate if a geographic coordinate falls within the sovereign territory of the Republic of India
 * Geographic bounding envelope of India:
 * Longitude: 68.0° E to 97.5° E
 * Latitude: 6.5° N to 37.5° N
 */
function isLocationInIndia(lng, lat, countryCode = null) {
  if (countryCode && countryCode.toLowerCase() !== 'in') {
    return false;
  }
  if (lng < 68.0 || lng > 97.5 || lat < 6.5 || lat > 37.5) {
    return false;
  }
  return true;
}

/**
 * Handle ground click anywhere on the map:
 * - Drops animated marker
 * - Validates whether the clicked point is within Indian sovereign territory
 * - If inside India: Fetches administrative tier, computes official 14-char Bhu-Aadhaar ULPIN
 * - If outside India: Informs user that Bhu-Aadhaar/DILRMP applies exclusively to the Republic of India
 */
async function handleMapGroundClick(lngLat) {
  const { lng, lat } = lngLat;
  currentInspectedLocation = { lng, lat };

  // Place or move 3D Location Marker
  if (activeLocationMarker) activeLocationMarker.remove();

  const el = document.createElement('div');
  el.className = 'location-drop-marker';
  el.innerHTML = `
    <div style="font-size:24px;filter:drop-shadow(0 0 10px #10b981);cursor:pointer;animation:bounce 1s infinite alternate;">📍</div>
  `;
  activeLocationMarker = new maplibregl.Marker(el).setLngLat([lng, lat]).addTo(map);

  // Close parcel inspector if open
  document.getElementById('parcel-inspector').classList.add('closed');

  // Pre-check coordinates
  const inIndiaCoords = isLocationInIndia(lng, lat);
  const drawerTag = document.querySelector('#location-inspector .drawer-tag');
  const btnRegister = document.getElementById('btn-loc-register');

  document.getElementById('loc-coords').textContent = `${lng.toFixed(5)}° E, ${lat.toFixed(5)}° N`;
  document.getElementById('loc-name').textContent = 'Resolving spatial boundaries...';
  document.getElementById('loc-village').textContent = 'Querying GIS database...';
  document.getElementById('loc-tehsil').textContent = 'Resolving administrative tier...';
  document.getElementById('loc-district-state').textContent = 'Spatial Data Infrastructure...';
  document.getElementById('loc-pincode').textContent = '...';
  document.getElementById('loc-elevation').textContent = `~${Math.round(150 + Math.abs(Math.sin(lat) * 250))} m MSL`;

  // Open Location Drawer
  const locDrawer = document.getElementById('location-inspector');
  locDrawer.classList.remove('closed');

  // Reverse Geocoding via Nominatim
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
      headers: { 'Accept-Language': 'en' }
    });
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const countryCode = (addr.country_code || '').toLowerCase();
      const country = addr.country || (inIndiaCoords ? 'India' : 'International');
      const isInIndia = isLocationInIndia(lng, lat, countryCode);

      if (!isInIndia) {
        // NON-INDIAN LOCATION (e.g. Aral Sea, Kazakhstan / Central Asia)
        renderNonIndianLocationDisplay(lng, lat, data, addr, country);
        return;
      }

      // VALID INDIAN TERRITORY
      renderIndianLocationDisplay(lng, lat, data, addr);
    } else {
      if (!inIndiaCoords) {
        renderNonIndianLocationDisplay(lng, lat, null, {}, 'International Territory');
      } else {
        fallbackLocationDisplay(lng, lat, generateStandardULPIN(lng, lat));
      }
    }
  } catch (err) {
    if (!inIndiaCoords) {
      renderNonIndianLocationDisplay(lng, lat, null, {}, 'International Territory');
    } else {
      fallbackLocationDisplay(lng, lat, generateStandardULPIN(lng, lat));
    }
  }
}

/**
 * Render non-Indian location (Outside Republic of India sovereign jurisdiction)
 */
function renderNonIndianLocationDisplay(lng, lat, data, addr, country) {
  const drawerTag = document.querySelector('#location-inspector .drawer-tag');
  if (drawerTag) drawerTag.textContent = 'INTERNATIONAL TERRITORY (NON-INDIAN JURISDICTION)';

  const placeName = (data && data.name) || addr.natural || addr.suburb || addr.village || addr.city || 'Non-Indian Zone';
  const region = addr.state || addr.county || 'International Region';
  const countryName = country || 'Foreign Sovereign State';

  document.getElementById('loc-name').textContent = placeName;
  document.getElementById('loc-village').textContent = placeName;
  document.getElementById('loc-tehsil').textContent = addr.county || 'Foreign Administrative Division';
  document.getElementById('loc-district-state').textContent = `${region}, ${countryName}`;
  document.getElementById('loc-pincode').textContent = addr.postcode || 'N/A (Non-Indian)';
  document.getElementById('loc-main-title').textContent = `${placeName}, ${countryName}`;
  document.getElementById('loc-sub-title').innerHTML = `
    <span style="color:#ef4444;font-weight:600;">⚠️ Outside Sovereign Republic of India:</span> 
    Coordinates fall in <strong>${countryName}</strong>. Bhu-Aadhaar (ULPIN) / DILRMP DPI is not applicable here.
  `;

  // Do NOT generate a Bhu-Aadhaar ULPIN for foreign territories!
  document.getElementById('loc-computed-ulpin').innerHTML = `
    <span style="color:#f43f5e;font-size:15px;letter-spacing:0.5px;font-weight:700;">N/A — OUTSIDE INDIAN JURISDICTION</span>
  `;

  const explEl = document.querySelector('#location-inspector .computed-expl');
  if (explEl) {
    explEl.innerHTML = `
      <strong>Jurisdiction Notice:</strong> Bhu-Aadhaar (14-digit ULPIN) is established exclusively under the 
      <strong>Digital India Land Records Modernization Programme (DILRMP)</strong> by the Ministry of Rural Development, 
      Government of India. It applies solely to parcels within the sovereign boundaries of India.
    `;
  }

  // Hide or disable the "Register into Indian ULPIN Directory" button
  const btnRegister = document.getElementById('btn-loc-register');
  if (btnRegister) {
    btnRegister.style.display = 'none';
  }

  currentInspectedLocation.placeName = placeName;
  currentInspectedLocation.state = region;
  currentInspectedLocation.district = countryName;
  currentInspectedLocation.ulpin = null;
  currentInspectedLocation.isNonIndian = true;
}

/**
 * Render valid Indian location
 */
function renderIndianLocationDisplay(lng, lat, data, addr) {
  const drawerTag = document.querySelector('#location-inspector .drawer-tag');
  if (drawerTag) drawerTag.textContent = 'INDIA SPATIAL INTELLIGENCE';

  const placeName = data.name || addr.suburb || addr.village || addr.town || addr.city || 'Survey Cadastre Zone';
  const tehsil = addr.county || addr.state_district || addr.suburb || 'Sub-Division / Taluk';
  const state = addr.state || 'India';
  const district = addr.state_district || addr.city || addr.county || 'District';
  const pincode = addr.postcode || 'PIN N/A';
  const computedUlpin = generateStandardULPIN(lng, lat);

  document.getElementById('loc-name').textContent = placeName;
  document.getElementById('loc-village').textContent = placeName;
  document.getElementById('loc-tehsil').textContent = tehsil;
  document.getElementById('loc-district-state').textContent = `${district}, ${state}`;
  document.getElementById('loc-pincode').textContent = pincode;
  document.getElementById('loc-main-title').textContent = `${placeName}, ${state}`;
  document.getElementById('loc-sub-title').textContent = `PIN: ${pincode} • WGS84 Centroid: [${lng.toFixed(4)}, ${lat.toFixed(4)}]`;

  document.getElementById('loc-computed-ulpin').textContent = computedUlpin;
  const explEl = document.querySelector('#location-inspector .computed-expl');
  if (explEl) {
    explEl.textContent = 'Derived from 14-character geocoded bounding box centroid coordinates complying with Digital India Land Records Modernization Programme (DILRMP).';
  }

  // Ensure Register button is enabled for Indian territory
  const btnRegister = document.getElementById('btn-loc-register');
  if (btnRegister) {
    btnRegister.style.display = 'inline-flex';
  }

  currentInspectedLocation.placeName = placeName;
  currentInspectedLocation.state = state;
  currentInspectedLocation.district = district;
  currentInspectedLocation.ulpin = computedUlpin;
  currentInspectedLocation.isNonIndian = false;
}

function fallbackLocationDisplay(lng, lat, computedUlpin) {
  const estState = estimateIndianState(lng, lat);
  document.getElementById('loc-name').textContent = `Location [${lng.toFixed(3)}, ${lat.toFixed(3)}]`;
  document.getElementById('loc-village').textContent = 'Cadastral Territory';
  document.getElementById('loc-tehsil').textContent = 'Local Taluk';
  document.getElementById('loc-district-state').textContent = `${estState.district}, ${estState.state}`;
  document.getElementById('loc-pincode').textContent = estState.pin;
  document.getElementById('loc-main-title').textContent = `${estState.district}, ${estState.state}`;
  document.getElementById('loc-sub-title').textContent = `WGS84 Centroid: [${lng.toFixed(4)}, ${lat.toFixed(4)}]`;

  currentInspectedLocation.placeName = `Cadastre Plot (${lng.toFixed(2)}, ${lat.toFixed(2)})`;
  currentInspectedLocation.state = estState.state;
  currentInspectedLocation.district = estState.district;
  currentInspectedLocation.ulpin = computedUlpin;
  currentInspectedLocation.isNonIndian = false;
}

/**
 * Estimate State based on coordinates if offline
 */
function estimateIndianState(lng, lat) {
  if (lat > 27.5 && lng > 76.0 && lng < 78.5) return { state: 'Delhi NCR', district: 'South West Delhi', pin: '110043' };
  if (lat > 17.5 && lat < 21.0 && lng > 72.0 && lng < 76.0) return { state: 'Maharashtra', district: 'Pune / Mumbai', pin: '411057' };
  if (lat > 11.5 && lat < 16.0 && lng > 74.0 && lng < 78.5) return { state: 'Karnataka', district: 'Bengaluru', pin: '560100' };
  if (lat > 16.0 && lat < 19.5 && lng > 77.0 && lng < 81.0) return { state: 'Telangana', district: 'Hyderabad', pin: '500081' };
  if (lat > 21.5 && lat < 25.5 && lng > 83.0 && lng < 88.0) return { state: 'Jharkhand', district: 'East Singhbhum', pin: '831002' };
  if (lat > 24.0 && lat < 29.5 && lng > 78.0 && lng < 84.0) return { state: 'Uttar Pradesh', district: 'Lucknow', pin: '226001' };
  if (lat > 24.0 && lat < 30.0 && lng > 70.0 && lng < 77.0) return { state: 'Rajasthan', district: 'Jaipur', pin: '302029' };
  if (lat > 20.0 && lat < 24.5 && lng > 68.5 && lng < 74.0) return { state: 'Gujarat', district: 'Gandhinagar', pin: '382355' };
  return { state: 'India (SDI Grid)', district: 'Territorial Cadastre', pin: 'National Zone' };
}

/**
 * Generate official DoLR-compliant 14-character Bhu-Aadhaar ULPIN
 * Structure: IN-{StateCode}-{CentroidLongPart}-{CentroidLatPart}-{RandomHash}
 * Only valid for coordinates within the sovereign territory of India!
 */
function generateStandardULPIN(lng, lat) {
  if (!isLocationInIndia(lng, lat)) {
    return 'N/A (Non-Indian Territory)';
  }
  const state = estimateIndianState(lng, lat);
  const codeMap = {
    'Maharashtra': 'MH', 'Jharkhand': 'JH', 'Karnataka': 'KA',
    'Uttar Pradesh': 'UP', 'Telangana': 'TG', 'Rajasthan': 'RJ',
    'Gujarat': 'GJ', 'Delhi NCR': 'DL'
  };
  const stCode = codeMap[state.state] || 'IN';
  const lngPart = Math.floor(Math.abs(lng) * 100).toString().padStart(4, '0');
  const latPart = Math.floor(Math.abs(lat) * 100).toString().padStart(4, '0');
  const hash = Math.floor(Math.random() * 899 + 100);
  return `IN-${stCode}-${lngPart}-${latPart}-${hash}`;
}

function closeLocationDrawer() {
  document.getElementById('location-inspector').classList.add('closed');
  if (activeLocationMarker) {
    activeLocationMarker.remove();
    activeLocationMarker = null;
  }
}

/**
 * Select a registered cadastral parcel and display its unified dossier
 */
function selectParcel(feature) {
  const props = feature.properties;
  selectedParcelId = feature.id;

  // Highlight on map: smoothly pan & tilt towards parcel
  const center = getFeatureCenter(feature);
  map.flyTo({
    center: center,
    zoom: 17.2,
    pitch: 65,
    bearing: map.getBearing() + 15,
    duration: 1800,
    essential: true
  });

  // Populate Drawer
  document.getElementById('inspector-ulpin').textContent = props.ulpin;
  document.getElementById('data-survey-no').textContent = props.survey_no;
  document.getElementById('data-area').textContent = props.area_sqm;
  document.getElementById('data-village').textContent = `${props.village}, ${props.district}`;
  document.getElementById('data-district').textContent = props.state || 'India';
  document.getElementById('data-landuse').textContent = props.landuse;
  document.getElementById('data-zoning').textContent = props.zoning;

  // Revenue
  document.getElementById('data-owner').textContent = props.owner;
  document.getElementById('data-coowners').textContent = props.coowners;
  document.getElementById('data-mutation').textContent = props.mutation;

  // Registration
  document.getElementById('data-deed').textContent = props.deed;
  document.getElementById('data-mortgage').textContent = props.mortgage;

  // Municipal & Tax
  document.getElementById('data-tax-status').textContent = props.tax_status;
  document.getElementById('data-permit').textContent = props.permit;
  document.getElementById('data-far').textContent = props.far;

  // AI Analytics
  document.getElementById('data-ai-change').textContent = props.ai_change;
  document.getElementById('data-ai-permit').textContent = props.ai_permit;
  document.getElementById('data-ai-risk').textContent = props.ai_risk;

  // Verification Badge State
  const badgeEl = document.getElementById('inspector-badge');
  const badgeTitle = document.getElementById('inspector-status-title');
  const badgeSub = document.getElementById('inspector-status-sub');

  if (props.status === 'unauthorized_alert') {
    badgeEl.className = 'verification-banner alert';
    badgeTitle.textContent = 'AI Unauthorized Construction Flagged';
    badgeSub.textContent = 'Encroachment / Construction does not match municipal sanction';
  } else if (props.status === 'disputed') {
    badgeEl.className = 'verification-banner alert';
    badgeTitle.textContent = 'Title Under Legal Dispute';
    badgeSub.textContent = 'Active court civil stay in SDM Revenue Court';
  } else if (props.status === 'government') {
    badgeEl.className = 'verification-banner verified';
    badgeTitle.textContent = 'State / Government Asset';
    badgeSub.textContent = 'Protected public infrastructure cadastre';
  } else {
    badgeEl.className = 'verification-banner verified';
    badgeTitle.textContent = 'Bhu-Aadhaar Verified Title';
    badgeSub.textContent = 'Clear title with verified 7/12 RoR records';
  }

  // Open Drawer
  const drawer = document.getElementById('parcel-inspector');
  drawer.classList.remove('closed');
}

function getFeatureCenter(feature) {
  const coords = feature.geometry.coordinates[0];
  let sumLng = 0, sumLat = 0;
  for (let c of coords) {
    sumLng += c[0];
    sumLat += c[1];
  }
  return [sumLng / coords.length, sumLat / coords.length];
}

/**
 * Universal Cinematic Earth Fly-In Animation:
 * - Can fly to ANY POINT in India (coordinates, hub, or parcel)
 * - Stage 1: Pulls back into space orbit over the entire Indian subcontinent
 * - Stage 2: Executes a high-speed curved descent directly down into the target location
 */
function startEarthFlyIn(targetCoords = null, targetZoom = 16.5, targetPitch = 62, targetBearing = 38) {
  // Determine target coordinates
  let destination = targetCoords;

  if (!destination) {
    if (selectedParcelId) {
      const feat = cadastralData.features.find(f => f.id === selectedParcelId);
      if (feat) destination = getFeatureCenter(feat);
    } else if (currentInspectedLocation) {
      destination = [currentInspectedLocation.lng, currentInspectedLocation.lat];
    } else {
      const c = map.getCenter();
      destination = [c.lng, c.lat];
    }
  }

  // Close open drawers during orbital flight
  document.getElementById('parcel-inspector').classList.add('closed');
  document.getElementById('location-inspector').classList.add('closed');

  // Stage 1: Ascend into low Earth orbit above India (matching frame 0 of Earth Studio video)
  map.flyTo({
    center: SPACE_CENTER,
    zoom: 2.2,
    pitch: 0,
    bearing: 0,
    duration: 2500,
    essential: true
  });

  // Stage 2: High-speed curved atmospheric descent directly into target location
  setTimeout(() => {
    map.flyTo({
      center: destination,
      zoom: targetZoom,
      pitch: targetPitch,
      bearing: targetBearing,
      duration: 6500,
      curve: 1.8,
      essential: true
    });
  }, 2700);
}

// Telemetry status bar update
function updateTelemetry() {
  if (!map) return;
  const center = map.getCenter();
  const pitch = Math.round(map.getPitch());
  const bearing = Math.round(map.getBearing());
  const zoom = map.getZoom().toFixed(1);

  document.getElementById('tel-coords').textContent = `${center.lng.toFixed(4)}° E, ${center.lat.toFixed(4)}° N`;
  document.getElementById('tel-pitch').textContent = `${pitch}° / ${bearing}°`;
  document.getElementById('tel-zoom').textContent = zoom;
}

/**
 * Render Existing ULPIN Registry Table & Filters
 */
function renderRegistryTable() {
  const tableBody = document.getElementById('registry-table-body');
  if (!tableBody) return;

  const stateFilter = document.getElementById('filter-state')?.value || '';
  const statusFilter = document.getElementById('filter-status')?.value || '';
  const landuseFilter = document.getElementById('filter-landuse')?.value || '';
  const keyword = (document.getElementById('filter-keyword')?.value || '').trim().toLowerCase();

  const filtered = cadastralData.features.filter(f => {
    const p = f.properties;
    if (stateFilter && p.state !== stateFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (landuseFilter && p.landuse !== landuseFilter) return false;
    if (keyword) {
      const match = p.ulpin.toLowerCase().includes(keyword) ||
        p.owner.toLowerCase().includes(keyword) ||
        p.survey_no.toLowerCase().includes(keyword) ||
        p.village.toLowerCase().includes(keyword) ||
        p.district.toLowerCase().includes(keyword) ||
        (p.state && p.state.toLowerCase().includes(keyword));
      if (!match) return false;
    }
    return true;
  });

  // Update KPI counters
  const total = cadastralData.features.length;
  const verifiedCount = cadastralData.features.filter(f => f.properties.status === 'verified').length;
  const alertCount = cadastralData.features.filter(f => f.properties.status === 'unauthorized_alert').length;
  const uniqueStates = new Set(cadastralData.features.map(f => f.properties.state)).size;

  const kpiTotalEl = document.getElementById('kpi-total');
  const kpiVerEl = document.getElementById('kpi-verified');
  const kpiAlertEl = document.getElementById('kpi-alerts');
  const kpiStatesEl = document.getElementById('kpi-states');
  const badgeCountEl = document.getElementById('registry-count-badge');

  if (kpiTotalEl) kpiTotalEl.textContent = total;
  if (kpiVerEl) kpiVerEl.textContent = verifiedCount;
  if (kpiAlertEl) kpiAlertEl.textContent = alertCount;
  if (kpiStatesEl) kpiStatesEl.textContent = uniqueStates;
  if (badgeCountEl) badgeCountEl.textContent = total;

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-dim);">No matching registered ULPINs found for selected filters</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered.map(f => {
    const p = f.properties;
    const center = getFeatureCenter(f);
    const statusPill = p.status === 'unauthorized_alert'
      ? '<span class="status-pill alert">AI Alert</span>'
      : (p.status === 'disputed'
        ? '<span class="status-pill disputed">Court Dispute</span>'
        : (p.status === 'government'
          ? '<span class="status-pill government">Govt Asset</span>'
          : '<span class="status-pill verified">Verified Title</span>'));

    return `
      <tr data-id="${f.id}">
        <td><span class="table-ulpin">${p.ulpin}</span></td>
        <td><strong>${p.survey_no}</strong></td>
        <td><span class="table-owner">${p.owner}</span></td>
        <td>${p.village}, ${p.district} (${p.state || 'IN'})</td>
        <td>${p.area_sqm}</td>
        <td>${p.landuse}</td>
        <td>${statusPill}</td>
        <td>
          <div class="table-actions">
            <button class="btn-fly-table" onclick="flyToRegistryParcel(${f.id}, [${center[0]}, ${center[1]}])" title="Cinematic Space Flight to this Parcel">
              🚀 Earth Fly-In
            </button>
            <button class="btn-open-dossier" onclick="openRegistryParcelDossier(${f.id})" title="Inspect RoR & Connected Records">
              📄 Dossier
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Global functions for inline table button actions
window.flyToRegistryParcel = function (featureId, coords) {
  document.getElementById('ulpin-registry-modal').classList.add('hidden');
  const feat = cadastralData.features.find(f => f.id === featureId);
  if (feat) {
    selectedParcelId = featureId;
    startEarthFlyIn(coords, 17.0, 65, 38);
    setTimeout(() => {
      selectParcel(feat);
    }, 7200);
  }
};

window.openRegistryParcelDossier = function (featureId) {
  document.getElementById('ulpin-registry-modal').classList.add('hidden');
  const feat = cadastralData.features.find(f => f.id === featureId);
  if (feat) {
    selectParcel(feat);
  }
};

/**
 * UI Event Listeners setup
 */
function setupUIEventListeners() {
  // Existing ULPIN Registry Modal Controls
  const btnOpenRegistry = document.getElementById('btn-open-registry');
  const registryModal = document.getElementById('ulpin-registry-modal');
  const btnCloseRegistry = document.getElementById('close-registry-modal');

  btnOpenRegistry?.addEventListener('click', () => {
    registryModal.classList.remove('hidden');
    renderRegistryTable();
  });

  btnCloseRegistry?.addEventListener('click', () => {
    registryModal.classList.add('hidden');
  });

  // Filters
  document.getElementById('filter-state')?.addEventListener('change', renderRegistryTable);
  document.getElementById('filter-status')?.addEventListener('change', renderRegistryTable);
  document.getElementById('filter-landuse')?.addEventListener('change', renderRegistryTable);
  document.getElementById('filter-keyword')?.addEventListener('input', renderRegistryTable);

  // Mint / Register New ULPIN Inline Form Toggle
  const btnToggleMint = document.getElementById('btn-toggle-mint-form');
  const mintPanel = document.getElementById('mint-ulpin-panel');
  btnToggleMint?.addEventListener('click', () => {
    mintPanel.classList.toggle('hidden');
  });

  // Mint Form Submission
  const formMint = document.getElementById('form-mint-ulpin');
  formMint?.addEventListener('submit', (e) => {
    e.preventDefault();
    const state = document.getElementById('mint-state').value;
    const district = document.getElementById('mint-district').value;
    const survey = document.getElementById('mint-survey').value;
    const owner = document.getElementById('mint-owner').value;
    const coordsRaw = document.getElementById('mint-coords').value;
    const area = document.getElementById('mint-area').value;
    const landuse = document.getElementById('mint-landuse').value;

    const parts = coordsRaw.split(',').map(s => parseFloat(s.trim()));
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
      alert('Please enter valid coordinates in "Longitude, Latitude" format (e.g. 73.7180, 18.5910)');
      return;
    }

    const lng = parts[0];
    const lat = parts[1];
    const newId = cadastralData.features.length + 1;
    const newUlpin = generateStandardULPIN(lng, lat);

    // Create standard polygon bounding around coordinate (~100m square)
    const delta = 0.001;
    const newFeature = {
      type: 'Feature',
      id: newId,
      properties: {
        ulpin: newUlpin,
        survey_no: survey,
        owner: owner,
        coowners: 'Single Khatedar',
        area_sqm: area,
        village: district.split(',')[1]?.trim() || district,
        district: district.split(',')[0]?.trim() || district,
        state: state,
        landuse: landuse,
        zoning: `${landuse} Zone`,
        status: 'verified',
        height: landuse === 'Commercial' ? 35 : (landuse === 'Industrial' ? 22 : 8),
        color: landuse === 'Commercial' ? '#10b981' : (landuse === 'Industrial' ? '#38bdf8' : '#84cc16'),
        tax_status: 'Newly Minted (Registration Cleared)',
        permit: 'Verified under Digital Public Infrastructure',
        far: '2.00',
        deed: `DEED-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
        mortgage: 'None (Clean Title)',
        mutation: `${new Date().toLocaleDateString('en-GB')} (New Bhu-Aadhaar Entry)`,
        ai_change: 'Verified via high-res satellite baseline',
        ai_permit: 'Clear title',
        ai_risk: 'Low (0.05)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[lng - delta, lat + delta], [lng + delta, lat + delta], [lng + delta, lat - delta], [lng - delta, lat - delta], [lng - delta, lat + delta]]]
      }
    };

    cadastralData.features.unshift(newFeature);
    map.getSource('cadastral-parcels')?.setData(cadastralData);
    renderRegistryTable();
    formMint.reset();
    mintPanel.classList.add('hidden');
    registryModal.classList.add('hidden');

    // Smoothly fly to newly registered parcel
    startEarthFlyIn([lng, lat], 17.2, 65, 35);
    setTimeout(() => {
      selectParcel(newFeature);
    }, 7200);
  });

  // India Hubs Dropdown Selector
  const hubSelect = document.getElementById('india-hub-select');
  hubSelect?.addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && INDIA_HUBS[key]) {
      const hub = INDIA_HUBS[key];
      startEarthFlyIn(hub.coords, hub.zoom, hub.pitch, hub.bearing);
    }
  });

  // Universal Earth Fly-In Button (Header)
  document.getElementById('btn-earth-flyby')?.addEventListener('click', () => {
    startEarthFlyIn();
  });

  // Location Drawer Controls
  document.getElementById('close-loc-drawer')?.addEventListener('click', closeLocationDrawer);

  document.getElementById('btn-loc-flyin')?.addEventListener('click', () => {
    if (currentInspectedLocation) {
      startEarthFlyIn([currentInspectedLocation.lng, currentInspectedLocation.lat], 17.0, 64, 40);
    }
  });

  document.getElementById('btn-loc-register')?.addEventListener('click', () => {
    if (currentInspectedLocation) {
      registryModal.classList.remove('hidden');
      mintPanel.classList.remove('hidden');
      document.getElementById('mint-coords').value = `${currentInspectedLocation.lng.toFixed(5)}, ${currentInspectedLocation.lat.toFixed(5)}`;
      if (currentInspectedLocation.state) document.getElementById('mint-state').value = currentInspectedLocation.state;
      if (currentInspectedLocation.district) document.getElementById('mint-district').value = `${currentInspectedLocation.district}, ${currentInspectedLocation.placeName || 'Village'}`;
    }
  });

  // Toggle 3D Pitch
  const btn3D = document.getElementById('btn-toggle-3d');
  btn3D?.addEventListener('click', () => {
    is3DMode = !is3DMode;
    btn3D.classList.toggle('active', is3DMode);
    map.easeTo({
      pitch: is3DMode ? 60 : 0,
      duration: 1000
    });
  });

  // Toggle 3D Extrusions
  const btnExtrusions = document.getElementById('btn-toggle-extrusions');
  btnExtrusions?.addEventListener('click', () => {
    isExtrusionsEnabled = !isExtrusionsEnabled;
    btnExtrusions.classList.toggle('active', isExtrusionsEnabled);

    if (map.getLayer('parcels-3d-extrusion') && map.getLayer('parcels-2d-fill')) {
      map.setLayoutProperty('parcels-3d-extrusion', 'visibility', isExtrusionsEnabled ? 'visible' : 'none');
      map.setLayoutProperty('parcels-2d-fill', 'visibility', isExtrusionsEnabled ? 'none' : 'visible');
    }
  });

  // Basemap Switcher
  document.querySelectorAll('.basemap-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.basemap-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const styleKey = e.target.dataset.style;
      if (basemapSources[styleKey]) {
        currentBasemap = styleKey;
        map.setStyle(basemapSources[styleKey]);
        map.once('style.load', () => {
          addContextualLayers();
          addCadastralLayers();
        });
      }
    });
  });

  // Contextual & Thematic Layer Toggles
  document.getElementById('layer-roads')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('context-roads-layer')) map.setLayoutProperty('context-roads-layer', 'visibility', val);
  });

  document.getElementById('layer-places')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('context-places-layer')) map.setLayoutProperty('context-places-layer', 'visibility', val);
  });

  document.getElementById('layer-buildings')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-3d-extrusion')) map.setLayoutProperty('parcels-3d-extrusion', 'visibility', val);
  });

  document.getElementById('layer-parcels')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-stroke')) map.setLayoutProperty('parcels-stroke', 'visibility', val);
  });

  document.getElementById('layer-zoning')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 0.75 : 0.2;
    if (map.getLayer('parcels-3d-extrusion')) map.setPaintProperty('parcels-3d-extrusion', 'fill-extrusion-opacity', val);
  });

  document.getElementById('layer-ai-alerts')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-ai-alert-stroke')) map.setLayoutProperty('parcels-ai-alert-stroke', 'visibility', val);
  });

  document.getElementById('layer-utilities')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('utilities-layer')) map.setLayoutProperty('utilities-layer', 'visibility', val);
  });

  document.getElementById('layer-disputes')?.addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-dispute-stroke')) map.setLayoutProperty('parcels-dispute-stroke', 'visibility', val);
  });

  // Camera Presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.dataset.preset;

      if (preset === 'cadastre-zoom') {
        map.flyTo({ center: DEFAULT_CADASTRE_CENTER, zoom: 16.4, pitch: 60, bearing: 35, duration: 1800 });
      } else if (preset === 'orbit-view') {
        map.flyTo({ center: map.getCenter(), zoom: 15.6, pitch: 72, bearing: map.getBearing() + 120, duration: 2500 });
      } else if (preset === 'space-view') {
        map.flyTo({ center: SPACE_CENTER, zoom: 3, pitch: 0, bearing: 0, duration: 3000 });
      } else if (preset === 'top-down') {
        map.flyTo({ center: map.getCenter(), zoom: map.getZoom(), pitch: 0, bearing: 0, duration: 1500 });
      }
    });
  });

  // Close Parcel Drawer
  document.getElementById('close-drawer')?.addEventListener('click', () => {
    document.getElementById('parcel-inspector').classList.add('closed');
  });

  // Focus Parcel Button in Drawer
  document.getElementById('btn-focus-parcel')?.addEventListener('click', () => {
    if (selectedParcelId) {
      const feat = cadastralData.features.find(f => f.id === selectedParcelId);
      if (feat) {
        map.flyTo({ center: getFeatureCenter(feat), zoom: 17.5, pitch: 68, bearing: map.getBearing() + 25, duration: 1600 });
      }
    }
  });

  // Export RoR Demo
  document.getElementById('btn-export-ror')?.addEventListener('click', () => {
    const ulpin = document.getElementById('inspector-ulpin').textContent;
    alert(`Generating Certified RoR (Record of Rights / 7/12 Extract) digitally signed by Bharat Land Stack for ULPIN:\n\n${ulpin}\n\nDigital Hash: sha256-4b901a89c...`);
  });

  // Search Input & Suggestions (Autocomplete for all Indian parcels and cities)
  const searchInput = document.getElementById('ulpin-search');
  const suggestionsBox = document.getElementById('search-suggestions');
  const clearBtn = document.getElementById('clear-search');

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    clearBtn.style.display = q ? 'block' : 'none';

    if (!q) {
      suggestionsBox.classList.add('hidden');
      return;
    }

    const matches = cadastralData.features.filter(f => {
      const p = f.properties;
      return p.ulpin.toLowerCase().includes(q) ||
        p.survey_no.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        (p.state && p.state.toLowerCase().includes(q)) ||
        p.landuse.toLowerCase().includes(q);
    });

    if (matches.length > 0) {
      suggestionsBox.innerHTML = matches.map(m => `
        <div class="suggestion-item" data-id="${m.id}">
          <div class="sugg-ulpin">${m.properties.ulpin} (${m.properties.survey_no})</div>
          <div class="sugg-meta">${m.properties.owner} • ${m.properties.village}, ${m.properties.district} (${m.properties.state || 'IN'})</div>
        </div>
      `).join('');
      suggestionsBox.classList.remove('hidden');

      // Click suggestion
      suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = parseInt(item.dataset.id);
          const targetFeat = cadastralData.features.find(f => f.id === id);
          if (targetFeat) {
            selectParcel(targetFeat);
            suggestionsBox.classList.add('hidden');
            searchInput.value = targetFeat.properties.ulpin;
          }
        });
      });
    } else {
      suggestionsBox.innerHTML = `
        <div class="suggestion-item" id="search-geocode-option">
          <div class="sugg-ulpin">🔍 Search India Places for "${q}"...</div>
          <div class="sugg-meta">Click to geocode and fly to this place in India</div>
        </div>
      `;
      suggestionsBox.classList.remove('hidden');

      document.getElementById('search-geocode-option')?.addEventListener('click', async () => {
        suggestionsBox.classList.add('hidden');
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(q)}`);
          if (res.ok) {
            const results = await res.json();
            if (results && results.length > 0) {
              const r = results[0];
              const lng = parseFloat(r.lon);
              const lat = parseFloat(r.lat);
              startEarthFlyIn([lng, lat], 16.2, 60, 30);
              setTimeout(() => {
                handleMapGroundClick({ lng, lat });
              }, 7000);
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
    }
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    suggestionsBox.classList.add('hidden');
  });

  // Dismiss Toast
  document.getElementById('dismiss-toast')?.addEventListener('click', () => {
    document.getElementById('intro-toast').style.display = 'none';
  });
}
