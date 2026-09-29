import milkCan40LRealImg from '../assets/stainless-steel-milk-can-40-litre-jay-ambe.png';
import bulkMilkCoolerRealImg from '../assets/bulk-cooler.png';
import liquidStorageTankRealImg from '../assets/stainless-steel-liquid-storage-tank-17000-litre-jay-ambe.png';
import gheeBoilerRealImg from '../assets/ghee-boiler.png';
import steamCookingVesselRealImg from '../assets/steam-cooking-vessel-jay-ambe.png';
import khoyaMachineRealImg from '../assets/Khoya-Making-Machine-200-Ltr-jay-ambe.png';
import riceCauldronRealImg from '../assets/Rice-Cauldron-jay-ambe.png';
import brewingKettleRealImg from '../assets/SS-Brewing-Kettle-jay-ambe.png';
import milkProcessingPlantRealImg from '../assets/milk-processing-plant-jay-ambe.png';
import factoryViewImg from '../assets/factory_view.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';

export const industriesData = [
  {
    id: 'dairy-farms',
    num: 'SECTOR 01',
    name: 'Dairy Farms & Milk Collection',
    heading: 'Reliable Equipment for Milk Collection & Farm-Level Handling',
    description: 'Milk quality begins with hygienic collection and handling. AMBE manufactures food-grade stainless-steel equipment designed for dairy farms, milk collection centres, rural cooperatives, and automated milking operations where durability, ease of cleaning, and thermal control are essential.',
    solutions: [
      'Stainless-Steel Milk Cans (5L to 50L)',
      'Double-Walled Insulated Milk Cans',
      'Ice-Chamber Milk Cans for Passive Cooling',
      'Milking Bucket & Machine Cluster Cans',
      'Milk Receiver Buffer Tanks',
      'Sanitary Teat Shells & Claws'
    ],
    primaryApp: 'Dairy Farms, Chilling Units & Milk Cooperatives',
    ctaText: 'Explore Milk Collection Equipment',
    ctaPath: '/products#milk-collection-handling',
    secondaryCtaText: 'Request Farm Equipment Quote',
    image: milkCan40LRealImg,
    badgeText: 'Food-Grade SS304 / SS316L'
  },
  {
    id: 'dairy-processing',
    num: 'SECTOR 02',
    name: 'Dairy Processing Plants',
    heading: 'From Chilling & Storage to Value-Added Dairy Processing',
    description: 'Commercial dairy processors require process systems that maintain strict temperature regulation, sanitary fluid transfer, and hygienic product-contact surfaces. AMBE engineers bulk milk cooling tanks, pasteurisation vessels, storage silos, and automated processing machinery.',
    solutions: [
      'Direct Expansion (DX) Bulk Milk Coolers',
      'Sanitary Milk Storage Silos & Tanks',
      'Batch Pasteuriser Kettles & Heat Exchangers',
      'Motorized Butter Churners & Cream Separators',
      'Pneumatic Paneer Press Stations',
      'Khoya Making Machines & Ghee Boiling Vessels'
    ],
    primaryApp: 'Medium & Large-Scale Dairy Processing Plants',
    ctaText: 'Explore Dairy Processing Machinery',
    ctaPath: '/products#dairy-processing-equipment',
    secondaryCtaText: 'Discuss a Dairy Plant Project',
    image: bulkMilkCoolerRealImg,
    badgeText: 'Laser-Welded Dimple Jackets'
  },
  {
    id: 'food-processing',
    num: 'SECTOR 03',
    name: 'Food Processing & Hygienic Production',
    heading: 'Stainless Steel Systems for Commercial Food Manufacturing',
    description: 'Industrial food processing depends on crevice-free cleanable equipment, consistent heat transfer, and robust stainless-steel fabrication. AMBE manufactures sanitary process vessels, mixing tanks, and bulk storage drums for food processing operations.',
    solutions: [
      'Single-Skin & Jacketed Storage Tanks',
      'Agitated Mixing Tanks with Scraper Blades',
      'Steam-Jacketed Cooking Cauldrons',
      'Insulated Food Distribution Carriers',
      '55-Gallon SS Export Barrels & Drums',
      'Hygienic Fluid Transfer Accessories'
    ],
    primaryApp: 'Food Plants, Sauce, Jam & Edible Oil Manufacturing',
    ctaText: 'Explore Process & Storage Tanks',
    ctaPath: '/products#process-storage-equipment',
    secondaryCtaText: 'Discuss Process Requirement',
    image: liquidStorageTankRealImg,
    badgeText: 'Mirror Polish Ra < 0.4 µm'
  },
  {
    id: 'sweet-confectionery',
    num: 'SECTOR 04',
    name: 'Sweet, Confectionery & Traditional Dairy',
    heading: 'Heavy-Duty Machinery for High-Volume Sweet & Dairy Production',
    description: 'Commercial confectioners and sweet manufacturers require heavy-duty equipment built to withstand continuous heating, mechanical stirring, and rapid batch turnover with optimum thermal efficiency and hygiene.',
    solutions: [
      'Tilting Motorized Khoya Making Machines',
      'Ghee Boiling & Clarification Vessels',
      'Pneumatic & Screw Paneer Press Stations',
      'Paneer Moulds & Perforated Trays',
      'Commercial Milk Boiling Vessels',
      'Heavy-Duty Stainless Steel Stirring Paddles'
    ],
    primaryApp: 'Halwai Chains, Sweet Factories & Dairy Sweet Units',
    ctaText: 'Explore Sweet & Dairy Machinery',
    ctaPath: '/products#dairy-processing-equipment',
    secondaryCtaText: 'Request Machinery Recommendation',
    image: khoyaMachineRealImg,
    badgeText: 'High-Torque Gearmotor Stirring'
  },
  {
    id: 'institutional-kitchens',
    num: 'SECTOR 05',
    name: 'Institutional, Mega & Community Kitchens',
    heading: 'Engineered for High-Capacity Central Cooking & Distribution',
    description: 'Mega kitchens serving schools, university hostels, religious trusts, and central catering facilities rely on heavy-gauge stainless-steel vessels for high-volume meal preparation, hygienic holding, and bulk food transport.',
    solutions: [
      'Direct Steam-Jacketed Rice Cauldrons',
      'Daal, Sambar & Soup Cooking Kettles',
      'Tilting Food Cooking Cauldrons',
      'Centralized Steam Generator Systems',
      'Double-Walled Insulated Food Carriers',
      'Commercial Stainless Steel Stoves & Ranges'
    ],
    primaryApp: 'Temple Trusts, Central Canteens & Government Meal Schemes',
    ctaText: 'Explore Institutional Kitchen Range',
    ctaPath: '/products#institutional-mega-kitchen-equipment',
    secondaryCtaText: 'Discuss Large Kitchen Requirement',
    image: steamCookingVesselRealImg,
    badgeText: 'Heavy-Gauge Food-Grade Construction'
  },
  {
    id: 'hotels-catering',
    num: 'SECTOR 06',
    name: 'Hotels, Catering & Industrial Canteens',
    heading: 'Practical Stainless Steel Equipment for Commercial Food Service',
    description: 'Hotels, industrial workplace canteens, and commercial event caterers need durable, easy-to-clean equipment built to sustain intensive daily operation while maintaining food temperature and hygiene standards.',
    solutions: [
      'Commercial Burner Stoves & Cooking Ranges',
      'Stainless Steel Bhagona, Kadhai & Tapela',
      'Insulated Food Distribution Carriers (10L - 35L)',
      'Stainless Steel Kitchen Work Tables & Sinks',
      'Utility & Service Transport Trolleys',
      'Custom Storage Containers & Canisters'
    ],
    primaryApp: 'Hotels, Commercial Caterers & Factory Canteens',
    ctaText: 'Explore Commercial Kitchen Solutions',
    ctaPath: '/products#institutional-mega-kitchen-equipment',
    secondaryCtaText: 'Request Commercial Quote',
    image: riceCauldronRealImg,
    badgeText: 'Commercial-Grade Heavy Sheet'
  },
  {
    id: 'beverage-hygienic',
    num: 'SECTOR 07',
    name: 'Beverage, Hygienic Storage & Special Process',
    heading: 'Custom Stainless Steel Vessels for Hygienic Liquid Processing',
    description: 'Beverage manufacturers and process facilities require corrosion-resistant, polished vessels tailored to storage, heating, cooling, or agitation needs with sanitary connections and leak-proof welds.',
    solutions: [
      'Stainless Steel Sugar Syrup Tanks',
      'Conical Fermenters & Brewing Kettles',
      'Agitated Liquid Storage Vessels',
      'Dimple-Jacketed Cooling & Heating Tanks',
      'SS316L Pharmaceutical Grade Storage Tanks',
      'Custom Sanitary Fitting Assemblies'
    ],
    primaryApp: 'Beverage Bottling, Craft Breweries & Liquid Processing',
    ctaText: 'Explore Liquid Storage & Process Tanks',
    ctaPath: '/products#process-storage-equipment',
    secondaryCtaText: 'Send Technical Requirement',
    image: brewingKettleRealImg,
    badgeText: 'Sanitary Purged TIG Welded Seams'
  },
  {
    id: 'custom-fabrication',
    num: 'SECTOR 08',
    name: 'Industry-Specific Custom OEM Fabrication',
    heading: 'Equipment Manufactured Around Your Exact Process Blueprint',
    description: 'When standard catalog specifications do not fit your exact plant layout or thermal process, Jay AMBE Industries engineers and fabricates custom stainless steel vessels, jackets, and mechanical assemblies from customer drawings.',
    solutions: [
      'Custom Capacities (50L to 25,000L)',
      'Custom Material Selection (SS304, SS316, SS316L)',
      'Dimple Jacket, Limpet Coil & Thermal Oil Jackets',
      'Variable Speed Agitators & Scraper Blades',
      'OEM White-Label Equipment Production',
      'Drawing-Based Fabrication Support'
    ],
    primaryApp: 'Turnkey Plant Contractors, OEMs & International Engineering Consultants',
    ctaText: 'Discuss Custom OEM Manufacturing',
    ctaPath: '/products#custom-stainless-steel-fabrication',
    secondaryCtaText: 'Upload Your CAD Blueprint',
    image: milkProcessingPlantRealImg,
    badgeText: 'Drawing-Based OEM Production'
  }
];
