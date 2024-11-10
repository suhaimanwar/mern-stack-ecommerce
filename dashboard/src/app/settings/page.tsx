import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import AccountSettings from './components/accountsettings'

const page = () => {
  return (
    <DefaultLayout>
        {/* <ECommerce /> */}
        {/* <BrandTable/> */}
        <AccountSettings />
        
      </DefaultLayout>
  )
}

export default page