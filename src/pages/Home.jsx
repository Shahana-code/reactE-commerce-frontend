import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products?limit=8');
                setFeaturedProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const categories = [
        { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80", path: "electronics" },
        { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", path: "jewelry" },
        { name: "Men's Clothing", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=80", path: "men's clothing" },
        { name: "Women's Clothing", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", path: "women's clothing" },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section py-5 mb-5 bg-primary text-white overflow-hidden" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="display-3 fw-bold mb-4">Discover the Next Generation of Shopping</h1>
                                <p className="lead mb-5 opacity-75">
                                    Exclusive deals on premium electronics, fashion, and accessories.
                                    Up to 50% off on new arrivals. Limited time offer!
                                </p>
                                <div className="d-flex gap-3">
                                    <Button as={Link} to="/shop" variant="light" size="lg" className="px-5 py-3 fw-bold rounded-pill text-primary">
                                        Shop Now <ArrowRight size={20} />
                                    </Button>
                                    <Button variant="outline-light" size="lg" className="px-5 py-3 fw-bold rounded-pill">
                                        View Deals
                                    </Button>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-center"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
                                    alt="Hero"
                                    className="img-fluid rounded-4 shadow-lg border border-5 border-white border-opacity-25"
                                />
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Bar */}
            <Container className="mb-5 py-4">
                <Row className="text-center gy-4 g-lg-4">
                    {[
                        { icon: <Truck size={32} />, title: "Free Shipping", desc: "On orders over $99" },
                        { icon: <ShieldCheck size={32} />, title: "Secure Payment", desc: "100% protected payments" },
                        { icon: <Headphones size={32} />, title: "24/7 Support", desc: "Dedicated support team" },
                        { icon: <CreditCard size={32} />, title: "Money Back", desc: "30-day return policy" },
                    ].map((feature, i) => (
                        <Col key={i} md={3} sm={6}>
                            <div className="p-4 rounded-3 border bg-card hover-shadow transition">
                                <div className="text-primary mb-3">{feature.icon}</div>
                                <h6 className="fw-bold">{feature.title}</h6>
                                <p className="text-muted small mb-0">{feature.desc}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Categories Section */}
            <Container className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Shop by Category</h2>
                    <Link to="/categories" className="text-primary text-decoration-none fw-semibold">View All <ArrowRight size={18} /></Link>
                </div>
                <Row className="g-4">
                    {categories.map((cat, i) => (
                        <Col key={i} lg={3} md={6}>
                            <Link to={`/shop?category=${cat.path}`} className="text-decoration-none">
                                <Card className="category-card border-0 overflow-hidden shadow-sm h-100">
                                    <div className="position-relative">
                                        <Card.Img src={cat.image} className="category-img" style={{ height: '200px', objectFit: 'cover' }} />
                                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center">
                                            <h5 className="text-white fw-bold mb-0 text-uppercase tracking-wider">{cat.name}</h5>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Featured Products */}
            <Container className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Featured Products</h2>
                    <Link to="/shop" className="text-primary text-decoration-none fw-semibold">Shop All <ArrowRight size={18} /></Link>
                </div>

                {loading ? (
                    <SkeletonLoader count={8} />
                ) : (
                    <Row className="g-4">
                        {featuredProducts.map((product) => (
                            <Col key={product.id} lg={3} md={4} sm={6}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            {/* Newsletter */}
            <section className="newsletter-section py-5 bg-light rounded-4 mx-3 my-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={6}>
                            <h2 className="fw-bold mb-3">Join our Newsletter</h2>
                            <p className="text-muted mb-4 text-center">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                            <div className="input-group mb-3 custom-newsletter">
                                <input type="email" className="form-control border-0 py-3 px-4 shadow-sm" placeholder="Enter your email address" />
                                <Button variant="primary" className="px-4 py-3 shadow-sm rounded-end-3">Subscribe</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
