var mat_container = document.getElementById("matricesContainer");

function allowDrop(ev) {
    positionElement(ev);

    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    positionElement(ev);
}

function positionElement(ev){

    var order = trans.composition_order;

    var currId = ev.dataTransfer.getData("text");
    var old_idx = order.indexOf(currId);
    var new_idx = calculateIndex(ev);

    if (new_idx == old_idx)
        return;

    order = updateOrder(old_idx, new_idx, currId);

    // fill with elements in the right order
    for (var i = 0; i < order.length; i++){
        // append the rot elements according to the order
        $el = $('#' + order[i]);
        $el.parent().append($el);

        // add the multiplication symbols
        $ms = $("#m" + i);
        if ($ms.length > 0){
            $ms.parent().append($ms);
        }
    }
}

function updateOrder(oldIdx, newIdx, currentId){

    var order = trans.composition_order;

    // remove the current id from the order
    order = order.removeAtIndex(oldIdx);

    // insert the current id into the order at the new index
    order = order.insert(newIdx, currentId);

    trans.setOrder(order);

    return trans.getOrder();
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

    // multiply by the number of elements - 1
    var idx = pos * 2;

    // round
    var idx = Math.round(idx);

    // hacky hack
    if (pos < 0.3333) idx = 0;
    if (0.3333 <= pos && pos <= 0.6666) idx = 1;
    if (pos > 0.6666) idx = 2;

    return idx;
}

function relocateMultSymbols(){
    $('#m0').remove().insertAfter(".matrix").eq(0);
    $('#m1').remove().insertAfter(".matrix").eq(1);
}
