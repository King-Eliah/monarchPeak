# MonarchPeak - Luxury Real Estate Website

## CMS Setup Instructions

### 1. Create Sanity Account
1. Go to https://www.sanity.io/
2. Sign up for a free account
3. Create a new project named "MonarchPeak"

### 2. Get Project Credentials
1. After creating the project, go to https://www.sanity.io/manage
2. Select your MonarchPeak project
3. Copy your **Project ID**
4. Go to API settings and create a new token with **Editor** permissions
5. Copy the token

### 3. Configure Environment Variables
1. Create a file named `.env.local` in the project root
2. Add your credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
```

### 4. Deploy Sanity Studio
```bash
npm run sanity:deploy
```

### 5. Access Your CMS
- Visit: `https://your-project-id.sanity.studio`
- Or run locally: `npm run sanity:dev`

## Features

### Instant Filtering
- Properties page now filters instantly as you select options
- No need to click "Search" button
- Shows "No properties found" message when filters don't match any properties

### Agent Contact
- "Contact Agent" buttons now link to the contact page with agent info pre-filled
- Agent name and email are passed via URL parameters

### Content Management
You can now manage:
- **Properties**: Add, edit, and delete luxury properties with images, pricing, features
- **Agents**: Manage agent profiles with contact info and photos
- **Testimonials**: Add client reviews and ratings

## Development

```bash
# Run the Next.js development server
npm run dev

# Run Sanity Studio locally
npm run sanity:dev

# Deploy Sanity Studio
npm run sanity:deploy
```

## Deployment

The site automatically deploys to Vercel when you push to the `main` branch on GitHub.

Make sure to add the environment variables to your Vercel project:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all the variables from `.env.local`

