import { AppState } from "../app.state";
import { createReducer, on } from "@ngrx/store";
import { add } from "../action/app.action";

export const initialState: AppState = {
    products:[],
}
export const favoriteReducer = createReducer(
    initialState,
    on(add, (state, {product}) => (
      {
        ...state,
        products: [...state.products, product]
      })
    )
)
