'use strict';





function generateItem(item, index ){
    return `
    <li data-item-id="${index}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function handleCheckItem(){
    $('.js-shopping-list').on('click','.js-item-toggle', e=> {
        console.log($(e.target).closest('li').find('.shopping-item').text());
        let itemToCheck = $(e.target).closest('li').find('.shopping-item').text();
        
        STORE.find(item=> {
            if(item.name === itemToCheck){
                item.checked = !item.checked
            }
        } )
        renderList();
    })
}

function handleDeleteItem(){
    $('.js-shopping-list').on('click','.js-item-delete', e=> {
        console.log($(e.target).closest('li').find('.shopping-item').text());
        let itemToDelete = $(e.target).closest('li').find('.shopping-item').text();

        STORE.forEach((item, index)=> {
            if(item.name === itemToDelete){
                console.log(item, index);
                STORE.splice(index,1);
            }
        })

        renderList();

    })
}

function handleAddItem(item) {
    $('form').on('submit', e=> {
        e.preventDefault();
        console.log('prevented submit, nice!');
        let userInput= $(e.target).find('.js-shopping-list-entry').val();
        console.log(userInput);
        $(e.target).find('.js-shopping-list-entry').val("");
        
        STORE.push({name: `${userInput}`, checked: false});
        
        renderList(); //updating DOM since we added an item to store
    })
}

function renderList(){
    let list = STORE.map((item,index)=> generateItem(item, index));
    console.log(list.join(''));
    $('.js-shopping-list').html(list.join(""))

}

function handleShoppingList(){
    console.log('page has loaded, DOM ready...');
    renderList(); //initial render
    handleAddItem();
    handleCheckItem();
    handleDeleteItem();
}




$(handleShoppingList);