$(document).ready(function(){
    $.ajax({
        async:false, dataType:"json",
        url:"static/js/data/OUTDOORS-01_29_2021.json",
        success: function(data){
            dashboard(data);
        }
    });
});

function dashboard (data) {
    const db = document.getElementById("dashboard");

    var result = $("#dashboard").width();

    console.log(db);
    console.log(result);
}