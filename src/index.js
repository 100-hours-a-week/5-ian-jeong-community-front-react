import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// localhost:3000 이동시 public/index.html이 뿌려짐
// 그 다음 index.js가 진입점으로서 실행됨
// index.html에서 Root가져옴
const root = ReactDOM.createRoot(document.getElementById('root'));


// 루트에다가 App 컴포넌트 뿌림, 현재 앱은 라우팅 컴포넌트
root.render(
  <React.StrictMode>
    <App/> 
  </React.StrictMode>
);

