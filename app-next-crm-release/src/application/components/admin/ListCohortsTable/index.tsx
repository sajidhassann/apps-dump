import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { Loader } from '@mantine/core'
import React, { useEffect, useMemo } from 'react'
import PaginatedTable, { PaginatedTableProps } from '../../core/PaginatedTable'
import { Pagination } from '@/application/models/shared/pagination.model'
import { CampaignBucket } from '@/application/models/cohort/campaign.bucket.model'

const columns = ['Cohort Name', 'Created At']
const ListCohortsTable = () => {
    const dispatch = useAppDispatch()
    const { buckets, isLoading, bucket }: ICampaignBucketState = useAppSelector(state => state.campaignBucket)

    const { user }: IAuthState = useAppSelector(state => state.auth)

    useEffect(() => {
        dispatch(loadBuckets())
    }, [])

    const cohortTableProps = useMemo<PaginatedTableProps<CampaignBucket>>(() => ({
        renderHeader: () => {
            return <tr>
                {columns.map(col => <th key={col}>
                    {col}
                </th>)}
            </tr>
        },
        data: new Pagination<CampaignBucket>({
            items: buckets,
            totalPages: 1,
            pageSize: buckets.length,
            pageNumber: 1,
            count: buckets.length
        }),
        render: data => {
            return <tr>
                <td>{data.name}</td>
                <td>{data.createdAt.toDateString()}</td>
            </tr>
        },
        onPageChange: page => {
            return
        }
    }), [buckets])


    return (
        <>
            {isLoading ? <Loader/> : null}
            {buckets && (
                <div>
                    <PaginatedTable {...cohortTableProps}/>
                </div>
            )}

        </>
    )
}

export default ListCohortsTable