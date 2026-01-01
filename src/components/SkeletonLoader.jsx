import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const SkeletonLoader = ({ count = 4, type = "card" }) => {
    if (type === "card") {
        return (
            <Row>
                {Array.from({ length: count }).map((_, idx) => (
                    <Col key={idx} lg={3} md={4} sm={6} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm overflow-hidden">
                            <div className="skeleton" style={{ height: '250px' }}></div>
                            <Card.Body>
                                <div className="skeleton mb-2" style={{ height: '20px', width: '40%' }}></div>
                                <div className="skeleton mb-3" style={{ height: '24px', width: '100%' }}></div>
                                <div className="skeleton mb-4" style={{ height: '20px', width: '30%' }}></div>
                                <div className="skeleton" style={{ height: '38px', borderRadius: '4px' }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }

    if (type === "details") {
        return (
            <Row className="gy-4">
                <Col md={6}>
                    <div className="skeleton rounded" style={{ height: '500px' }}></div>
                </Col>
                <Col md={6}>
                    <div className="skeleton mb-4" style={{ height: '40px', width: '80%' }}></div>
                    <div className="skeleton mb-3" style={{ height: '30px', width: '30%' }}></div>
                    <div className="skeleton mb-5" style={{ height: '100px', width: '100%' }}></div>
                    <div className="skeleton mb-4" style={{ height: '50px', width: '50%' }}></div>
                    <div className="skeleton" style={{ height: '50px', width: '50%' }}></div>
                </Col>
            </Row>
        );
    }

    return null;
};

export default SkeletonLoader;
