window.onload = init;

function init() {

    var genBut = document.getElementById("generateButton"); //This and the next line set up the "generate" button click handler.
    genBut.onclick = generate;
    
    var clearBut = document.getElementById("clearButton"); //This and the next line set up the clear button click handler.
    clearBut.onclick = clear;
    
    var data = document.forms.data;                         //Getting the form  and using a for loop to set a click handler on each of the "box" divs to run the "display" function.
     box_inf = document.querySelectorAll(".boxes");


}
var Box = function (x,y,name,color, id) { //box object constructor. I use its properties to set the attributes of the divs when they are created.
    this.class = "box"
    this.id = id;
    this.x = x;  //this and the next line are it's location in space
    this.y = y;
    this.name = name;
    this.color = color;
 }

//These next two items, the boxes array and the counter variable will be used to store the objects so we can iterate over them and read their properties into the attributes of the divs later on. The counter will be used to ensure each div's id is unique.
var boxes = [];

var counter = 0;

function generate() {
    var sceneDiv = document.getElementById("scene");

    var nameTextArea = document.getElementById("name");
    var name = nameTextArea.value;
    if (name == null || name == ""){            //Checking to make sure there's a name input.
        alert("Please enter a name.");
      
       return;
    }

    var color_select = document.getElementById("color");
    var color_choice = color_select.options[color_select.selectedIndex];
    var color = color_choice.value;
    if (color == "null"){             //checking for a color choice input.
        alert("Please enter a color choice.");
        
        return;
    }

    var theForm = document.forms.data;     //this chunk gets the value of the selected radio button for the number of boxes. It works because only one radio button can be selected at a time.
    var number;
   
    numb_array = theForm.elements.amount;
   
    for (var i=0; i<numb_array.length;i++) {
        if (numb_array[i].checked){
            number = numb_array[i].value;
        }
    }

    if (isNaN(number) == true){          //checks to make sure there's a number choice selected.
        alert("Please enter a number.");
        return;
    }

    var int_numb = parseInt(number);      //This bit reads the number choice into a variable I will use to seed the coming while loop. Each iteration reads the value of int_numb into the id property of the box object.
    
    var pass_numb = int_numb;             //pass_numb is a variable that I use as a place holder to pass the value of int_numb through to the counter variable so that id numbers don't overlap.
    
    var id_token = "";

    while (int_numb > 0){
        var x = Math.floor(Math.random() * (sceneDiv.offsetWidth-101));
        
        var y = Math.floor(Math.random() * (sceneDiv.offsetHeight-101));
        
        id_token = (int_numb + counter)

            boxes.push(new Box(x,y,name,color,id_token));
            
            int_numb--;
    }

    for (var i=0;i<boxes.length;i++){
        
        var box_body = document.createElement("div");
        
        box_body.setAttribute("id", boxes[i].id);
        
        box_body.setAttribute("class", "box");
        
        box_body.setAttribute("name", boxes[i].name);
        
        box_body.style.left = boxes[i].x + "px";
        
        box_body.style.top = boxes[i].y + "px";
        
        box_body.style.backgroundColor = boxes[i].color;
        
        box_body.innerHTML = boxes[i].name;
        
        sceneDiv.appendChild(box_body);
        
        box_inf = document.querySelectorAll(".box");

    }

    for (var i=0; i<=box_inf.length-1;i++){
        
        box_inf[i].onclick = display;
    }

    boxes = [];
   
    document.forms.data.reset();
   
    counter += pass_numb;  // adds the initial number choice into counter so that if you add more boxes, their id numbers don't overlap. I think I could do this with one less variable, just pass_numb or counter but I would have to check the state of the page with an if-else type deal and it just seemed simpler this way.
}

function clear() {
    
    var data = document.forms.data;
    
    var sceneClear = document.querySelectorAll("div.box");

    for (var i = 0; i<sceneClear.length;i++){
    
        var out = sceneClear[i].parentElement;
    
        out.removeChild(sceneClear[i]);

    }
    
    document.forms.data.reset();
    
    pass_numb=0;
    
    counter=0;

}




function display(e) {
   
    var a = e.target;
    var raw_x = a.style.left;
    var a_x = raw_x.slice(0, raw_x.length-2);
    var nam = a.getAttribute("name");
    var raw_y = a.style.top;
    var a_y = raw_y.slice(0, raw_y.length-2);
    var b_col = a.style.backgroundColor;
    var this_id = a.getAttribute("id");
    alert("You clicked on a box with id \"" + this_id + "\" named \"" + nam + "\", whose color is " + b_col +", at position " + a_x +", " + a_y + ".");
    }





