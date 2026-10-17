/**
 * Land Stack 3D - Interactive GIS Digital Public Infrastructure
 * Core Web GIS Application powered by MapLibre GL JS
 */

// Global MapLibre GL alias compatibility
if (typeof window !== 'undefined') {
  if (typeof maplibregl !== 'undefined' && typeof maplibreGl === 'undefined') {
    window.maplibreGl = maplibregl;
  }
}

// Target Focus Point (Extracted from Google Earth Studio project at 86.1924° E, 22.7268° N)
const CADASTRE_CENTER = [86.1924, 22.7268];
const SPACE_CENTER = [82.0, 21.0];

// State Management
let map = null;
let currentBasemap = 'satellite';
let is3DMode = true;
let isExtrusionsEnabled = true;
let selectedParcelId = null;
let hoverPopup = null;

// Cadastral GeoJSON Parcels Dataset
const cadastralData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 1,
      properties: {
        ulpin: 'IN-JH-8619-2272-001',
        survey_no: '104/1',
        owner: 'Sardar Gurpreet Singh & Brothers',
        coowners: '2 Co-Sharers (Equal 50% Share)',
        area_sqm: '6,450 m² (1.59 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Industrial / Manufacturing',
        zoning: 'Industrial Belt (IND-2)',
        status: 'verified',
        height: 28,
        color: '#38bdf8',
        tax_status: 'Cleared (Receipt #TX-88219)',
        permit: 'Approved: BP-2023-7410 (Factory Shed)',
        far: '1.75 / 2.0 (Compliant)',
        deed: 'DEED-2018-0912 (Registered)',
        mortgage: 'Lien: Punjab National Bank (₹65,00,000)',
        mutation: '04-Oct-2022 (7/12 RoR Mutation Verified)',
        ai_change: 'No unauthorized structures detected',
        ai_permit: 'Compliant with Approved Plan',
        ai_risk: 'Low (0.09) - Beyond Hazard Buffers'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1908, 22.7275],
          [86.1922, 22.7278],
          [86.1925, 22.7266],
          [86.1911, 22.7263],
          [86.1908, 22.7275]
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
        area_sqm: '4,120 m² (1.02 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Commercial / Retail Complex',
        zoning: 'Commercial Mixed (C-1)',
        status: 'verified',
        height: 38,
        color: '#10b981',
        tax_status: 'Cleared (Receipt #TX-99014)',
        permit: 'Approved: BP-2024-1188 (Commercial G+3)',
        far: '2.10 / 2.25 (Compliant)',
        deed: 'DEED-2021-3482 (Registered)',
        mortgage: 'None (Clean Title)',
        mutation: '19-Jan-2024 (Regular Mutation)',
        ai_change: 'Construction progress matches declared phase',
        ai_permit: 'Height within 15m municipal limit',
        ai_risk: 'Low (0.14) - Safe Zone'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1925, 22.7278],
          [86.1942, 22.7281],
          [86.1946, 22.7269],
          [86.1928, 22.7266],
          [86.1925, 22.7278]
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
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Agricultural (Converted to Non-Agri)',
        zoning: 'Agricultural Buffer Zone (A-2)',
        status: 'unauthorized_alert',
        height: 22,
        color: '#f43f5e',
        tax_status: 'Overdue Notice Served (₹38,400)',
        permit: 'DENIED / NO VALID SANCTION',
        far: 'Unregulated Encroachment',
        deed: 'DEED-2019-1144',
        mortgage: 'Under Dispute / Court Stay Order',
        mutation: 'Flagged by Land Revenue Officer',
        ai_change: 'CRITICAL ALERT: 850m² concrete shed detected without building permit!',
        ai_permit: 'Cross-check failed: No approval on record',
        ai_risk: 'High (0.87) - Agricultural Zone Encroachment'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1911, 22.7263],
          [86.1928, 22.7266],
          [86.1931, 22.7252],
          [86.1913, 22.7249],
          [86.1911, 22.7263]
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
        area_sqm: '8,900 m² (2.20 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Agricultural Cultivation',
        zoning: 'Primary Agriculture (A-1)',
        status: 'verified',
        height: 5,
        color: '#84cc16',
        tax_status: 'Exempt (Agricultural RoR)',
        permit: 'Exempt / Farmhouse eligible',
        far: 'N/A',
        deed: 'Inheritance RoR (7/12 Register)',
        mortgage: 'Kisan Credit Card (SBI: ₹2,50,000)',
        mutation: '11-Aug-2020 (Heir Succession Confirmed)',
        ai_change: 'Crop pattern regular; active cultivation verified',
        ai_permit: 'No unauthorized structures detected',
        ai_risk: 'Low (0.05) - Stable Soil Profile'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1928, 22.7266],
          [86.1946, 22.7269],
          [86.1950, 22.7254],
          [86.1931, 22.7252],
          [86.1928, 22.7266]
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
        area_sqm: '18,500 m² (4.57 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Public Utility / Infrastructure',
        zoning: 'Public & Semi-Public (PSP)',
        status: 'government',
        height: 18,
        color: '#6366f1',
        tax_status: 'Government Property (Exempt)',
        permit: 'State Cabinet Approval #GC-441',
        far: '2.50 (Substation & Water Treatment)',
        deed: 'Govt Gazette Notification 2017',
        mortgage: 'None (State Asset)',
        mutation: 'Permanent Government Vesting',
        ai_change: 'Boundary wall and access road detected',
        ai_permit: 'Approved state utility project',
        ai_risk: 'Zero Risk'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1942, 22.7281],
          [86.1965, 22.7285],
          [86.1970, 22.7267],
          [86.1946, 22.7269],
          [86.1942, 22.7281]
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
        area_sqm: '5,300 m² (1.31 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Residential Development',
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
        ai_change: 'Partial excavation detected',
        ai_permit: 'Alert: Work on disputed parcel stopped by notice',
        ai_risk: 'Moderate (0.64) - Legal Injunction Active'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1946, 22.7269],
          [86.1970, 22.7267],
          [86.1974, 22.7252],
          [86.1950, 22.7254],
          [86.1946, 22.7269]
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
        area_sqm: '24,000 m² (5.93 Acres)',
        village: 'Sundernagar, Jamshedpur',
        district: 'East Singhbhum, Jharkhand',
        landuse: 'Protected Green Belt / Forest',
        zoning: 'Eco-Sensitive Forest Zone (ENV-1)',
        status: 'government',
        height: 2,
        color: '#059669',
        tax_status: 'Exempt',
        permit: 'Strict No-Construction Zone',
        far: '0.00',
        deed: 'Indian Forest Act Reserved Forest',
        mortgage: 'Inalienable State Asset',
        mutation: 'Protected Green Cover Record',
        ai_change: 'Sentinel-2 NDVI confirms dense canopy; no deforestation',
        ai_permit: 'Clear from encroachments',
        ai_risk: 'Zero Risk'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [86.1895, 22.7280],
          [86.1908, 22.7275],
          [86.1911, 22.7249],
          [86.1898, 22.7252],
          [86.1895, 22.7280]
        ]]
      }
    }
  ]
};

