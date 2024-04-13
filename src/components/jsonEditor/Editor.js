import React,{useEffect,useState} from 'react';
import cx from 'classnames';
import update from 'react-addons-update';

import { BaseClassnames } from './constants';

import Scrim from './Scrim';

import * as Schema from './Schema';

import _ from 'lodash';
import { traduction } from './trad';
import { displayDate } from '../../utils/functions';

const empty = () => null;
const isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
// Returns true if `schemaType` is one of the array types -- "array", or "arrayOf".
const isArraySchemaType = schemaType => {
    return schemaType._type && schemaType._type.match(/array/) !== null;
};


// Returns the column title for the SchemaType `schemaType`.
function columnTitle(schemaType) {
    // Complex object schema
    if (typeof schemaType === 'object') {
        return 'Object';
    }

    // If it's an array type, use the elementType property.
    if (isArraySchemaType(schemaType)) {
        return 'Array of ' + columnTitle(schemaType._elementType || Schema.SchemaTypes.any);
    }

    // Otherwise, just use the _type field.
    return _.capitalize(schemaType._type);
}

// A <th /> Element with a the class ".editor__column-title"
const ColumnTitle = props => {
    const classes = cx(
        BaseClassnames.ColumnTitle(),
        props.className
    );

    return (
        <th className={classes}>
            {props.children}
        </th>
    );
};
ColumnTitle.displayName = 'ColumnTitle';

class BaseTable extends React.Component {
    static displayName = 'BaseTable';
    // Render column titles based on a complex object-schema
    renderObjectColumns = (object) => {
        // A column for each element key
      //  console.log('object', object);
        return Object.keys(this.props.type).map(
            field => {
              //  console.log('renderObjectColumns', field);
                return  (
                    <ColumnTitle>{traduction[field]}</ColumnTitle>
                )
            }
        );
    };

    render() {
        return (
            <table className={cx(BaseClassnames.Editor(), 'bg-white table table-bordered', this.props.className)}>
                <thead className="bg-thead">
                    <tr className={BaseClassnames.ColumnTitles()}>
                        {/*<th>*/}
                        {/* Blank -- just for spacing */}
                        {/* This is the icon column */}
                        {/*</th>*/}

                        {this.renderObjectColumns(this.props.object)}

                        {/*<th>*/}
                        {/* Blank -- just for spacing */}
                        {/* This is the delete object column */}
                        {/*</th>*/}
                    </tr>
                </thead>

                <tbody>

                    {/* Render children in tbody */}
                    {this.props.children}

                </tbody>
            </table>
        );
    }
}

// A tabular editor for editing a single JSON object
class ObjectEditor extends React.Component {
    static displayName = 'ObjectEditor';

    render() {
        return (
            <BaseTable
                object={this.props.object}
                type={this.props.type} trad={this.props.trad} className={cx(BaseClassnames.Editor('--object'), this.props.className)}>
                { /* Object is just an individual object, so there's only one row */}
                <ElementRow
                    className={BaseClassnames.ElementRow('--object')}
                    icon={this.props.icon || undefined}

                    trash={empty /* no trash button for single objects */}
                    type={this.props.type}
                    object={this.props.object}
                    onChange={this.props.onUpdateElement}
                    onRemove={empty /* Can't remove a single object */} />
            </BaseTable>
        );
    }
};

const ScrimObjectEditor = Scrim(ObjectEditor);

const ArrayEditor =({object,type,trad,icon,onUpdateElement,onRemoveElement,className})=> {
const [state, setState] = useState(object);
console.log('mirendere fona le array editor');
return (
            <BaseTable object={object} type={type} trad={trad} className={cx(BaseClassnames.Editor('--array'), className)}>

                {
                    _.map(
                        object,
                        (el, idx) => <ElementRow
                            key={idx}
                            className={BaseClassnames.ElementRow('--array')}
                            icon={icon || undefined}
                            type={type}
                            object={el}
                            onChange={updated => onUpdateElement(updated, idx)}
                            onRemove={() => onRemoveElement(el, idx)} />
                    )
                }

                {/**<AddObjectRow
                    type={type}
                    onAddElement={onAddElement}/>**/}
            </BaseTable>
        );
};

// A table row for adding a new element to an array
// TODO: error handling, validation
// TODO: support empty values for certain types
class AddObjectRow extends React.Component {
    static displayName = 'AddObjectRow';


    constructor(props) {
        super(props);

        this.state = {
            // Initialize with empty object
            object: null,
        };
    }

    // Handler called when the "add" button is clicked
    // Only pass to consumer if state is non-null -- user needs to enter something
    // before they can add additional elements.
    add = () => {
        // Nothing entered in fields yet
        //if (this.state.object === null) {
        //    return;
       // }

        //const result = this.props.onAddElement(this.state.object);

        // If consumer returned true, reset fields.
        //if (result) {
        //    return this.setState({
         //       object: null,
        //    });
       // }
    };

