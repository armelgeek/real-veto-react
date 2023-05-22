import React, { Component as ReactComponent } from "react";

export default (Component) =>
  class OneOpen extends ReactComponent {
    state = {
      open: false,
    };
    constructor(props){
      super(props);
      this.toggle= this.toggle.bind(this);
      this.isItemOpen= this.isItemOpen.bind(this);
    }
    toggle=()=>{
        this.setState({open:false});

    };
    isItemOpen =() => {
      return this.state.open;
    }


    render() {
      return <Component {...this.props} isOpen={this.isItemOpen} toggle={this.toggle} />;
    }
  };
