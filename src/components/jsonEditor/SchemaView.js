/*
 * Component for viewing the shape of a schema.
 */

import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda';
const SCHEMA_TYPE_IDENTIFIER = {
  shape: 'shape',
  arrayOf: 'arrayOf',
  any: 'any',
  string: 'string',
  boolean: 'boolean',
  function: 'function',
  number: 'number',
  date: 'date',
  array: 'array',
  object: 'object',
}

// Assumes schema is already a valid Schema.
// Returns the corresponding type identifier (a string from the object above) for the schema.
export function getSchemaTypeIdentifier(schema) {
  return schema._isSchemaType
    ? schema._type
    : SCHEMA_TYPE_IDENTIFIER.shape
}

const monospace = { fontFamily: 'monospace' }
const keyName = { ...monospace, color: '#b966b1' }

export class SchemaView extends React.Component {
  static displayName = 'SchemaView'

  state = {
    expanded: false,
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const identifier = getSchemaTypeIdentifier(this.props.schema)
    switch (identifier) {
      case SCHEMA_TYPE_IDENTIFIER.any:
      case SCHEMA_TYPE_IDENTIFIER.string:
      case SCHEMA_TYPE_IDENTIFIER.boolean:
      case SCHEMA_TYPE_IDENTIFIER.function:
      case SCHEMA_TYPE_IDENTIFIER.number:
      case SCHEMA_TYPE_IDENTIFIER.date:
      case SCHEMA_TYPE_IDENTIFIER.array:
      case SCHEMA_TYPE_IDENTIFIER.object:
        if (typeof this.props.keyName === 'string') {
          return <KeyValueSchemaView
            preview={<LeafSchema schemaTypeName={identifier} />}
            schemaElement={<LeafSchema schemaTypeName={identifier} />}
            keyName={this.props.keyName} />
        }

        return <LeafSchema schemaTypeName={identifier} />

      case SCHEMA_TYPE_IDENTIFIER.shape:
        if (typeof this.props.keyName === 'string') {
          return <KeyValueSchemaView
            schemaElement={<ShapeSchema schema={this.props.schema} />}
            keyName={this.props.keyName}
            onToggleExpanded={this.toggleExpanded.bind(this)}
            preview="Shape"
            expanded={this.state.expanded} />
        }

        return <ShapeSchema schema={this.props.schema} />

      case SCHEMA_TYPE_IDENTIFIER.arrayOf:
        if (typeof this.props.keyName === 'string') {
          return <KeyValueSchemaView
            schemaElement={<SchemaView schema={this.props.schema._elementType} />}
            keyName={this.props.keyName}
            onToggleExpanded={this.toggleExpanded.bind(this)}
            preview="ArrayOf"
            expanded={this.state.expanded} />
        }

        return <div style={{
          display: "flex",
          cursor: "default"
        }}>
          <div style={{
            width: TRIANGLE_EXPANDER_WIDTH
          }} />
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ ...monospace }}>ArrayOf</div>
            <SchemaView schema={this.props.schema._elementType} />
          </div>
        </div>

      default:
        throw new Error('invalid schema type identifier')
    }
  }
}

class LeafSchema extends React.Component {
  static displayName = 'LeafSchema'

  render() {
    return <div style={{ ...monospace }}>{this.props.schemaTypeName}</div>
  }
}

class ShapeSchema extends React.Component {
  static displayName = 'ShapeSchema'

  render() {
    return <div>
      {
        R.toPairs(this.props.schema).map(([key, schema]) =>
          <SchemaView key={key} schema={schema} keyName={key} />
        )
      }
    </div>
  }
}

const TRIANGLE_RIGHT = '▶'
const TRIANGLE_DOWN = '▼'
const TRIANGLE_EXPANDER_WIDTH = "16px"

class KeyValueSchemaView extends React.Component {
  static displayName = 'KeyValueSchemaView'
  render() {
    const readableKeyName = this.props.keyName === ''
      ? `""`
      : this.props.keyName

    // Non-expandable key/value pairs
    if (!this.props.onToggleExpanded) {
      return (
        <div style={{
          display: "flex",
          cursor: "default"
        }}>
          <div style={{
            width: TRIANGLE_EXPANDER_WIDTH
          }} />
          <div style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <div style={{ ...keyName, marginRight: "10px" }}
              onClick={this.props.onToggleExpanded}>{readableKeyName}:</div>
            <div style={{ ...monospace }}>{this.props.preview}</div>
          </div>
        </div>
      )
    }

    const arrow = this.props.expanded ? TRIANGLE_DOWN : TRIANGLE_RIGHT
    return (
      <div style={{
        display: "flex", cursor:"default"
      }}>
        <div style={{
          display: "flex",
          width: TRIANGLE_EXPANDER_WIDTH
        }} onClick={this.props.onToggleExpanded}>
          <span style={{
            fontSize:"9px",
            padding:"2px"
          }}>{arrow}</span>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row"
          }} onClick={this.props.onToggleExpanded}>
            <div style={{ ...keyName, marginRight: "10px" }}>{readableKeyName}:</div>
            <div style={{ ...monospace }}>{this.props.preview}</div>
          </div>

          {this.props.expanded && <div>{this.props.schemaElement}</div>}
        </div>
      </div>
    )
  }
}
export const SchemaPopover = props => {
  const popoverContent = (
    <div style={{
      padding: "15px"
    }}>
      <SchemaView schema={props.schema} />
    </div>
  )
  return popoverContent;
}
