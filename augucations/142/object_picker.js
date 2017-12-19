window.onload = function(){

    window.addEventListener('click', onMouseClick, false);

    function onMouseClick(e){

        // only consider clicks inside the canvas
        if (e.target.tagName != "CANVAS")
            return

        // calculate mouse position
        var rect = e.target.getBoundingClientRect();
        var mouseVector = new THREE.Vector3();
        mouseVector.x = (((e.clientX - rect.left) / rect.width) * 2) - 1;
        mouseVector.y = (((e.clientY - rect.top) / rect.height) * -2) + 1;
        mouseVector.z = 1;

        // raycast
        var projector = new THREE.Projector();
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(pickableObjects);

        // if no object was picked, throw an unpicked event and return
        if(intersects.length < 1){
            dispatchEvent(new CustomEvent("unpicked_object"));
            return;
        }

        //  if an object was picked, throw a pick event
        picked_object = intersects[0];
        var event = new CustomEvent("picked_object", {
            detail: {
                object_id: picked_object.object.id
            }
        });
        dispatchEvent(event);
    }
}
