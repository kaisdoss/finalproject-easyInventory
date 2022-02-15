import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateFacture } from "../../action/facturesAndProductsAction";

function UpdateFacture({history}) {
    return (
        <div>
            <button onClick={() => history.goBack()}  >Back</button>
        </div>
    )
}

export default UpdateFacture
