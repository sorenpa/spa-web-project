import { IVector3D } from '../Math/interfaces';
import RenderObject from './RenderObject';


export default class Rectangle extends RenderObject{

    constructor(position:IVector3D, height: number, width: number, color:string = '#f33'){
        super(position, 'rectangle');
    }

    

}