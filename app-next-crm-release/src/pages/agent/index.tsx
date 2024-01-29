import Agent from '@/application/components/agent'
import { APPLICATION_NAME } from '@/application/constants'
import { LayoutProvider } from '@/application/providers/LayoutProvider'
import { NextPage } from 'next'
import Head from 'next/head'

const AgentDashboard: NextPage = () => {

	return (
		<LayoutProvider>
			<Head>
				<title>{APPLICATION_NAME} — Agent Dashboard </title>
			</Head>
			<main>
				<Agent />
			</main>
		</LayoutProvider>
	)
}

export default AgentDashboard
