/************************************ VARIABLES DE CONFIGURACION *******************************************************/

/************************************ server *******************************************************/
var serviceURL = "http://patrocinalos.com/services/";
var BASE_URL = "http://patrocinalos.com/";

/************************************ localhost *******************************************************/
//var serviceURL = "http://localhost/paypal_mobile/services/";
//var BASE_URL = "http://localhost/paypal_mobile/";

/************************************ EVENTOS *******************************************************/

//FORMULARIO CONTACTO
$('#formulario').live('pageshow', function(event, ui) {
    var parent = $('#formulario');
    
    parent.find('a.enviar').off('click').on("click", function(){
        pagar();
    });
});

/************************************ FUNCTIONS *******************************************************/

//Enviamos el contacto
function pagar(){
    var precio = $.trim($("#form_contact").find("input#form_precio").val());
    var cantidad = $.trim($("#form_contact").find("input#form_cantidad").val());
    
    if(precio !="" && cantidad !=""){
        $(".ui-loader").show();
        $.post(serviceURL + 'pagar_paypal.php', $("#form_contact").serialize()).done(function(res) {
            $(".ui-loader").hide();
            document.getElementById("form_contact").reset();
            
            //$.mobile.changePage('#page2');
            //jQuery("#formulario").find("a#redirect_to_paypal").attr("href", res);
            //REDIRECCIONAMOS AL PAYPAL
            //console.log(res);
            //window.location = res;
            alert(res);
            window.plugins.childBrowser.showWebPage('http://www.google.com',{ showLocationBar: true });
			//window.plugins.childBrowser.showWebPage(res, { showLocationBar : false }); // This opens the Twitter authorization / sign in page
			//window.plugins.childBrowser.onLocationChange = function(loc){ locationChange(loc); }; // When the ChildBrowser URL changes we need to track that
        });
    }else{
        alert("Por favor ingrese todos los campos obligatorios!.");
    }
}

function locationChange(loc){
    alert(loc);
}