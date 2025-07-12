# ReWear - Sustainable Clothing Exchange Platform

A full-stack web application for exchanging pre-loved clothing items, built with Next.js frontend and Node.js/Express backend.

## Features

- **User Authentication**: Email/password and Google OAuth login
- **Item Management**: Upload, browse, and manage clothing items
- **Swap System**: Request swaps between users
- **Points System**: Earn points for successful exchanges
- **Admin Panel**: Manage users, items, and swap requests
- **Image Upload**: Cloudinary integration for item images
- **Real-time Updates**: Live notifications and status updates

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Axios for API calls
- React Hook Form for form handling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- Cloudinary for image storage
- Multer for file uploads

## Project Structure

```
reWear/
├── backend/                 # Backend API server
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── client/re-wear/        # Frontend Next.js app
│   ├── app/              # Next.js app directory
│   │   ├── login/        # Login page
│   │   ├── signup/       # Signup page
│   │   ├── userdashboard/ # User dashboard
│   │   ├── itemlisting/  # Item browsing
│   │   ├── add-item/     # Add new item
│   │   ├── admin/        # Admin panel
│   │   └── productdetailpage/ # Item details
│   ├── contexts/         # React contexts
│   ├── lib/             # Utility libraries
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Google OAuth credentials (optional)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/rewear
   SESSION_SECRET=your-super-secret-session-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd client/re-wear
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `GET /auth/google` - Google OAuth

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get specific item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/my-items` - Get user's items

### Swap Requests
- `GET /api/swap-requests` - Get all swap requests
- `POST /api/swap-requests` - Create swap request
- `PUT /api/swap-requests/:id` - Update swap request
- `GET /api/swap-requests/my-requests` - Get user's requests

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/points` - Get user points

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/items` - Get all items for approval
- `PUT /api/admin/items/:id/approve` - Approve item
- `GET /api/admin/swap-requests` - Get all swap requests

## Features Overview

### User Features
- **Registration/Login**: Email/password and Google OAuth
- **Profile Management**: Update personal information
- **Item Upload**: Add clothing items with images
- **Browse Items**: Search and filter available items
- **Swap Requests**: Request swaps with other users
- **Points System**: Earn points for successful exchanges

### Admin Features
- **User Management**: View and manage all users
- **Item Approval**: Approve/reject uploaded items
- **Swap Request Management**: Monitor and manage swap requests
- **Points Management**: Adjust user points

### Technical Features
- **Image Upload**: Cloudinary integration
- **Real-time Updates**: Live status updates
- **Responsive Design**: Mobile-friendly interface
- **Security**: JWT tokens and session management
- **Error Handling**: Comprehensive error handling

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 3000)
2. **Register/Login** to create an account
3. **Upload items** using the "Add Item" feature
4. **Browse items** in the marketplace
5. **Request swaps** with other users
6. **Manage your profile** and view your activity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
