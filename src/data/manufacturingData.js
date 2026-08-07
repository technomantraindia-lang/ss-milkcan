import factoryViewImg from '../assets/factory_view.png';
import weldingImg from '../assets/welding_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';
import dispatchImg from '../assets/dispatch_loading.png';
import blueprintImg from '../assets/vessel_blueprint.png';

export const manufacturingWorkflow = [
  {
    step: '01',
    title: 'Requirement Analysis',
    desc: 'Reviewing customer application, target product capacity, heating/cooling conditions, hygiene standards, and operational environment.',
    icon: '📋',
    image: blueprintImg
  },
  {
    step: '02',
    title: 'Engineering Review & Design',
    desc: 'Translating requirements into dimensional layouts, vessel geometries, jacket configurations, and agitator drive selections.',
    icon: '📐',
    image: blueprintImg
  },
  {
    step: '03',
    title: 'Material Grade Selection',
    desc: 'Selecting prime certified SS304 or SS316 stainless steel sheets and pipes matching corrosion and product-contact demands.',
    icon: '🔬',
    image: polishingImg
  },
  {
    step: '04',
    title: 'Cutting & Shell Forming',
    desc: 'Precision shearing, dish-end dishing, shell rolling, and component preparation adhering to exact design tolerances.',
    icon: '⚙️',
    image: weldingImg
  },
  {
    step: '05',
    title: 'Precision TIG Welding',
    desc: 'Argon-purged TIG welding creating uniform, sanitary, crevice-free joint seams capable of continuous CIP cleaning.',
    icon: '🔥',
    image: weldingImg
  },
  {
    step: '06',
    title: 'Grinding & Hygienic Polishing',
    desc: 'Internal sanitary grinding and mechanical polishing achieving internal Ra < 0.4 µm smoothness to prevent bacterial accumulation.',
    icon: '✨',
    image: polishingImg
  },
  {
    step: '07',
    title: 'Inspection & Hydrostatic Testing',
    desc: 'Dimensional audits, weld seam inspections, and pressure hold testing for jacketed vessels, cooling tanks, and boilers.',
    icon: '🔍',
    image: inspectionImg
  },
  {
    step: '08',
    title: 'Packaging & Destination Dispatch',
    desc: 'Protective foam wrapping, ISPM-15 wooden crating, container space optimization, and seaworthy lashing for global dispatch.',
    icon: '📦',
    image: dispatchImg
  }
];

export const materialGrades = [
  {
    grade: 'Stainless Steel 304 (SS304)',
    badge: 'Primary Food Grade',
    desc: 'Standard food-grade chromium-nickel stainless steel widely utilized across milk collection cans, pasteurisation kettles, kitchen cauldrons, and storage vessels.',
    features: ['High corrosion resistance', 'Food-contact approved', 'Excellent weldability & finish']
  },
  {
    grade: 'Stainless Steel 316 (SS316 / SS316L)',
    badge: 'Sanitary / Acid Resistant',
    desc: 'Molybdenum-bearing austenitic stainless steel engineered for high-salinity, acidic food processing, beverage bottling, and sanitary storage applications.',
    features: ['Superior pitting resistance', 'Suitable for CIP chemical wash', 'Recommended for high-chloride products']
  },
  {
    grade: 'Custom Metal Gauge & Finish',
    badge: 'Application Tailored',
    desc: 'Sheet thickness selections (1.2mm to 6mm+) and surface finishes ranging from industrial 2B to mirror-polished Ra < 0.4 µm.',
    features: ['Custom shell thickness', 'Jacket dimple plate options', 'Sanitary mirror interior']
  }
];

export const fabricationCapabilities = [
  {
    title: 'Cylindrical & Conical Vessel Fabrication',
    desc: 'In-house rolling and dishing of vertical and horizontal storage tanks, silos, and process kettles.'
  },
  {
    title: 'Dimple & Limpet Steam Jackets',
    desc: 'Laser-welded dimple jackets and limpet coil channels for steam heating, hot water circulation, or glycol cooling.'
  },
  {
    title: 'PUF & Mineral Wool Thermal Insulation',
    desc: 'CFC-free polyurethane foam (PUF) and high-density mineral wool insulation with stainless steel outer cladding.'
  },
  {
    title: 'Agitator & Gearmotor Integration',
    desc: 'High-torque top-mounted and bottom-entry agitator drives, anchor scrapers, and variable speed VFD controls.'
  },
  {
    title: 'Tilting & Mechanical Dumping Systems',
    desc: 'Manual gearwheel and pneumatic tilting mechanisms for khoya machines, ghee kettles, and cooking cauldrons.'
  },
  {
    title: 'OEM Drawing-Based Manufacturing',
    desc: 'White-label equipment fabrication built around client-provided CAD engineering drawings and specifications.'
  }
];

export const qualitySteps = [
  { num: '01', title: 'Incoming Sheet & Pipe Audit', desc: 'Material grade verification, thickness check, and mill certificate review.' },
  { num: '02', title: 'In-Process Dimensional Inspection', desc: 'Verifying shell diameter, height, dish radius, and nozzle orientations.' },
  { num: '03', title: 'Weld Joint & Penetration Audit', desc: 'Visual and dye-penetrant inspection of purged TIG weld seams.' },
  { num: '04', title: 'Surface Finish & Roughness Check', desc: 'Internal Ra roughness measurement ensuring hygienic cleanability.' },
  { num: '05', title: 'Hydrostatic Pressure Hold Test', desc: 'Pressure testing dimple jackets and internal vessels for zero leakage.' },
  { num: '06', title: 'Final Pre-Dispatch Audit', desc: 'Complete functional check, accessory verification, and export packing check.' }
];
