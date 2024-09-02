const palco=document.getElementById('palco')
const num_objetos=document.getElementById('num_objetos')
const txt_qtde=document.getElementById('txt_qtde')
const btn_add=document.getElementById('btn_add')
const btn_remover=document.getElementById('btn_remover')

let larguraPalco=palco.offsetWidth//pega o tamanho do comprimento do palco
let alturaPalco=palco.offsetHeight//pega o tamanho da altura do palco
let bolas=[]
let numBola=0

class Bola{
    constructor(arrayBolas,palco){
        this.tam=Math.floor(Math.random()*15)+10,//tamanho aleatório da bola de 10 a 25. floor arredonda o valor e random gera numero aleatório de 0 a 1
        this.r=Math.floor(Math.random()*255),//cor r(g e b abaixo) para escolher uma cor aleatória para bola
        this.g=Math.floor(Math.random()*255),
        this.b=Math.floor(Math.random()*255),
        this.px=Math.floor(Math.random()*(larguraPalco-this.tam)),//posição aleatoria x(comprimento) onde a bola vai nascer de tamanho igual a largura do palco menos o tamanho da bolinha para não nascer fora da tela
        this.py=Math.floor(Math.random()*(alturaPalco-this.tam)),//altura da bolinha
        this.velx=Math.floor(Math.random()*2)+0.5,
        this.vely=Math.floor(Math.random()*2)+0.5,
        this.dirx=Math.random()*10>5?1:-1,
        this.diry=Math.random()*10>5?1:-1,
        this.palco=palco,
        this.arrayBolas=arrayBolas,
        this.id=Date.now()+'_'+Math.floor(Math.random()*100000000000000),//criando um id diferente para cada bolinha, usando o timestamp e um numero sorteado aleatorio com variação muito grande para não correr risco de ter numero repetido
        this.desenhar(),//chamar função de desenhar a bola no DOM.
        this.controle=setInterval(this.controlar,10),//chamar a função controle a cada 10 ms
        this.eu=document.getElementById(this.id),//atribuindo id aleatório criado ao DOM
        numBola++,
        num_objetos.innerHTML=numBola
    }
    minhaPos=()=>{//metodo para saber posição que uma bola(objeto) estará no array bolas e DOM, permitindo retira-la
        return this.arrayBolas.indexOf(this)//retorna a posição que o objeto atual (bola) está no arrayBolas
    }
    remover=()=>{//limpar intervalo, remover do arrayBolas e remover do DOM
        clearInterval(this.controle)//bolinha pararia no DOM, para de chamar o thiscontrolar a cada 10 ms
        bolas=bolas.filter((b)=>{
            if(b.id!=this.id){//se o id de cada bola do array bolas for diferente do id do objeto dessa bolinha retorna de volta para bolas, removendo assim a boliha atual(unica que possui tal id)
                return b 
            }
        })
        this.eu.remove()//remover bola do DOM
        numBola--//reduzir numero de bolas 
        num_objetos.innerHTML=numBola//atualizar display da tela com numero de bolas atual

    }
    desenhar=()=>{
        const div=document.createElement('div')//criar uma div para cara bola criada
        div.setAttribute('id',this.id)// atribuir id individual a bola
        div.setAttribute('class','bola')//atribuir class bola à bola
        div.setAttribute('style',`left:${this.px}px;top:${this.py}px; width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)//incluir estilo com todas características atribuidas ao objeto bola
        this.palco.appendChild(div)
    }
    controle_bordas=()=>{
        if(this.px+this.tam>=larguraPalco){
            this.dirx=-1
        }else if(this.px<=0){
            this.dirx=1
        }
        if(this.py+this.tam>=alturaPalco){
            this.diry=-1
        }else if(this.py<=0){
            this.diry=1
        }
    }
    controlar=()=>{
        this.controle_bordas()
        this.px+=this.dirx*this.velx//atualizar posição x multiplicando direção pela velocidade
        this.py+=this.diry*this.vely//atualizando posição y 
        this.eu.setAttribute('style',`left:${this.px}px; top:${this.py}px; width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b}`)//atualizando atributos no DOM
        if(this.px>larguraPalco||this.py>alturaPalco){//se a posição das bolas estiverem fora do palco, tando na altura quanto comprimento irá remove-las(no caso de diminuir a janela)
         this.remover()   
        }
    }
}

window.addEventListener('resize',(evt)=>{//identificar quando alterar tamanho da janela
    larguraPalco=palco.offsetWidth//atualizar tamanho da largura
    alturaPalco=palco.offsetHeight//atualizar tamanho da altura
})

btn_add.addEventListener('click',(evt)=>{
    const qtde=txt_qtde.value
    for(let i=0;i<qtde;i++){
        bolas.push(new Bola(bolas,palco))
    }
})

btn_remover.addEventListener('click',(evt)=>{
    bolas.map((b)=>{
        b.remover()
    })
})
