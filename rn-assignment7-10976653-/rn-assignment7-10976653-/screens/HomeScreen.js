import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart");
      if (cartItems !== null) {
        setCart(JSON.parse(cartItems));
      }
    } catch (error) {
      console.error("Failed to load cart items:", error);
    }
  };

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => addToCart(item)}
        style={styles.addIconContainer}
      >
        <Image
          source={require("../assets/add_circle.png")}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>OUR STORY</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.circleIconContainer}>
            <Image
              source={require("../assets/Listview.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleIconContainer}>
            <Image
              source={require("../assets/Filter.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 40,
  },
  header: {
    fontSize: 25,
    fontFamily: "Optima",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleIconContainer: {
    width: 37,
    height: 37,
    borderRadius: 19.5,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  listContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: 'Optima',
  },
  productDescription: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Optima',
    color: "#666",
  },
  productPrice: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "bold",
    color: "#e74c3c",
    fontFamily: 'Optima',
  },
});

export default HomeScreen;
