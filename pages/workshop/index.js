import {
  Box,
  Container,
  OutlinedInput,
  Link,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import { DateRangePicker, LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import SEOHead from '@/const/head'
import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import { components } from '@/const/components'
import HeroBanner from '@/components/molecules/Banners/HeroBanner'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import imageoptimization from '@/const/imageoptimization'
import ContentGrid from '@/components/organisms/contentgrid'
import { workshopItemToCardData } from '@/lib/data-transformations'
import WorkshopItem from '@/components/molecules/Workshop/WorkshopItem'
import TextStyle from '@/components/atoms/textstyle'
import { hasMemberBookPrice } from '@/lib/access-validator'
import { AppContext } from '@/context/state'
import NeverMiss from '@/components/workshop/NeverMiss'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 150,
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    // textAlign: 'left',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
}))

export default function AuthorWorkshop({
  page,
  workshops,
  // eventTypes,
  topics,
}) {
  const classes = useStyles()
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 60 * 4.5 + 8,
        width: 250,
      },
    },
  }
  // const allEventTypes = eventTypes.map((e) => e.fields?.title)
  const allTopics = topics.map((t) => t.fields?.title)
  const featuredWorkshop = workshops
    .filter((workshop) => workshop.fields?.featured)
    .slice(0, 1)
  const otherWorkshops = workshops.filter(
    (workshop) =>
      featuredWorkshop[0] && workshop?.sys?.id !== featuredWorkshop[0]?.sys.id
  )
  const dateFns = new DateFnsUtils()
  const dateFormat = require('dateformat')

  const { userAccessData } = useContext(AppContext)
  const useMemberBookPrice = hasMemberBookPrice(userAccessData)
  const [value, setValue] = useState([
    new Date(),
    dateFns.addMonths(new Date(), 1),
  ])
  // const [selectedEventTypes, setSelectedEventTypes] = useState(['All Events'])
  const [selectedTopics, setSelectedTopics] = useState(['All Topics'])
  const [listOfGridWorkShops, setListOfGridWorkShops] = useState(otherWorkshops)
  // const handleChangeEvents = (event) => {
  //   setSelectedEventTypes(event.target.value)
  // }
  const handleChangeTopics = (event) => {
    setSelectedTopics(event.target.value)
  }

  useEffect(() => {
    let otherWorkshopsFiltered = otherWorkshops

    if (!selectedTopics.includes('All Topics')) {
      otherWorkshopsFiltered = otherWorkshops.filter((ow) =>
        ow.fields.topics.some((t) =>
          selectedTopics.some((s) => s === t.fields.title)
        )
      )
    }
    // if (!selectedEventTypes.includes('All Events')) {
    //   otherWorkshopsFiltered.filter((ow) =>
    //     selectedEventTypes.some((s) => s === ow.fields.title)
    //   )
    // }

    if (value[0] !== null && value[1] !== null) {
      const ows = otherWorkshopsFiltered.filter((ow) =>
        ow.fields.variations.some((v) =>
          v.fields.sessions.some(
            (s) =>
              new Date(s.fields.startDatetime) >= new Date(value[0]) &&
              new Date(s.fields.startDatetime) <= new Date(value[1])
          )
        )
      )
      setListOfGridWorkShops(ows)
    } else {
      setListOfGridWorkShops(otherWorkshopsFiltered)
    }
  }, [value, selectedTopics])

  const handleClearFilters = () => {
    // setSelectedEventTypes(['All Events'])
    setSelectedTopics(['All Topics'])
    setValue([null, null])
    setListOfGridWorkShops(otherWorkshops)
  }

  const _renderPageContent = (content) => {
    return (
      content &&
      content.map((item, key) => {
        if (item.sys.contentType.sys.id === 'componentBanner') {
          return (
            <HeroBanner
              title={item.fields.title}
              description={documentToReactComponents(item.fields.body, options)}
              imagePos='right'
              image={
                item.fields?.image?.fields?.imageBynder
                  ? item.fields?.image?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url
                  ? item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              imageAlt={item.fields.title}
              ctaLabel1={item.fields.cta && item.fields.cta[0]?.fields.label}
              ctaLink1={item.fields.cta && item.fields.cta[0]?.fields.url}
              ctaLabel2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.label
              }
              ctaLink2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.url
              }
            />
          )
        } else {
          return (
            <Container maxWidth='lg'>
              <Box mt={[5, 10]} key={key}>
                {components(item, Math.floor(Math.random() * 10 + 1))}
              </Box>
            </Container>
          )
        }
      })
    )
  }

  return (
    <Layout>
      <SEOHead seo={page?.fields?.seo ? page.fields.seo : page} />
      <Box mb={[6, 10]}>{_renderPageContent(page.fields.content)}</Box>
      <Container>
        {featuredWorkshop[0] && (
          <Box mb={[6, 10]} mt={[6, 10]}>
            <Box mb={3}>
              <TextStyle variant='h4'>
                Upcoming Author Workshops and Institutes
              </TextStyle>
            </Box>
            <WorkshopItem
              useMemberBookPrice
              cardData={workshopItemToCardData(
                featuredWorkshop[0],
                featuredWorkshop[0].fields.variations[0]
              )}
            />
          </Box>
        )}
        <Box className={classes.filter}>
          {/* <Box>
            <FormControl variant='outlined' className={classes.formControl}>
              <Select
                multiple
                value={selectedEventTypes}
                onChange={handleChangeEvents}
                MenuProps={MenuProps}
                displayEmpty
              >
                <MenuItem value='All Events'>All Events</MenuItem>
                {allEventTypes.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box> */}
          <Box pl={1}>
            <FormControl variant='outlined' className={classes.formControl}>
              <Select
                multiple
                value={selectedTopics}
                MenuProps={MenuProps}
                onChange={handleChangeTopics}
                displayEmpty
              >
                <MenuItem value='All Topics'>All Topics</MenuItem>
                {allTopics.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box pl={1}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DateRangePicker
                keyboard
                calendars={2}
                value={value}
                inputFormat='MMM dd, yyyy'
                onChange={(newValue) => setValue(newValue)}
                renderInput={({ inputProps, ...startProps }, endProps) => {
                  const startValue = inputProps.value
                  delete inputProps.value
                  return (
                    <OutlinedInput
                      {...startProps}
                      style={{ width: 280 }}
                      inputProps={inputProps}
                      placeholder='Select Date Range'
                      notched={false}
                      label='Date Range'
                      type='text'
                      value={`${startValue} - ${endProps.inputProps.value}`}
                      endAdornment={<CalendarTodayIcon />}
                    />
                  )
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box pl={1}>
            <Link onClick={handleClearFilters}>Clear Filters</Link>
          </Box>
        </Box>
        {listOfGridWorkShops[0] ? (
          <Box mb={[6, 10]} mt={[6, 10]}>
            <ContentGrid
              showFilters={false}
              showDivider={false}
              showViewAll={false}
              items={listOfGridWorkShops}
              columnWidth={4}
              limit={6}
              variant='workshop'
              useMemberBookPrice={useMemberBookPrice}
            />
          </Box>
        ) : (
          <Box>
            <TextStyle variant='h4'>No Events Found.</TextStyle>
          </Box>
        )}
        <Box>
          <NeverMiss />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'page',
    'fields.pageId': 'workshopsLanding',
    include: 2,
    limit: 1,
  })

  const workshopData = await client.getEntries({
    content_type: 'workshop',
    include: 4,
  })

  // const eventTypeData = await client.getEntries({
  //   content_type: 'categoryEvents',
  //   include: 1,
  // })

  const TopicsData = await client.getEntries({
    content_type: 'categoryTopics',
    include: 1,
  })

  return {
    props: {
      page: data?.items[0] || null,
      workshops: workshopData.items,
      // eventTypes: eventTypeData.items,
      topics: TopicsData.items,
    },
    revalidate: 20,
  }
}
