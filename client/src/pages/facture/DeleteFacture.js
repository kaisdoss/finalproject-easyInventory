import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteFacture } from "../../action/facturesAndProductsAction";

function DeleteFacture({history}) {
    return (
        <div>
            <button onClick={() => history.goBack()}  >Back</button>
        </div>
    )
}

export default DeleteFacture
