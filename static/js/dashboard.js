var SwitchState = 0;

$(document).ready(function(){
    $.ajax({
        async:false, dataType:"json",
        url:"static/js/data/OUTDOORS-01_29_2021.json",
        success: function(data){
            dashboard(data);
        }
    });

});

function DashboardSwitch () {
    if (SwitchState) {
        $("#dashboard").hide();
        SwitchState = 0;
    } else {
        $("#dashboard").show()
        SwitchState = 1;
    }
    
}

function dashboard (data) {
    const db = document.getElementById("dashboard");

    var result = $("#dashboard").width();

    console.log(db);
    console.log(result);
}