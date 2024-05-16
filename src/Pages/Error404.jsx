import React from 'react'
import { useEffect } from 'react';

const Error404 = () => {

  useEffect(()=> {
    window.scrollTo(0, 0);

  }, []);

  return (
    <div>
        Error 404
    </div>
  )
}

export default Error404
