import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Existing data from lib/data.ts with complete image galleries
const featuredProperties = [
  {
    id: '1',
    title: 'Modern Luxury Mansion',
    price: '$1.2M',
    location: 'Airport Hills, Accra',
    beds: 5,
    baths: 4,
    area: '4,500 sqft',
    type: 'Mansion',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
    description: 'A stunning modern mansion featuring contemporary design and premium finishes.',
    features: ['Swimming Pool', 'Home Theater', 'Wine Cellar', 'Smart Home', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200'
    ]
  },
  {
    id: '2',
    title: 'Elegant Villa Estate',
    price: '$950K',
    location: 'East Legon, Accra',
    beds: 4,
    baths: 3,
    area: '3,800 sqft',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    description: 'Elegant villa with spacious rooms and beautiful landscaping.',
    features: ['Garden', 'Garage', 'Security', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'
    ]
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    price: '$1.5M',
    location: 'Cantonments, Accra',
    beds: 3,
    baths: 3,
    area: '2,800 sqft',
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    description: 'Exquisite penthouse with panoramic city views and high-end amenities.',
    features: ['Rooftop Terrace', 'Concierge', 'Spa', 'Private Elevator'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200'
    ]
  },
  {
    id: '4',
    title: 'Contemporary Estate',
    price: '$2.1M',
    location: 'Ridge, Accra',
    beds: 6,
    baths: 5,
    area: '5,200 sqft',
    type: 'Estate',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
    description: 'Magnificent estate with expansive grounds and luxurious interiors.',
    features: ['Tennis Court', 'Guest House', 'Library', 'Wine Room', 'Pool House'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200'
    ]
  }
];

const agents = [
  {
    id: '1',
    name: 'Kwame Mensah',
    role: 'Senior Property Consultant',
    email: 'kwame.mensah@monarchpeak.com',
    phone: '+233 24 123 4567',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    bio: 'Over 15 years of experience in luxury real estate, specializing in high-end residential properties.'
  },
  {
    id: '2',
    name: 'Akosua Boateng',
    role: 'Luxury Estate Specialist',
    email: 'akosua.boateng@monarchpeak.com',
    phone: '+233 24 234 5678',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Expert in premium estates with a keen eye for architectural excellence and investment opportunities.'
  },
  {
    id: '3',
    name: 'Kofi Asante',
    role: 'Investment Advisor',
    email: 'kofi.asante@monarchpeak.com',
    phone: '+233 24 345 6789',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    bio: 'Specialized in property investment strategies and portfolio management for discerning clients.'
  },
  {
    id: '4',
    name: 'Ama Owusu',
    role: 'Client Relations Manager',
    email: 'ama.owusu@monarchpeak.com',
    phone: '+233 24 456 7890',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    bio: 'Dedicated to providing exceptional service and personalized solutions for luxury property seekers.'
  }
];

const testimonials = [
  {
    id: '1',
    name: 'David Thompson',
    role: 'Business Executive',
    content: 'MonarchPeak helped me find my dream home. Their attention to detail and understanding of luxury properties is unmatched.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: '2',
    name: 'Sophia Anderson',
    role: 'Entrepreneur',
    content: 'Exceptional service from start to finish. The team\'s professionalism and market knowledge made the entire process seamless.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Investor',
    content: 'I\'ve worked with several real estate firms, but MonarchPeak stands out for their dedication and expertise in luxury properties.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  }
];

const heroSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920',
    title: 'Discover Luxury Living',
    subtitle: 'Premium estates in Ghana\'s most prestigious locations',
    order: 1
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    title: 'Architectural Excellence',
    subtitle: 'Modern designs meets timeless elegance',
    order: 2
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
    title: 'Your Dream Home Awaits',
    subtitle: 'Exclusive properties tailored to your lifestyle',
    order: 3
  }
];

