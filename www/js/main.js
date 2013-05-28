/************************************ VARIABLES DE CONFIGURACION *******************************************************/

/************************************ server *******************************************************/
//var serviceURL = "http://terrazas.arrobacreativa.com/services/";
//var BASE_URL = "http://terrazas.arrobacreativa.com/";

/************************************ localhost *******************************************************/
var serviceURL = "http://localhost/paypal_mobile/services/";
var BASE_URL = "http://localhost/paypal_mobile/";

/************************************ EVENTOS *******************************************************/

//FORMULARIO CONTACTO
$('#formulario_contacto').live('pageshow', function(event, ui) {
    var parent = $('#formulario_contacto');
    
    parent.find('a.enviar').off('click').on("click", function(){
        enviarContacto();
    });
});

/************************************ FUNCTIONS *******************************************************/

//Enviamos el contacto
function enviarContacto(){
    var nombre = $.trim($("#form_contact").find("input#form_nombre").val());
    var telefono = $.trim($("#form_contact").find("input#form_telefono").val());
    var email = $.trim($("#form_contact").find("input#form_email").val());
    var comentario = $.trim($("#form_contact").find("textarea").val());
    
    if(nombre !="" && email !="" && comentario !=""){
        if(valEmail(email)){
            $(".ui-loader").show();
            $.post(serviceURL + 'pagar_paypal.php', $("#form_contact").serialize()).done(function(data) {
                $(".ui-loader").hide();
                document.getElementById("form_contact").reset();
                parent.window.location.href = data;
                //$(location).attr('href',data);
            });
        }else{
            alert("El email: " + email + ", no es correcto!!!!, por favor ingrese un email valido.");
        }
    }else{
        alert("Por favor ingrese todos los campos obligatorios!.");
    }
}