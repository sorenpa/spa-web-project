import * as React from 'react';
import './App.css';


import {Canvas, Overlay} from './components/';


interface IState{
  height: number,
  width: number,
  showModal: boolean,
}

interface IProps{
  initializeCallback: () => void,
}

class App extends React.Component<IProps, IState> {

  constructor(props:any) {
    super(props);
    this.state = { width: 0, height: 0, showModal: true };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.ModalOnClose = this.ModalOnClose.bind(this);
    this.ModalOnAccept = this.ModalOnAccept.bind(this);
    
    this.props.initializeCallback();
  }
  
  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  public updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  public ModalOnClose(){
    console.log('Close');
    this.setState({showModal: false});
  }

  public ModalOnAccept(){
    console.log('Accept');
    this.setState({showModal: false});
    const element: HTMLElement|null = document.getElementById('App');
    
    if(element !== null)
    {
      goFullScreen(element);
    }
  }

  public render() {
    const {height, width} = this.state;
   
    return (
      <div id='App' className='App'>
        {/* <Modal 
          top={this.state.height/2}
          left={this.state.width/2}
          show={this.state.showModal} 
          onClose={this.ModalOnClose} 
          onAccept={this.ModalOnAccept}>
          <h2>The spag game wants to enter full-screen mode. Do you want to accept ?</h2>
        //</Modal> */}
        <Overlay />
        <Canvas width={width} height={height}/>
      </div>
    );
  }
}

function goFullScreen(element: HTMLElement){
  if(element.requestFullscreen){
    element.requestFullscreen();
  }
  else if(element.webkitRequestFullscreen){
    element.webkitRequestFullscreen()
  }
}



export default App;
