const containerNode = document.getElementById('fifteen')
const itemsNodes = Array.from(containerNode.querySelectorAll('.item'));

const countItems = 16;

if(itemsNodes.length !== 16){
    throw new Error(`should be ${countItems} items in html`)
}

itemsNodes[countItems - 1].style.display = 'none'

let matrix = getMatrix(
    itemsNodes.map((item) => Number(item.dataset.matrixId))
)

setPositionItems(matrix)



document.getElementById('shuff').addEventListener('click', () => {
    const shuffledArray = shuffleArray(matrix.flat())
    matrix = getMatrix(shuffledArray)
    setPositionItems(matrix);
})


const blankNumber = 16;
containerNode.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button');
    if(!buttonNode){
        return
    }

    const buttonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCords = findCoordinatesByNumber(buttonNumber, matrix);
    const blankCords = findCoordinatesByNumber(blankNumber, matrix);
    const isValid = isValidForSwap(buttonCords, blankCords);

    if(isValid){
        swap(blankCords, buttonCords, matrix)
        setPositionItems(matrix)
    }
})




function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let y = 0;
    let x = 0;

    for(let i = 0; i < arr.length; i++){
        if(x >= 4){
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i]
        x++
    }
    return matrix
}

function setPositionItems(matrix) {
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            const value = matrix[y][x]
            const node = itemsNodes[value - 1];
            setNodeStyle(node, x, y)
        }
    }
}

function setNodeStyle(node, x, y) {
    const shiftPs = 100
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

function shuffleArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}

function findCoordinatesByNumber(number, matrix){
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] === number){
                return {x, y}
            }
        }
    }
    return null
}

function isValidForSwap(coords1, coords2){
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = coords1Number;
}








