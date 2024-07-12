import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params ?? {};

  const careInstructions = [
    { id: "1", text: "Do not use bleach", icon: require("../assets/Do Not Bleach.png") },
    { id: "2", text: "Do not tumble dry", icon: require("../assets/Do Not Tumble Dry.png") },
    { id: "3", text: "Dry clean with tetrachloroethylene", icon: require("../assets/Do Not Wash.png") },
    { id: "4", text: "Iron at a maximum of 110oC/230oF", icon: require("../assets/Iron Low Temperature.png") },
  ];

  const renderCareInstructionItem = ({ item }) => (
    <View style={styles.careInstructionItem}>
      <Image source={item.icon} style={styles.careInstructionIcon} />
      <Text style={styles.careInstructionText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product?.image }} style={styles.productImage} resizeMode="contain" />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product?.title}</Text>
          <Text style={styles.productPrice}>$ {product?.price?.toFixed(2)}</Text>
          <Text style={styles.productDescription}>{product?.description}</Text>
        </View>
        <View style={styles.careInstructionsContainer}>
          <FlatList
            data={careInstructions}
            renderItem={renderCareInstructionItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.careInstructionsList}
          />
        </View>
        <View style={styles.shippingInfoContainer}>
          <View style={styles.shippingInfoRow}>
            <Image source={require("../assets/Shipping.png")} style={styles.shippingIcon} />
            <Text style={styles.shippingText}>
              Free Flat Rate Shipping{"\n"}
              Estimated to be delivered on{"\n"}
              09/11/2021 - 12/11/2021.
            </Text>
            <Image source={require("../assets/Up.png")} style={styles.UpIcon} />
          </View>
          <View style={styles.horizontalLine} />
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToBasketButton}>
          <Text style={styles.addToBasketText}>ADD TO BASKET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  productDetails: {
    marginLeft: 20,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Optima",
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "justify",
    fontFamily: "Optima",
  },
  productPrice: {
    fontSize: 24,
    fontFamily: "Optima",
    color: "#e74c3c",
  },
  careInstructionsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
  },
  careInstructionsList: {
    marginTop: 12,
    marginLeft: 20,
  },
  careInstructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  careInstructionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  careInstructionText: {
    fontSize: 16,
    fontFamily: "Optima",
    color: "#333",
  },
  shippingInfoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
  },
  shippingInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shippingIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  shippingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Optima",
    color: "#333",
    marginLeft: 12,
  },
  UpIcon: {
    width: 24,
    height: 24,
  },
  horizontalLine: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  footer: {
    backgroundColor: "black",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addToBasketButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addToBasketText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Optima",
  },
});

export default ProductDetailScreen;
