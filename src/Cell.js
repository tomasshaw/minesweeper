import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {CELL_STATUS} from './Constants'

// https://math.stackexchange.com/questions/389619/probability-in-minesweeper
// n is the number of mines in a grid
// N is the number of cells in a grid
// ρ=n/N
//
// http://minesweeperonline.com/
// BEGINNER: 9x9 - 10 mines => 12%
// INTERMEDIATE: 16x16 - 40 mines => 16%
// EXPERT: 16x30 - 99 mines => 20%

const RevealedMine = ({size}) => {
	return <View style={[styles.revealedMine, {width: size, height: size}]}/>
}

const StandardCell = ({size, lost, onCellReveal, flag}) => {
	return(
		<TouchableOpacity disabled={lost || flag} onPress={onCellReveal}>
			<View style={[styles.cell, {width: size, height: size}]}>
				{flag && (<Text>F</Text>)}
			</View>
		</TouchableOpacity>
	)
}

function getNumberColor(number){
	switch(number){
		case 1:
			return '#0101f9'
		case 2:
			return '#027d00'
		case 3:
			return '#fc0301'
		case 4:
			return '#01018d'
		case 5:
			return '#820002'
		case 6:
			return '#027f83'
		case 7:
			return '#000000'
		case 8:
			return '#808080'
	}
}

const Cell = ({size, status, isMine, neighbors, lost, onReveal}) => {

	// TODO: This should not be here.
//	const onCellReveal = () => {
//		if(status === CELL_STATUS.CLEARED){ return }
//		if (!isMine) {
//			onReveal()
//		} else {
//			onLose()
//		}
//	}

	if(lost && isMine){
		return <RevealedMine size={size}/>
	}

	if (status === CELL_STATUS.CLEARED){
		return (
			<View style={[styles.revealed, {width: size, height: size}]}>
				{neighbors !== '' && (
					<Text
						style={[{
							color: getNumberColor(neighbors),
								fontWeight: 'bold',
								fontSize: 21
						}]}
					>
						{neighbors}
					</Text>
				)}
			</View>
		)
	}

	return (
		<StandardCell
			size={size}
			lost={lost}
			onCellReveal={onReveal}
			flag={CELL_STATUS.FLAGED === status}
		/>
	)
}

//const CellComponent = forwardRef(Cell);

const styles = StyleSheet.create({
	cell: {
		backgroundColor: '#bdbdbd',
		borderWidth: 3,
		borderTopColor: '#ffffff',
		borderLeftColor: '#ffffff',
		borderRightColor: '#7d7d7d',
		borderBottomColor: '#7d7d7d'
	},
	revealed: {
		backgroundColor: '#bdbdbd',
		borderWidth: 1,
		borderColor: '#7d7d7d',
		alignItems: 'center',
		justifyContent: 'center'
	},
	revealedMine: {
		backgroundColor: '#ff0000',
		borderWidth: 1,
		borderColor: '#7d7d7d',
		alignItems: 'center',
		justifyContent: 'center'
	},
})

export default Cell
