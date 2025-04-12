# P2P Book Exchange App

A modern web application that facilitates peer-to-peer book exchanges between users. Built with Next.js, Express, and MongoDB.

## Features

### Authentication
Secure user authentication with role-based access control.

<div align="center">
  <img src="./screenshots/Login page.jpg" alt="Login Page" width="45%"/>
  <img src="./screenshots/Registeration page.jpg" alt="Registration Page" width="45%"/>
</div>

### Home Page
Welcoming interface with featured books and easy navigation.

<div align="center">
  <img src="./screenshots/Home-page 1.jpg" alt="Home Page 1" width="45%"/>
  <img src="./screenshots/Home-page 2.jpg" alt="Home Page 2" width="45%"/>
</div>

### Book Management
Easy-to-use interface for managing your book collection.

<div align="center">
  <img src="./screenshots/Owner Dashboard.jpg" alt="Owner Dashboard" width="45%"/>
  <img src="./screenshots/add book page.jpg" alt="Add Book Page" width="45%"/>
</div>

### Book Discovery
Browse and search through available books.

<div align="center">
  <img src="./screenshots/Browse-books.jpg" alt="Browse Books" width="90%"/>
</div>

### Exchange System
Seamless book exchange process between users.

<div align="center">
  <img src="./screenshots/exchange page-1.jpg" alt="Exchange Page 1" width="30%"/>
  <img src="./screenshots/exchange page-2.jpg" alt="Exchange Page 2" width="30%"/>
  <img src="./screenshots/exchange page-3.jpg" alt="Exchange Page 3" width="30%"/>
</div>

## Tech Stack

- **Frontend**: Next.js, React, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Local storage with image optimization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akshat394/p2p-book-exchange-app.git
   cd p2p-book-exchange-app
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the backend directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- User authentication (login/register)
- Role-based access (book owners and seekers)
- Book management (add, edit, delete)
- Book search and filtering
- Book exchange requests
- Real-time notifications
- Responsive design

## Project Structure

```
p2p-book-exchange-app/
├── frontend/           # Next.js frontend application
│   ├── components/    # React components
│   ├── pages/        # Next.js pages
│   ├── styles/       # CSS modules
│   └── public/       # Static assets
├── backend/          # Express backend application
│   ├── routes/      # API routes
│   ├── data/        # JSON data files
│   └── server.js    # Express server
└── README.md        # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- All contributors and users of the application

---

Made with ❤️ by Akshat Trivedi 