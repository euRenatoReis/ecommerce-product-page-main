


// funções: 
// cada botao do slider vai trocar o slide maior com sua respectiva imagem (ok) #
// as setas controlam a imagem                                             (ok) # 
// o slide maior ao ser clicado, abre uma outra tela com o slider aproximado (Ok) 
// no botao ajustar quantidade deve poder aumentar ou diminuir a quantidade de produtos (OK) #
// quando clicar no botao "adicionar ao cart" o item ser armazenado                    (ok) #
// se o carrinho for acessado mostrar o item, tendo a possibilidade de remove-lo se quiser (ok) # 
// quando os botoes do menu for cliclado, dar uma borda laranja na parte inferior  (OK) #

/*falta:   

   botao excluir pedido                                  (ok)  
   os portraiters e o slider estão desaninhados          (ok)
   as setas estão ruins                                  (ok)
   escurecer o fundo do slider aproximado                (ok)  
   slider portraiters não controlam o slider maior       (ok)
   botao que fecha o slider aproximado não fecha         (ok)
   o slide grande não está abrindo a tela zoom           
*/

const slidePequeno = document.querySelectorAll('.slide-pequeno');
const slidePortraiter = document.querySelector('.slidegrande-portraiter');

const setaRetornar = document.querySelector('.seta-voltar');
const setaAvancar = document.querySelector('.seta-avancar');

const zoomSlidesPequenos = document.querySelectorAll('.zoom-slide-pequeno');
const zoomSlideGrandePortraiter = document.querySelector('.zoom-slidegrande-portraiter');
const slideMaior = document.querySelector('.maior');

const btDiminuir = document.querySelector('.diminuir');
const btAcrescentar = document.querySelector('.acrescentar');
const quantidadeControle = document.querySelector('.quant')

const btCarrinho = document.querySelector('.carrinho-compras');
const telaPrincipal = document.querySelector('.tela-principal');

const botoesMenu = document.querySelectorAll('.bt-menu');

const adicionarCart = document.querySelector('.adicionar-cart');
const carrinhoPerfilDiv = document.querySelector('.carrinho-perfil');
const carrinhoCard = document.querySelector('.carrinho-card');
const conteudoPedido = document.querySelector('.conteudo-pedido');
const btCheckOut = document.querySelector('.checkout-bt')




var indiceAtual = 0;
var quantidadeProdutos = 0;



/* Quantidade De produtos */

btAcrescentar.addEventListener('click', () => {

    quantidadeProdutos++

    quantidadeControle.innerHTML = `<p>${quantidadeProdutos}</p>`


})


btDiminuir.addEventListener('click', () => {

    quantidadeProdutos--

    if (quantidadeProdutos < 0) {

        return quantidadeProdutos === 0
    }


})



/* carrinho de compras */


btCarrinho.addEventListener('click', () => {


    if (btCarrinho.classList.contains('ativo')) {

        btCarrinho.classList.remove('ativo')
        carrinhoCard.classList.remove('open')

    } else {

        btCarrinho.classList.add('ativo');

        carrinhoCard.classList.add('open')

        return
    }


})

adicionarCart.addEventListener('click', () => {

    if (quantidadeProdutos === 0) {

        return quantidadeProdutos === 1
    }


    btCarrinho.innerHTML = `<div class="esfera-notifi">${quantidadeProdutos}</div>`

    if (quantidadeProdutos > 0) {

        carrinhoPerfilDiv.innerHTML += `
        <div class="esfera-notifi">${quantidadeProdutos}</div>
        `
    }



    carrinhoCard.innerHTML = ` 
                                  <div class="title-div">
                                    <h4>Cart</h4>
                                  </div>
                                 <div class="conteudo-pedido">

                                  <img src="../images/image-product-1-thumbnail.jpg"> 
                                  <div class="pedido">
                                    <h4>Fall Limited Edition Sneakers</h4>
                                    <div class="custo">
                                      <p>$125,00 x${quantidadeProdutos}</p>
                                      <p class="total">${125 * quantidadeProdutos}</p>
                                    </div>
                                  </div>
                                 <input class="excluir-pedido" type="button"></input>

                                 </div>
                                 <input type="button" value="checkout" class="checkout-bt">
                              `
    const excluirBt = document.querySelector('.excluir-pedido');


    excluirBt.addEventListener('click', () => {

        carrinhoCard.innerHTML = `<div class="title-div">
                                    <h4>Cart</h4>
                                  </div>
                                  <div class="conteudo-pedido">
                                     <p>Your cart is empty.</p>
                                  </div>`

    })




})


