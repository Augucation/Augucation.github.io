function readTextFile(path)
{
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.send(null);
    request.onreadystatechange = function() {
            writeDTDInDiv(request.responseText);
    };
}
