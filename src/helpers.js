import {CELL_STATUS} from './Constants'

export function checkNeighbors(currBoard, {x, y}){
	currBoard[x][y].status = CELL_STATUS.CLEARED
	const neighbors = checkNeighborsNumber(currBoard, {x, y})
	if(neighbors){
		currBoard[x][y].neighbors = neighbors
		return [...currBoard]
	}
	revealNeighbors(currBoard, {x, y})
	return [...currBoard]
}

function revealNeighbors(currBoard, {x, y}){
	let neighbors = 0
	for (let i = -1; i <= 1; i++){
		for (let j = -1; j <= 1; j++){
			if(
				x + i >= 0
				&& x + i <= currBoard.length -1
				&& y + j >= 0
				&& y + j <= currBoard.length -1
				&& (i != 0 || j != 0)
			){
				//Mi profesor de funcional llega a ver esta recursividad y me reprueba
				const currStatus = currBoard[x+i][y+j].status
				if(
					currStatus === CELL_STATUS.CLEARED ||
					currStatus === CELL_STATUS.FLAGED ||
					currStatus === CELL_STATUS.QMARKED
				){
					continue
				}
				currBoard[x+i][y+j].status = CELL_STATUS.CLEARED
				neighbors = checkNeighborsNumber(currBoard, {x: x+i, y:y+j})
				if(!neighbors){
					currBoard = revealNeighbors(currBoard, {x: x+i, y:y+j})
				}
				else{
					currBoard[x+i][y+j].neighbors = neighbors
				}
			}
		}
	}
	return currBoard
}

function checkNeighborsNumber(currBoard, {x, y}){
	let neighbors = 0
	for (let i = -1; i <= 1; i++){
		for (let j = -1; j <= 1; j++){
			if(
				x + i >= 0
				&& x + i <= currBoard.length -1
				&& y + j >= 0
				&& y + j <= currBoard.length -1
				&& (i != 0 || j != 0)
			){
				if(currBoard[x+i][y+j].isMine){
					++neighbors
				}
			}
		}
	}
	return neighbors
}

