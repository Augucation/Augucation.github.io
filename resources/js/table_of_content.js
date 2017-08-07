var container = document.getElementById("tocContainer");

var section = document.createElement("div");
section.className = "section";

let augucationIdx = 0;

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
        var augucationContainer = document.createElement("div");
        augucationContainer.className = "augucationContainer";

        augucationContainer.addEventListener("click", function() {
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

        // add title
        var augucationTitle = document.createElement("div");
        augucationTitle.innerHTML = augucations[t][a][0];
        augucationTitle.className = "augucationTitle";
        augucation.appendChild(augucationTitle);

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

        augucationIdx++;
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
