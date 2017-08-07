var topics =
[
    "Signale",
    "Audio",
    "Bilder",
    "Video",
    "Internet"
];

var augucations =
[

	// topic 1: Signale
    [
    	["Analoge Signale", 0],
    	["Diskretisierung und Quantisierung", 0],
    	["Fouriertransformation", 0],
    	["Abtasttheorem", 0],
    	["Lauflängenkodierung", 0],
    	["Lempel Ziv Welch", 1],
    ],

    // topic 2: Audio
    [
    	["Audio-Experiment mit Wasser", 1],
    	["Hörbares Spektrum", 1],
    	["Lautstärke", 0],
    	["Psychoakustik", 0],
    	["Der Prozess des Hörens", 1],
    	["Virtual Barber Shop", 1],
        ["PCM und DPCM", 0],
        ["Klangqualität", 0],
    	["Maskierung", 0],
    	["Frequenz-Filter", 0],
    	["Interferenzen: Konstruktiv und Dekonstruktiv", 0],
    	["Interferenzen: Schwebung", 0],
    	["Phasenverschiebung", 0],
    	["Autotune Remix", 1],
    	["No Autotune", 1],
    	["Loudness War", 1],
    	["Hall", 1],
    ],

	// topic 3: Bilder
    [
    	["Absorption", 0],
    	["DCT", 0],
    	["Histogrammausgleich", 0],
    	["Filter", 0],
    ],

    // topic 4: Video
    [
    	["The Muybridge Movement Movie", 1],
    	["Scheinbewegung", 0],
    	["Bewegungsillusion", 1],
    	["Zeilensprungverfahren", 1],
    	["Kontinuitätsfehler", 1],
    	["Räumliche Kontinuität", 1],
    	["L-Schnitt und J-Schnitt", 1],
    	["Effekte", 1],
    ],

	// topic 5: Internet
    [
    	["XML", 0],
    	["CSS", 0],
    	["HTML und JS", 0],
    ],
];

function getTotalIndex(topic, num)
{
    var idx = 0;

    for (var i = 0; i < topic; i++)
    {
        idx += augucations[i].length;
    }

    idx += num;

    return idx;
}
