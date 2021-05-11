$(document).ready(function(){
    sliding();
})

function sliding() {

    var inputLeft = document.getElementById("input-left");
    var inputRight = document.getElementById("input-right");

    var thumbLeft = document.querySelector(".slider > .thumb.left");
    var thumbRight = document.querySelector(".slider > .thumb.Right");
    var range = document.querySelector(".slider > .range");

    function setLeftValue() {
        var _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);
    
        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value));
    
        
    
        var percent = ((_this.value - min) / (max - min)) * 100;
    
        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";
       
    }

    inputLeft.addEventListener("input", setLeftValue);

}