const galleryImages = [
  // Exteriors
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
    title: 'Modern Mansion Exterior',
    category: 'Exteriors'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    title: 'Villa Front View',
    category: 'Exteriors'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
    title: 'Estate Entrance',
    category: 'Exteriors'
  },
  // Interiors
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200',
    title: 'Luxury Living Room',
    category: 'Interiors'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    title: 'Modern Interior Design',
    category: 'Interiors'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200',
    title: 'Elegant Hallway',
    category: 'Interiors'
  },
  // Pools
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    title: 'Infinity Pool',
    category: 'Pools'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
    title: 'Pool Area',
    category: 'Pools'
  },
  // Bedrooms
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200',
    title: 'Master Bedroom',
    category: 'Bedrooms'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
    title: 'Guest Suite',
    category: 'Bedrooms'
  },
  // Kitchens
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
    title: 'Gourmet Kitchen',
    category: 'Kitchens'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200',
    title: 'Modern Kitchen',
    category: 'Kitchens'
  }
];

export async function GET() {
  try {
    // Check if data already exists
    const propertiesPath = path.join(dataDir, 'properties.json');
    const agentsPath = path.join(dataDir, 'agents.json');
    const testimonialsPath = path.join(dataDir, 'testimonials.json');
    const galleryPath = path.join(dataDir, 'gallery.json');
    const heroPath = path.join(dataDir, 'hero.json');

    let seeded = false;
    const results: any = {
      properties: 0,
      agents: 0,
      testimonials: 0,
      gallery: 0,
      hero: 0
    };

    // Seed properties if empty or doesn't exist
    if (!fs.existsSync(propertiesPath) || JSON.parse(fs.readFileSync(propertiesPath, 'utf-8')).length === 0) {
      fs.writeFileSync(propertiesPath, JSON.stringify(featuredProperties, null, 2));
      results.properties = featuredProperties.length;
      seeded = true;
    } else {
      results.properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8')).length;
    }

    // Seed agents if empty or doesn't exist
    if (!fs.existsSync(agentsPath) || JSON.parse(fs.readFileSync(agentsPath, 'utf-8')).length === 0) {
      fs.writeFileSync(agentsPath, JSON.stringify(agents, null, 2));
      results.agents = agents.length;
      seeded = true;
    } else {
      results.agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8')).length;
    }

    // Seed testimonials if empty or doesn't exist
    if (!fs.existsSync(testimonialsPath) || JSON.parse(fs.readFileSync(testimonialsPath, 'utf-8')).length === 0) {
      fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials, null, 2));
      results.testimonials = testimonials.length;
      seeded = true;
    } else {
      results.testimonials = JSON.parse(fs.readFileSync(testimonialsPath, 'utf-8')).length;
    }

    // Seed gallery if empty or doesn't exist
    if (!fs.existsSync(galleryPath) || JSON.parse(fs.readFileSync(galleryPath, 'utf-8')).length === 0) {
      fs.writeFileSync(galleryPath, JSON.stringify(galleryImages, null, 2));
      results.gallery = galleryImages.length;
      seeded = true;
    } else {
      results.gallery = JSON.parse(fs.readFileSync(galleryPath, 'utf-8')).length;
    }

    // Seed hero slides if empty or doesn't exist
    if (!fs.existsSync(heroPath) || JSON.parse(fs.readFileSync(heroPath, 'utf-8')).length === 0) {
      fs.writeFileSync(heroPath, JSON.stringify(heroSlides, null, 2));
      results.hero = heroSlides.length;
      seeded = true;
    } else {
      results.hero = JSON.parse(fs.readFileSync(heroPath, 'utf-8')).length;
    }

    if (seeded) {
      return NextResponse.json({ 
        message: 'Database seeded successfully with all images!',
        status: 'seeded',
        data: results
      });
    } else {
      return NextResponse.json({ 
        message: 'Database already contains data',
        status: 'existing',
        data: results
      });
    }
  } catch (error: unknown) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database', details: String(error) }, { status: 500 });
  }
}
