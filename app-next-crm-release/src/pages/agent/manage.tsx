import AdminDashboard from '@/application/components/admin/AdminDashboard'
import { LayoutProvider } from '@/application/providers/LayoutProvider'
import { NextPage } from 'next'

const Manage: NextPage =()=> {
  return (
    <LayoutProvider>
        <main>
          <AdminDashboard />
        </main>
    </LayoutProvider>
  )
}

export default Manage
