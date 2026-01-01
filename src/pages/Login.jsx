import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy login
        login({ name: formData.email.split('@')[0], email: formData.email });
        navigate('/');
    };

    return (
        <Container className="py-5 my-5">
            <Row className="justify-content-center">
                <Col lg={5} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <Card.Header className="bg-primary text-white text-center py-4 border-0">
                                <h3 className="fw-bold mb-0">Welcome Back</h3>
                                <p className="small opacity-75 mb-0">Sign in to continue shopping</p>
                            </Card.Header>
                            <Card.Body className="p-5">
                                <Form onSubmit={handleSubmit}>
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
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Form.Label className="small fw-bold">Password</Form.Label>
                                            <Link to="#" className="small text-primary text-decoration-none">Forgot password?</Link>
                                        </div>
                                        <InputGroup className="bg-light rounded-3 overflow-hidden border">
                                            <InputGroup.Text className="bg-transparent border-0"><Lock size={20} className="text-muted" /></InputGroup.Text>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                required
                                                className="bg-transparent border-0 py-3 shadow-none"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            <Button variant="link" className="bg-transparent border-0 text-muted" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Check
                                        type="checkbox"
                                        label="Remember me"
                                        className="mb-4 small"
                                    />

                                    <Button type="submit" variant="primary" size="lg" className="w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4">
                                        <LogIn size={20} /> Sign In
                                    </Button>

                                    <div className="text-center position-relative mb-4">
                                        <hr />
                                        <span className="position-absolute translate-middle-x start-50 top-50 bg-white px-3 small text-muted">OR</span>
                                    </div>

                                    <Row className="g-3 mb-4">
                                        <Col xs={12}>
                                            <Button variant="outline-dark" className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 border">
                                                <img src="https://www.google.com/favicon.ico" width="16" alt="G" /> Login with Google
                                            </Button>
                                        </Col>
                                    </Row>

                                    <p className="text-center text-muted mb-0 small">
                                        Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create Account</Link>
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

export default Login;
