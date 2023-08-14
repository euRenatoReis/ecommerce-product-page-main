


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

        console.log('fechou')

    } else {

        btCarrinho.classList.toggle('ativo');
        carrinhoCard.classList.toggle('open')

        console.log('abriu')
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

        indiceAtual = index;

        document.querySelector('.seta-voltar').addEventListener('click', AnteriorSlide)

        document.querySelector('.seta-avancar').addEventListener('click', PromixoSlide)


    })


})


// setas do slider


setaAvancar.addEventListener('click', PromixoSlide)

setaRetornar.addEventListener('click', AnteriorSlide)


//fuções

function RemoveSelecionados() {

    slidePequeno.forEach((slide) => {

        slide.classList.remove('selected')
    })
}

function RemoveSelecionadosZoom() {

    zoomSlidesPequenos.forEach((slide) => {

        slide.classList.remove('selected')
    })
}


//funções PARA as setas


function PromixoSlide() {

    let zoomMaior = document.querySelector('.zoom-maior');


    if (indiceAtual > zoomSlidesPequenos.length) {

        return (indiceAtual === 0)
    }

    zoomMaior.classList.remove(`zoom-slide-grande-${indiceAtual}`);
    zoomSlidesPequenos[indiceAtual].classList.remove('selected');


    indiceAtual = (indiceAtual + 1) % zoomSlidesPequenos.length


    zoomSlidesPequenos[indiceAtual].classList.add('selected');
    zoomMaior.classList.add(`zoom-slide-grande-${indiceAtual}`);

    RemoveSelecionadosZoom()

    zoomSlidesPequenos[indiceAtual].classList.add('selected');

    console.log('imprime')

}

function AnteriorSlide() {


    let zoomMaior = document.querySelector('.zoom-maior');

    if (indiceAtual < 0) {

        return (indiceAtual === slidePequeno.length)
    }


    zoomSlidesPequenos[indiceAtual].classList.remove('selected');
    zoomMaior.classList.remove(`zoom-slide-grande-${indiceAtual}`)


    indiceAtual = (indiceAtual - 1 + zoomSlidesPequenos.length) % zoomSlidesPequenos.length;


    zoomSlidesPequenos[indiceAtual].classList.add('selected');
    zoomMaior.classList.add(`zoom-slide-grande-${indiceAtual}`);

    RemoveSelecionadosZoom()

    zoomSlidesPequenos[indiceAtual].classList.add('selected');


    console.log('imprime')
}



// Funções no responsivo


if (window.matchMedia("(width: 375px)").matches) {


    const SetaMobileVoltar = document.querySelector('.seta-voltar-mobile');
    const SetaMobileAvancar = document.querySelector('.seta-avancar-mobile');
    const btMenuMobile = document.querySelector('.bt-menu-mobile');

    //slideMaior


    SetaMobileAvancar.addEventListener('click', () => {

        if (indiceAtual < 0) {

            return (indiceAtual === 4)
        }

        slideMaior.classList.remove(`slide-grande-${indiceAtual}`);

        indiceAtual = (indiceAtual + 1) % 4;

        slideMaior.classList.add(`slide-grande-${indiceAtual}`);


    })

    SetaMobileVoltar.addEventListener('click', () => {


        if (indiceAtual > 4) {

            return (indiceAtual === 0)
        }

        slideMaior.classList.remove(`slide-grande-${indiceAtual}`);

        indiceAtual = (indiceAtual - 1 + 4) % 4;

        slideMaior.classList.add(`slide-grande-${indiceAtual}`);

    })


    btMenuMobile.addEventListener('click', () => {



        btMenuMobile.classList.add('aberto');

        telaPrincipal.innerHTML += `
            
            <div class="menu-mobile"> 
              

             <div>
             <input class="botao-fechar-menu" type="button">
              <input class="bt-menu" value="Collections" type="button">
              <input class="bt-menu" value="Men" type="button">
              <input class="bt-menu" value="Women" type="button">
              <input class="bt-menu" value="About" type="button">
              <input class="bt-menu" value="Contact" type="button">
             </div>
            </div>
        
            `

        const botaoFecharMenu = document.querySelector('.botao-fechar-menu');

        botaoFecharMenu.addEventListener('click', () => {

            btMenuMobile.classList.remove('aberto');

            document.querySelector('.menu-mobile').remove();

        })

    })

}