// Utilities & Roads Line Strings
const utilitiesData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'NH-33 / Tata-Hata Road Corridor', type: 'Highway', buffer: '30m Setback' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [86.1885, 22.7288],
          [86.1910, 22.7279],
          [86.1940, 22.7272],
          [86.1980, 22.7262]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: '132kV High Tension Power Line', type: 'Utility', buffer: '15m Safe Corridor' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [86.1900, 22.7245],
          [86.1930, 22.7258],
          [86.1965, 22.7270]
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
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: 'Esri, Maxar, Earthstar Geographics'
      }
    },
    layers: [
      {
        id: 'esri-satellite-layer',
        type: 'raster',
        source: 'esri-satellite',
        paint: { 'raster-opacity': 1 }
      }
    ]
  },
  hybrid: {
    version: 8,
    sources: {
      'esri-satellite': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256
      },
      'esri-labels': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
        ],
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
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: 'Esri, HERE, Garmin'
      },
      'esri-dark-ref': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
        ],
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
});

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: basemapSources.satellite,
    center: CADASTRE_CENTER,
    zoom: 16.3,
    pitch: 58,
    bearing: 30,
    antialias: true,
    maxPitch: 82
  });

  // Controls
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
  map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left');

  // Track Telemetry
  map.on('move', updateTelemetry);

  map.on('load', () => {
    addCadastralLayers();
    updateTelemetry();
  });
}

