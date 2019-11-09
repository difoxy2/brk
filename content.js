chrome.runtime.sendMessage({todo:"highlightIcon"}); //Should highlight icon when url = youtube*, doesn't work
document.onload = getColorThenAssign();

var x = [];

//variables for video overlays
var overlayColor;
var borderColor;
var textColor;
var borderExitence;
var maxOpacity;

//variables for display box
var overlayColor_d;
var borderColor_d;
var textColor_d;
var borderExitence_d;

var tempStore = ""; //this is the current code typed
var globalOpacityValue = 1;

//async function. retrive style data from Chrome Storage API and update variables, then execute assign function. 
function getColorThenAssign(){
    chrome.storage.sync.get(['overlayColor','bordercolor','borderexistence','overlayColor_d','bordercolor_d','borderexistence_d','overlayTextColor','overlayTextColor_d','opacity10'], function(data){
            overlayColor = "#" + data.overlayColor;    
            console.log("overlay Color got is: " + overlayColor);
        
            borderColor = "#" + data.bordercolor;
            console.log("border Color got is: " + borderColor);
        
            textColor = "#" + data.overlayTextColor;    
            console.log("text Colorgot is: " + textColor);
        
            if(data.borderexistence){borderExitence = 'dashed';}else{borderExitence = 'none'};
            console.log("overlay border existence got is: " + borderExitence);
        
            overlayColor_d = "#" + data.overlayColor_d;    
            console.log("overlay Color_d got is: " + overlayColor_d);
        
            borderColor_d = "#" + data.bordercolor_d;
            console.log("border Color_d got is: " + borderColor_d);
        
            textColor_d = "#" + data.overlayTextColor_d;    
            console.log("text_d Colorgot is: " + textColor_d);
        
            if(data.borderexistence_d){borderExitence_d = 'solid';}else{borderExitence_d = 'none'};
            console.log("overlay border_d existence got is: " + borderExitence_d);
        
            maxOpacity = data.opacity10/10;
            console.log("maxOpacity got is: " + maxOpacity + " globalOpacityValue got is: " + globalOpacityValue);
        
            assign();
            });

}


//Assign code for links + place overlays on links + create/update style of displaybox
function assign() {
    globalOpacityValue = 1; //so whatever globalopacity users are on, they sill know they pressed the right key
    x =  document.getElementsByClassName("yt-simple-endpoint style-scope");
    console.log("x.length"+x.length);
    
    for (var i = 0; i < x.length; i++) {
            /*if there is overlays, delete them first, so you can update their styles and not infinitely appending them*/
        if(x[i].lastChild.className == "overlay"){
            x[i].removeChild(x[i].lastChild);
        }
        
            /*
            Overlay is created as: https://www.w3schools.com/howto/howto_css_image_overlay.asp
            According to the website, overlay must
            1. has its parent position = "relative"
            2. has its own position = "absolute"
            3. top, bottom, left, right = 0;
            4. be in the same container of its parent, in this case it's appended to its parent i.e. parent is the container
            */
        overlay = document.createElement("div");
		overlay.className = "overlay";
		overlay.style.opacity = globalOpacityValue;
		
        overlay.style.background = "turquoise"; //defult Overlay background Color
        overlay.style.background = rgbaGenerator(overlayColor.substring(1,7),maxOpacity);
        overlay.style.borderColor = "orange"; //defult Overlay border Color
        overlay.style.borderColor = borderColor;
        overlay.style.borderStyle = 'dashed' //defult Overlay border style. Note border style always = 'null' on the first time
        overlay.style.borderStyle = borderExitence;
        
        //Porperties for what it takes to be the overlay effect
        overlay.style.top =0;
		overlay.style.bottom =0;
		overlay.style.left =0; //comment this if you want the top strip effect
		overlay.style.right =0;
		overlay.style.position = "absolute";
        
        //overlay font color
        overlay.innerHTML = "<span style='color:"+textColor+"'>"+decToAB(i)+"</span>";
        overlay.style.fontSize = "1em";
        
		x[i].appendChild(overlay);
		x[i].style.position = "relative";
    }
    
if(!document.getElementById("dddisplayboxxx")){makeDisplayBox();}else{UpdateDisplayBox();} //create displaybox if not exist, update if exist
console.log('Standby!');
}

//not used now. async function. retrive opacity setting data from Chrome Storage API and update variables, then execute toggle function. 
function getOpacityThenToggle(){
    chrome.storage.sync.get(['opacity10'], function(data){
                
            maxOpacity = data.opacity10/10;
            console.log("maxOpacity got is: " + maxOpacity + " globalOpacityValue got is: " + globalOpacityValue);
        
            toggle();
            });

}

//opacity of overlays + displaybox = 0 if !0, !0 if 0
function toggle() {
	overlays = document.getElementsByClassName("overlay");
    
    if (globalOpacityValue == 0){
        globalOpacityValue = 1;
        document.getElementById("dddisplayboxxx").style.opacity = 1;
    }else{
        globalOpacityValue = 0;
        document.getElementById("dddisplayboxxx").style.opacity = 0;
    }
    console.log("globalOpacityValue: " + globalOpacityValue);
    
	for (i = 0; i< overlays.length; i++) {
        
        overlays[i].style.opacity = globalOpacityValue;
    }

    console.log("toggle routine done!");
    
}

