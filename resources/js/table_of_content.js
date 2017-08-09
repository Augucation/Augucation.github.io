var container = document.getElementById("tocContainer");

var section = document.createElement("div");
section.className = "section";

for (let t = 0; t < topics.length; t++)
{

    // add sections

    var s = section.cloneNode(true);

    var title = document.createElement("div");
    title.innerHTML = topics[t];
    title.className = "sectionTitle";

    let collapseArrow = document.createElement("div");
    collapseArrow.className = "collapseArrow collapsedCollapseArrow";
    title.appendChild(collapseArrow);

    s.appendChild(title);

    // create inner section container which contains the interaction screenshots and titles
    let innerContainer = document.createElement("div");
    innerContainer.className = "sectionInnerContainer hiddenSection";
    s.appendChild(innerContainer);

    // add click listener to the title for collpasing
    title.addEventListener("click", function() {
        collapse(innerContainer, collapseArrow);
    });

    // add interactions
    for (let a = 0; a < augucations[t].length; a++)
    {
        // add outer augucation container
        let augucationContainer = document.createElement("div");
        augucationContainer.className = "augucationContainer";

        augucationContainer.addEventListener("click", function(e) {

            // don't listen for clicks on links
            if (e.target.className.includes("copySymbol"))
                return;

            openInteraction(getTotalIndex(t, a));
        });

        // add inner augucation container
        var augucation = document.createElement("div");
        augucation.className = "augucation";

        // add picccc
        var pic = document.createElement("div");
        pic.className = "augucationScreenshot";
        pic.style.backgroundImage = "url(resources/img/screenshots/" + getTotalIndex(t, a) + ".png)";
        augucation.appendChild(pic);

        // if video, add video symbol
        if (augucations[t][a][1])
        {
            var videoSymbol = document.createElement("div");
            videoSymbol.className = "videoSymbol";
            pic.appendChild(videoSymbol);
        }

        // add title and link container
        var augucationInfo = document.createElement("div");
        augucationInfo.className = "augucationInfo";
        augucation.appendChild(augucationInfo);

        // add title
        var augucationTitle = document.createElement("div");
        augucationTitle.innerHTML = augucations[t][a][0];
        augucationTitle.className = "augucationTitle";
        augucationInfo.appendChild(augucationTitle);

        // add link
        let augucationLink = document.createElement("div");
        augucationLink.innerHTML = "augucation.github.io/list.html?" + getTotalIndex(t, a);  // TODO remove "list.html"
        augucationLink.className = "augucationLink augucationLinkHidden";
        augucationLink.Id = "link" + getTotalIndex(t, a);
        augucationInfo.appendChild(augucationLink);

        // add copy symbol
        let copySymbol = document.createElement("div");
        copySymbol.className = "copySymbol copySymbolHidden";
        augucationLink.appendChild(copySymbol);

        let copyNotification = document.createElement("div");
        copyNotification.className = "copyNotification copyNotificationHidden";
        copyNotification.innerHTML = "Link kopieren";
        copySymbol.appendChild(copyNotification);

        // add click listener to augucation link -> copy link
        copySymbol.addEventListener("click", function(e) {
            setClipboardText("augucation.github.io/list.html?" + getTotalIndex(t, a)); // TODO remove "list.html"

            copyNotification.innerHTML = "Link kopiert";
            // let notification dissappear after 1 second
            setTimeout(function ()
            {
                copyNotification.classList.add("copyNotificationHidden");
            }, 1000);

            copySymbol.classList.add("copySymbolDark");
            augucationLink.classList.remove("augucationLinkHighlighted");
        });

        // add hover listener to copySymbol to highlight augucation link
        copySymbol.addEventListener("mouseover",function (e){
            augucationLink.classList.add("augucationLinkHighlighted");
            copyNotification.innerHTML = "Link kopieren";
            copyNotification.classList.remove("copyNotificationHidden");
            copySymbol.classList.add("copySymbolDark");
        });
        copySymbol.addEventListener("mouseout",function (){
            augucationLink.classList.remove("augucationLinkHighlighted");
            copyNotification.classList.add("copyNotificationHidden");
            copySymbol.classList.remove("copySymbolDark");
        });

        // add hover listener to augucation container to show augucation link and copy symbol
        augucationContainer.addEventListener("mouseover", function ()
        {
            augucationLink.classList.remove("augucationLinkHidden");
            copySymbol.classList.remove("copySymbolHidden");
        });
        augucationContainer.addEventListener("mouseout", function ()
        {
            augucationLink.classList.add("augucationLinkHidden");
            copySymbol.classList.add("copySymbolHidden");
        });

        // add a sepratation line below the augucation except for the last one
        var sepLine = document.createElement("div");
        sepLine.className = "separationLine";
        if (a < augucations[t].length) innerContainer.appendChild(sepLine);

        // add line break
        innerContainer.appendChild(document.createElement("br"));

        // add augucation to section
        augucationContainer.appendChild(augucation);
        innerContainer.appendChild(augucationContainer);

        // add line break
        innerContainer.appendChild(document.createElement("br"));
    }

    container.appendChild(s);
}

function collapse (container, arrow)
{
    $(container).toggleClass("hiddenSection");
    $(arrow).toggleClass("collapsedCollapseArrow");
}

function openInteraction (num)
{
    n = num + 100; // haaaaaaaaacky hack
    window.location = "augucations/" + n + "/" + "interaction.html";
}
