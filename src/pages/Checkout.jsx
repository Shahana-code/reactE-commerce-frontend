import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const shipping = 10;
    const tax = cartTotal * 0.08;
    const total = cartTotal + shipping + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            clearCart();
            navigate('/order-success', { state: { orderId } });
        }, 2000);
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <Container className="py-5">
            <Row className="gy-5">
                <Col lg={7}>
                    <div className="mb-4">
                        <Button variant="link" className="p-0 text-decoration-none text-muted d-flex align-items-center gap-2 mb-3" onClick={() => navigate('/cart')}>
                            <ChevronLeft size={18} /> Back to Cart
                        </Button>
                        <h2 className="fw-bold">Checkout Information</h2>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <div className="bg-card p-4 rounded-4 shadow-sm border mb-4">
                            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                <Truck className="text-primary" /> Shipping Address
                            </h5>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">First Name</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="John" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Last Name</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="Doe" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Email Address</Form.Label>
                                        <Form.Control required type="email" className="bg-light border-0 py-2" placeholder="john@example.com" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Street Address</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="123 Shopping St" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">City</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="New York" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">State</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="NY" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Zip Code</Form.Label>
                                        <Form.Control required className="bg-light border-0 py-2" placeholder="10001" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <div className="bg-card p-4 rounded-4 shadow-sm border mb-4">
                            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                <CreditCard className="text-primary" /> Payment Method (UI Only)
                            </h5>
                            <div className="p-3 border rounded-3 border-primary bg-primary bg-opacity-10 mb-3">
                                <Form.Check
                                    type="radio"
                                    label="Credit Card"
                                    name="payment"
                                    id="cc"
                                    defaultChecked
                                    className="fw-bold"
                                />
                            </div>
                            <Row className="g-3">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Card Number</Form.Label>
                                        <Form.Control className="bg-light border-0 py-2" placeholder="0000 0000 0000 0000" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Expiry Date</Form.Label>
                                        <Form.Control className="bg-light border-0 py-2" placeholder="MM/YY" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">CVV</Form.Label>
                                        <Form.Control className="bg-light border-0 py-2" placeholder="123" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-100 rounded-pill py-3 fw-bold shadow mt-2 d-flex align-items-center justify-content-center gap-2"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (
                                <><ShieldCheck size={20} /> Place Order - ${total.toFixed(2)}</>
                            )}
                        </Button>
                    </Form>
                </Col>

                <Col lg={5}>
                    <div className="sticky-top" style={{ top: '100px' }}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Header className="bg-dark text-white p-4">
                                <h5 className="fw-bold mb-0">Order Summary</h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <ListGroup variant="flush" className="mb-4">
                                    {cart.map(item => (
                                        <ListGroup.Item key={item.id} className="px-0 py-3 bg-transparent">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex gap-3">
                                                    <div className="rounded border bg-white p-1" style={{ width: '50px', height: '50px' }}>
                                                        <img src={item.image} className="w-100 h-100 object-fit-contain" alt="" />
                                                    </div>
                                                    <div>
                                                        <p className="small fw-bold mb-0 text-truncate" style={{ maxWidth: '180px' }}>{item.title}</p>
                                                        <small className="text-muted">Qty: {item.quantity}</small>
                                                    </div>
                                                </div>
                                                <span className="fw-bold small">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Shipping</span>
                                    <span className="fw-bold">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 pb-3 border-bottom">
                                    <span className="text-muted">Tax (8%)</span>
                                    <span className="fw-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 fw-bold mb-0">Total</span>
                                    <span className="h4 fw-bold text-primary mb-0">${total.toFixed(2)}</span>
                                </div>
                            </Card.Body>
                            <Card.Footer className="bg-light p-4 text-center border-0">
                                <p className="small text-muted mb-0">
                                    <ShieldCheck size={16} className="me-1 text-success" />
                                    Your data is protected by SSL encryption
                                </p>
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
