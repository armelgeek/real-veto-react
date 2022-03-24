import React from 'react'
import PropTypes from 'prop-types'
import { FournisseurInput } from './FournisseurInput'
import { AddFournisseur } from './AddFournisseur'

function Fournisseurs({fournisseurs,meta}) {
    return (
        <div>

            <div className="card mt-2">
            <div className="card-body">
            <AddFournisseur fournisseurs={fournisseurs} meta={meta} />
              <ol class="list-items">
                  
                {fournisseurs.map((f) => (
                  <FournisseurInput fournisseur={f} />
                ))}
              </ol>
              
            </div>
          </div>
        </div>
    )
}

Fournisseurs.propTypes = {

}

export default Fournisseurs

