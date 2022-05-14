import React, { useState } from 'react';

function GenericModal(props) {
    return (
        <div className="modal is-active" style={{ zIndex: 999999999999 }}>
            <div className="modal-background" onClick={() => props.onDone()} />
            <div className="EditItemModal__card card">
                <div className="card-content">
                    {props.content && props.content}
                </div>
            </div>
        </div>
    );
}

export default GenericModal;
