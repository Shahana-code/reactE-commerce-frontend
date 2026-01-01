import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Badge, NavDropdown } from 'react-bootstrap';
import { ShoppingCart, Heart, Sun, Moon, User, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
    const { cartCount, wishlist } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${searchQuery}`);
        }
    };

    return (
        <Navbar bg={isDarkMode ? 'dark' : 'white'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
                    E-Shop
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                    </Nav>

                    <Form className="d-flex mx-lg-4 my-2 my-lg-0 flex-grow-1" onSubmit={handleSearch}>
                        <div className="input-group">
                            <FormControl
                                type="search"
                                placeholder="Search products..."
                                className="border-end-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-primary" type="submit" className="border-start-0">
                                <Search size={18} />
                            </Button>
                        </div>
                    </Form>

                    <Nav className="align-items-center">
                        <Nav.Link onClick={toggleTheme} className="text-warning">
                            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </Nav.Link>

                        <Nav.Link as={Link} to="/wishlist" className="position-relative">
                            <Heart size={22} />
                            {wishlist.length > 0 && (
                                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                                    {wishlist.length}
                                </Badge>
                            )}
                        </Nav.Link>

                        <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <Badge pill bg="primary" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {isAuthenticated ? (
                            <NavDropdown title={<User size={22} />} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item disabled>Hi, {user.name}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout} className="text-danger">
                                    <LogOut size={18} className="me-2" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button as={Link} to="/login" variant="primary" size="sm" className="px-4 rounded-pill">
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
