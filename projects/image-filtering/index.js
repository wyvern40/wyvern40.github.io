// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
    render($("#display"), image);
    $("#apply").on("click", applyAndRender);
    $("#reset").on("click", resetAndRender);
  });
  
  /////////////////////////////////////////////////////////
  //////// variable declaration for optimization //////////
  /////////////////////////////////////////////////////////
  
  var rgbString;
  var rgbNumbers;
  var bgColor;
  var rgbStringDir;
  var rgbNumbersDir;
  
  /////////////////////////////////////////////////////////
  //////// event handler functions are below here /////////
  /////////////////////////////////////////////////////////
  
  // this function resets the image to its original value; do not change this function
  function resetAndRender() {
    reset();
    render($("#display"), image);
  }
  
  // this function applies the filters to the image and is where you should call
  // all of your apply functions
  function applyAndRender() {
    // Multiple TODOs: Call your apply function(s) here
    if($('#background').val() === "dontUseBackground") {
      if($('#functions').val() === "reddify") {
        applyFilterNoBackground(reddify);
      } else if($('#functions').val() === "decreaseBlue") {
        applyFilterNoBackground(decreaseBlue);
      } else if($('#functions').val() === "increaseGreenByBlue"){
        applyFilterNoBackground(increaseGreenByBlue);
      } else {
        smudge(0, -1);
      }
    } else {
      if($('#functions').val() === "reddify") {
        applyFilter(reddify);
      } else if($('#functions').val() === "decreaseBlue") {
        applyFilter(decreaseBlue);
      } else if($('#functions').val() === "increaseGreenByBlue"){
        applyFilter(increaseGreenByBlue);
      } else {
        smudge(0, -1);
      }
    }
    // do not change the below line of code
    render($("#display"), image);
  }
  
  /////////////////////////////////////////////////////////
  // "apply" and "filter" functions should go below here //
  /////////////////////////////////////////////////////////
  
  // TODO 1, 2 & 4: Create the applyFilter function here
  function applyFilter(filterFunction) {
    for(var y = 0; y < image.length; y++) {
      for(var x = 0; x < image[y].length; x++) {
        rgbString = image[y][x];
        rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[y][x] = rgbString;
      }
    }
  }
  
  // TODO 7: Create the applyFilterNoBackground function
  function applyFilterNoBackground(filterFunction) {
    bgColor = image[0][0];
    for(var y = 0; y < image.length; y++) {
      for(var x = 0; x < image[y].length; x++) {
        rgbString = image[y][x];
        if(rgbString != bgColor) {
          rgbNumbers = rgbStringToArray(rgbString);
          filterFunction(rgbNumbers);
          rgbString = rgbArrayToString(rgbNumbers);
          image[y][x] = rgbString;
        }
      }
    }
  }
  
  function smudge(xDir, yDir) {
    for(var y = 0; y < image.length; y++) {
      for(var x = 0; x < image[y].length; x++) {
        rgbString = image[y][x];
        if(image[y - yDir] == undefined) {
          rgbStringDir = image[0][0];
        } else {
          if(image[y - yDir][x - xDir] == undefined) {
            rgbStringDir = image[0][0];
          } else {
            rgbStringDir = image[y - yDir][x - xDir];
          }
        }
        rgbNumbers = rgbStringToArray(rgbString);
        rgbNumbersDir = rgbStringToArray(rgbStringDir);
        rgbNumbers[RED] = (rgbNumbers[RED] + rgbNumbersDir[RED]) / 2;
        rgbNumbers[BLUE] = (rgbNumbers[BLUE] + rgbNumbersDir[BLUE]) / 2;
        rgbNumbers[GREEN] = (rgbNumbers[GREEN] + rgbNumbersDir[GREEN]) / 2;
        rgbString = rgbArrayToString(rgbNumbers);
        image[y][x] = rgbString;
      }
    }
  }
  // TODO 5: Create the keepInBounds function
  function keepInBounds(rgbValue) {
    return rgbValue < 0 ? 0 : rgbValue > 255 ? 255 : rgbValue;
  }
  
  // TODO 3: Create reddify function
  function reddify(color) {
    color[RED] = 200; 
  }
  
  // TODO 6: Create more filter functions
  function decreaseBlue(color) {
    color[BLUE] = keepInBounds(color[BLUE] - 50);
  }
  
  function increaseGreenByBlue(color) {
    color[GREEN] = keepInBounds(color[GREEN] + color[BLUE]);
  }
  
  // CHALLENGE code goes below here