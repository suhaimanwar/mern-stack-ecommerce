'use client'
import React, { ReactNode } from 'react'
import { CartProvider } from '@mrvautin/react-shoppingcart';

type Props = {
    children: ReactNode
}

const ProviderClient = ({children} : Props) => {
  return (
    <CartProvider>
        {children}
    </CartProvider>
  )
}

export default  ProviderClient