/* botoes menu */

botoesMenu.forEach((btmenu) => {

    btmenu.addEventListener('click', () => {


        botoesMenu.forEach((botoes) => {

            botoes.classList.remove('select')

        })

        btmenu.classList.add('select');



    })

})


/* Slider Função: troca imagem maior com base na menor */

slidePequeno.forEach((slide, index) => {


    slide.addEventListener('click', () => {

        slidePortraiter.innerHTML = `
          
           <input class="slide-grande-${index} maior" alt="imagens do produto" type="button">
            
        `

        RemoveSelecionados()

        slide.classList.add('selected');

    })

    indiceAtual = index

})


// tela do slider


slidePortraiter.addEventListener('click', () => {

    const telaSlider = document.querySelector('.tela-slider');

    telaSlider.classList.add('aberto');

    const btSair = document.querySelector('.botao-sair');

    btSair.addEventListener('click', () => {

        telaSlider.classList.remove('aberto')

    })

})


// zoom slider


zoomSlidesPequenos.forEach((slide, index) => {



    slide.addEventListener('click', () => {

        zoomSlideGrandePortraiter.innerHTML = `
           <input class="seta-voltar" type="button">
           <input class="zoom-slide-grande-${index} zoom-maior" alt="imagens do produto" type="button">
           <input class="seta-avancar" type="button">
               
        `
        zoomSlidesPequenos.forEach((slide) => {

            slide.classList.remove('selected')
        })

        slide.classList.add('selected');

    })


})


// setas do slider


setaAvancar.addEventListener('click', () => {

    let zoomMaior = document.querySelector('.zoom-maior');


    if (indiceAtual > slidePequeno.length) {

        return (indiceAtual === 0)
    }

    zoomMaior.classList.remove(`zoom-slide-grande-${indiceAtual}`);
    zoomSlidesPequenos[indiceAtual].classList.remove('selected');


    indiceAtual = (indiceAtual + 1) % zoomSlidesPequenos.length


    zoomSlidesPequenos[indiceAtual].classList.add('selected');
    zoomMaior.classList.add(`zoom-slide-grande-${indiceAtual}`);


    RemoveSelecionados()

})

setaRetornar.addEventListener('click', () => {

    let zoomMaior = document.querySelector('.zoom-maior');

    


    if (indiceAtual < 0) {

        return (indiceAtual === slidePequeno.length)
    }


    zoomSlidesPequenos[indiceAtual].classList.remove('selected');
    zoomMaior.classList.remove(`zoom-slide-grande-${indiceAtual}`)


    indiceAtual = (indiceAtual - 1 + zoomSlidesPequenos.length) % zoomSlidesPequenos.length;


    zoomSlidesPequenos[indiceAtual].classList.add('selected');
    zoomMaior.classList.add(`zoom-slide-grande-${indiceAtual}`);

    RemoveSelecionados()

    zoomSlidesPequenos[indiceAtual].classList.add('selected');

    zoomSlidesPequenos.indexOf(zoomSlidesPequenos[indiceAtual].classList.add('selected'))

})





//fuções

function RemoveSelecionados() {

    slidePequeno.forEach((slide) => {

        slide.classList.remove('selected')
    })
}








