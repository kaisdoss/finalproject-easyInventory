import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  deleteProduct
} from "../../action/facturesAndProductsAction";
import { updateProduct } from '../../action/facturesAndProductsAction';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import './product.css'
import DeleteConfirmationDialog from '../../componentsToUse/DeleteConfirmationDialog/DeleteConfirmationDialog';
import Modal from 'react-modal';
import { addProduct } from "../../action/facturesAndProductsAction";

const customStyles = {
  content: {
    width: "60rem",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function GetProduct({ history }) {

  const auth = useSelector((state) => state.auth);
  /********************************************************************************************************************************/

  const dispatch = useDispatch();
  /********************************************************************************************************************************/

  const product = useSelector((state) => state.facturesAndProducts.product);
  /********************************************************************************************************************************/
  const [productId, setproductId] = useState(null)
  const [addProductmodal, setaddProductmodal] = useState(false)
  /********************************************************************************************************************************/

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  /********************************************************************************************************************************/

  let subtitle = null;
  /********************************************************************************************************************************/

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTest, setmodalTest] = useState(false);
  const [productI, setProductI] = useState({
    number: "",
    name: "",
    buyingPrice: "",
    price: "",
    description: "",
  });
  /********************************************************************************************************************************/

  const openModal = (idProd) => {
    setIsOpen(true);
    setproductId(idProd)

    setTimeout(() => {
      setproductItem(product.filter(
        (thisProduct) => thisProduct._id === idProd
      )[0])
    }, 300);


  }
  /********************************************************************************************************************************/
  const [productItem, setproductItem] = useState(null)


  const [prod, setProd] = useState(null);
  /*********/

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  /********************************************************************************************************************************/

  const closeModal = () => {
    setIsOpen(false)
  }

  /********************************************************************************************************************************/

  const handleChange = (e) => {
    if (
      e.target.name === 'number' ||
      e.target.name === 'buyingPrice' ||
      e.target.name === 'price'
    ) {
      setproductItem({ ...productItem, [e.target.name]: parseInt(e.target.value) });
    } else {
      setproductItem({ ...productItem, [e.target.name]: e.target.value });
    }
  };
  /********************************************************************************************************************************/

  const toUpdateProduct = (e) => {
    console.log("updateeee");
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name: productItem.name,
        number: productItem.number,
        buyingPrice: productItem.buyingPrice,
        price: productItem.price,
        description: productItem.description,
      })
    );
    closeModal()
  };
  /********************************************************************************************************************************/
  setTimeout(() => {
    console.log("productItem", productItem);
  }, 2000);

  /********************************************************************************************************************************/
  const handleChangeAddProduct = (e) => {
    setProductI({ ...productI, [e.target.name]: e.target.value });
  };



  const toAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(productI));
    setProductI({
      number: "",
      name: "",
      buyingPrice: "",
      price: "",
      description: "",
    })


    closeModalAddProduct()
  };
  /********************************************************************************************************************************/
  const openModalAddProduct = (e) => {
    setaddProductmodal(true)

  }
  const closeModalAddProduct = () => {
    setaddProductmodal(false)
  }

  /********************************************************************************************************************************/

  return (
    <div>
      {productItem !== null ? (
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Modification du produit</span>
            <div className="close-modal" onClick={closeModal}>
              <i class="fal fa-times close-modal-icon"></i>
            </div>
          </div>


          <div className="modal-body">
            <form  >
              <div className='compartiment'>
                <label>number</label>
                <input
                  type="text"
                  name="number"
                  onChange={handleChange}
                  value={productItem.number}
                />
              </div>
              <div className='compartiment'>
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={productItem.name}
                />
              </div>
              <div className='compartiment'>
                <label>buyingPrice</label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={handleChange}
                  value={productItem.buyingPrice}
                />
              </div>
              <div className='compartiment'>
                <label>price</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={productItem.price}
                />
              </div>

              <div className='compartiment'>
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={productItem.description}
                />
              </div>

            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeModal}> Fermer modal </button>
            <button className="btn btn-modal" onClick={toUpdateProduct}>Save</button>
          </div>
        </Modal>
      ) : (null)

      }
      {addProductmodal === true ? (
        <Modal
          isOpen={addProductmodal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Ajouter un produit</span>
            <div className="close-modal" onClick={closeModalAddProduct}>
              <i class="fal fa-times close-modal-icon"></i>
            </div>
          </div>


          <div className="modal-body">
            <form  >
              <div className='compartiment'>
                <label>number</label>
                <input
                  type="text"
                  name="number"
                  onChange={handleChangeAddProduct}
                  value={productI.number}
                />
              </div>
              <div className='compartiment'>
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeAddProduct}
                  value={productI.name}
                />
              </div>
              <div className='compartiment'>
                <label>buyingPrice</label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={handleChangeAddProduct}
                  value={productI.buyingPrice}
                />
              </div>
              <div className='compartiment'>
                <label>price</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChangeAddProduct}
                  value={productI.price}
                />
              </div>

              <div className='compartiment'>
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChangeAddProduct}
                  value={productI.description}
                />
              </div>

            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeModalAddProduct}> Fermer modal </button>
            <button className="btn btn-modal" onClick={toAddProduct} >Ajouter</button>
          </div>
        </Modal>
      ) : (null)

      }
      <p className='countUsers'>Produits</p>
      <div className='table-responsive' >

        {/* <Link className="main-buttons" to="/products/addProduct"> */}
        <button style={{ float: "right" }} className='add btn' onClick={openModalAddProduct} > Ajouter un produit</button>
        {/* </Link> */}
        <table>
          <tr id="header">
          <th>N°</th>
            <th>Nom du produit</th>
            <th>Num dans le stock</th>
            <th>description</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
          {product &&
            product.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td> {index+1} </td>
                  <td>{product.name}</td>
                  <td> {product.number} </td>
                  <td> {product.description} </td>
                  <td> {product.price} </td>

                  <td >
                    {auth?.user?.role !== 'Cashier' && (

                      // <Link to={`/products/updateProduct/${product._id}`} >
                      //   <i className="fal fa-pen edit"></i>
                      // </Link>
                      <i onClick={() => openModal(product._id)} className="fal fa-pen edit"></i>

                    )}
                    <i onClick={() => dispatch(deleteProduct(product._id))} className="fal fa-trash-alt remove"></i>
                  </td>
                </tr>
              );
            })}


        </table>
      </div>
      <DeleteConfirmationDialog />
    </div>

  );
}

export default hot(GetProduct);
