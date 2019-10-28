import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import device from 'styles/device';

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 10px 16px;

  & svg {
    width: 12px;
  }

  @media screen and ${device.tablet} {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const Active = styled.span`
  height: 2px;
  background-color: ${p =>
    p.theme.isDark ? p.theme.light[50] : p.theme.grey[500]};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Tab = ({ active, children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Wrapper {...rest}>
    <Button>{children}</Button>
    {active && <Active></Active>}
  </Wrapper>
);

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};

Tab.defaultProps = {
  active: false,
};

export default Tab;