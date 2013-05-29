/************************************ VARIABLES DE CONFIGURACION *******************************************************/

/************************************ server *******************************************************/
var serviceURL = "http://terrazas.arrobacreativa.com/services/";
var BASE_URL = "http://terrazas.arrobacreativa.com/";

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
            jQuery("#formulario").find("a#redirect_to_paypal").attr("href", res);
            jQuery("#formulario").find("a#xxx").attr("href", res);
            jQuery("#form_contact2").attr("action", res);
            alert(res);
            jQuery("#form_contact2").submit();
            alert("salta");
            
            //redireccionamos
            //document.getElementById("redirect_to_paypal").click();
            
        });
    }else{
        alert("Por favor ingrese todos los campos obligatorios!.");
    }
}