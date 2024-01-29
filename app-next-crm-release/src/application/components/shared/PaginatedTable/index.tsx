import styles from './styles.module.scss'
import {useCallback, useEffect, useRef} from 'react'

export type PaginatedTableProps<T> = {
	columns: string[]
	data: { items: T[], nextToken: string | null }
	render: (item: T, index: number, page: number) => JSX.Element
	loading?: boolean
	currentPage?: number
	loadItems?: (token: string | null) => Promise<void>
	hover?: boolean
	reset?: any[]
	header?: JSX.Element
	emptyText?: string
	addon?: JSX.Element
	// totalPages
}

export default function PaginatedTable<T>(props: PaginatedTableProps<T>): JSX.Element {

	const {
		columns,
		data,
		render,
		loading = false,
		currentPage = 1,
		loadItems,
		hover = false,
		reset = [],
		header,
		emptyText = 'No Queries',
		addon
	} = props
	const {items, nextToken} = data ?? {}

	// const cachedData = useRef<T[]>([])
	const tokens = useRef<string[] | null[]>([null, null])
	const page = useRef<number>(currentPage)


	const onPrev = useCallback(() => {
		page.current--
		const token: string | null = tokens.current[page.current]
		console.log({token})
	}, [loadItems])

	const onNext = useCallback(() => {
		page.current++
		let token: string | null = tokens.current[page.current]
		if (!token) {
			token = nextToken ?? ''
			tokens.current.push((nextToken ?? '') as never)
		}
	}, [loadItems, nextToken])

	useEffect(() => {
		page.current = currentPage
		tokens.current = [null, null]
	}, reset)

	// const onPrev = useCallback(() => {
	// 	page.current--
	// 	setItems(cachedData.current.slice((page.current * 3) + 1, ((page.current + 1) * 3) + 1))
	// }, [])
	//
	// const onNext = useCallback(() => {
	// 	page.current++
	// 	setItems(cachedData.current.slice((page.current * 3) + 1, ((page.current + 1) * 3) + 1))
	// }, [])

	// useEffect(() => {
	// 	loadItems('0')
	// }, [])

	return <div className={`${styles.tableBorder} text-center bg-white d-flex flex-column w-100`} style={{overflowX:'auto'}}>
		{header}
		{/* <Table responsive hover={hover} className={[styles.textVerticalCenter, 'm-0'].join(' ')} >
			<thead className={[styles.tableHeadBorderBottom].join(' ')}>
				<tr className={[styles.textDarkGrey].join(' ')}>
					{columns.map((column) => <th key={column}>{column}</th>)}
				</tr>
			</thead>
			<tbody className={`${styles.tableRowBorderBottom}`}>
				{addon}
				{
					loading && <tr>
						<td colSpan={columns.length}><Spinner className="ml-auto" animation="grow"/></td>
					</tr>
				}
				{
					!addon && !loading && items?.length === 0 && <tr>
						<td colSpan={columns.length} className="text-center py-4">{emptyText}</td>
					</tr>
				}
				{
					!loading && items?.map((item, index) =>
						render(item, index, 1)
					)
				}
			</tbody>
		</Table>
		<Pagination
			className={
				`m-0 p-2 align-self-center border-0 pagination w-100 justify-content-center ${[styles.bgGrey, styles.borderBottomRadius20].join(' ')}`
			}
		>
			<Pagination.Prev
				onClick={onPrev}
				className={[styles.pageItem, styles.disabled].join(' ')}
				disabled={page.current === 1 || loading}>
				Prev
			</Pagination.Prev>
			<Pagination.Item
				className={[styles.pageItem, styles.disabled, styles.textBlack].join(' ')}
				disabled>
				{page.current}
			</Pagination.Item>
			<Pagination.Next
				onClick={onNext}
				className={[styles.pageItem, styles.disabled].join(' ')}
				disabled={!nextToken || loading}>
				Next
			</Pagination.Next>
		</Pagination> */}
	</div>
}