import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	FlatList,
	useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			// console.log(userNumber);
			Alert.alert("Ошибка", "Кажется ты обманываешь...", [
				{ text: "Извини...", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prev) => [newRndNumber, ...prev]);
	};

	let content = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Больше или меньше?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</>
	);

	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>

					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

	return (
		<View style={styles.screen}>
			<Title>Ход противника</Title>
			{content}
			<View style={styles.listContainer}>
				{/* {guessRounds.map((roundNum) => (
					<Text key={roundNum}>{roundNum}</Text>
				))} */}
				<FlatList
					keyExtractor={(item) => item}
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRounds.length - itemData.index}
							guess={itemData.item}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		alignItems: "center",
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
	buttonContainerWide: {
		flexDirection: "row",
		alignItems: "center",
	},
});
