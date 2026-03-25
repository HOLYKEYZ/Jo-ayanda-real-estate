import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { QuickServices } from "@/components/quick-services";
import { About } from "@/components/about";
import { PropertyListings } from "@/components/property-listings";
import { PropertyGallery } from "@/components/property-gallery";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { type Property } from "@/data/properties";
import fs from "fs/promises";
import path from "path";

async function getProperties(): Promise<Property[]> {
  const dataFilePath = path.join(process.cwd(), "src", "data", "properties.json");
  const fileContent = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(fileContent);
}

export default async function Home() {
  const properties = await getProperties();
  
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <QuickServices />
      <FeaturedProperties properties={properties} />
      <About />
      <PropertyListings initialProperties={properties} />
      <PropertyGallery />
      <Services />
      <Contact />
    </main>
  );
}
