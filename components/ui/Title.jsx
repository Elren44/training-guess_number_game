import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "./../../constants/colors";

const Title = ({ children }) => {
	return <Text style={styles.title}>{children}</Text>;
};

export default Title;
const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 24,
		textAlign: "center",
		// fontWeight: "bold",
		color: "white",
		borderWidth: Platform.select({ ios: 0, android: 2 }),
		borderColor: "white",
		padding: 12,
		maxWidth: "80%",
		width: 300,
	},
});
