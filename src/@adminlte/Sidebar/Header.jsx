import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Header = ({ text }) => {
  return useMemo(()=> (<li className="header">{text}</li>),[text]);
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
