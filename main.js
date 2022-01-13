if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for(var i=0; i<removeCartItemButtons.length;i++){
    var button = removeCartItemButtons[i];
    button.addEventListener('click',removeCartItem)
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i =0; i<quantityInputs.length;i++){
    var input =quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
}


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();

}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value)|| input.value<=0){
        input.value =1
    }
    updateCartTotal()


}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total =0
    for(var i=0; i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs',''))
        var quantity = quantityElement.value
         total=total+(price*quantity)
         console.log(total)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText= 'Rs '+total

}






// JS for Adding items to cart

let addToCartButtons =document.getElementsByClassName('add-cart')


for(let i=0;i<addToCartButtons.length;i++){
    
        var button = addToCartButtons[i]
        button.addEventListener('click',addTOCartClicked)
       
}
function  addTOCartClicked(event){
     var button = event.target
     var shopItem = button.parentElement
     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
     var image = shopItem.getElementsByClassName('shop-item-image')[0].src
     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
     console.log(title,image,price)

     addItemToCart(title,image,price)
     updateCartTotal();
     
}
function addItemToCart(title,image,price){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartItemName =cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemName.length;i++){
        if(cartItemName[i].innerText==title){
            alert('This Item already added')
            return;
        }

    }
    var cartRowContents =` 
      <div class="cart-item cart-column">
       <img class="cart-item-image" src="${image}" height="100">
       <span class="cart-item-title">${title}</span>
          </div>
             <span class="cart-price cart-column">${price}</span>
             <div class="cart-quantity cart-column">
                 <input class="cart-quantity-input" type="number" value="1">
                 <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

        cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)

    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)

}


//----------------------cart button-----------------------
const open= document.getElementById('cart');
const close= document.getElementById('close');
const container= document.getElementById('container');
 
open.addEventListener('click',()=>{
    container.classList.add('active');

});
close.addEventListener('click',()=>{
    container.classList.remove('active');

});


window.addEventListener('DOMContentLoaded', (event) => {
    //created a form in server js so here i added post
    axios.post('http://localhost:4000/product').then((result) => {

        const products = result.data.products
        console.log(products);
        const music = document.getElementById('music-content')

        const element = `
           <div id="${products.id}">
           <h3>${products.name}</h3>
           <div class="image-container">
               <img class="prod-images" src="${products.image}" alt="">
           </div>
           <div class="prod-details">
               <span>$<span>${products.price}</span></span>
         <button class="shop-item-button" type="button" id="Button1">ADD TO CART</button>
           `
        music.innerHTML += element

    }).catch((err) => {
        console.log(err);
    });
});
