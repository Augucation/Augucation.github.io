function readTextFile(path, dest, xmlNum)
{
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.send(null);
    request.onreadystatechange = function() {

            // if dest div is given, write text to dest
            if (dest)
                writeToDiv(request.responseText, dest);

            // if dest string is given, store text in this string
            if (xmlNum)
                xmls[xmlNum] = request.responseText.toString(); 
    };
}
