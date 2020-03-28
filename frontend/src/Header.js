import React from 'react';


function Header({title, children}) {
  return (
    <div className="Header">
      <h1>{title}</h1>
      <h3>{children}</h3>      
    </div>
  );
}

export default Header;
