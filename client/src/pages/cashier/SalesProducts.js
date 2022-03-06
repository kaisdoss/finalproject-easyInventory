import React, { useState } from 'react';

const SalesProducts = ({
  product,
  addProductToList,
  deleteProductFromList,
  updateTotalCount
}) => {
  const [count, setCount] = useState(0);

updateTotalCount({
  ...product,
  count
})

  const incrementQuantity = (e) => {
    setCount(count + 1);
  };

  const deccrementQuantity = (e) => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <tr>
      <td>{product.name}</td>F
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
