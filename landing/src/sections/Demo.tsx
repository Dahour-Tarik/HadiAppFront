/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

 import React from 'react';
 import { DemoComponent } from '../demo/demo-component';
 import Container from "@material-ui/core/Container";
 
 
 export interface DemoProps {}
 
 export const Demo: React.FC<DemoProps> = (props) => {
     return (
             <DemoComponent />
     );
 };
 