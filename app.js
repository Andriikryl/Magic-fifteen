const containerNode = document.getElementById('fifteen')
const itemsNodes = Array.from(containerNode.querySelectorAll('.item'));
const countItems = 16;

if(itemsNodes.length !== 16){
    throw new Error(`should be ${countItems} items in html`)
}

let matrix = getMatrix(
    itemsNodes.map((item) => Number(item.dataset.matrixId))
)

setPositionItems(matrix)








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



