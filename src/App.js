import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import {DIFFICULTY_MAP, DEFAULT_BOARD_SIZE, MODES, CELL_SIZE} from './Constants'
import Grid from './Grid'
import Flag from '../pictures/red-flag.png'
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler'

// http://minesweeperonline.com/
// BEGINNER: 9x9 - 10 mines
// INTERMEDIATE: 16x16 - 40 mines
// EXPERT: 16x30 - 99 mines

//TODO:
// -Checkear victoria
// -Seleccionar dificultad
// -Seleccionar tamanio
// - ESTILOS ESTILOS ESTILOS centrar mil cosas
// -if flagged&&isMine&&lost => icono_wrong_mine

const App = () => {
	const [difficulty, setDifficulty] = useState(DIFFICULTY_MAP.EASY)
	const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE)
	const [boardWidth, setBoardWidth] = useState(CELL_SIZE * DEFAULT_BOARD_SIZE)
	const [reset, setReset] = useState(false)
	const [mode, setMode] = useState(MODES.CLEAR)
	const [lost, setLost] = useState(false)
	const onLose = () => {
		Alert.alert('Alpiste perdiste')
		setLost(true)
	}
	const handleOnNewGame = () => {
		setReset(!reset)
		setLost(false)
		setMode(MODES.CLEAR)
	}
	return (
		<View style={styles.container}>
			<Button title="New Game" onPress={() => handleOnNewGame()} />
			<Text> </Text>
			<Text>Current Mode: {mode}</Text>
			<Text>Current Difficulty: {difficulty}</Text>
			<Text> </Text>
			{/* Why does this have to be implemented this way, its horrible, i wanna go back
				to standard webDev I love Chrome and my 64gb's of ram */}
			<ScrollView
				style={{
					height: boardWidth,
					maxHeight: boardWidth,
					maxWidth: boardWidth
				}}
				horizontal
			>
			<ScrollView
				style={{
					width: boardWidth,
					maxHeight: boardWidth,
					maxWidth: boardWidth
				}}
				maximumZoomScale={2}
				minimumZoomScale={0.5}
			>
			<Grid
				difficulty={difficulty}
				boardSize={boardSize}
				onLose={onLose}
				reset={reset}
				lost={lost}
				mode={mode}
			/>
			</ScrollView>
			</ScrollView>
			<Text> </Text>
			<View style={styles.buttonWrapper}>
				<View style={styles.buttonDiv}>
					<Button
						style={styles.button}
						title="N"
						onPress={() => setMode(MODES.CLEAR)}
					/>
				</View>
				<View style={styles.buttonDivImg}>
					<TouchableOpacity
						style={styles.imageWrapper}
						onPress={() => setMode(MODES.FLAG)}
					>
						<Image
							resizeMethod='scale'
							resizeMode='cover'
							style={styles.flagPicture}
							source={Flag}
						/>
						
					</TouchableOpacity>
				</View>
				<View style={styles.buttonDiv}>
					<Button
						style={styles.button}
						title="?"
						onPress={() => setMode(MODES.QMARK)}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonWrapper: {
		width: '60%',
		maxWidth: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonDivImg: {
		backgroundColor: 'white',
		borderWidth: 2,
		borderRadius: 4,
		flex: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDiv: {
		backgroundColor: 'white',
		borderWidth: 2,
		borderRadius: 4,
		flex: 0.3,
	},
	imageWrapper:{
		margin: 'auto',
	},
	flagPicture: {
		height: 24,
		width: 24,
	},
	button: {
		width: '100%',
	}
})

export default App
