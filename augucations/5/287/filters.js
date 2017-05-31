
function Filter(name, mask, scale){
	this.name = name;
	this.mask = mask;
	this.scale = scale;
}

Filters = {};

Filters.Init = new Filter(
	"Voreinstellung",
	[
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0
	],
	1	
);

Filters.Blur0 = new Filter(

	"Schwacher Weichzeichner",
	[
		0, 0, 0, 0, 0,
		0, 1, 1, 1, 0,
		0, 1, 1, 1, 0,
		0, 1, 1, 1, 0,
		0, 0, 0, 0, 0
	],
	9
);		

Filters.Blur1 = new Filter(		
	
	"Starker Weichzeichner",
	[
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 
		1, 1, 1, 1, 1, 
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1
	],
	25
);

Filters.Sharp0 = new Filter(	
	
	"Schwacher Scharfzeichner",
	[
		0, 0, 0, 0, 0,
		0, 0, -1, 0, 0,
		0, -1, 5, -1, 0,
		0, 0, -1, 0, 0,
		0, 0, 0, 0, 0
	],
	1
);

Filters.Sharp1 = new Filter(	
	
	"Starker Scharfzeichner",
	[
		0, 0, 0, 0, 0,
		0, -1, -1, -1, 0,
		0, -1, 9, -1, 0,
		0, -1, -1, -1, 0,
		0, 0, 0, 0, 0
	],
	8
);

Filters.EdgeH = new Filter(
	
	"Horizontale Kanten",
	[
		0, 0, 0, 0, 0,
		0, -1, -2, -1, 0, 
		0, 0, 0, 0, 0,
		0, 1, 2, 1, 0,
		0, 0 ,0, 0, 0
	],
	8
);

Filters.EdgeV = new Filter(	
	
	"Vertikale Kanten",
	[
		0, 0, 0, 0, 0,
		0, -1, 0, 1, 0,
		0, -2, 0, 2, 0,
		0, -1, 0, 1, 0,
		0, 0, 0, 0, 0
	],
	1,
);
