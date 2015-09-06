window.onload = function(){

//////////массивы с картинками
    var muzImage = [];
    var natureImage = [];
    var ostriiImage = [];
///////// конструктор фото ссылка на большое фото, маленькое фото и имя фото
    function FotoSait(srcBig, srcSmaill, nameFoto){
          this.srcBig = srcBig;
          this.scrSmaill = srcSmaill;
          this.nameFoto = nameFoto;    
    }
   
////////циклы для записи новых фото в массивы
    var howFotoMuz = 35;    
    for(var i = 1; i < howFotoMuz; i++){
       var srcS = "image/bigMuseu/smallMusImage/mus"+i+".JPG";
       var srcB = "image/bigMuseu/mus"+i+".JPG";
       var nFoto = "Музей фото - "+i;
       muzImage[i] = new FotoSait(srcB, srcS, nFoto);
         
    }
		var howFotoNat = 20;    
    for(var i = 1; i < howFotoMuz; i++){
       var srcS = "image/bigNature/smallNatureImage/istokNature"+i+".JPG";
       var srcB = "image/bigNature/istokNature"+i+".JPG";
       var nFoto = "Фото природы - "+i;
       natureImage[i] = new FotoSait(srcB, srcS, nFoto);               
    }
    
////////создаем фото маленькое с сылкой на большое
////////document.getElementById()
    
			 function showFoto(){
				 var scene = document.getElementById("scene").getElementsByTagName("img")[0] ;
				 scene.src = this;
				 scene.style.visibility = "visible"
				 
				 document.getElementById("scene").getElementsByTagName("button")[0].style.visibility = "visible"
				 document.getElementById("scene").getElementsByTagName("button")[0].onclick = stopFoto;
				  return false
			 }
			 
			 var geleriClass = document.getElementsByClassName("geleri");
			 for (var i = 0; i < geleriClass.length; i++) {
			 	var linksGaleri = geleriClass[i].getElementsByTagName("a");
			 	for (var j =0; j < linksGaleri.length; j++){
			 		linksGaleri[j].onclick =  showFoto;
			 			 }
			 
			 }
			
			 
			 
			
//////// подключение  события клик для 1 переключения фото на сцене
			document.getElementById("scene").getElementsByTagName("img")[0].onclick = browseFoto;
			
///////функ-я для просмотра фото на сцене
			function browseFoto(){
				var sceneImg = document.getElementById("scene").getElementsByTagName("img")[0];
				
				///определяем имя фото по src картинки
				var srcImage = sceneImg.src;
				var mass = srcImage.lastIndexOf(".");
				var mass2 = srcImage.lastIndexOf("/");
				var nameImage = srcImage.substring((mass), (mass2+1));
				var reg = nameImage.search(/\d\d?/);
				var imgName = nameImage.substring(0 ,reg)
				
				//ищем номер фото
				var nom = nameImage.substring(reg);				
				nom = nom * 1;//переводим в числовой тип номер фото
				//названия галерей чтобы знать сколько фото перебирать
				var geleri1 = "istokNature" ;
				var geleri2 = "mus";
				var geleri3 = "ost";
				
/////////////////перебор галереи природа
				if (geleri1== imgName) {
				 if (nom == 49 ) {
					 sceneImg.src = "image/bigNature/istokNature1.jpg";				    
				 }else{
				 	nom+=1;
					sceneImg.src = "image/bigNature/istokNature" + nom +".jpg";				      
				 }				  
				}else if (geleri2== imgName){//перебор галереи музей
					 if (nom == 35 ) {
						 sceneImg.src = "image/bigMuseu/mus1.JPG";				    
					 }else{
					 	nom+=1;
						sceneImg.src = "image/bigMuseu/mus" + nom +".JPG";				      
					 }
				}else if (geleri3== imgName){
//////////////////перебор галереи острий				 
				 if (nom == 15 ) {
					 sceneImg.src = "image/bigOstr/ost1.jpg";				    
				 }else{
				 	nom+=1;
					sceneImg.src = "image/bigOstr/ost" + nom +".jpg";				      
				 }				  
				}				 				  
			}
//////////////////////кнопка отключения показа фото
			document.getElementById("scene").getElementsByTagName("button")[0].onclick = stopFoto;
			
			function stopFoto(){
			 
			document.getElementById("scene").getElementsByTagName("img")[0].style.visibility = "hidden";
			 document.getElementById("scene").getElementsByTagName("button")[0].style.visibility = "hidden";
			}

/////////////////
      function noHiden(){
      var lincsnoHiden = document.getElementsByClassName("noHiden");
      
			  for (var i = 0 ; i < lincsnoHiden.length; i++){
			      lincsnoHiden[i].onclick = fonNoHiden;	
			      		
			  }			
			}
	    noHiden()
			///
			 function fonNoHiden(){
			  alert(this)
			  
			 }
			
}
	
