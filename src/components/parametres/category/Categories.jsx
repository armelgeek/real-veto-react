import React from 'react'
import PropTypes from 'prop-types'
import { CategoryInput } from './CategoryInput'
import { AddCategory } from './AddCategory'

function Categories({categories,meta}) {
    return (
        <div>
            <h3 className="mb-2 text-bold title">Categorie de produit</h3>

            <div className="card mt-2">
            <div className="card-body">
            <AddCategory categories={categories} meta={meta} />
              <ol class="list-items">
                  
                {categories.map((c) => (
                  <CategoryInput category={c} />
                ))}
              </ol>
              
            </div>
          </div>
        </div>
    )
}

Categories.propTypes = {

}

export default Categories

