inlets = 1;
outlets = 3;

function voice(pitch,velocity){
	this.pitch = pitch;
	this.velocity = velocity;
}

//var voice1 = new voice(0,0);
//var voice2 = new voice(0,0);
//var voice3 = new voice(0,0);


//var voices1 = new Array();
//var voices2 = new Array();
//var voices3 = new Array();
var voices = [];
//var voices = [voices1,voices2,voices3];
var numVoices = 0;
var limit = 3;

function msg_int(maxVoices){
	limit = maxVoices;
}

function list(){
	a = arguments;
	var pitch = a[0];
	var velocity = a[1];
	var voiCe = new voice(pitch,velocity);
	//post("Current Pitch:",voiCe.pitch,"Current Velocity:",voiCe.velocity);
	//post();
	if(velocity > 0){
		numVoices++;
		for(i=0;i<3;i++){
			if (voices[i].length == 0){
				voices[i].push(voiCe);
				outlet(i,voiCe.pitch,voiCe.velocity,i+1);
				
				
				break;
			}
		}
		if(numVoices > 3){
			// assign based on proximity
			var min;
			var dist1 = Math.abs(voices[0][voices[0].length-1].pitch - voiCe.pitch);
			var dist2 = Math.abs(voices[1][voices[1].length-1].pitch - voiCe.pitch);
			var dist3 = Math.abs(voices[2][voices[2].length-1].pitch - voiCe.pitch);
			if(dist1 < dist2 && dist1 < dist2){
				min = dist1;
				voices[0].push(voiCe);
				outlet(0,voiCe.pitch,voiCe.velocity,1);
				//post("Turned on:",voiCe.pitch,"at",1);
				//post();
			} else if(dist2 < dist3){
				voices[1].push(voiCe);
				outlet(1,voiCe.pitch,voiCe.velocity,2);
				//post("Turned on:",voiCe.pitch,"at",2);
				//post();
			} else {
				voices[2].push(voiCe);
				outlet(2,voiCe.pitch,voiCe.velocity,3);
				//post("Turned on:",voiCe.pitch,"at",3);
				//post();
			}
		}		
	} else {
		numVoices--;
		for(i=0;i<3;i++){
			for(j=0;j<voices[i].length;j++){
				if(voices[i][j].pitch == voiCe.pitch){
					outlet(i,voiCe.pitch,0,i+1);
					voices[i].splice(j,1);
					
					
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
	//post("Number of Voices:",numVoices);
	//post();
}
