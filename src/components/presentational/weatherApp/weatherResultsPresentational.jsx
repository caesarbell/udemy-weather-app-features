import React from 'react';

const weatherResultsPresentational = (props) => {

    console.log('props for the results page', props);

    return(
        <div className="results">
            <p className="text-center"> weather for {props.address} </p>
           {(() => {
               if(props.results) {
                   return props.results.map((result, index) => {
                       return(
                           <p key={index}> {index == 0 ? 'Today' : result.day }</p>
                       );
                   })
               }
           })()}
        </div>
    ); 
}

export default weatherResultsPresentational; 