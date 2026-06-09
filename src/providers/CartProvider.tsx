"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Course } from "@/lib/queries/courses/types";

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: any) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("yetzu_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync cart items to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("yetzu_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (course: any) => {
    if (cartItems.some((item) => item._id === course._id)) {
      toast.error("Course is already in your cart!");
      return;
    }
    setCartItems((prev) => [...prev, course]);
    toast.success(`${course.title} added to cart!`);
  };

  const removeFromCart = (courseId: string) => {
    const courseToRemove = cartItems.find((item) => item._id === courseId);
    setCartItems((prev) => prev.filter((item) => item._id !== courseId));
    if (courseToRemove) {
      toast.success(`${courseToRemove.title} removed from cart.`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (courseId: string) => {
    return cartItems.some((item) => item._id === courseId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
