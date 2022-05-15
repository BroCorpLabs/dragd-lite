# React Drag Drop UI Library

## ⚠️⚠️⚠️ WIP Notice ⚠️⚠️⚠️

## Entrypoint

In your project directory, you can run:

### `npm install react-dragdrop-ui`

```jsx
<DragDrop
    immutable={false}
    saveCallback={(data) => {
        console.log(data);
    }}
    onChangedCallback={(data) => {
        console.log(data);
    }}
    initialState={itemData}
    pending
/>
```

You can use the sample data in `buildData.json` under templates to build out your initialState

## Roadmap

[ ] Get the npm publish step to start emitting a built `dist` folder, [ref](https://github.com/BroCorpLabs/dragd-lite/issues/2)

[ ] Provide a way to make changes to my hunks using the editor and check it into my codebase, [ref](https://github.com/BroCorpLabs/dragd-lite/issues/3)