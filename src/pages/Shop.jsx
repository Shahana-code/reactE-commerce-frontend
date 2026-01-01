import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(1000);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const categoryParam = queryParams.get('category');

    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [categoryParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                setProducts(res.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        let result = products;

        if (searchTerm) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        result = result.filter(p => p.price <= priceRange);

        if (sortBy === 'lowToHigh') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
        }

        return result;
    }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

    return (
        <Container className="py-5">
            <Row className="gy-4">
                {/* Sidebar Filters */}
                <Col lg={3}>
                    <div className="p-4 rounded-4 border bg-card shadow-sm sticky-top" style={{ top: '100px', zIndex: 10 }}>
                        <div className="d-flex align-items-center mb-4 gap-2 border-bottom pb-2">
                            <Filter size={20} className="text-primary" />
                            <h5 className="fw-bold mb-0">Filters</h5>
                        </div>

                        <div className="mb-4">
                            <label className="fw-semibold mb-3 d-block">Category</label>
                            {categories.map(cat => (
                                <Form.Check
                                    key={cat}
                                    type="radio"
                                    label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    name="category"
                                    id={`cat-${cat}`}
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                    className="mb-2 text-capitalize cursor-pointer"
                                />
                            ))}
                        </div>

                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <label className="fw-semibold">Price Range</label>
                                <span className="text-primary fw-bold">${priceRange}</span>
                            </div>
                            <Form.Range
                                min={0}
                                max={1000}
                                step={10}
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                            />
                            <div className="d-flex justify-content-between small text-muted">
                                <span>$0</span>
                                <span>$1000</span>
                            </div>
                        </div>

                        <Button
                            variant="outline-primary"
                            className="w-100 rounded-pill"
                            onClick={() => {
                                setSelectedCategory('all');
                                setPriceRange(1000);
                                setSortBy('featured');
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </Col>

                {/* Product List */}
                <Col lg={9}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                        <div>
                            <h4 className="fw-bold mb-1">
                                {searchTerm ? `Search Results for "${searchTerm}"` :
                                    selectedCategory !== 'all' ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) :
                                        'All Products'}
                            </h4>
                            <p className="text-muted small mb-0">{filteredProducts.length} items found</p>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <span className="text-muted d-none d-sm-inline">Sort by:</span>
                            <Dropdown onSelect={(e) => setSortBy(e)}>
                                <Dropdown.Toggle variant="light" className="border rounded-pill px-3">
                                    <SlidersHorizontal size={16} className="me-2" />
                                    {sortBy === 'featured' ? 'Featured' :
                                        sortBy === 'lowToHigh' ? 'Price: Low to High' :
                                            sortBy === 'highToLow' ? 'Price: High to Low' : 'Rating'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item eventKey="featured">Featured</Dropdown.Item>
                                    <Dropdown.Item eventKey="lowToHigh">Price: Low to High</Dropdown.Item>
                                    <Dropdown.Item eventKey="highToLow">Price: High to Low</Dropdown.Item>
                                    <Dropdown.Item eventKey="rating">Top Rated</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    {loading ? (
                        <SkeletonLoader count={9} />
                    ) : error ? (
                        <div className="text-center py-5">
                            <h5 className="text-danger">{error}</h5>
                            <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-5 bg-light rounded-4">
                            <h4 className="fw-bold">No products found</h4>
                            <p className="text-muted">Try adjusting your filters or search terms.</p>
                            <Button variant="primary" onClick={() => { setSelectedCategory('all'); setPriceRange(1000); }}>View All Products</Button>
                        </div>
                    ) : (
                        <>
                            <Row className="g-4">
                                {filteredProducts.map(product => (
                                    <Col key={product.id} md={6} lg={4}>
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination Placeholder */}
                            <div className="d-flex justify-content-center mt-5 gap-2">
                                <Button variant="outline-primary" disabled><ChevronLeft size={20} /></Button>
                                <Button variant="primary">1</Button>
                                <Button variant="outline-primary">2</Button>
                                <Button variant="outline-primary">3</Button>
                                <Button variant="outline-primary"><ChevronRight size={20} /></Button>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
