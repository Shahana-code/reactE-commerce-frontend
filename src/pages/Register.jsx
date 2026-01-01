import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        login({ name: formData.name, email: formData.email });
        navigate('/');
    };

    return (
        <Container className="py-5 my-5">
            <Row className="justify-content-center">
                <Col lg={5} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <Card.Header className="bg-primary text-white text-center py-4 border-0">
                                <h3 className="fw-bold mb-0">Join E-Shop</h3>
                                <p className="small opacity-75 mb-0">Create an account to track orders</p>
                            </Card.Header>
                            <Card.Body className="p-5">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold">Full Name</Form.Label>
                                        <InputGroup className="bg-light rounded-3 overflow-hidden border">
                                            <InputGroup.Text className="bg-transparent border-0"><User size={20} className="text-muted" /></InputGroup.Text>
                                            <Form.Control
                                                required
                                                className="bg-transparent border-0 py-3 shadow-none"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold">Email Address</Form.Label>
                                        <InputGroup className="bg-light rounded-3 overflow-hidden border">
                                            <InputGroup.Text className="bg-transparent border-0"><Mail size={20} className="text-muted" /></InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                required
                                                className="bg-transparent border-0 py-3 shadow-none"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold">Password</Form.Label>
                                        <InputGroup className="bg-light rounded-3 overflow-hidden border">
                                            <InputGroup.Text className="bg-transparent border-0"><Lock size={20} className="text-muted" /></InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                required
                                                className="bg-transparent border-0 py-3 shadow-none"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold">Confirm Password</Form.Label>
                                        <InputGroup className="bg-light rounded-3 overflow-hidden border">
                                            <InputGroup.Text className="bg-transparent border-0"><Lock size={20} className="text-muted" /></InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                required
                                                className="bg-transparent border-0 py-3 shadow-none"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Check
                                        type="checkbox"
                                        required
                                        label={<span className="small">I agree to the <Link to="#">Terms & Conditions</Link></span>}
                                        className="mb-4"
                                    />

                                    <Button type="submit" variant="primary" size="lg" className="w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4">
                                        <UserPlus size={20} /> Register Now
                                    </Button>

                                    <p className="text-center text-muted mb-0 small">
                                        Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign In</Link>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
