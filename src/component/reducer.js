export const initialState = {
    basket: [],
    user: null
}

export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => item.price + amount, 0);
const reducer = (state, action) => {
    // console.log(action)
    switch(action.type){
        case "Add_to_Basket":
            return {
                ...state,
             basket: [...state.basket, action.item]
            }
       case "Empty_basket":
        return {
            ...state,
            basket: []
        }  

         case "Remove_from_Basket":
            let index = state.basket.findIndex((item) => item.id === action.id)
            let newbasket = [...state.basket] 
            if(index>=0){
               newbasket.splice(index,1)
            }
            else{
               console.warn(`Can't remove product (id: ${action.id}) as its not in basket`)
            }
            return{
                ...state,
                basket: newbasket
            } 
            case "SET_USER":
                return{
                    ...state,
                    user: action.user
                }
            default :
            return state;      
    }
    }
    export default reducer;
   