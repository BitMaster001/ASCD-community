import React, { useEffect, useState } from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'

import { useRouter } from 'next/router'
import useUserAccount from '../../lib/hooks/useUserAccount'
import PaymentsTab from '@/components/UserAccount/PaymentsTab'
import OrdersTab from '@/components/UserAccount/OrdersTab'
import LearningTab from '@/components/UserAccount/LearningTab'
import PreferencesTab from '@/components/UserAccount/PreferencesLab'
import {
  PAYMENTS,
  ORDERS,
  LEARNING,
  PREFERENCES,
  NOTES,
} from '@/components/UserAccount/tabConstants'

const useStyles = makeStyles((theme) => ({}))
export default function AccountTab({ tab }) {
  const router = useRouter()
  const classes = useStyles()
  const { userAccountUser } = useUserAccount()
  console.log('useraccount ', userAccountUser)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
    }
  }, [])

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={tab}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>

      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          {tab === ORDERS && <OrdersTab />}
          {tab === LEARNING && <LearningTab />}
          {tab === PREFERENCES && <PreferencesTab />}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const tabs = [PAYMENTS, ORDERS, LEARNING, PREFERENCES, NOTES]
  return {
    paths: tabs.map((tab) => ({
      params: { slug: tab },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      tab: params.slug,
    },
    revalidate: 20,
  }
}