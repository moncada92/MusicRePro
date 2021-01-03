import React from 'react';
import { FaMusic } from "react-icons/fa";

const Nav = ({libraryStatus, setLibraryStatus}) => {

  const toggleMenuHandler = () => setLibraryStatus(!libraryStatus);

  return ( 
    <nav>
      <h1>Waves</h1>
      <button onClick={toggleMenuHandler}>
        Library
        <FaMusic />
      </button>
    </nav>
   );
}
 
export default Nav;