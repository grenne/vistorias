/* Funcion��rio Detalhes */
$(document).ready(function() { 
	localStorage.urlServidor = window.location.hostname;
    executaLogin(localStorage.urlServidor, localStorage.usuario, localStorage.senha);
    iniciaSnapper();
    iniciaAcoes();
	$("#btn-nav-right").bind( "click", function(event, ui) {
		window.mySwipe.next();
	});
	$("#btn-nav-left").bind( "click", function(event, ui) {
		window.mySwipe.prev();
	});    
});

/* Utilizada biblioteca Swipe.js: http://swipejs.com/ */
function iniciaAcoes() {
    var elem = document.getElementById('swipe-acoes');
    window.mySwipe = Swipe(elem, {
		startSlide: 0,
		// auto: 3000,
		// continuous: true,
		// disableScroll: true,
		// stopPropagation: true,
		callback: function(index, element) {
			if(index == 0) {
				$('.titulo-pagina').html('Vistoriador');
			} else if (index == 1) {
				$('.titulo-pagina').html('Distribuidor');
			} else if (index == 2) {
				$('.titulo-pagina').html('Administrador');
			} else if (index == 3) {
				$('.titulo-pagina').html('');
			}
		}
		// transitionEnd: function(index, element) {}
    });
    
    $(document).keydown(function(e){
        if (e.keyCode == 39) { 
           window.mySwipe.next();
           return false;
        } else if (e.keyCode == 37) { 
           window.mySwipe.prev();
           return false;
        }
    }); 
    
}

/* Utilizada biblioteca Snap.js: https://github.com/jakiestfu/Snap.js/ */
function iniciaSnapper() {
    var snapper = new Snap({
        element: document.getElementById('conteudo-geral'),
        dragger: document.getElementById('cabecalho-detalhes')
    });  
    
    snapper.on('animated', function() {
        var estado = snapper.state().state;

    });
    
    $('.snap-drawer').on('click', '.fecha-snapper', function () {
        snapper.close();
    });
}
