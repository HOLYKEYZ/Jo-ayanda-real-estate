// property and inquiry types for nextphase real estate

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  type: "house" | "apartment" | "land" | "commercial";
  status: "sale" | "rent" | "lease";
  beds: number;
  baths: number;
  size: string;
  image: string;
  features: string[];
  amenities: string[];
  yearBuilt: number | null;
  area: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  date: string;
  status?: string;
}

export const defaultProperties: Property[] = [
  {
    id: 1,
    title: "Modern 4-Bedroom Bungalow",
    description:
      "Luxurious 4-bedroom bungalow facing tarred road with excellent proximity to major places in GRA. Document: C of O.",
    location: "GRA, Ilorin, Kwara State",
    price: "₦280M",
    type: "house",
    status: "sale",
    beds: 4,
    baths: 3,
    size: "7 Plots",
    image: "/images/bedroom.jpg",
    features: ["4 Beds", "3 Baths", "7 Plots"],
    amenities: ["C of O", "Tarred Road", "GRA Location"],
    yearBuilt: 2023,
    area: "GRA",
  },
  {
    id: 2,
    title: "Modern 5 Bedroom Home",
    description:
      "Last 85m, reason is this it comes with all 10 AC, the 27kv generator and the car porch. Total land is 4 plots, main house has 5 bedrooms, joined BQ has 2 bedrooms. It has C of O.",
    location: "Along Airport road, Ilorin, Kwara state",
    price: "₦100M",
    type: "house",
    status: "sale",
    beds: 5,
    baths: 4,
    size: "4 Plots",
    image: "/images/servicess.jpg",
    features: ["5 Beds", "4 Plots", "10 AC", "27kv Generator"],
    amenities: ["C of O", "Car Porch", "BQ"],
    yearBuilt: 2022,
    area: "Airport Road",
  },
  {
    id: 3,
    title: "Investment Land Package",
    description:
      "This land is located near kanbi olorobo estate, Ilorin. It is a good land for investment, estate and farming activities",
    location: "Mandate Market Area, Ilorin",
    price: "₦3M",
    type: "land",
    status: "sale",
    beds: 0,
    baths: 0,
    size: "1 Plot",
    image: "/images/landd.jpg",
    features: ["Estate Ready", "Farming Activities", "Secure"],
    amenities: ["Investment Ready", "Estate Development"],
    yearBuilt: null,
    area: "Mandate Market",
  },
  {
    id: 4,
    title: "4-Bedroom Bungalow",
    description:
      "4-bedroom bungalow on 2 plots, divided into 2-bedroom flat and room & parlor. POP ceiling, fenced with gate. Close to main road. Document: C of O.",
    location: "Power Line, Irewolede, Ilorin, Kwara State",
    price: "₦40M",
    type: "house",
    status: "sale",
    beds: 4,
    baths: 3,
    size: "2 Plots",
    image: "/images/newprop.jpeg",
    features: ["4 Beds", "3 Baths", "2 Plots"],
    amenities: ["C of O", "POP Ceiling", "Fenced with Gate", "Close to Main Road"],
    yearBuilt: null,
    area: "Irewolede",
  },
  {
    id: 5,
    title: "Modern Home for Sale",
    description:
      "Modern Duplex and solid structure with high commercial structures, located at tanke area.",
    location: "University Road, tanke garage area",
    price: "₦40M",
    type: "house",
    status: "sale",
    beds: 3,
    baths: 2,
    size: "1 Plot",
    image: "/images/property.jpg",
    features: ["Duplex", "Balcony", "Commercial"],
    amenities: ["Solid Structure", "High Commercial Value"],
    yearBuilt: 2020,
    area: "Tanke",
  },
  {
    id: 6,
    title: "Two Story Buildings",
    description: "Two storey buildings, each 4 spacious flats and each 100M.",
    location: "Sawmill road, Ilorin",
    price: "₦100M",
    type: "house",
    status: "sale",
    beds: 0,
    baths: 0,
    size: "5 Plots",
    image: "/images/prop.jpg",
    features: ["3 Plots each", "2 Story Building", "4 flats each"],
    amenities: ["Multiple Plots", "Genuine documents", "Near Road"],
    yearBuilt: 2018,
    area: "Sawmill",
  },
  {
    id: 7,
    title: "Mega Petrol Station – Eyenkorin",
    description:
      "A strategically located and fully developed mega petrol station, positioned very close to Eyenkorin Roundabout, right between the Old and New roads—offering excellent visibility and high traffic flow. This premium facility features: Modern Petrol Station equipped with 7 dispensing pumps, designed for efficient service and high-volume sales. Well-structured office spaces, each fitted with private toilet facilities for comfort and convenience. A mini event hall, ideal for meetings, trainings, or small gatherings. Dedicated water tank structures, suitable for establishing a pure water (sachet water) production factory. Spacious layout with ample room for expansion and multiple business operations. This property presents a rare investment opportunity, perfect for oil & gas operators, entrepreneurs, and investors seeking a multi-purpose commercial hub in a rapidly developing and highly accessible location.",
    location: "Eyenkorin Roundabout, Ilorin, Kwara State",
    price: "Contact for Price",
    type: "commercial",
    status: "sale",
    beds: 0,
    baths: 0,
    size: "Multiple Plots",
    image: "/images/petrol-station.jpg",
    features: ["7 Pumps", "Office Spaces", "Event Hall", "Water Tank"],
    amenities: [
      "High Traffic Flow",
      "Roundabout Location",
      "Multiple Business Use",
      "Expansion Room",
    ],
    yearBuilt: null,
    area: "Eyenkorin",
  },
  {
    "id": 8,
    "title": "4 Flats of 3 Bedroom Each",
    "description": "Almost completed property — 4 flats of 3 bedrooms each on 1 full plot. Located behind Typer Garage, Tanke, Ilorin South LGA, Kwara State, Nigeria. Survey plan available. Documents include: Deed of Assignment, Survey Plan, and Building Approval.",
    "location": "Behind Typer Garage, Tanke, Ilorin South LGA, Kwara State",
    "price": "₦35M",
    "type": "house",
    "status": "sale",
    "beds": 3,
    "baths": 0,
    "size": "1 Plot",
    "image": "/images/tanke-flats.jpg",
    "features": ["4 Flats", "3 Beds Each", "1 Full Plot"],
    "amenities": [
      "Deed of Assignment",
      "Survey Plan",
      "Building Approval",
    ],
    "yearBuilt": null,
    "area": "Tanke",
  },
  {
    id: 9,
    title: "PRIME COMMERCIAL PROPERTY FOR SALE – ASA DAM ROAD, ILORIN",
    description: "An exceptional investment opportunity in a highly strategic and fast-growing commercial hub! Location: Directly on Asa Dam Road, Ilorin. Landmark: Opposite ITF, Ilorin. Position: Corner piece facing an adjoining road – maximum visibility and accessibility! Property Features: Multiple upstairs structures suitable for offices, shops, warehouses, and stalls. High traffic location – perfect for business growth. Excellent road frontage on two sides. Ideal for commercial, retail, or mixed-use development. Whether you're looking to expand your business, invest in rental income, or secure a prime commercial asset, this property ticks all the boxes! Asking Price: ₦200,000,000. Serious buyers and investors only. Send a DM or call now to schedule an inspection!",
    location: "Asa Dam Road, Opposite ITF, Ilorin",
    price: "₦200,000,000",
    type: "commercial",
    status: "sale",
    beds: 0,
    baths: 0,
    size: "Corner Piece",
    image: "/images/structures.jpg",
    features: [
      "Multiple upstairs structures",
      "Corner piece",
      "Strategic hub",
      "Mixed-use development",
      "Offices",
      "Shops",
      "Warehouses",
      "Stalls",
    ],
    amenities: [
      "Excellent road frontage",
      "High traffic location",
      "Maximum visibility",
      "Opposite ITF",
    ],
    yearBuilt: null,
    area: "Asa Dam Road",
  },
];

