
import React, { useState,useEffect,useCallback } from 'react'
import {SchemaView} from './SchemaView'
import { ObjectEditor, ArrayEditor } from './Editor';
import update from 'react-addons-update';
import _ from 'lodash';
export { SchemaTypes, matchesSchema } from './Schema';
const JsonEditor = ({ object,onChange,trad,type }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    setState(object)
  }, [object])

  const updateArray = (el, updatedIndex) => {
                        if (typeof updatedIndex !== 'undefined') {
                       onChange(
                                update(
                                    object,
                                    {
                                        [updatedIndex]: {
                                            $set: el,
                                        }
                                    }
                                )
                            );
                        }
  }
  const add = useCallback(newObject => {
   // setState([...object, newObject]);
   // return true;
  },[]);
  const remove = useCallback((removedObject, removedIndex) => {
    /**let val = _.reject(
        state,
        (__, idx) => idx === removedIndex
      )
    setState(val);**/
  },[]);
  const EditorComponent = Array.isArray(object)
      ? ArrayEditor
      : ObjectEditor;
      console.log('state',object);
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
        <EditorComponent
          className='editor--outside'
          object={object}
          trad={trad}
          type={type}
          onUpdateElement={updateArray}
          onAddElement={add}
          onRemoveElement={remove} />
        {/**<div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#f6f6f6',
                  padding: '6px',
                  boxShadow: '0px 6px 14px 0px #0000003d, 0px 2px 3px 0px #00000040',
                  marginLeft: '10px',
                  marginTop: 0,
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Data</h4>
                  <pre>{JSON.stringify(this.state.object, null, '   ')}</pre>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#f6f6f6',
                    padding: '6px',
                    boxShadow: '0px 6px 14px 0px #0000003d, 0px 2px 3px 0px #00000040',
                    marginLeft: '10px',
                    marginTop: 0,
                  }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>Schema</h4>
                    <SchemaView schema={this.props.type} />
                  </div>**/}
      </div>
    );
};
export default JsonEditor;