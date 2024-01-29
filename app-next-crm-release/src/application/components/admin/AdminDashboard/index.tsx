import { createStyles, Group, Title } from '@mantine/core'
import { useState } from 'react'
import AddCohortButton from '../AddCohortButton'
import ListCohortsTable from '../ListCohortsTable'

const useStyles = createStyles((_) => ({
  heading: {
    color: '#05046A',
    fontWeight: 600,
  },
  actionBoxContainer: {
    height: '50vh',
  },
}))

function AdminDashboard() {
  const { classes } = useStyles()
  const [modalType, setModalType] = useState<string>('')
  return (
    <>
        <Group p={'2rem'}>
            
      <Title order={2} className={classes.heading}>
        Manage Cohorts
      </Title>
      <AddCohortButton/>
        </Group >
      <ListCohortsTable />
    </>
  )
}

export default AdminDashboard
