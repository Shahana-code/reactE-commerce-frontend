import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId || 'ORD-X792B104';

    return (
        <Container className="py-5 text-center my-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-4 d-inline-block p-4 rounded-circle bg-success bg-opacity-10 text-success">
                    <CheckCircle size={80} />
                </div>
                <h1 className="display-4 fw-bold mb-3">Order Placed Successfully!</h1>
                <p className="lead text-muted mb-4">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                <div className="bg-light p-4 rounded-4 border d-inline-block mb-5 min-w-300">
                    <h6 className="text-uppercase fw-bold text-muted small mb-2">Order Tracking ID</h6>
                    <h4 className="fw-bold mb-0 text-primary">{orderId}</h4>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Button as={Link} to="/shop" variant="primary" size="lg" className="px-5 rounded-pill shadow">
                        <ShoppingBag size={20} className="me-2" /> Continue Shopping
                    </Button>
                    <Button variant="outline-dark" size="lg" className="px-5 rounded-pill shadow-sm">
                        View Order Details <ArrowRight size={20} className="ms-2" />
                    </Button>
                </div>
            </motion.div>

            <div className="mt-5 pt-5 opacity-75">
                <p className="text-muted">A confirmation email has been sent to your address.</p>
            </div>
        </Container>
    );
};

export default OrderSuccess;
