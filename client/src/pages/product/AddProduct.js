import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../action/facturesAndProductsAction";

function AddProduct({history}) {
  const [product, setProduct] = useState({
    number: "",
    name: "",
    buyingPrice: "",
    price: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const auth = useSelector((state) => state.auth);

  const toAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({
      number: "",
      name: "",
      buyingPrice: "",
      price: "",
      description: "",
    })
  };
  return (
    <div>
      <h2>Ajouter un produit</h2>
      <button onClick={() => history.goBack()} >Back</button>

      <form >
        <div>
          <label>number</label>
          <input type="text" name="number" value={product.number} onChange={handleChange} />
        </div>
        <div>
          <label>name</label>
          <input type="text" name="name"  onChange={handleChange} />
        </div>
        <div>
          <label>buyingPrice</label>
          <input type="text" name="buyingPrice" value={product.buyingPrice}  onChange={handleChange} />
        </div>
        <div>
          <label>price</label>
          <input type="text" name="price" onChange={handleChange} />
        </div>

        <div>
          <label>description</label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <button onClick={toAddProduct}>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
