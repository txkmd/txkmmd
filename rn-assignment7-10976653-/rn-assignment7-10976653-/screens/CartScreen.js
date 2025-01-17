import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart");
      if (cartItems !== null) {
        setCartItems(JSON.parse(cartItems));
      }
    } catch (error) {
      console.log("Loading cart items failed:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === "string" ? item.price.replace("$", "") : 0;
      return total + parseFloat(price);
    }, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Image
          source={require("../assets/remove.png")}
          style={styles.removeIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.checkoutText}>CHECKOUT</Text>
        <View style={styles.line} />
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalPrice}>${calculateTotal().toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  checkoutText: {
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    fontFamily: 'Optima',
  },
  listContainer: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    marginVertical: 8,
    borderBottomColor: "#ddd",
    padding: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Optima',
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: 'optima',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    fontFamily: 'Optima',
  },
  removeIcon: {
    width: 24,
    height: 24,
    tintColor: "#e74c3c",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Optima',
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Optima',
    color: "#e74c3c",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Optima',
  },
});

export default CartScreen;
