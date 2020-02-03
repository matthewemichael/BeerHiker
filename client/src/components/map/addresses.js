import React from 'react';

const address = (props) => {

    return(
            <div className="search_result" onClick={() => props.handleClick(props.places.id)}>
                {props.places.address}
            </div>
    )
}

export default address