import { NextPage } from 'next'
import Head from 'next/head'
import { APPLICATION_NAME } from '@src/application/constants'
import { LayoutProvider } from '@src/application/providers/LayoutProvider'
import PushNotifications from '@src/application/components/admin/PushNotifications'
import CampaignCreation from '@src/application/components/admin/Campaign'

const CampaignsPage: NextPage = () => {
    return (
        <LayoutProvider>
            <Head>
                <title>Admin - {APPLICATION_NAME}</title>
            </Head>
            <main>
                {/* TODO: Revert */}
                <CampaignCreation/>
                {/* <NotesForm/> */}
            </main>
        </LayoutProvider>
    )
}

export default CampaignsPage