// gallery items (separate from main property listings)
export const galleryItems = [
  {
    id: 1,
    image: "/images/structures.jpg",
    title: "Printing Company for Sale",
    features: ["Printing Company", "Modern Equipment", "Offa Garage, Ilorin"],
    description:
      "BIGGEST SALE — Paper House: A premier printing company with state-of-the-art equipment. Located in Offa Garage, Ilorin. A great opportunity for investors.",
  },
  {
    id: 2,
    image: "/images/plain land.jpg",
    title: "Prime Land for Sale",
    features: ["Gaa Odota", "10 Plots", "On Main Road"],
    description:
      "Corner piece land (10 plots) directly on the main road at Gaa Odota. Suitable for supermarket, petrol station, estate, shopping complex, or gas station. Asking ₦110m.",
  },
  {
    id: 3,
    image: "/images/annual.jpg",
    title: "Hotel for Sale or Lease",
    features: ["11 Ensuite Rooms", "8 Lecture Rooms", "Ganmo, Ilorin"],
    description:
      "AZ Hotel, Ganmo: 11 ensuite rooms, penthouse, lecture rooms, offices, restaurant & pavilions on 8 plots. Outright Sale: ₦200m. Leasehold: ₦3m–₦5m per annum.",
  },
  {
    id: 4,
    image: "/images/rentals.jpg",
    title: "Guest House for Sale or Lease",
    features: ["22 Ensuite Rooms", "Event Hall (750–1000 Cap.)", "Pipeline, Ilorin"],
    description:
      "Gavel Guest House: 22 ensuite rooms, large event hall, restaurant, bar, and 6 plots of land. Outright Sale: ₦170m. Leasehold: ₦3m–₦4m per annum.",
  },
];

// company contact info
export const companyInfo = {
  name: "NextPhase Real Estate Ltd",
  tagline:
    "Affordable property development and investment. We get you into property ownership through straight deals and solid service.",
  phones: ["0812 224 4202", "0806 245 1755"],
  email: "nextphaserealestateltd@gmail.com",
  whatsapp: "https://wa.me/2348122244202",
  headOffice:
    "No. 3 Barrister Jayada Street, Off Power Line Road, Irewolede Village, Ilorin, Kwara State, Nigeria",
  branchOffice:
    "Shop 19, Complex before Mandate Market after Wara Junction, Ilorin, Kwara State",
  cacRegNo: "8723013",
  mission:
    "To provide affordable, secure property solutions, turn property dreams into reality through transparent transactions, help our clients grow wealth and legacies through smart real estate investments and by delivering services to our clients taste.",
  vision:
    "To make real estate ownership simple, secure, and rewarding—empowering people everywhere to step confidently into the future as proud landlords and investors.",
  whyChooseUs: [
    "Trust You Can Count On – Every deal is built on honesty and transparency.",
    "Proven Success – We have guided many clients into successful property ownership.",
    "Affordable Opportunities – Making real estate accessible for everyone, not just a few.",
    "Customer First – Your satisfaction is at the heart of everything we do.",
  ],
  team: {
    ceo: "Dr. Jacob Ayanda",
    partners: [
      "Mr. Femi Ojukoju",
      "Pastor Ebenezer Shona",
      "Pastor Imisioluwa Abayomi",
    ],
  },
};
