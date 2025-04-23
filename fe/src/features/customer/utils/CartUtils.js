
export const addToCart = (cart, setCart, dish) => {
    const existingItem = cart.find(item => item.dish.id === dish.id);
    if (existingItem) {
        setCart(cart.map(item =>
            item.dish.id === dish.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    } else {
        setCart([...cart, { dish, quantity: 1 }]);
    }
};

// Giảm số lượng món trong giỏ
export const decreaseFromCart = (cart, setCart, dish) => {
    const existingItem = cart.find(item => item.dish.id === dish.id);
    if (existingItem && existingItem.quantity > 1) {
        setCart(cart.map(item =>
            item.dish.id === dish.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    } else {
        setCart(cart.filter(item => item.dish.id !== dish.id)); // Xóa món nếu số lượng là 0
    }
};
