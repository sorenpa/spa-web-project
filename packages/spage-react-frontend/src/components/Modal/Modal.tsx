import * as React from 'react';
import './Modal.css'

interface IProps{
    show: boolean,
    top: number,
    left: number
    onClose: () => void,
    onAccept: () => void,
    children?: any
}

class Modal extends React.Component<IProps, {}> {
  public render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // TODO: Pop-up top/left is hardcoded
    // TODO: style buttons, they are ugly
    return (
        <div className="Modal-window" style={{ top: this.props.top - 200, left: this.props.left - 300 }}>
          {this.props.children}

          <div className="Modal-footer">
            <button className='button' onClick={this.props.onAccept}>
              Accept
            </button>
            <button className='button' onClick={this.props.onClose}>
              Decline
            </button>
          </div>
        </div>
    );
  }
}

export default Modal;