
var numVoices = 0;
var limit = 3;
var voices;
init();

function voice(pitch,velocity) {
	this.pitch = pitch;
	this.velocity = velocity;
    this.printOut = function() {
        return "pitch: " + this.pitch + " Velocity: " + this.velocity;
    }
}


function init(){
    inlets = 1;
    outlets = limit;
    numVoices = 0;
    //initiate voice array
    voices = [];
    for(i=0;i<limit;i++){
        voices.push(new Array());
    }
}

//Testing
//post();
//post(voices[0].print());


//reset all voices
function panic(){
    for(i=0;i<limit;i++){
        outlet(i,voices[i].pitch,voices[i].velocity,i+1);
    }

    init();
    
    numVoices = 0;
}

function assign(voiCe){
			var min;
			var closestVoice = 0;
			var distances = [];
			var dist;
			min = 100;


			for(i=0;i<limit;i++){
				dist = Math.abs(voices[i][voices[i].length-1].pitch - voiCe.pitch);
//				post("dist: " + dist);
//				post();
				distances.push(dist);
				
				if(distances[i] < min){
					min = dist;
					closestVoice = i;
					
				}
			}
//			post("Closest Voice: " + closestVoice);
//			post();
//			post("Minimum: " + min);
//			post();
			min = Math.min(distances);
			voices[closestVoice].push(voiCe);
			outlet(closestVoice,voiCe.pitch,voiCe.velocity);
//			post("Turned on:",voiCe.pitch,"at",1);
//			post();
}

function msg_int(maxVoices){
	limit = maxVoices;
    init();
}

function list(){
	a = arguments;
	var pitch = a[0];
	var velocity = a[1];
	var voiCe = new voice(pitch,velocity);
//	post("Current Pitch:",voiCe.pitch,"Current Velocity:",voiCe.velocity);
//	post();
	if(velocity > 0){
		numVoices++;

        //Add to earliest avaible spot in array.
		for(i=0;i<limit;i++){
			if (voices[i].length == 0){
				voices[i].push(voiCe);
				outlet(i,voiCe.pitch,voiCe.velocity,i+1);
				
				break;
			}
		}
        //if all spots are taken
		if(numVoices > limit){
			// assign based on proximity
//input: voiCe
			assign(voiCe);
			
		}	
	} else {
		//If note-off, remove from array
		for(i=0;i<limit;i++){
			for(j=0;j<voices[i].length;j++){
				if(voices[i][j].pitch == voiCe.pitch){
					outlet(i,voiCe.pitch,0,i+1);
					voices[i].splice(j,1);
					numVoices--;
					
					//post("Turned Off voice",i+1);
					//post();
				}
			}
		}
        
	}
//	for(i=0;i<3;i++){
//		post("Voices ",i+1,"length:",voices[i].length);
//		if(voices[i][0] != null){
//			post("Pitch:",voices[i][voices[i].length-1].pitch);
//		}
//		post();
//	}
	post("Number of Voices:",numVoices);
	post();
}
