# 🛍️ E-Shop Frontend

A modern, responsive e-commerce frontend application built with React, Vite, and Bootstrap. This project provides a complete shopping experience with user authentication, product browsing, cart management, and checkout functionality.

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3?logo=bootstrap)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog**: Browse products with advanced filtering and search
- **Product Details**: Detailed product pages with images, descriptions, and specifications
- **Shopping Cart**: Add, remove, and update product quantities
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Streamlined checkout with order summary

### 👤 User Management
- **User Authentication**: Secure login and registration
- **User Profile**: Manage account details
- **Order History**: Track past orders
- **Order Success**: Confirmation page after successful purchase

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Smooth Animations**: Framer Motion animations for enhanced interactions
- **Toast Notifications**: Real-time feedback for user actions
- **Skeleton Loaders**: Improved perceived performance during data loading

### 🔧 Technical Features
- **Context API**: Global state management for cart, auth, and theme
- **React Router**: Client-side routing for seamless navigation
- **Axios Integration**: HTTP client for API communication
- **Bootstrap Components**: Pre-built UI components with React Bootstrap
- **Lucide Icons**: Modern, customizable icon library

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shahana-code/reactE-commerce-frontend.git
   cd reactE-commerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
e-shop-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SkeletonLoader.jsx
│   │   └── ...
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── OrderSuccess.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Built With

### Core Technologies
- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[React Router](https://reactrouter.com/)** - Client-side routing

### UI & Styling
- **[Bootstrap](https://getbootstrap.com/)** - CSS framework
- **[React Bootstrap](https://react-bootstrap.github.io/)** - Bootstrap components for React
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library

### Utilities
- **[Axios](https://axios-http.com/)** - HTTP client
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔌 API Integration

This frontend is designed to work with a backend API. Make sure to:

1. Set the `VITE_API_URL` in your `.env` file
2. Ensure your backend server is running
3. Configure CORS on your backend to allow requests from `http://localhost:5173`

### Expected API Endpoints

```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/auth/register     # Register user
POST   /api/auth/login        # Login user
GET    /api/cart              # Get cart items
POST   /api/cart              # Add to cart
PUT    /api/cart/:id          # Update cart item
DELETE /api/cart/:id          # Remove from cart
POST   /api/orders            # Create order
```

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... */
}
```

### Bootstrap Theme

Customize Bootstrap variables in your CSS or use Bootstrap's customization options.

## 🚧 Roadmap

- [ ] User profile page
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Advanced filtering (price range, categories)
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Shahana Sherin K**

- GitHub: [@Shahana-code](https://github.com/Shahana-code)
- Repository: [reactE-commerce-frontend](https://github.com/Shahana-code/reactE-commerce-frontend)

## 🙏 Acknowledgments

- React team for the amazing library
- Bootstrap team for the UI framework
- All contributors and open-source projects used in this application

---

⭐ If you find this project helpful, please give it a star!
