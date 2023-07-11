import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import GameScreen from "./screens/GameScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return (
			<LinearGradient
				colors={[Colors.primary700, Colors.accent500]}
				style={styles.rootScreen}
			>
				<Text style={{ fontSize: 22, color: "white" }}>Загрузка</Text>
			</LinearGradient>
		);
	}

	const pickedNumberHandler = (pickedNumber) => {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	};

	const gameOverHandler = (numberOfRounds) => {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	};
	const startNewGame = () => {
		setUserNumber(null);
		setGuessRounds(0);
	};

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				onStartNewGame={startNewGame}
				roundsNumber={guessRounds}
				userNumber={userNumber}
			/>
		);
	}

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient
				onLayout={onLayoutRootView}
				colors={[Colors.primary700, Colors.accent500]}
				style={styles.rootScreen}
			>
				<ImageBackground
					source={require("./assets/images/background.png")}
					resizeMode="cover"
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
});
