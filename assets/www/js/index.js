/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//VARIABLES
 var linkLocation;
 var id;
 var nombre;
 var descri;
 var precio;
 var imagen;
 var par=0;
 var div_siguiente=0;
 var tabla=1;
 var variable;
 var N_Cartas=4;
 
 
 $(document).ready(function() {
	 
	 
	 $('button.atras').click(function () {

		 div_siguiente--;
		 if(div_siguiente>=0){
			 $('#base').scrollTo('#item'+div_siguiente,1000);
		 }
		 
		 if(div_siguiente==0){
			  document.getElementById('entrantes').style.display="inline";	
			  document.getElementById('primeros').style.display="inline";	
			  document.getElementById('segundos').style.display="inline";	
			  document.getElementById('postres').style.display="inline";	
				 
			  document.getElementById('atras').style.display="none";			 
			  document.getElementById('adelante').style.display="none";
			  document.getElementById('menu').style.display="none";
		 }
		 
		 if(div_siguiente<0)
			 div_siguiente=0;
	 });
	 
	 $('button.menu').click(function () {

		 div_siguiente=0;
		 $('#base').scrollTo('#item0',1000);
		 
		  document.getElementById('entrantes').style.display="inline";	
		  document.getElementById('primeros').style.display="inline";	
		  document.getElementById('segundos').style.display="inline";	
		  document.getElementById('postres').style.display="inline";	
			 
		  document.getElementById('atras').style.display="none";			 
		  document.getElementById('adelante').style.display="none";
		  document.getElementById('menu').style.display="none";
		 
	 });
	 
	 $('button.adelante').click(function () {

		 div_siguiente++;
		 
		 
		 if(div_siguiente<5){
			 $('#base').scrollTo('#item'+div_siguiente,1000);
		 }
		 
		 else div_siguiente=4;
		 
	 });
		 
	  $('button.menu_botones').click(function () {

		  document.getElementById('entrantes').style.display="none";	
		  document.getElementById('primeros').style.display="none";	
		  document.getElementById('segundos').style.display="none";	
		  document.getElementById('postres').style.display="none";	
			 
		  document.getElementById('atras').style.display="inline";			 
		  document.getElementById('adelante').style.display="inline";
		  document.getElementById('menu').style.display="inline";
			 
		  $('#base').scrollTo('#item'+$(this).attr('value'), 800); 		  
		  div_siguiente=$(this).attr('value');
				 		 
	 });
	 
	 $(window).resize(function () {
		resizePanel();
	 });
	 
     document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    

	 });
 
 	function resizePanel() {
		 width = $(window).width();
		 height = $(window).height();
		 mask_width = width * $('.item').length;
		 $('#debug').html(width + ' ' + height + ' ' + mask_width);
		 $('#base, .item').css({width: width, height: height});
		 $('#mask').css({width: mask_width, height: height});
		 $('#base').scrollTo($('button.atras').attr('#item2'), 0);
		 // ALGO RARO AQUI
	 } 

   
    function onBodyLoad(){   	

	    obtenerDatos(tabla);
    }
    
    function addNewRow()
    {
      var TABLE = document.getElementById("listado"+variable);
      var TROW = document.getElementById("fila");
      var content = TROW.getElementsByTagName("td");
      var newRow = TABLE.insertRow(-1);
      
      if(par=='1'){
      	newRow.style.background = "#E2BB68";
      	par--;
      }
      
      else
      	par++;
      	     
      newRow.innerHTML = nombre;     
      newRow.value = variable;
      newRow.idName=id;
      
      newRow.onclick=function(){Cargar_valores(newRow.idName,newRow.value);}
    }
    
    
       
    function obtenerDatos(tabla) {
    	
        	variable=tabla;
        	$.ajax({
	            url: 'http://kaiharo.16mb.com/catalogo.php?tipo=listado'+tabla,
	            dataType: 'jsonp',
	            jsonp: 'jsoncallback',
	            type:'get',
	            timeout: 1000,
	            success: function(data/*, status*/){
	                $.each(data, function(i,item){	              	  
	              	  	var celda = document.getElementById(i);
	              	  	id = item.id;
	              	  	nombre = '<h2>'+item.nombre+'</h2>';
	              	  	
	              	  	addNewRow();
	                	}); 
		            },
	            error: function(){
	            },
		        complete: function(){
		        	
		        	if(tabla<N_Cartas){
		        		tabla++;
		        		obtenerDatos(tabla);
		        	}
		        	
		        }
	        });          	  	


    }
    
    function Cargar_valores(id_elemento,tabla){

        $.ajax({
            url: 'http://kaiharo.16mb.com/atributos.php?tipo=listado'+tabla+"&busqueda="+id_elemento,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){
                	prueba="imagen"+tabla;
                	img="img"+tabla;
                	text="text"+tabla;
                	precio="precio"+tabla;
                	document.getElementById(prueba).className = 'ocultar';
               	
                	setTimeout(function(){document.getElementById(img).innerHTML = "<img id='imagen"+tabla+"'class='novisible' src=./img/listado"+tabla+"/"+item.imagen+" height='100' width='130'>";},500);
              	  	document.getElementById(text).innerHTML = "<h3>"+item.descripcion+"</h3>";
              	  	document.getElementById(precio).innerHTML = "<h4>"+"Precio: "+item.precio+" €"+"</h4>";

     	  	
                	setTimeout(function(){document.getElementById(prueba).className = 'visible'},600);
                });
            },
            error: function(){
            }
        
        });
    }
    