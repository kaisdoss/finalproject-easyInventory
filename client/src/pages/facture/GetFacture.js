import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacture,
  deleteFacture,
} from '../../action/facturesAndProductsAction';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addFacture } from "../../action/facturesAndProductsAction";

import Modal from 'react-modal';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function GetFacture({ history }) {


  /********************************************************************************************************************************/

  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const facture = useSelector((state) => state.facturesAndProducts.facture);
  const [addFacturemodal, setaddFacturemodal] = useState(false)
  /********************************************************************************************************************************/

  useEffect(() => {
    dispatch(getFacture());
  }, []);

  /********************************************************************************************************************************/
  const openModalAddFacture = (e) => {
    setaddFacturemodal(true)

  }
  const closeModalAddFacture = () => {
    setaddFacturemodal(false)
  }


  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  /********************************************************************************************************************************/

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

  /**********************************************************************************************************************************/
  const [factureItem, setFactureItem] = useState({
    number: "",
    totalPrice: "",
    discount: "",
    vat: "",
  });

  const handleChange = (e) => {
    setFactureItem({ ...factureItem, [e.target.name]: e.target.value });
  };



  const toAddFactureItem = (e) => {
    e.preventDefault();
    dispatch(addFacture(factureItem));
    // setProductI({
    //   number: "",
    //   name: "",
    //   buyingPrice: "",
    //   price: "",
    //   description: "",
    // })


    closeModalAddFacture()
  };

  /**********************************************************************************************************************************/
  console.log('facture: ', facture);
  return (
    <div>
      <p className='countUsers'>Factures</p>
      {/* <button onClick={() => history.goBack()}>Back</button> */}
      {addFacturemodal === true ? (
        <Modal
          isOpen={addFacturemodal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <span className="title-modal">Ajouter une facture</span>
            <div className="close-modal" onClick={closeModalAddFacture}>
              <i class="fal fa-times close-modal-icon"></i>
            </div>
          </div>


          <div className="modal-body">
            <form >
              <div className='compartiment'>
                <label>Number</label>
                <input type="text" name="number" onChange={handleChange} />
              </div>

              <div className='compartiment'>
                <label>TotalPrice</label>
                <input type="text" name="totalPrice" onChange={handleChange} />
              </div>
              <div className='compartiment'>
                <label>Discount</label>
                <input type="text" name="discount" onChange={handleChange} />
              </div>
              <div className='compartiment'>
                <label>Vat</label>
                <input type="text" name="vat" onChange={handleChange} />
              </div>
            
            </form>
          </div>
          <div className="modal-bottom">
            <button className="btn btn-modal" onClick={closeModalAddFacture}> Fermer modal </button>
            <button className="btn btn-modal" onClick={toAddFactureItem} >Ajouter</button>
          </div>
        </Modal>
      ) : (null)

      }
      <div className='table-responsive' >

        <button style={{ float: "right" }} className='add btn' onClick={openModalAddFacture}> Add Facture</button>

        <table>
          <tr id="header">
            <th>N°</th>
            <th>Total Price</th>
            <th>discount</th>
            <th>vat</th>
            <th>Quantité</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          {facture &&  facture.map((facture, index) => (
              <tr>
                <td> {index+1} </td>
                <td> {facture.totalPrice} </td>
                <td> {facture.discount} </td>

                <td> {facture.vat}</td>
                <td> {facture.number} </td>
                <td></td>
                <td >
                  {auth?.user?.role !== 'Cashier' && (
                    <i className="fal fa-pen edit" ></i>
                    // <button>
                    //   <Link to={`/facture/updateFacture/${facture._id}`}>
                    //     Update
                    //   </Link>
                    // </button>
                  )}

                  <i onClick={() => dispatch(deleteFacture(facture._id))} className="fal fa-trash-alt remove"></i>
                </td>

              </tr>

            )
            )}

        </table>

      </div>
    </div>
  );
}

export default GetFacture;
