var mat_container = document.getElementById("matricesContainer");

function allowDrop(ev) {

    ev.preventDefault();
}

function drag(ev) {
    // ev.target is the matrix container -> get the childed matrix
    ev.dataTransfer.setData("text", ev.target.children[1].id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    positionElement(ev);

    gui.findDivs();
    gui.fillMatrices();

    trans.compose();
}

function positionElement(ev){

    var order = trans.composition_order;

    var elem = ev.dataTransfer.getData("text");
    var old_idx = order.indexOf(elem);
    var new_idx = calculateIndex(ev);

    if (new_idx == old_idx
        || old_idx < 0      // ignore composition matrix
        || new_idx < 0)     // ignore composition matrix
        return;

    updateOrder(old_idx, new_idx, elem);
}

function updateOrder(oldIdx, newIdx, elem){

    var order = trans.composition_order;

    // remove the current id from the order
    order.remove(oldIdx);

    // insert the current id into the order at the new index
    order.insert(newIdx, elem);

    trans.setCompositionOrder(order);

    updateGuiMatrices();
}

function updateGuiMatrices() {

    var mats = document.getElementsByClassName("matrix");

    //console.log(matsArray);
}

function calculateIndex(ev) {

    // get the coordinates of the container
    // (fancy mix of js and jquery)
    var containerRect = mat_container.getBoundingClientRect();
    var containerWidth = $('#matricesContainer').width();
    var containerLeft = $('#matricesContainer').offset().left;
    var containerRight = containerLeft + containerWidth;

    // get the drop x coordinate
    var dropCoordX = ev.pageX;

    // decide which position the dropped element should have

    // calculate the relative x position inside the container
    var pos = dropCoordX - containerLeft;

    // normalize this position
    pos /= containerWidth;

    // multiply by the number of matrices
    var idx = pos * gui.mats.length;

    // floor
    var idx = Math.floor(idx);

    // -1 to ignore the composition matrix
    idx--;

    return idx;
}

function relocateMultSymbols(){
    $('#m0').remove().insertAfter(".matrix").eq(0);
    $('#m1').remove().insertAfter(".matrix").eq(1);
}
