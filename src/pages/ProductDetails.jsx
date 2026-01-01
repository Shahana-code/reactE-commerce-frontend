import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { ShoppingCart, Heart, Star, Minus, Plus, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(res.data);
                setActiveImg(res.data.image);

                const relatedRes = await axios.get(`https://fakestoreapi.com/products/category/${res.data.category}`);
                setRelatedProducts(relatedRes.data.filter(p => p.id !== parseInt(id)).slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        setQuantity(1);
        window.scrollTo(0, 0);
    }, [id]);

    const isWishlisted = wishlist.find(item => item.id === product?.id);

    if (loading) return <Container className="py-5"><SkeletonLoader type="details" /></Container>;
    if (!product) return <Container className="py-5 text-center"><h3>Product not found</h3></Container>;

    return (
        <Container className="py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                    <li className="breadcrumb-item active text-capitalize">{product.category}</li>
                </ol>
            </nav>

            <Row className="gy-5">
                {/* Product Images */}
                <Col lg={6}>
                    <div className="d-flex flex-column gap-3">
                        <motion.div
                            className="p-4 rounded-4 bg-white border d-flex align-items-center justify-content-center"
                            style={{ minHeight: '500px' }}
                            key={activeImg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <img src={activeImg} alt={product.title} className="img-fluid" style={{ maxHeight: '450px' }} />
                        </motion.div>

                        <div className="d-flex gap-3 overflow-auto pb-2">
                            {[product.image, product.image, product.image].map((img, i) => (
                                <div
                                    key={i}
                                    className={`border rounded-3 p-2 cursor-pointer ${activeImg === img ? 'border-primary border-2' : ''}`}
                                    style={{ width: '100px', height: '100px', flexShrink: 0 }}
                                    onClick={() => setActiveImg(img)}
                                >
                                    <img src={img} alt="Thumb" className="w-100 h-100 object-fit-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>

                {/* Product Info */}
                <Col lg={6}>
                    <div className="ps-lg-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <Badge bg="primary" className="text-capitalize fs-6 px-3 py-2 rounded-pill">{product.category}</Badge>
                            <div className="d-flex gap-2">
                                <Button variant="outline-light" className="text-muted border rounded-circle p-2"><Share2 size={20} /></Button>
                                <Button
                                    variant="outline-light"
                                    className={`border rounded-circle p-2 ${isWishlisted ? 'text-danger shadow-sm' : 'text-muted'}`}
                                    onClick={() => toggleWishlist(product)}
                                >
                                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                                </Button>
                            </div>
                        </div>

                        <h1 className="fw-bold mb-3">{product.title}</h1>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="d-flex align-items-center text-warning fw-bold">
                                <Star size={20} fill="currentColor" className="me-1" />
                                <span>{product.rating?.rate}</span>
                            </div>
                            <span className="text-muted border-start ps-3">{product.rating?.count} Reviews</span>
                            <Badge bg="success" className="ms-2">In Stock</Badge>
                        </div>

                        <h2 className="text-primary fw-bold mb-4">${product.price}</h2>

                        <p className="text-muted mb-5 fs-5 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="d-flex flex-wrap align-items-center gap-4 mb-5 pb-4 border-bottom">
                            <div className="d-flex align-items-center border rounded-pill p-1">
                                <Button
                                    variant="link"
                                    className="text-dark p-2"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    <Minus size={20} />
                                </Button>
                                <span className="px-4 fw-bold fs-5">{quantity}</span>
                                <Button
                                    variant="link"
                                    className="text-dark p-2"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    <Plus size={20} />
                                </Button>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="px-5 py-3 rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow"
                                onClick={() => addToCart({ ...product, quantity })}
                            >
                                <ShoppingCart size={22} /> Add to Cart
                            </Button>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 text-muted small">
                                    <Truck size={20} className="text-primary" />
                                    <span>Free Delivery</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 text-muted small">
                                    <RotateCcw size={20} className="text-primary" />
                                    <span>30 Days Return</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 text-muted small">
                                    <ShieldCheck size={20} className="text-primary" />
                                    <span>Secure Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Tabs Section */}
            <div className="mt-5 pt-5">
                <Tabs defaultActiveKey="description" className="mb-4 custom-tabs">
                    <Tab eventKey="description" title="Description">
                        <div className="py-4">
                            <h5>Detailed Specifications</h5>
                            <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedeu egestas nisi.
                                Quisque vel finibus urna. Plus, this {product.title} is designed with the highest quality standards
                                consistent with {product.category} requirements.
                            </p>
                            <ul className="text-muted">
                                <li>Premium materials and build quality</li>
                                <li>Universal compatibility across devices</li>
                                <li>Ergonomic design for maximum comfort</li>
                                <li>Energy efficient and environmentally friendly</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab eventKey="reviews" title={`Reviews (${product.rating?.count})`}>
                        <div className="py-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5>Customer Feedback</h5>
                                <Button variant="outline-primary">Write a Review</Button>
                            </div>
                            {/* Mock Reviews */}
                            <div className="border-bottom pb-3 mb-3">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <div className="text-warning">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                    <span className="fw-bold">John Doe</span>
                                    <span className="text-muted small">| 2 days ago</span>
                                </div>
                                <p className="text-muted">Amazing product! It exceeded my expectations. Fast delivery and great support.</p>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>

            {/* Related Products */}
            <section className="mt-5">
                <h3 className="fw-bold mb-4">Related Products</h3>
                <Row className="g-4">
                    {relatedProducts.map(p => (
                        <Col key={p.id} lg={3} md={6}>
                            <ProductCard product={p} />
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
};

export default ProductDetails;
