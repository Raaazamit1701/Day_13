import { useReducer } from "react";

const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

const Homework = () => {
  function redFun(state, action) {
    const product = Products.find((p) => p.id === action.id);
    if (!product) return state;

    switch (action.type) {
      case "+":
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.id]: (state.cart[action.id] || 0) + 1,
          },
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        };
      case "-":
        if (!state.cart[action.id]) return state;

        const updatedCount = state.cart[action.id] - 1;
        const newCart = { ...state.cart };
        if (updatedCount <= 0) {
          delete newCart[action.id];
        } else {
          newCart[action.id] = updatedCount;
        }

        return {
          ...state,
          cart: newCart,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(redFun, {
    cart: {},
    totalItems: 0,
    totalPrice: 0,
  });

  return (
    <div className="flex gap-5 border border-gray-800 w-[70%] justify-between p-4 m-auto item-center">
      <div className="w-[45%] m-auto border p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {Products.map((e) => (
          <div
            className="m-2 flex bg-slate-500 justify-around items-center p-2 rounded-md"
            key={e.id}
          >
            <h3 className="text-white">{e.name}</h3>
            <h3 className="text-white">${e.price}</h3>
            <div className="flex items-center gap-2">
              <button
                className="bg-red-600 w-[30px] h-[30px] flex items-center justify-center rounded-md text-white"
                onClick={() => {
                  dispatch({
                    type: "+",
                    id: e.id,
                  });
                }}
              >
                +
              </button>
              <h2 className="text-white mx-2">{state.cart[e.id] || 0}</h2>
              <button
                className="bg-red-600 w-[30px] h-[30px] flex items-center justify-center rounded-md text-white"
                onClick={() => {
                  dispatch({
                    type: "-",
                    id: e.id,
                  });
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[45%] m-auto border p-4">
        <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
        <p className="text-xl font-bold mb-4">Total Items: {state.totalItems}</p>
        <div>
          {Object.keys(state.cart).length === 0 ? (
            <p>No items in cart</p>
          ) : (
            Object.keys(state.cart).map((id) => {
              const product = Products.find((p) => p.id === parseInt(id));
              return (
                <div key={id} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>{state.cart[id]}</span>
                  <span>{product.price * state.cart[id]}</span>
                </div>
              );
            })
          )}
        </div>
        
        <p className=" text-lg font-bold m-4 text-center">Total Price: {state.totalPrice}</p>
      </div>
    </div>
  );
};

export default Homework;
