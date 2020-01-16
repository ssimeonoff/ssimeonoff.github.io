import ReactDOM from 'react-dom';
import React, { useState } from 'react';

function logRandom() {
  console.log(Math.random());
}

function Button() {
  const [counter, setCounter] = useState(2);
	return <button onClick={() => setCounter(counter*2)}>{counter}</button>;
}

ReactDOM.render(
  <Button />,
  document.getElementById('root'),
);

export default Button;
