import React from 'react';

export function Container({children}) {
  return <div className='max-w-6xl container mx-auto p-8'>{children}</div>;
}
