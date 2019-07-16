
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import styles from '../styles.css';

const fetchData = async () => {
    try {
        //const res = await fetch('data/test.json');
        //const data = await res.json();
        //return data.frames;
        //==============================================
    }
    catch(err) {
        console.log('fetchData error', err.message || err);
    }
};

let runOnce = false;

const App = ({data}) => {
    //console.log('got data', data);
    //const [frames, setFrames] = useState(data);
    const [items, setItems] = useState(data);

    const sorter = (key) => {
        if(frames) {
            frames.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
            const tmpList = frames.map((f) => <li key={f.id}>[{f.id}] {f.name} - {f.rating}</li>);
            setItems(tmpList);
        }
    };
    
    if(!runOnce) {
        /*fetchData().then(data => {
            setFrames(data);
            let list = frames.map((f) => <li key={f.id}>[{f.id}] {f.name} - {f.rating}</li>);
            setItems(list);
            runOnce = true;
        });*/
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div>Webpack App</div>
                </div>
                <div className="col-lg-6">
                    <div>Right App</div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="sort-list">
                        <button onClick={() => sorter('id')}>Sort By Id</button>
                        <button onClick={() => sorter('name')}>Sort By Name</button>
                        <button onClick={() => sorter('rating')}>Sort By Rating</button>
                        <ul style={{"listStyleType":"none"}}>
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

/*
ReactDOM.hydrate(
    <App />,
    document.getElementById('root')
);
*/

export default App;
