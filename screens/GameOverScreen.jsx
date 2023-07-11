import React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "./../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
	const { width, height } = useWindowDimensions();

	let imageSize = 300;

	if (width < 380) {
		imageSize = 150;
	}

	if (height < 400) {
		imageSize = 80;
	}
	const imageStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.rootContainer}>
				<Title>Игра закончена!</Title>
				<View style={[styles.imageContainer, imageStyle]}>
					<Image
						style={styles.image}
						source={require("../assets/images/success.png")}
					/>
				</View>
				<Text style={styles.summaryText}>
					Твоему телефону понадобилось{" "}
					<Text style={styles.highlight}>{roundsNumber}</Text> раундов чтобы
					угадать число <Text style={styles.highlight}>{userNumber}</Text>.
				</Text>
				<PrimaryButton onPress={onStartNewGame}>
					Начать новую игру.
				</PrimaryButton>
			</View>
		</ScrollView>
	);
};

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		padding: 24,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	imageContainer: {
		// width: deviceWidth < 380 ? 150 : 300,
		// height: deviceWidth < 380 ? 150 : 300,
		// borderRadius: deviceWidth < 380 ? 75 : 150,
		overflow: "hidden",
		borderWidth: 3,
		borderColor: Colors.primary800,
		margin: 36,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	summaryText: {
		fontFamily: "open-sans",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 24,
	},
	highlight: {
		fontFamily: "open-sans-bold",
		color: Colors.primary500,
	},
});
