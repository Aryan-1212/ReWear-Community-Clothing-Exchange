# Backend Setup Guide

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/rewear

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Setup Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGO_URI in .env file

3. **Set up Cloudinary (optional for image uploads):**
   - Create a Cloudinary account
   - Get your cloud name, API key, and API secret
   - Update the Cloudinary variables in .env file

4. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Items
- `POST /api/items` - Create new item
- `GET /api/items` - Get approved items
- `GET /api/items/:id` - Get specific item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/dashboard` - Get user dashboard

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/items` - Get all items for admin
- `PUT /api/admin/items/:id/approve` - Approve item
- `PUT /api/admin/items/:id/reject` - Reject item

### Swap Requests
- `POST /api/swap-requests` - Create swap request
- `GET /api/swap-requests` - Get swap requests
- `PUT /api/swap-requests/:id` - Update swap request 