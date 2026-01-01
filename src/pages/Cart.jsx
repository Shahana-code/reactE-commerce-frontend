import React from 'react';
import { Container, Row, Col, Button, Card, Table, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const shipping = cart.length > 0 ? 10 : 0;
    const tax = cartTotal * 0.08;
    const finalTotal = cartTotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <Container className="py-5 text-center my-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <ShoppingBag size={80} className="text-muted mb-4 opacity-50" />
                    <h2 className="fw-bold mb-3">Your Cart is Empty</h2>
                    <p className="text-muted mb-4">You haven't added any products to your cart yet.</p>
                    <Button as={Link} to="/shop" variant="primary" size="lg" className="px-5 rounded-pill shadow">
                        Start Shopping
                    </Button>
                </motion.div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold mb-0">Shopping Cart ({cart.length})</h2>
                <Button variant="outline-danger" size="sm" onClick={clearCart}>Clear Cart</Button>
            </div>

            <Row className="gy-4">
                {/* Cart Items */}
                <Col lg={8}>
                    <div className="bg-card rounded-4 border overflow-hidden shadow-sm">
                        <div className="table-responsive">
                            <Table borderless hover className="align-middle mb-0">
                                <thead className="bg-light border-bottom">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="py-3 text-center">Price</th>
                                        <th className="py-3 text-center">Quantity</th>
                                        <th className="py-3 text-center">Total</th>
                                        <th className="py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="border-bottom"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="p-2 border rounded bg-white" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                                            <img src={item.image || item.thumbnail} alt={item.title} className="w-100 h-100 object-fit-contain" />
                                                        </div>
                                                        <div>
                                                            <Link to={`/product/${item.id}`} className="text-decoration-none fw-bold text-dark d-block text-truncate" style={{ maxWidth: '200px' }}>
                                                                {item.title}
                                                            </Link>
                                                            <small className="text-muted text-capitalize">{item.category}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center fw-semibold">${item.price}</td>
                                                <td className="py-3 text-center">
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div className="d-inline-flex border rounded bg-light p-1">
                                                            <Button variant="link" size="sm" className="p-0 text-dark" onClick={() => updateQuantity(item.id, -1)}>
                                                                <Minus size={14} />
                                                            </Button>
                                                            <span className="px-3 small fw-bold">{item.quantity}</span>
                                                            <Button variant="link" size="sm" className="p-0 text-dark" onClick={() => updateQuantity(item.id, 1)}>
                                                                <Plus size={14} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center fw-bold text-primary">${(item.price * item.quantity).toFixed(2)}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <Button variant="link" className="text-danger p-0 shadow-none" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </Table>
                        </div>

                        <div className="p-4 bg-light border-top">
                            <Button as={Link} to="/shop" variant="link" className="text-decoration-none text-dark d-flex align-items-center gap-2 p-0">
                                <ArrowLeft size={18} /> Continue Shopping
                            </Button>
                        </div>
                    </div>
                </Col>

                {/* Order Summary */}
                <Col lg={4}>
                    <div className="sticky-top" style={{ top: '100px' }}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <Card.Header className="bg-primary text-white p-4 border-0">
                                <h5 className="fw-bold mb-0">Order Summary</h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Shipping</span>
                                    <span className="text-success fw-bold">${shipping === 0 ? 'Free' : shipping.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom">
                                    <span className="text-muted">Estimated Tax (8%)</span>
                                    <span className="fw-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="h5 fw-bold mb-0">Order Total</span>
                                    <span className="h4 fw-bold text-primary mb-0">${finalTotal.toFixed(2)}</span>
                                </div>

                                <div className="mb-4">
                                    <label className="small fw-bold mb-2">PROMO CODE</label>
                                    <div className="input-group">
                                        <Form.Control placeholder="Enter code" className="bg-light border-0 py-2" />
                                        <Button variant="dark" className="px-3">Apply</Button>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout <ChevronRight size={20} />
                                </Button>
                            </Card.Body>
                        </Card>

                        <div className="bg-light p-3 rounded-4 border border-dashed text-center">
                            <p className="small text-muted mb-0">We accept secure payments via</p>
                            <div className="d-flex justify-content-center gap-3 mt-2 opacity-50">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height="20" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height="20" alt="MC" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height="20" alt="PayPal" />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
