export function addItem(obj) {
  return {
    type: 'ADD_ITEM',
    data: obj 
  };
};

export function remember(obj) {
  return {
    type: 'REMEMBER_CLICKED',
    data: obj 
  };
};

export function deleteItem(obj) {
  return {
    type: 'DELETE_ITEM',
    data: obj 
  };
};

export function changeQty (obj) {
  return {
    type: 'CHANGE_QTY',
    data: obj 
  };
};

export function cleanCart() {
  return {
    type: 'CLEAN_CART'
  };
};