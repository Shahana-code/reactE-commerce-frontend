import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const isWishlisted = wishlist.find(item => item.id === product.id);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
                <Button
                    variant="link"
                    className={`position-absolute top-0 end-0 m-2 z-index-1 p-1 ${isWishlisted ? 'text-danger' : 'text-muted'}`}
                    onClick={() => toggleWishlist(product)}
                >
                    <Heart fill={isWishlisted ? 'currentColor' : 'none'} size={24} />
                </Button>

                <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Card.Img
                        variant="top"
                        src={product.image || product.thumbnail}
                        className="product-card-img"
                        alt={product.title}
                    />
                </Link>

                <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="info" className="text-capitalize">{product.category}</Badge>
                        <div className="d-flex align-items-center text-warning small">
                            <Star size={14} fill="currentColor" />
                            <span className="ms-1 text-muted">({product.rating?.rate || product.rating || 4.5})</span>
                        </div>
                    </div>

                    <Link to={`/product/${product.id}`} className="text-decoration-none color-inherit">
                        <Card.Title className="fs-6 fw-bold mb-2 text-truncate-2">
                            {product.title || product.name}
                        </Card.Title>
                    </Link>

                    <Card.Text className="text-primary fw-bold fs-5 mt-auto">
                        ${product.price}
                    </Card.Text>

                    <Button
                        variant="outline-primary"
                        className="w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