function addCadastralLayers() {
  // Parcels GeoJSON source
  if (!map.getSource('cadastral-parcels')) {
    map.addSource('cadastral-parcels', {
      type: 'geojson',
      data: cadastralData
    });
  }

  // Utilities GeoJSON source
  if (!map.getSource('utilities-lines')) {
    map.addSource('utilities-lines', {
      type: 'geojson',
      data: utilitiesData
    });
  }

  // 1. 3D Parcel Fill Extrusions (Blocks)
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
      'fill-extrusion-opacity': 0.72
    }
  });

  // 2. 2D Parcel Fill (active when extrusions toggled off)
  map.addLayer({
    id: 'parcels-2d-fill',
    type: 'fill',
    source: 'cadastral-parcels',
    layout: {
      visibility: 'none'
    },
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': 0.4
    }
  });

  // 3. Vibrant Cadastral Boundary Stroke
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

  // 4. AI Unauthorized Alert Glowing Outline
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

  // 5. Utilities & Road Buffers
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

  // Interactive Events
  setupMapInteractions();
}

function setupMapInteractions() {
  hoverPopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 15
  });

  // Hover effect
  map.on('mousemove', 'parcels-3d-extrusion', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    if (e.features.length > 0) {
      const feat = e.features[0].properties;
      const coords = e.lngLat;
      const statusBadge = feat.status === 'unauthorized_alert'
        ? '<span class="popup-badge danger">AI ALERT: Unauthorized Build</span>'
        : '<span class="popup-badge success">Verified RoR</span>';

      hoverPopup.setLngLat(coords).setHTML(`
        <div class="popup-title">${feat.ulpin}</div>
        <div class="popup-sub">Survey No: <strong>${feat.survey_no}</strong> • ${feat.landuse}</div>
        <div>${statusBadge}</div>
      `).addTo(map);
    }
  });

  map.on('mouseleave', 'parcels-3d-extrusion', () => {
    map.getCanvas().style.cursor = '';
    hoverPopup.remove();
  });

  // Click to Inspect Parcel
  map.on('click', 'parcels-3d-extrusion', (e) => {
    if (e.features.length > 0) {
      const feature = e.features[0];
      selectParcel(feature);
    }
  });

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['parcels-3d-extrusion', 'parcels-2d-fill'] });
    if (!features.length) {
      // Clicked outside parcel
    }
  });
}

