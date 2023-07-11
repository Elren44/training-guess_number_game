import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "./../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onPickNumber }) => {
	const [enteredNumber, setEnteredNumber] = useState("");

	const { width, height } = useWindowDimensions();

	const numberInputHandler = (enteredText) => {
		setEnteredNumber(enteredText);
	};

	const resetInputHandler = () => {
		setEnteredNumber("");
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredNumber);

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Ошибка!", "Нужно ввести число в пределах от 1 до 99.", [
				{
					text: "Ок",
					style: "destructive",
					onPress: resetInputHandler,
				},
			]);
			return;
		}

		onPickNumber(chosenNumber);
	};

	const marginTopDistance = height < 400 ? 30 : 100;

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView style={styles.screen} behavior="position">
				<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
					<Title>Загадай число</Title>
					<Card>
						<InstructionText>Нажми для ввода</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType="number-pad"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={numberInputHandler}
							value={enteredNumber}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInputHandler}>Сброс</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Подтвердить
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
	screen: { flex: 1 },
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: "center",
	},

	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: "bold",
		textAlign: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
