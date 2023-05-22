class Sidebar extends Component {
    state = {
      searchValue: '',
    }
  
    constructor() {
      super();
      this.onSearchValueChange = this.onSearchValueChange.bind(this);
    }
  
    componentDidMount() {
      jQuery(this.widgetReference).tree();
    }
  
    onSearchValueChange({ target: { value } }) {
      this.setState({ searchValue: value });
    }
  
    render() {
      const { children, searchbarFilter } = this.props;
      let localChildren;
      if (children) {
        localChildren = children.length ? children : [children];
      } else {
        localChildren = [];
      }
      return (
        <aside className="main-sidebar">
          <section className="sidebar">
            <ul className="sidebar-menu" data-widget="tree" ref={(c) => { this.widgetReference = c; }}>
              {localChildren}
            </ul>
          </section>
        </aside>
      );
    }
  }
  
  Sidebar.defaultProps = {
    children: null,
    searchbarFilter: false,
  };
  
  Sidebar.propTypes = {
    children(props, propName, componentName) {
      const prop = props[propName];
      let error;
      React.Children.forEach(prop, (el) => {
        if (error) return;
        if (el.type !== Item && el.type !== Header && el.type !== 'li' && el.type !== UserPanel && el.type !== Searchbar) {
          error = new Error(
            `\`${componentName}\` only accepts \`Item's, Header's, UserPanel, Searchbar and li's\`.`,
          );
        }
      });
      return error;
    },
    searchbarFilter: PropTypes.bool,
  };
  export default Sidebar;
