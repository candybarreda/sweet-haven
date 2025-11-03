import React, { createContext, useContext, useReducer } from 'react';

// Estado Inicial
const initialState = {
    cartItems: [],
};

// Reducer (Función de gestión de estados)
const cartReducer = (state, action) => {
    console.log({
        state, action
    })
    switch (action.type) {
        
        case 'ADD_TO_CART':
            const itemToAdd = action.payload;
            const existingItem = state.cartItems.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                const updatedItems = state.cartItems.map(item =>
                    item.id === itemToAdd.id
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
                return { ...state, cartItems: updatedItems };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...itemToAdd, quantity: 1 }],
                };
            }
            
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    +item.id === +action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.reduce((acc, item) => {
                    if (+item.id === +action.payload) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }
                    } else {
                        acc.push(item);
                    }
                    return acc;
                }, []),
            };
            
        default:
            return state;
    }
};


// Creación del Contexto y Hook
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};