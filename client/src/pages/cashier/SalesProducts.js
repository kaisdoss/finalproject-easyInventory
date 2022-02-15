import React, { useState } from 'react';

const SalesProducts = ({
  product,
  addProductToList,
  deleteProductFromList,
}) => {
  const [count, setCount] = useState(0);
  const incrementQuantity = (e) => {
    setCount(count + 1);
    console.log('count :', count);
    console.log('subTotal :', count * product.price);
    addProductToList({
      ...product,
      qte: count,
      subTotal: count * product.price,
    });
  };

  const deccrementQuantity = (e) => {
    if (count > 0) setCount(count - 1);
    console.log('count :', count);
    console.log('subTotal :', count * product.price);
    deleteProductFromList({
      ...product,
      qte: count,
      subTotal: count * product.price,
    });
  };

  return (
    <tr>
      <td>{product.name}</td>
      <td> {product.price} </td>
      <td> {product.number} </td>
      <td> {product.etat === "en stock" ? (<div className='enStock'></div>) : <div className='nonStock'></div>}</td>
      <td >
        <i class="fal fa-minus-circle removeIcon" onClick={deccrementQuantity} ></i>
        <i class="fal fa-plus-circle addIcon" onClick={incrementQuantity}></i>

      </td>
      <td>  {count}</td>
      {/* <button onClick={incrementQuantity}>+</button>
      {count}
      <button onClick={deccrementQuantity}>-</button> */}
    </tr>
  );
};

export default SalesProducts;
