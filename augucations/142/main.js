initScene();
createModelsAndCoordinateSystems();
animate();


// Helper

function vec(x, y, z){
    return new THREE.Vector3(x, y, z);
}

function d2r(d){
    return d * Math.PI / 180;
}

function r2d(r){
    return r * 180 / Math.PI;
}