    // Renders the "add element" button
    addButton = () => {
        return <button onClick={this.add}>Add</button>;
    };

    // Handler for updates to the object in state.
    // Simply sets object equal to the update.
    updateObject = updated => {
        this.setState({
            object: updated
        });
    };

    render() {
        const rowClasses = cx(BaseClassnames.AddObjectRow());
        return (
            <ElementRow
                className={rowClasses}
                type={this.props.type}
                icon={empty /* no icon for the add object row */}
                trash={this.addButton}
                object={this.state.object}
                onChange={this.updateObject}
                onRemove={empty /* unused by this component */} />
        );
    }
}

// Scrim version of the array editor.
const ScrimArrayEditor = Scrim(ArrayEditor);

// The primitive types that we'll use <input /> elements for.
// Other types will get nested object editors.
const STRING_INPUT_TYPES = [
    'string', 'boolean', 'number', 'date'
];

class EmptyCell extends React.Component {
    static displayName = 'EmptyCell';

    render() {
        return <td className="text-center">-</td>;
    }
}

// A td cell for editing a property whose type is anything but 'object'
const StringCell = ({value,type,onChange}) =>{
        const inputClasses = cx(
            'form-control',
            BaseClassnames.EditorInput(),
            BaseClassnames.EditorInput('--value')
        );
        const [state, setState] = useState(value || "");
        useEffect(()=>{
            setState(value);
        },[value]);
        //console.log('disabled', this.props.type.required)

        console.log('type',type,'value',value);
        return (
            <td className={BaseClassnames.Cell('--value')}>
                {_.isUndefined(type.disabled) ? <input
                    className={inputClasses}
                    type={_.isUndefined(type.numeric) && type.numeric == true ? 'number': 'text'}
                    value={state}
                    required={!!type.required}
                    onChange={evt => {
                        setState(evt.target.value);
                        onChange(Number(evt.target.value))
                    }} /> : isDate(state) ? displayDate(state): state}
            </td>
        );
}

// A td cell for editing a property of type `object`
// This cell will spawn nested editors using the scrimmed Editors
class ObjectCell extends React.Component {
    static displayName = 'ObjectCell';


    state = {
        open: false
    };

    // Toggle open the editor when the edit button is clicked.
    clickEdit = evt => {
        this.setState({
            open: !this.state.open
        });
    };

    // Close the editor
    close = evt => {
        this.setState({
            open: false,
        });
    };

    // Conditionally renders the value editor (depending on whether
    // the cell is toggled open)
    // TODO: too many conditionals here -- separate into different Cell classes
    renderEditor = () => {
        // Cell is closed -- render nothing
        /**if (!this.state.open) {
            return <div></div>
        }**/

        // Whether or not to use an Array editor
        const useArrayEditor = (
            // Use an array editor if the SchemaType is one of the array variants (array or arrayOf)
            (this.props.type._type && this.props.type._type.match(/array/) !== null) ||

            // Also use one if the value is an array
            Array.isArray(this.props.value)
        );

        // The Editor component to use
        //  console.log('value',this.props.value,useArrayEditor)
        const Editor = useArrayEditor
            ? ScrimArrayEditor
            : ScrimObjectEditor;

        // The type to pass to the editor -- if it's an object editor, that's just the current type.
        // If it's an array editor, we need to use the array's type.
        const editorType = useArrayEditor
            // If we're using an array editor, use the types's own _elementType or allow any
            ? this.props.type._elementType || Schema.SchemaTypes.any

            // Otherwise use the existing type
            : this.props.type;


        // The value to use for array operations -- allows us to have an empty value.
        const arrayValue = this.props.value || [];

        // Cell is open -- render the value editor

        // TODO: pull these update/add/remove handlers out of the render func
        // TODO: separate Cells for arrays, since the onUpdateElement function sig is different
        return (
            <Editor
                onClickScrim={this.close}

                className={BaseClassnames.Editor('--inside')}
                type={editorType}
                object={this.props.value}
                onUpdateElement={
                    /* This function needs to handle array and object property updates */
                    (el, updatedIndex) => {
                        // Array update
                        if (typeof updatedIndex !== 'undefined') {
                            return this.props.onChange(
                                update(
                                    arrayValue,
                                    {
                                        [updatedIndex]: {
                                            $set: el,
                                        }
                                    }
                                )
                            );
                        }

                        // "set" object property update
                        return this.props.onChange(el);
                    }
                }
                onRemoveElement={
                     (el, droppedIndex) =>{}
                    // Tell the consumer an element was removed
                   //(el, droppedIndex) => this.props.onChange(
                        // Without mutating the array, reject the dropped index
                    //    _.reject(
                      //      arrayValue,
                       //     (__, idx) => idx === droppedIndex
                        //)
                    //)
                }
                onAddElement={
                    (el) => {}
                    //(el) => {
                        // Pass element to consumer
                      //  this.props.onChange(
                        //    [...arrayValue, el]
                        //);

                        // Clear the nested add row
                        //return true;
                   // }
                } />
        );
    };

