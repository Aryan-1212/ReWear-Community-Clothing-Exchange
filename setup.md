# ReWear Setup Guide

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy the content below)
echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/rewear
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret" > .env

# Start backend server
npm start
```

### 2. Frontend Setup

```bash
# Navigate to frontend
cd client/re-wear

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start frontend development server
npm run dev
```

### 3. Database Setup

Make sure MongoDB is running locally or update the MONGO_URI in the backend .env file to point to your MongoDB instance.

### 4. Optional: Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Update the .env file with your Cloudinary credentials

### 5. Optional: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Update the .env file with your Google credentials

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Default Admin Account

To create an admin account, you can either:

1. Register normally and manually update the user role in the database to "admin"
2. Use the admin panel (if you have admin access) to promote users to admin

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check your MONGO_URI in the .env file

2. **Port Already in Use**
   - Change the PORT in backend .env file
   - Update NEXT_PUBLIC_API_URL in frontend .env.local

3. **Image Upload Not Working**
   - Check your Cloudinary credentials
   - Make sure the image file is valid

4. **Google OAuth Not Working**
   - Verify your Google credentials
   - Check that your domain is authorized

### Development Tips

1. **Backend Development**
   - Use `npm run dev` for development with nodemon
   - Check console logs for errors

2. **Frontend Development**
   - Use browser dev tools to debug
   - Check network tab for API calls

3. **Database**
   - Use MongoDB Compass for database management
   - Check collections: users, items, swaprequests

## Environment Variables Reference

### Backend (.env)
```
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/rewear  # MongoDB connection string
SESSION_SECRET=your-secret-key              # Session encryption key
GOOGLE_CLIENT_ID=your-google-client-id      # Google OAuth client ID
GOOGLE_CLIENT_SECRET=your-google-secret     # Google OAuth client secret
CLOUDINARY_CLOUD_NAME=your-cloud-name       # Cloudinary cloud name
CLOUDINARY_API_KEY=your-api-key            # Cloudinary API key
CLOUDINARY_API_SECRET=your-api-secret      # Cloudinary API secret
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000   # Backend API URL
```

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Test backend health
curl http://localhost:5000/auth/me

# Test item listing
curl http://localhost:5000/api/items
```

## Next Steps

1. **Customize the application** by modifying the code
2. **Add more features** like real-time chat, notifications
3. **Deploy to production** using services like Vercel, Heroku, or AWS
4. **Add tests** for better code quality
5. **Implement CI/CD** for automated deployment 