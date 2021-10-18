import reactDom from 'react-dom';
import ReactApp from './App';

test('renders learn react link', () => {
  const div = document.createElement("div");
  reactDom.render(<ReactApp/>, div);
  reactDom.unmountComponentAtNode(div);
});
