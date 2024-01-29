import { NextPage } from 'next'
import Head from 'next/head'
import { APPLICATION_NAME } from '@src/application/constants'
import { LayoutProvider } from '@src/application/providers/LayoutProvider'
import CohortManagement from '@src/application/components/admin/Cohorts'

const CohortsPage: NextPage = () => {
    return (
        <LayoutProvider>
            <Head>
                <title>Admin - {APPLICATION_NAME}</title>
            </Head>
            <main>
                {/* TODO: Revert */}
                <CohortManagement />
                {/* <NotesForm/> */}
            </main>
        </LayoutProvider>
    )
}

export default CohortsPage
