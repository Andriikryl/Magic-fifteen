const containerNode = document.getElementById('fifteen')
const itemsNodes = Array.from(containerNode.querySelectorAll('.item'));
const countItems = 16;

if(itemsNodes.length !== 16){
    throw new Error(`should be ${countItems} items in html`)
}

let matrix = getMatrix()
