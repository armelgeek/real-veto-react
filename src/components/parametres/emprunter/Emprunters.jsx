import React from 'react'
import PropTypes from 'prop-types'
import { EmprunterInput } from './EmprunterInput'
import { AddEmprunter } from './AddEmprunter'

function Emprunters({emprunters,meta}) {
    return (
        <div>
            <h3 className="mb-2 text-bold title">Emprunters</h3>
          
            <div className="card mt-2">
            <div className="card-body">
            <AddEmprunter emprunters={emprunters} meta={meta} />
              <ol class="list-items">
                  
                {emprunters.map((e) => (
                  <EmprunterInput emprunter={e} />
                ))}
              </ol>
              
            </div>
          </div>
        </div>
    )
}

Emprunters.propTypes = {

}

export default Emprunters

