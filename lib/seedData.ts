import { featuredProperties, agents, testimonials } from './data';
import fs from 'fs';
import path from 'path';

// Seed the CMS with existing data
export async function seedCMSData() {
  const dataDir = path.join(process.cwd(), 'data');
  
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Seed properties
  const propertiesPath = path.join(dataDir, 'properties.json');
  if (!fs.existsSync(propertiesPath) || fs.readFileSync(propertiesPath, 'utf-8') === '[]') {
    const properties = featuredProperties.map((prop, index) => ({
      id: Date.now().toString() + index,
      title: prop.title,
      price: prop.price,
      location: prop.location,
      beds: prop.beds,
      baths: prop.baths,
      area: prop.sqft,
      image: prop.image,
      images: [prop.image],
      type: prop.title.includes('Mansion') ? 'Mansion' : 
            prop.title.includes('Villa') ? 'Villa' :
            prop.title.includes('Penthouse') ? 'Penthouse' : 'Estate',
      features: prop.amenities || [],
      description: prop.description
    }));
    fs.writeFileSync(propertiesPath, JSON.stringify(properties, null, 2));
  }

  // Seed agents
  const agentsPath = path.join(dataDir, 'agents.json');
  if (!fs.existsSync(agentsPath) || fs.readFileSync(agentsPath, 'utf-8') === '[]') {
    const agentsData = agents.map((agent, index) => ({
      id: Date.now().toString() + index,
      name: agent.name,
      role: agent.role,
      image: agent.image,
      email: agent.email,
      phone: agent.phone,
      bio: agent.bio
    }));
    fs.writeFileSync(agentsPath, JSON.stringify(agentsData, null, 2));
  }

  // Seed testimonials
  const testimonialsPath = path.join(dataDir, 'testimonials.json');
  if (!fs.existsSync(testimonialsPath) || fs.readFileSync(testimonialsPath, 'utf-8') === '[]') {
    const testimonialsData = testimonials.map((testimonial, index) => ({
      id: Date.now().toString() + index,
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.text,
      image: testimonial.image
    }));
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonialsData, null, 2));
  }

  // Initialize empty gallery and hero
  const galleryPath = path.join(dataDir, 'gallery.json');
  if (!fs.existsSync(galleryPath)) {
    fs.writeFileSync(galleryPath, '[]');
  }

  const heroPath = path.join(dataDir, 'hero.json');
  if (!fs.existsSync(heroPath)) {
    fs.writeFileSync(heroPath, '[]');
  }
}
