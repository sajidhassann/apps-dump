import { Button } from '@mantine/core'
import { LoadingState } from '@src/application/constants/enums/loading.state'
import { AppDispatch } from '@src/application/redux'
import { useAppSelector } from '@src/application/redux/hooks'
import {
  bulkAddCohortUsers,
  bulkReplaceCohortUsers,
} from '../../../../redux/networkThunk/PushNotifications/campaign'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ICohortSliceState } from '../../../../redux/states/PushNotifications/types'

type ImportCohortUsersButtonType = {
  replace?: boolean;
  title: string;
  color?: string;
};
const ImportCohortUsersButton = ({
  replace,
  title,
  color = 'yellow',
}: ImportCohortUsersButtonType) => {
  const dispatch = useDispatch<AppDispatch>()

  const { loading, currentCohortID }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  const takeFileInput = async () => {
    const file = await new Promise<File>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.csv'
      input.onchange = () => {
        if (input.files && input.files.length > 0) resolve(input.files[0])
      }
      input.click()
    })
    if (replace) {
      dispatch(
        bulkReplaceCohortUsers({ file, cohortID: currentCohortID as string })
      )
    } else {
      dispatch(
        bulkAddCohortUsers({ file, cohortID: currentCohortID as string })
      )
    }
    // .unwrap()
    // .then(() => {
    //   dispatch(listCohortUsersCount(currentCohortID as string))
    // })
  }
  return (
    <Button
      disabled={!currentCohortID}
      fullWidth
      color={color}
      variant="outline"
      onClick={takeFileInput}
      loading={loading == LoadingState.UPDATE}
    >
      {title} (Select CSV)
    </Button>
  )
}

export default ImportCohortUsersButton