function selectParcel(feature) {
  const props = feature.properties;
  selectedParcelId = feature.id;

  // Highlight on map: smoothly pan & tilt towards parcel
  const bbox = getFeatureCenter(feature);
  map.flyTo({
    center: bbox,
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
  document.getElementById('data-village').textContent = props.village;
  document.getElementById('data-district').textContent = props.district;
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

// Cinematic Google Earth Fly-In Animation (Replicating footage in earth folder)
function startEarthFlyIn() {
  // 1. Zoom out high into orbit over subcontinent (just like earth1_000.jpeg)
  map.flyTo({
    center: SPACE_CENTER,
    zoom: 2.2,
    pitch: 0,
    bearing: 0,
    duration: 2500,
    essential: true
  });

  // 2. After reaching orbit, initiate high-speed curved descent into parcel cadastre (like earth1_150 -> earth1_300)
  setTimeout(() => {
    map.flyTo({
      center: CADASTRE_CENTER,
      zoom: 16.4,
      pitch: 62,
      bearing: 38,
      duration: 6500,
      curve: 1.8,
      essential: true
    });
  }, 2800);
}

// Telemetry update
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

// UI Event Handlers
function setupUIEventListeners() {
  // Earth Fly-In Button
  document.getElementById('btn-earth-flyby').addEventListener('click', () => {
    startEarthFlyIn();
  });

  // Toggle 3D Pitch
  const btn3D = document.getElementById('btn-toggle-3d');
  btn3D.addEventListener('click', () => {
    is3DMode = !is3DMode;
    btn3D.classList.toggle('active', is3DMode);
    map.easeTo({
      pitch: is3DMode ? 60 : 0,
      duration: 1000
    });
  });

  // Toggle 3D Extrusions
  const btnExtrusions = document.getElementById('btn-toggle-extrusions');
  btnExtrusions.addEventListener('click', () => {
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
          addCadastralLayers();
        });
      }
    });
  });

  // Layer Toggles
  document.getElementById('layer-parcels').addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-3d-extrusion')) map.setLayoutProperty('parcels-3d-extrusion', 'visibility', val);
    if (map.getLayer('parcels-stroke')) map.setLayoutProperty('parcels-stroke', 'visibility', val);
  });

  document.getElementById('layer-ai-alerts').addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('parcels-ai-alert-stroke')) map.setLayoutProperty('parcels-ai-alert-stroke', 'visibility', val);
  });

  document.getElementById('layer-utilities').addEventListener('change', (e) => {
    const val = e.target.checked ? 'visible' : 'none';
    if (map.getLayer('utilities-layer')) map.setLayoutProperty('utilities-layer', 'visibility', val);
  });

  // Location Presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.dataset.preset;

      if (preset === 'cadastre-zoom') {
        map.flyTo({ center: CADASTRE_CENTER, zoom: 16.4, pitch: 60, bearing: 35, duration: 1800 });
      } else if (preset === 'orbit-view') {
        map.flyTo({ center: CADASTRE_CENTER, zoom: 15.6, pitch: 72, bearing: map.getBearing() + 120, duration: 2500 });
      } else if (preset === 'space-view') {
        map.flyTo({ center: SPACE_CENTER, zoom: 3, pitch: 0, bearing: 0, duration: 3000 });
      } else if (preset === 'top-down') {
        map.flyTo({ center: CADASTRE_CENTER, zoom: 16.2, pitch: 0, bearing: 0, duration: 1500 });
      }
    });
  });

  // Close Drawer
  document.getElementById('close-drawer').addEventListener('click', () => {
    document.getElementById('parcel-inspector').classList.add('closed');
  });

  // Focus Parcel Button in Drawer
  document.getElementById('btn-focus-parcel').addEventListener('click', () => {
    if (selectedParcelId) {
      const feat = cadastralData.features.find(f => f.id === selectedParcelId);
      if (feat) {
        map.flyTo({ center: getFeatureCenter(feat), zoom: 17.5, pitch: 68, bearing: map.getBearing() + 25, duration: 1600 });
      }
    }
  });

  // Export RoR Demo
  document.getElementById('btn-export-ror').addEventListener('click', () => {
    const ulpin = document.getElementById('inspector-ulpin').textContent;
    alert(`Generating Certified RoR (Record of Rights / 7/12 Extract) digitally signed by Bharat Land Stack for ULPIN:\n\n${ulpin}\n\nDigital Hash: sha256-4b901a89c...`);
  });

  // Search Input & Suggestions
  const searchInput = document.getElementById('ulpin-search');
  const suggestionsBox = document.getElementById('search-suggestions');
  const clearBtn = document.getElementById('clear-search');

  searchInput.addEventListener('input', (e) => {
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
             p.landuse.toLowerCase().includes(q);
    });

    if (matches.length > 0) {
      suggestionsBox.innerHTML = matches.map(m => `
        <div class="suggestion-item" data-id="${m.id}">
          <div class="sugg-ulpin">${m.properties.ulpin} (${m.properties.survey_no})</div>
          <div class="sugg-meta">${m.properties.owner} • ${m.properties.landuse}</div>
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
      suggestionsBox.innerHTML = `<div class="suggestion-item"><span class="sugg-meta">No matching land parcel found</span></div>`;
      suggestionsBox.classList.remove('hidden');
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    suggestionsBox.classList.add('hidden');
  });

  // Dismiss Toast
  document.getElementById('dismiss-toast').addEventListener('click', () => {
    document.getElementById('intro-toast').style.display = 'none';
  });
}
