import dispatchImg from '../assets/dispatch_loading.png';
import milkCoolerImg from '../assets/milk_cooler.png';
import milkTankImg from '../assets/milk_tank.png';
import steamVesselImg from '../assets/steam_vessel.png';
import gheeBoilerImg from '../assets/ghee_boiler.png';
import milkCanImg from '../assets/milk_can.png';
import blueprintImg from '../assets/vessel_blueprint.png';
import factoryViewImg from '../assets/factory_view.png';

export const projectsData = [
  {
    id: 'bangladesh-dairy-cooperative',
    title: 'Bangladesh Regional Milk Collection & Chilling Hub Supply',
    client: 'District Milk Producers Union / Cooperative Network',
    location: 'Dhaka & Bogra, Bangladesh 🇧🇩',
    year: '2024',
    category: 'Export Supply',
    categoryTag: 'Export Supply',
    badgeText: '40ft Container Dispatch',
    capacity: '4,500 Litres Total Collection Volume',
    material: 'Food-Grade SS304 (Sanitary Ra < 0.4 µm)',
    scope: 'Bulk supply of heavy-duty 40L lockable milk cans, double-walled insulated cans, and milk receiver buffer tanks for rural intake stations.',
    equipmentSupplied: [
      '120 Units x 40-Litre Lockable Stainless Steel Milk Cans',
      '45 Units x 40-Litre Double-Walled Insulated Cans',
      '4 Units x 500L Milk Receiver & Buffer Storage Tanks',
      'Seaworthy ISPM-15 Wooden Crate Packaging'
    ],
    challenge: 'High ambient rural temperatures caused raw milk spoilage during long-distance transit from rural collection points to central chilling plants.',
    solution: 'Engineered double-walled polyurethane foam (PUF) insulated stainless steel cans capable of preserving milk temperature below 8°C for over 6 hours without active refrigeration.',
    result: 'Reduced raw milk spoilage rate by 94% across 12 collection routes and established a long-term annual supply contract with the cooperative.',
    image: dispatchImg
  },
  {
    id: 'sri-lanka-chilling-facility',
    title: 'Commercial Bulk Milk Cooling & Storage System Installation',
    client: 'Lanka Dairy Processing Ltd',
    location: 'Colombo, Sri Lanka 🇱🇰',
    year: '2024',
    category: 'Dairy Plants',
    categoryTag: 'Dairy Processing',
    badgeText: 'Turnkey Cooling Package',
    capacity: '10,000 Litres Daily Chilling Capacity',
    material: 'SS304 Shell & Laser-Welded Dimple Jacket',
    scope: 'Engineering, fabrication, and export of direct-expansion (DX) bulk milk coolers with digital temperature controllers and gear agitators.',
    equipmentSupplied: [
      '2 Units x 2,500L Direct-Expansion (DX) Bulk Milk Coolers',
      '1 Unit x 5,000L Insulated Sanitary Milk Storage Silo',
      'R404A Refrigerant Condensing Units & Automatic Agitator Timers',
      'Sanitary CIP Cleaning Spray Balls & Outlet Valves'
    ],
    challenge: 'The processor required rapid chilling from 35°C to 4°C within 3 hours to meet export dairy quality standards.',
    solution: 'Fabricated DX bulk milk coolers featuring high-efficiency laser-welded dimple cooling jackets and slow-speed 32 RPM agitators to prevent fat separation.',
    result: 'Achieved 4°C cooling within 2.5 hours, improving butterfat retention and meeting Sri Lankan national dairy standards.',
    image: milkCoolerImg
  },
  {
    id: 'tirupati-mega-kitchen',
    title: 'Centralized Steam Cooking System for Institutional Kitchen',
    client: 'Religious Pilgrimage Trust & Central Canteen',
    location: 'Andhra Pradesh, India 🇮🇳',
    year: '2023',
    category: 'Mega Kitchens',
    categoryTag: 'Mega Kitchen',
    badgeText: '50,000 Meals Daily',
    capacity: '2,400 Litres Batch Cooking Capacity',
    material: 'Heavy-Gauge SS304 Sheet (3mm to 5mm)',
    scope: 'Manufacturing and installation of direct steam-jacketed rice cauldrons, daal kettles, and insulated food transport carriers.',
    equipmentSupplied: [
      '4 Units x 400L Direct Steam-Jacketed Tilting Rice Cauldrons',
      '4 Units x 200L Steam Daal & Sambar Cooking Kettles',
      '12 Units x 100L Insulated Food Distribution Carriers',
      'Centralized Steam Distribution Manifold & Safety Valves'
    ],
    challenge: 'Preparing hot meals for 50,000 devotees daily required high thermal efficiency, easy tilting, and rapid cleaning between batches.',
    solution: 'Designed steam-jacketed cauldrons with heavy-duty worm-gear tilting mechanisms and polished internal surfaces for effortless meal discharge.',
    result: 'Reduced meal preparation time by 40% while lowering steam energy consumption by 22%.',
    image: steamVesselImg
  },
  {
    id: 'uae-process-plant-oem',
    title: 'OEM Chemical & Food Grade Agitated Storage Vessels',
    client: 'Emirates Process Equipment OEM Partner',
    location: 'Dubai, UAE 🇦🇪',
    year: '2024',
    category: 'Custom OEM',
    categoryTag: 'OEM Fabrication',
    badgeText: 'SS316L Pharmaceutical Grade',
    capacity: '15,000 Litres Total Storage Volume',
    material: 'SS316L Product Contact / SS304 Cladding',
    scope: 'Drawing-based white-label OEM manufacturing of dimple-jacketed mixing tanks with variable speed agitators for a Middle East contractor.',
    equipmentSupplied: [
      '3 Units x 5,000L SS316L Agitated Mixing Tanks',
      'VFD Drive Top-Entry Anchor Scraper Mixers',
      'Dimple Cooling Jackets Tested at 6 Bar Hydrostatic Hold',
      'Container Lashing & ISPM-15 Export Crating'
    ],
    challenge: 'Strict dimensional tolerances, ASME weld purging requirements, and high corrosion resistance for specialized liquid processing.',
    solution: 'Executed full CAD drawing-based fabrication using certified SS316L prime sheets with purged argon TIG welding and Ra < 0.3 µm surface polish.',
    result: 'Passed all third-party NDT weld radiographs and hydrostatic pressure tests on first inspection, leading to repeat OEM orders.',
    image: milkTankImg
  },
  {
    id: 'delhi-halwai-sweet-plant',
    title: 'Commercial Khoya & Ghee Production Line Expansion',
    client: 'Bikanervala / Premium Sweet Manufacturer',
    location: 'Delhi NCR, India 🇮🇳',
    year: '2023',
    category: 'Dairy Plants',
    categoryTag: 'Dairy Processing',
    badgeText: 'High-Volume Production',
    capacity: '1,200 KG Daily Sweet Production',
    material: 'Heavy SS304 Sheet & Brass Scraper Blades',
    scope: 'Custom manufacturing of motorized tilting khoya machines, ghee boiling kettles, and pneumatic paneer press tables.',
    equipmentSupplied: [
      '6 Units x 200L Motorized Tilting Khoya Making Machines',
      '2 Units x 500L Steam Ghee Boiling & Clarification Kettles',
      '3 Units x Pneumatic Multi-Block Paneer Press Stations',
      'Stainless Steel Perforated Paneer Mould Trays'
    ],
    challenge: 'Manual khoya production caused milk scorching, inconsistent moisture retention, and high labor dependency.',
    solution: 'Supplied motorized khoya machines with Teflon/brass scraper blades that continuously scrape bottom surfaces during heating, preventing scorching.',
    result: 'Standardized khoya texture, eliminated product scorching, and boosted daily batch output by 150%.',
    image: gheeBoilerImg
  },
  {
    id: 'kenya-milk-collection-dispatch',
    title: 'East Africa Rural Milk Collection Can Supply',
    client: 'Kenya Dairy Board / Regional Equipment Dealer',
    location: 'Nairobi, Kenya 🇰🇪',
    year: '2024',
    category: 'Export Supply',
    categoryTag: 'Export Supply',
    badgeText: '20ft Container Full Load',
    capacity: '8,000 Litres Transport Capacity',
    material: 'Seamless Food-Grade SS304 Sheet',
    scope: 'Bulk production and seaworthy containerized supply of 20L and 40L stainless steel milk transport cans for smallholder dairy farmers.',
    equipmentSupplied: [
      '250 Units x 20-Litre Stainless Steel Milk Cans',
      '150 Units x 40-Litre Heavy-Duty Milk Cans',
      'Drop-Handle Seals & Heavy Rubber Lid Gaskets',
      'Palletised & Steel-Strapped Container Loading'
    ],
    challenge: 'Rough unpaved rural roads caused traditional plastic/aluminum milk cans to dent, leak, or harbor bacteria in scratched surfaces.',
    solution: 'Manufactured heavy-gauge seamless SS304 cans with drop-forged handles, reinforced bottom rings, and airtight hermetic sealing lids.',
    result: 'Delivered a full 20ft container to Nairobi with zero shipping damage; cans are now used daily across 40 East African collection centers.',
    image: milkCanImg
  }
];

export const projectStats = [
  { num: '45+', label: 'Commercial Projects Completed' },
  { num: '14', label: 'Export Countries Supplied' },
  { num: '100%', label: 'In-House Quality Audited' },
  { num: 'SS304/316', label: 'Certified Food Grade Material' }
];
