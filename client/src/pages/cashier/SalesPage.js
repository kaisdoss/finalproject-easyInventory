import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../action/facturesAndProductsAction';
import { postInvoice } from '../../action/facturesAndProductsAction';
import SalesProducts from './SalesProducts';
import SingleInvoice from './SingleInvoice';
import './styles.css';
import Modal from 'react-modal';

function SalesPage({ history }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.facturesAndProducts.product);
  const [salesList, setSalesList] = useState([]);
  const [isFactureShow, setIsFactureShow] = useState(false);
  const idUsers = useSelector((state) => state.auth.user._id);

  const showInvoice = (e) => {
    setIsFactureShow(true);
  };

  const addProductToList = (product) => {
    // console.log('salesList: ', product);
    setSalesList([
      ...salesList.filter((el) => el._id !== product._id),
      product,
    ]);
    // setTimeout(() => {
    //   console.log("setSalesList",salesList);

    // }, 1000);
  };

  const deleteProductFromList = (product) => {
    // console.log('salesList: ', salesList);
    setSalesList(
      [...salesList.filter((el) => el._id !== product._id), product].filter(
        (el) => el.qte > 0
      )
    );

  };

  const handlePostInvoice = (e) => {
    let sales = {
      idProducts: salesList.map((el) => el._id),
      idUsers: [idUsers],
      totalPrice: totalPrice,
    };
    e.preventDefault();
    dispatch(postInvoice(sales));
  };

  let totalPrice = salesList.reduce((sum, { subTotal }) => sum + subTotal, 0);

  useEffect(() => {
    dispatch(getProduct());
  }, []);





  const [count, setCount] = useState(0);



  const incrementQuantity = (prod) => {
    setCount(count + 1);
    console.log("prod", prod);

    addProductToList({
      ...prod, qte: count,
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

  const closeModalFacture = () => {
    setIsFactureShow(false)
  }


  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  const closeModal = () => {
    setIsOpen(false)
  }
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

  console.log("totalProduct", product);
  return (
    <div>
      {/* <h2 className='countUsers'>Ventes</h2> */}

      {isFactureShow === true ? (
        <Modal
          isOpen={isFactureShow}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Facture</span>
            <div className="close-modal" onClick={closeModalFacture}>
              <i class="fal fa-times close-modal-icon"></i>
            </div>
          </div>


          <div className="modal-body">
          <div className="compartiment">
          {isFactureShow && (
            <SingleInvoice totalPrice={totalPrice} salesList={salesList} />
          )}
        </div>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeModalFacture}> Fermer modal </button>
            <button className="btn btn-modal" onClick={handlePostInvoice}>Envoyer une facture</button>
            {/* <button className="btn btn-modal" onClick={toAddFactureItem} >Ajouter</button> */}
          </div>
        </Modal>
      ) : null

      }
      <div className="table-responsive">
        <div className="Invoice-input">
          {/* <button onClick={() => history.goBack()}>Back</button> */}
          <table>
            <tr id="header">
              <th>Nom du produit</th>
              <th>Prix</th>
              <th>Nombre dans le stock</th>
              <th>Etat</th>
              <th>Action</th>
              <th>Nombre</th>
            </tr>
            {product && product.map((product) => {
              return (
                <SalesProducts
                  key={product._id}
                  addProductToList={addProductToList}
                  deleteProductFromList={deleteProductFromList}
                  product={product}
                ></SalesProducts>
              );
            })}
          </table>
          <div  style={{marginTop:'2rem',textAlign: 'end'}} >
            <h3  style={{fontSize:"2rem"}} >{totalPrice}$</h3>
          </div>
          <button  className="btn btn-modal"  style={{marginTop:'2rem',float: "right"}} onClick={showInvoice}>Get Facture</button>
          
        </div>
      
      </div>
  

    </div>
  );
}

export default hot(SalesPage);
