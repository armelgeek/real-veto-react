import React from 'react'
import PropTypes from 'prop-types'
import { VaccinateurInput } from './VaccinateurInput'
import { AddVaccinateur } from './AddVaccinateur'

function Vaccinateurs({vaccinateurs,meta}) {
    return (
        <div>
            <h3 className="mb-2 text-bold title">Vaccinateurs</h3>

            <div className="card mt-2">
            <div className="card-body">
            <AddVaccinateur vaccinateurs={vaccinateurs} meta={meta} />
              <ol class="list-items">
                  
                {vaccinateurs.map((c) => (
                  <VaccinateurInput vaccinateur={c} />
                ))}
              </ol>
              
            </div>
          </div>
        </div>
    )
}

Vaccinateurs.propTypes = {

}

export default Vaccinateurs

