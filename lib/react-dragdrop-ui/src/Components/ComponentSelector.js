import React from 'react';
import DraggableText from './DraggableText';
// import dynamic from 'next/dynamic';
// const EditItem = dynamic(() => import('./DDEditor/EditItem'));
// const DraggableImage = dynamic(() => import('./DraggableImage'));
// const DraggableDiv = dynamic(() => import('./DraggableDiv'));
// const DraggableText = dynamic(() => import('./DraggableText'));
// const DraggableGiphy = dynamic(() => import('./DraggableGiphy'));
// const DraggableVideo = dynamic(() => import('./DraggableVideo'));
// const DraggableAudio = dynamic(() => import('./DraggableAudio'));
// const DraggableButton = dynamic(() => import('./DraggableButton'));
// const DraggableHtml = dynamic(() => import('./DraggableHtml'));
// const DraggableForm = dynamic(() => import('./DraggableForm'));
// const DraggableTemplate = dynamic(() => import('./DraggableTemplate'));
// const NextHead = dynamic(() => import('./NextHead.js'));

function ComponentSelector({ elem, selected }) {
    const isSelected = selected && selected.includes(elem.id);
    switch (elem.type) {
        // case 'test':
        //     return (
        //         <EditItem elemData={elem} selected={isSelected}>
        //             Drag Me!
        //         </EditItem>
        //     );
        case 'text':
            return (
                <DraggableText
                    elemData={elem}
                    selected={isSelected}
                />
            );
        default:
            return <></>;
    }
}

export default ComponentSelector;
