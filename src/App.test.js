import reactDom from 'react-dom';
import ReactApp from './App';

test('App renders and removes div', () => {
  const div = document.createElement("div");
  reactDom.render(<ReactApp/>, div);
  reactDom.unmountComponentAtNode(div);
});

