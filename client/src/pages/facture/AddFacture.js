import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFacture } from "../../action/facturesAndProductsAction";

function AddFacture({history}) {
  const [facture, setFacture] = useState({
    number: "",
    totalPrice: "",
    discount: "",
    vat: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFacture({ ...facture, [e.target.name]: e.target.value });
  };

  const auth = useSelector((state) => state.auth);

  const toAddFacture = (e) => {
    e.preventDefault();
    dispatch(addFacture(facture));
  };
  return (
    <div>
      <h2>Gestion Facture</h2>

      <button onClick={() => history.goBack()}>Back</button>
      <form onSubmit={toAddFacture}>
        <div>
          <label>Number</label>
          <input type="text" name="number" onChange={handleChange} />
        </div>
        <div>
          <label>TotalPrice</label>
          <input type="text" name="totalPrice" onChange={handleChange} />
        </div>
        <div>
          <label>Discount</label>
          <input type="text" name="discount" onChange={handleChange} />
        </div>
        <div>
          <label>Vat</label>
          <input type="text" name="vat" onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddFacture;
