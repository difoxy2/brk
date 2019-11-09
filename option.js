//Get starage data and change styles of input boxes/check box etc. e.g. check the checkboxes if it should be/background color of input box matching the value
chrome.storage.sync.get(['overlayColor','bordercolor','borderexistence','overlayColor_d','bordercolor_d','borderexistence_d','overlayTextColor','overlayTextColor_d','opacity10'], function(data){
    document.getElementById("overlaycolor").value = data.overlayColor;
    document.getElementById('overlaycolor').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.overlayColor);
    
    document.getElementById("bordercolor").value = data.bordercolor;
    document.getElementById('bordercolor').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.bordercolor);
    
    document.getElementById("textcolor").value = data.overlayTextColor;
    document.getElementById('textcolor').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.overlayTextColor);
    
    document.getElementById("overlaycolor").value = data.overlayColor;
    document.getElementById('overlaycolor').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.overlayColor);
    
    document.getElementById("borderexistence").checked = data.borderexistence;
    
    document.getElementById("overlaycolor_d").value = data.overlayColor_d;
    document.getElementById('overlaycolor_d').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.overlayColor_d);
    
    document.getElementById("bordercolor_d").value = data.bordercolor_d;
    document.getElementById('bordercolor_d').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.bordercolor_d);
    
    document.getElementById("textcolor_d").value = data.overlayTextColor_d;
    document.getElementById('textcolor_d').jscolor.valueElement.style.backgroundColor = HEX_rgb(data.overlayTextColor_d);
    
    document.getElementById("borderexistence_d").checked = data.borderexistence_d;
    
    document.getElementById("OverlayOpacityRange").value = data.opacity10;
    console.log(document.getElementById("OverlayOpacityRange").value);
    document.getElementById("slidebarvalue").innerHTML = "Overlay Opacity: " + data.opacity10/10;
});

//From here, is the listeners for all input fields. 1.Store data to Chrome Storage API 2.console log/debug what is stored
//function for overlaycolor
document.getElementById("overlaycolor").addEventListener("change", changeOverlayColor);
function changeOverlayColor(){
    
    var color = document.getElementById("overlaycolor").value;
                            
    chrome.storage.sync.set({'overlayColor': color});                        
                            
    chrome.storage.sync.get('overlayColor', function(data) {
        console.log(data.overlayColor);
    });   
};

//function for bordercolor
document.getElementById("bordercolor").addEventListener("change", changeBorderColor);
function changeBorderColor(){
    
    var color = document.getElementById("bordercolor").value;
                            
    chrome.storage.sync.set({'bordercolor': color});                        
                            
    chrome.storage.sync.get('bordercolor', function(data) {
        console.log(data.bordercolor);
    });    
};

//function for textcolor
document.getElementById("textcolor").addEventListener("change", changeTextColor);
function changeTextColor(){
    
    var color = document.getElementById("textcolor").value;
                            
    chrome.storage.sync.set({'overlayTextColor': color});                        
                            
    chrome.storage.sync.get('overlayTextColor', function(data) {
        console.log(data.overlayTextColor);
    });   
};

//function for borderexistence
document.getElementById("borderexistence").addEventListener("change", changeBorderExistence);
function changeBorderExistence(){
    
    var borderexistence = document.getElementById("borderexistence").checked;
                            
    chrome.storage.sync.set({'borderexistence': borderexistence});                        
                            
    chrome.storage.sync.get('borderexistence', function(data) {
        console.log(data.borderexistence);
    });    
};

//function for overlaycolor_d
document.getElementById("overlaycolor_d").addEventListener("change", changeOverlayColor_d);
function changeOverlayColor_d(){
    
    var color = document.getElementById("overlaycolor_d").value;
                            
    chrome.storage.sync.set({'overlayColor_d': color});                        
                            
    chrome.storage.sync.get('overlayColor_d', function(data) {
        console.log(data.overlayColor_d);
    });   
};


//function for bordercolor_d
document.getElementById("bordercolor_d").addEventListener("change", changeBorderColor_d);
function changeBorderColor_d(){
    
    var color = document.getElementById("bordercolor_d").value;
                            
    chrome.storage.sync.set({'bordercolor_d': color});                        
                            
    chrome.storage.sync.get('bordercolor_d', function(data) {
        console.log(data.bordercolor_d);
    });    
};

//function for textcolor_d
document.getElementById("textcolor_d").addEventListener("change", changeTextColor_d);
function changeTextColor_d(){
    
    var color = document.getElementById("textcolor_d").value;
                            
    chrome.storage.sync.set({'overlayTextColor_d': color});                        
                            
    chrome.storage.sync.get('overlayTextColor_d', function(data) {
        console.log(data.overlayTextColor_d);
    });   
};

//function for borderexistence_d
document.getElementById("borderexistence_d").addEventListener("change", changeBorderExistence_d);
function changeBorderExistence_d(){
    
    var borderexistence_d = document.getElementById("borderexistence_d").checked;
                            
    chrome.storage.sync.set({'borderexistence_d': borderexistence_d});                        
                            
    chrome.storage.sync.get('borderexistence_d', function(data) {
        console.log(data.borderexistence_d);
    });    
};

//function for Opacity slide bar
document.getElementById("OverlayOpacityRange").addEventListener("change", changeOverlayValue);
function changeOverlayValue(){
    
    var color = document.getElementById("OverlayOpacityRange").value;
    
    document.getElementById("slidebarvalue").innerHTML = "Overlay Opacity: " + color/10;
    
    chrome.storage.sync.set({'opacity10': color});                        
                            
    chrome.storage.sync.get('opacity10', function(data) {
        console.log(data.opacity10);
    });   
};

//changing Hex value to rgb value for jscolor background color auto update
function HEX_rgb (hex){
    var a = 'rgb(' + parseInt(hex.substring(0,2), 16) + ", " + parseInt(hex.substring(2,4), 16) + ", " + parseInt(hex.substring(4,6), 16) + ')';
    return a;
}