//keypress events: brk funcrions
window.addEventListener('keypress', function (e) {
	a = e.keyCode;
	if(e.keyCode == 48||e.keyCode == 49){   //1 or 0
		tempStore += String.fromCharCode(a);tempStoreOnChangeArtificial();
    }else if(e.keyCode == 13){              //enter
		x[ABTodec(tempStore)].click();
		tempStore = "";tempStoreOnChangeArtificial();
        getColorThenAssign();
   		}else if(e.keyCode == 100){        //d for delete <--does not need del key? But del runs faster then assign when page is long
			tempStore = "";tempStoreOnChangeArtificial();
    		}else if(e.keyCode == 98){     //b for backspace
				tempStore = tempStore.slice(0, -1);tempStoreOnChangeArtificial();
    			}else if (e.keyCode == 116){ //t for toggle, async
					toggle();tempStoreOnChangeArtificial();
					}else if (e.keyCode == 114){ //r for assign, async
                    tempStore = "";
                    getColorThenAssign();
                    }
    document.activeElement.blur(); //takes back focus from the YouTube player, because there are hotkeys for the player same as ours
    
});

    /*
    This function is like a listener & listener function on the variable tempStore. Because there is no listener for variable changes in js
            --> !!! [[[Please manually place this function after wherever tempStore changes]]] !!! <--
    
    1. Calls UpdateDisplayBox function: Updates current typed code displayed to user
    2. Add underlines to part of link codes corresponding to tempStore, using regular expression
        ->this is done by adding <u></u> to the innerHTML, if you want other effects, you need to modify lots of codes in this function
    3. If link code does not match tempStore, overlay opacity = 0, using regular expression
    4. If link code == tempStore, the link gets its borderStyle thick + soild
    */
function tempStoreOnChangeArtificial(){
    console.log("value of tempStore is: " + tempStore);
    if(document.getElementById("dddisplayboxxx")){UpdateDisplayBox();}
    var concat = '^<span style="color:'+textColor+'">?' + tempStore;
    var regexp = new RegExp(concat);
    
    //replace part of innerHTML: >tempStore to ><u>tempStore</u>
    var concattwo = '">'+tempStore;
    var regtwo = new RegExp(concattwo);
    var appendto = '"><u>'+tempStore+'</u>';
    
    for (var i = 0; i < x.length; i++) {
        if(x[i].lastChild.className == "overlay"){
            x[i].lastChild.innerHTML = x[i].lastChild.innerHTML.replace("<u>", "").replace("</u>", "");
            
            if(!regexp.test(x[i].lastChild.innerHTML)){
                x[i].lastChild.style.opacity = 0;
                x[i].lastChild.style.borderWidth = "medium";      //no need if delete function is gone
                x[i].lastChild.style.borderStyle = borderExitence //no need if delete function is gone
            }else{
                x[i].lastChild.style.opacity = globalOpacityValue;
                x[i].lastChild.style.borderWidth = "medium";      //no need if delete function is gone
                x[i].lastChild.style.borderStyle = borderExitence;//no need if delete function is gone
                
                x[i].lastChild.innerHTML = x[i].lastChild.innerHTML.replace(regtwo,appendto);
                
                if(x[i].lastChild.innerHTML=='<span style="color:'+textColor+'"><u>' + tempStore + '</u></span>'){
                    x[i].lastChild.style.borderWidth = "thick";
                    x[i].lastChild.style.borderStyle = "solid";
                }
                
            }        
        }
    }
console.log("tempStoreOnChangeArtificial done!");
}

//create the display box: position = "fixed"
function makeDisplayBox(){
    dddisplayboxxx = document.createElement("div");
    //dddisplayboxxx.className = "overlay"; //display box don't have class "overlay", so its !0 opacity value can't be changed by user
    dddisplayboxxx.id = "dddisplayboxxx";
    
    dddisplayboxxx.style.position = "fixed";
    dddisplayboxxx.style.top = "60px";
    dddisplayboxxx.style.right = "2px";
    
    dddisplayboxxx.style.backgroundColor = "LightSteelBlue";//defult background Color
    dddisplayboxxx.style.backgroundColor = overlayColor_d;
    dddisplayboxxx.style.fontSize = "3vw";
    dddisplayboxxx.style.padding = "5px";
    dddisplayboxxx.style.zIndex = "10" //YouTube player has z-index: 9
    dddisplayboxxx.innerHTML = "<span style='color:"+textColor_d+"'>Current Code: "+tempStore+"</span>";
    document.body.appendChild(dddisplayboxxx);
    console.log("displaybox Created!");
}

function UpdateDisplayBox(){
    //update tempStore displayed
    document.getElementById("dddisplayboxxx").innerHTML = "<span style='color:"+textColor_d+"'>Current Code: "+tempStore+"</span>";
    
    //update display box styles
    dddisplayboxxx.style.backgroundColor = overlayColor_d;
    dddisplayboxxx.style.borderStyle = borderExitence_d;
    dddisplayboxxx.style.borderColor = borderColor_d;
    dddisplayboxxx.style.opacity = globalOpacityValue;
    console.log("displaybox Updated!");
}

//Background color should be in rgba, not using opacity to control transparancy, if not the innerHTML will inherit opacity
function rgbaGenerator (hexBGcolor,transparancy){
    var a = 'rgba(' + parseInt(hexBGcolor.substring(0,2), 16) + ", " + parseInt(hexBGcolor.substring(2,4), 16) + ", " + parseInt(hexBGcolor.substring(4,6), 16) + ", " + transparancy + ')';
    return a;
}

//function idOf(i) {
//    return (i >= 26 ? idOf((i / 26) - 1) : '') +  'abcdefghijklmnopqrstuvwxyz'[i % 26];
//}

function decToAB(i) {
    return (i >= 2 ? decToAB((i / 2 >> 0) - 1) : '') +  '01'[i % 2 >> 0];
}

function ABTodec(AB){
var b = 0;
	for(var i=0; i<AB.length; i++){
		b += Math.pow(2 , AB.length-i-1) * ('01'.indexOf(AB.slice(i,i+1))+1);
    }
	return b-1;
}