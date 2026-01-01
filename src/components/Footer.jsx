import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`py-5 mt-5 ${isDarkMode ? 'bg-black text-white' : 'bg-light text-dark'}`}>
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <h5 className="fw-bold text-primary mb-4">E-Shop</h5>
                        <p className="text-muted mb-4 text-justify">
                            Your one-stop destination for the latest in technology, fashion, and home decor.
                            We provide premium quality products at the best prices with worldwide delivery.
                        </p>
                        <div className="d-flex gap-3">
                            <Link to="#" className="text-muted hover-primary"><Facebook /></Link>
                            <Link to="#" className="text-muted hover-primary"><Twitter /></Link>
                            <Link to="#" className="text-muted hover-primary"><Instagram /></Link>
                            <Link to="#" className="text-muted hover-primary"><Youtube /></Link>
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-4">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/shop" className="text-muted text-decoration-none">Shop</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-4">Customer Care</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/faq" className="text-muted text-decoration-none">FAQ</Link></li>
                            <li className="mb-2"><Link to="/returns" className="text-muted text-decoration-none">Returns</Link></li>
                            <li className="mb-2"><Link to="/shipping" className="text-muted text-decoration-none">Shipping</Link></li>
                            <li className="mb-2"><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
                        </ul>
                    </Col>

                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-4">Contact Info</h6>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-3 d-flex gap-2">
                                <MapPin size={20} className="text-primary flex-shrink-0" />
                                <span>123 Commerce St, New York, NY 10001, USA</span>
                            </li>
                            <li className="mb-3 d-flex gap-2">
                                <Phone size={20} className="text-primary flex-shrink-0" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="mb-3 d-flex gap-2">
                                <Mail size={20} className="text-primary flex-shrink-0" />
                                <span>support@eshop.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-5 opacity-25" />
                <div className="text-center text-muted">
                    <p className="mb-0">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
