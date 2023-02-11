function hide(boton,target){
	SSFramework.initTimeout();
    $(boton).on("click", function() {
        $(target).fadeOut();
    });
}

function show(boton,target){
	SSFramework.initTimeout();
    $(boton).on("click", function() {
        $(target).fadeIn();
    });
}
