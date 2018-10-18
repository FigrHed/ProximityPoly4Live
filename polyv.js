
var numVoices = 0;
var limit = 3;
var voices;


function voice(pitch,velocity) {
	this.pitch = pitch;
	this.velocity = velocity;
    this.printOut = function() {
        return "pitch: " + this.pitch + " Velocity: " + this.velocity;
    }
}

init();



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
        outlet(i,voices[i].pitch,voices[i].velocity);
    }
    post("hey" + voices[0].pitch);
    init();
    
    numVoices = 0;
}

function assign(voiCe){
			var min;
			var closestVoice = 0;
			var distances = [];
			var dist;
			min = 100;

            //finds the closest active voice
			for(i=0;i<limit;i++){
                if(voices[i] != null){
                    //post(voices[i][voices[]i.length-1].pitch);
                    //post();
                    //dist = Math.abs(voiCe.pitch - voices[i].pitch);
                
                    dist = Math.abs(voices[i][voices[i].length-1].pitch - voiCe.pitch);
                
                    //post("dist: " + dist);
                    //post();
                    if(!isNaN(dist)){
                        distances.push(dist);
				
                        if(distances[i] < min){
                            min = dist;
                            closestVoice = i;
                        }
                    }
				}
			}
			//post("Closest Voice: " + closestVoice);
			//post();
			//post("Minimum: " + min);
			//post();
			min = Math.min(distances);
            
			
            voices[closestVoice].push(voiCe);
			outlet(closestVoice,voiCe.pitch,voiCe.velocity);
            if(voices[closestVoice].length > 1){
                var turnOff = voices[closestVoice][voices[closestVoice].length-2]
                outlet(closestVoice,turnOff.pitch,0);
                //post("Turned off: " + turnOff.pitch);
                //post();
            }
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
			assign(voiCe);
			
		}	
	} else {
		//If note-off, remove from array
        post("the voices array before:");
        post();
		for(var i=0;i<limit;i++){
            
            for(var j=0;j<voices[i].length;j++){
			    post(j+" "+voices[i][j].pitch);
                post();
				if(voices[i][j].pitch == voiCe.pitch){
					
					
					if(voices[i]. length > 1 && j == voices[i].length -1){
                        outlet(i,voices[i][j-1].pitch,voices[i][j-1].velocity);
                    }
					outlet(i,voiCe.pitch,0);
					//post("Turned Off voice",i+1);
					//post();
				}
                voices[i] = voices[i].filter(function(item){
                        return item.pitch !== voiCe.pitch;
                });
			}
		}
        post("the voices array after:");
        post();
        for(var i=0;i<limit;i++){
            for(var j=0;j<voices[i].length;j++){
                post(j+" "+voices[i][j].pitch);
                post();
            }
        }
        numVoices--;
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
    //post("voice1: " + voices[0].pitch);
	//post();
}
