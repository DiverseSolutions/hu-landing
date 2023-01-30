import React from 'react'
import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  primary?: boolean;
}

export default function Button({ children, primary }: Props) {
  return (
    <div className={classNames('px-4 py-2 font-bold text-white rounded cursor-pointer hover:bg-blue-700', {
      'bg-blue-500': primary,
      'bg-white': !primary
    })}>
      {children}
    </div>
  )
}