function main()
{
    console.log("jsjdksjdksasssssssssssssssssssssssssssssssssssssssssssssssssssssd");

    // get url parameter
    var url = window.location.search;
    var param = parseInt(url.split("?")[1]);

    console.log("params: ", param);
    
	if (isNaN(param))
        return;


	param += 100;
	
    console.log("ist es ne zahl? ", !isNaN(param));

    // if its a number, open corresponding interaction
    if (!isNaN(param))
    {
        console.log("is ne zahl");
        window.location.href = "augucations/" + param + "/" + "interaction.html";
    }
}

main();
