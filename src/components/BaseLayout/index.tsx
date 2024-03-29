import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import LayoutCustom from '../Layout';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <LayoutCustom>{children || <Outlet />}</LayoutCustom>;
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
