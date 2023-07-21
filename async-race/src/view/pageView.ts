import headerView from './header/headerView';
import mainView from './main/mainView';
import footerView from './footer/footerView';

const pageView = () => {
  const root = document.createElement('div');
  root.innerHTML = headerView + mainView + footerView;
  document.body.appendChild(root);
};
export default pageView;
