# P2P Book Exchange Application

A peer-to-peer book exchange platform that allows users to share, exchange, and discover books in their local communities.

## Features

- **User Authentication**: Register as either a Book Owner or Book Seeker
- **Book Management**: Add, edit, and delete books from your collection
- **Book Search**: Search for books by title, author, or genre
- **Filtering & Sorting**: Filter books by condition, availability, and more
- **Book Exchanges**: Request and manage book exchanges with other users
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React.js**: UI library for building the user interface
- **Next.js**: React framework for server-side rendering and routing
- **CSS Modules**: For component-scoped styling
- **FontAwesome**: For icons throughout the application

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for building the API
- **JSON File Storage**: Simple file-based data storage
- **JWT Authentication**: For secure user authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/p2p-book-exchange-app.git
   cd p2p-book-exchange-app
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the development servers:
   ```
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
p2p-book-exchange-app/
├── backend/
│   ├── data/              # JSON data files
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
│
├── frontend/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Next.js pages
│   ├── styles/            # CSS modules
│   ├── utils/             # Utility functions
│   └── public/            # Static assets
│
└── README.md              # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/me`: Get current user information

### Books
- `GET /api/books`: Get all books
- `GET /api/books/:id`: Get a specific book
- `POST /api/books`: Add a new book
- `PUT /api/books/:id`: Update a book
- `DELETE /api/books/:id`: Delete a book
- `POST /api/books/status/:id`: Toggle book availability

### Exchanges
- `GET /api/exchanges`: Get all exchanges
- `GET /api/exchanges/:id`: Get a specific exchange
- `POST /api/exchanges`: Create a new exchange
- `PUT /api/exchanges/:id`: Update an exchange
- `DELETE /api/exchanges/:id`: Delete an exchange

## User Roles

### Book Owner
- Can add, edit, and delete books
- Can manage book availability
- Can accept or reject exchange requests
- Can view their book collection

### Book Seeker
- Can search and browse available books
- Can request book exchanges
- Can view their exchange history
- Can save books for later

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FontAwesome for the icons
- Next.js team for the amazing framework
- Express.js team for the backend framework

## 📚 P2P Book Exchange App

A modern web application that allows users to exchange books with others in their community. Built with Next.js, React, and a clean, responsive design.

![P2P Book Exchange App](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 🌟 Features

- **User Authentication**: Secure login and registration with role-based access (Book Owner or Book Seeker)
- **Book Management**: Add, edit, and manage your book collection
- **Search & Filter**: Find books by title, author, genre, or condition
- **Exchange System**: Request and manage book exchanges with other users
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Modern UI**: Clean interface with smooth animations and intuitive navigation

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v14 or later
- **npm** or **yarn**: For package management

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Akshat394/p2p-book-exchange-app.git
   cd p2p-book-exchange-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be running at [http://localhost:3000](http://localhost:3000).

## 📱 Application Structure

### Pages

- **Home**: Browse available books and search functionality
- **Books**: Detailed book listing with advanced filtering and sorting
- **Login/Register**: User authentication with role selection
- **Owner Dashboard**: Manage your book collection and exchange requests
- **Seeker Dashboard**: Track saved books and exchange requests
- **Exchange**: Manage all book exchange activities

### Components

- **Navbar**: Navigation with role-based menu items
- **Form**: Reusable form component for login and registration
- **Icon**: Font Awesome icon integration
- **Book Card**: Display book information with actions

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Blues, whites, and accent colors for actions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable UI elements with consistent styling
- **Responsive Layout**: Adapts to different screen sizes
- **Animations**: Subtle transitions and hover effects

## 🔒 Authentication Flow

1. **Registration**: Users select a role (Book Owner or Book Seeker)
2. **Login**: Users authenticate with email and password
3. **Role-Based Access**: Users are directed to the appropriate dashboard
4. **Session Management**: Token-based authentication with localStorage

## 📊 Data Structure

### Book Object

```javascript
{
  id: number,
  title: string,
  author: string,
  image: string,
  owner: string,
  location: string,
  condition: string,
  genre: string,
  available: boolean
}
```

### Exchange Object

```javascript
{
  id: number,
  status: string,
  requestedBook: Book,
  offeredBook: Book,
  date: string,
  message: string
}
```

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, CSS Modules
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js Router

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔄 Future Enhancements

- **Backend Integration**: Connect to a real API
- **User Profiles**: Enhanced user profiles with avatars
- **Notifications**: Real-time exchange notifications
- **Messaging System**: In-app messaging between users
- **Book Recommendations**: AI-powered book suggestions
- **Location Services**: Find books near you

## 📸 Screenshots

### Home Page
![Home Page](p2p-book-ex-screenshots\Home page.jpg)

### Books Page
![Books Page](p2p-book-ex-screenshots\Books page-1.jpg)

### Login Page
![Login Page](p2p-book-ex-screenshots\Login Page.jpg)

### Register Page
![Register Page](p2p-book-ex-screenshots\Registeration Page.jpg)

### Profile Page
![Profile Page](p2p-book-ex-screenshots\Owner Dashboard.jpg)

### Exchange Page
![Exchange Page](p2p-book-ex-screenshots\Exchange Page.jpg)

### Add Book Page
![Add Book Page](p2p-book-ex-screenshots\Books page-2.jpg)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Font Awesome for the icons
- Unsplash for the book images
- The React and Next.js communities for their excellent documentation

---

Made with ❤️ by Akshat Trivedi 