    render() {
        return (
            <td className={BaseClassnames.Cell('--object')}>
                {/**<button onClick={this.clickEdit}>Edit</button>**/}

                {this.renderEditor()}
            </td>
        );
    }
}

// Render an object as a row in a table.
// The "icon" prop gets render as the furthest-left td, and the
// "trash" prop gets render as the furthest-right td.
const ElementRow = props => {
    // For some key, returns a handler that calls props.onChange with the
    // value of props.object[key].
    // Support null/undefined objects.
    const getChangeHandler = key => newValue => {
        // Element doesn't have a value at this key yet
        // So create an object with this key
        if (!props.object) {
            return props.onChange({
                [key]: newValue
            });
        }

        // Set key = newValue and pass to consumer
        return props.onChange(update(
            props.object,
            {
                [key]: {
                    $set: newValue
                }
            }
        ));
    };

    // The trash button (if the consumer didn't specify one)
    const trashButton = (
        <button onClick={props.onRemove}>Trash</button>
    );
    const isEmpty =(object)=>{
        if(_.isUndefined(object.type)){
            //console.log('typpppe')
            return StringCell;
        }else{
            if(object.type == "UNITE" || object.type == "FLACON"){
                return StringCell;
            }else if(object.type == "FLACON") {

            }

        }
        return StringCell;
        //else if(object.type)
        //(object.condml !== 0 && object.qttccpvente !== 0 ? StringCell : EmptyCell)
    }
    const keyUnityBolus = (key) =>{
        if(key == 'prixParCC'){
            return EmptyCell;
        }else if(key == 'prixqttccvente'){
            return EmptyCell;
        }
        else{
             return StringCell;
        }
    }
    const keyFlacon = (object,key) =>{
      if(object.condml == 0 && object.qttccpvente == 0 && key == 'prixqttccvente'){
        return EmptyCell;
      }else{
        return StringCell;
       }
    }
    //object.type == "FLACON" ? (object.condml !== 0 && object.qttccpvente !== 0 ? StringCell: EmptyCell):StringCell
    const inputType = (type,object,key) => {
        const isStringType = _.includes(STRING_INPUT_TYPES, type)
        return isStringType
            ? _.isUndefined(object.type) 
            || object.type == "UNITE" 
            || object.type == "BOLUS" 
            ? (keyUnityBolus(key)): (object.type == "FLACON" ? keyFlacon(object,key):  StringCell )
            : ObjectCell
    }
    // Render a cell based on a primitive SchemaType, a value, and a handler
    const renderCell = (primitiveType,object,key, value, handler) => {
        //console.log('primitiveyype', primitiveType._type,object);

        const CellType = inputType(primitiveType._type,object,key);
        //  console.log('rendercell',primitiveType);
        return <CellType
            type={primitiveType}
            value={value}
            onChange={handler} />
    };

    // If props.type is a primitive (i.e. type._isSchemaType is true), we just render a single td
    // based on props.type.
    // If props.type is an object, we render td:s for each key in the object.

    const renderElementBody = () => {
       
        //console.log('object case', props.object.prixqttccvente)
        // Object case
        return _.map(
            Object.keys(props.type),
            key => {
                const value = props.object
                   // ? key=="prixqttccvente" ? props.object[key] * props.object.qttccpvente : props.object[key]
                    ? props.object[key]
                    : null;
                return renderCell(
                    props.type[key],
                    props.object,
                    key,
                    value,
                    getChangeHandler(key)
                );
            }
        );
    };

    const rowClasses = cx(
        BaseClassnames.ElementRow(),
        props.className || ''
    );

    return (
        <tr className={rowClasses}>
            {/**<td>
                {
                    // Icon for the element
                    props.icon
                        ? props.icon()
                        : <i>icon</i>
                }
            </td>**/}

            {/*
              * Render the "body" of the element -- for an object, cells for each key.
              * For a primitive, a single cell.
              */}
            {renderElementBody()}

            {/**<td>
                {
                    props.trash
                        ? props.trash()
                        : trashButton
                }
            </td>**/}
        </tr>
    );
};
ElementRow.displayName = 'ElementRow';

export { ObjectEditor, ArrayEditor };
