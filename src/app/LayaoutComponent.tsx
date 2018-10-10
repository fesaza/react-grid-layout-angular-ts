import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DashboardLayout from './DashboardLayout';
// import { DashboardLayout } from './DashboardLayout';

export class LayaoutComponent {
  static initialize(){
    ReactDOM.render(<DashboardLayout />, document.getElementById('rootReact'))
  }
}