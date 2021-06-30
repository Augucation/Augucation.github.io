var topics =
[
    "Signale",
    "Audio",
    "Bilder",
    "Video",
    "Internet",
    "3D-Vektorgrafiken",
	"Computergrafik"
];

var augucations =
[

	// topic 1: Signale
    [
    	["Analoge Signale", 0, 0],
    	["Diskretisierung und Quantisierung", 0, 1],
    	["Fouriertransformation", 0, 2],
    	["Abtasttheorem", 0, 3],
    	["Lauflängenkodierung", 0, 4],
    	["Lempel Ziv Welch", 1, 5],
    ],

    // topic 2: Audio
    [
    	["Audio-Experiment mit Wasser", 1, 6],
		["Hörbares Spektrum", 1, 7],
		["Lautstärke", 0, 8],
		["Psychoakustik", 0, 9],
    	["Der Prozess des Hörens", 1, 10],
    	["Virtual Barber Shop", 1, 11],
        ["PCM und DPCM", 0, 12],
        ["Klangqualität", 0, 13],
    	["Maskierung", 0, 14],
    	["Frequenz-Filter", 0, 15],
    	["Interferenzen: Konstruktiv und Dekonstruktiv", 0, 16],
    	["Interferenzen: Schwebung", 0, 17],
    	["Phasenverschiebung", 0, 18],
    	["Autotune Remix", 1, 19],
    	["No Autotune", 1, 20],
    	["Loudness War", 1, 21],
    	["Hall", 1, 22],
    ],

	// topic 3: Bilder
    [
    	["Absorption", 0, 23],
    	["DCT", 0, 24],
    	["Histogrammausgleich", 0, 25],
    	["Filter", 0, 26],
    ],

    // topic 4: Video
    [
    	["The Muybridge Movement Movie", 1, 27],
    	["Scheinbewegung", 0, 28],
    	["Bewegungsillusion", 1, 29],
    	["Zeilensprungverfahren", 1, 30],
    	["Kontinuitätsfehler", 1, 31],
    	["Räumliche Kontinuität", 1, 32],
    	["L-Schnitt und J-Schnitt", 1, 33],
    	["Effekte", 1, 34],
    ],

	// topic 5: Internet
    [
    	["XML", 0, 35],
    	["CSS", 0, 36],
    	["HTML und JS", 0, 37],
    ],

    // topic 6: 3D-Vektorgrafiken
    [
        ["Transformationskomposition", 0, 38]
    ],

	// topic 7: Computergrafik
	[
		["Bresenham-Algorithmus", 0, 39],
		["Scanline-Algorithmus", 0, 40],
		["Frustum", 0, 41],
		["Line-Clipping", 0, 43],
		["Komposition", 0, 44]
	]
];

function getTotalIndex(topic, num)
{
	/*
    var idx = 0;

    for (var i = 0; i < topic; i++)
    {
        idx += augucations[i].length;
    }

    idx += num;

    return idx;
    */

	return augucations[topic][num][2];
}

function CloseAugucation()
{
    window.location = "../../list.html";
}
