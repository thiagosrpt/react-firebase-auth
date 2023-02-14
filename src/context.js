import React from 'react';

function Card(props){


    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <>
      {props.status && (<div id='createStatus' className="alert alert-danger">{props.status}</div>)}
      <div className={classes()} style={{minWidth: "30rem"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
        </div>
      </div>
      </>
    );    
  }

function LargeCard(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (

      <div className={classes()} style={{maxWidth: "30rem"}}>
        {props.body}
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          <a href={props.hash} className="btn btn-primary">{props.button}</a>
        </div>
      </div>
    );    
  }

  export default LargeCard;