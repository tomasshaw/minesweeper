import React, {useState, useRef, useReducer, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import {CELL_SIZE, CELL_STATUS, MODES, ACTION_TYPES} from './Constants'
import {checkNeighbors} from './helpers'
import Cell from './Cell'


function newGrid(difficulty, boardSize){
	const grid = Array.apply(null, Array(boardSize)).map((el, rowId) => {
		return Array.apply(null, Array(boardSize)).map((el, colId) => {
			return {
				status: CELL_STATUS.NONE,
				isMine: Math.random() < difficulty,
				neighbors: ''
			}
		})
	})
	return grid
}

function boardReducer(state, action){
	switch(action.type){
		case ACTION_TYPES.REVEAL: {
			return checkNeighbors(state, action.payload)
		}
		case ACTION_TYPES.FLAG: {
			const {x, y} = action.payload
			if(state[x][y].status === CELL_STATUS.FLAGED){
				state[x][y].status = CELL_STATUS.NONE
			} else {
				state[x][y].status = CELL_STATUS.FLAGED
			}
			return [...state]
		}
		case ACTION_TYPES.QMARK: {
			const {x, y} = action.payload
			if(state[x][y].status === CELL_STATUS.QMARKED){
				state[x][y].status = CELL_STATUS.NONE
			} else {
				state[x][y].status = CELL_STATUS.QMARKED
			}
			return [...state]
		}
		case ACTION_TYPES.RESET:
			return action.payload
		default:
			return state
	}
}

const Grid = ({boardSize, boardWidth, onLose, reset, difficulty, mode, ...rest}) => {
	const [boardState, dispatchBoard] = useReducer(
		boardReducer,
		newGrid(difficulty, boardSize),
	)

	const isFirstRun = useRef(true)
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}
		dispatchBoard({type: ACTION_TYPES.RESET, payload: newGrid(difficulty, boardSize) })
	}, [reset])

	const handleOnReveal = ({x, y}) => {
		switch(mode){
			case(MODES.CLEAR):
				if(
					boardState[x][y].status === CELL_STATUS.FLAGED ||
					boardState[x][y].status === CELL_STATUS.QMARKED
				){
					return
				}
				if(boardState[x][y].isMine){ onLose(); return }
				dispatchBoard({type: ACTION_TYPES.REVEAL, payload: {x, y}})
				break;
			case(MODES.FLAG):
				dispatchBoard({type: ACTION_TYPES.FLAG, payload: {x, y}})
				break;
			case(MODES.QMARK):
				dispatchBoard({type: ACTION_TYPES.QMARK, payload: {x, y}})
				break;
			default:
				break;
		}
	}

	return Array.apply(null, Array(boardSize)).map((el, rowId) => {
		const cellList = Array.apply(null, Array(boardSize)).map((el, colId) => {
			return (
				<Cell
					onReveal={() => handleOnReveal({x: colId, y: rowId}, )}
					onLose={onLose}
					//revealed={boardState[colId][rowId].revealed}
					status={boardState[colId][rowId].status}
					key={colId+rowId}
					size={CELL_SIZE}
					coors={{x: colId, y:rowId}}
					isMine={boardState[colId][rowId].isMine}
					neighbors={boardState[colId][rowId].neighbors}
					{...rest}
				/>
			)
		})

		return (
			<View
				key={rowId}
				style={{ width: boardWidth, height: CELL_SIZE, flexDirection: 'row'}}
			>
				{cellList}
			</View>
		)
	})
}

export default Grid
