import { productTypes } from "./types";

let findIndex = (id, arr) => {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.id === id) return i;        
    }
    return -1;
}

const products = (state = [], action) => {
    switch (action.type) {
        case productTypes.addProduct:
            return [
                ...state,
                action.product
            ];
        case productTypes.loadListProduct:
            return action.list;
        case productTypes.deleteProduct: {
            let list = [...state];
            return list.filter((value)=>(value.id !== action.id));
        }
        case productTypes.editProduct: {
            let list = [...state];
            let index = findIndex(action.product.id, state);
            //console.log(index);
            if (index!==-1) list[index] = action.product;
            //console.log(list);
            return list;
        }
        default:
            return state;
    }
}

export default products;