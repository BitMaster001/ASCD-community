import React from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CtaButton from '@/components/atoms/ctabutton'
import AuthorGroup from '@/components/atoms/authorgroup'
import PropTypes from 'prop-types'
import TextStyle from '@/components/atoms/textstyle'
import { useRouter } from 'next/router'
import ShareButtons from '@/components/molecules/sharebuttons'
import paths from '@/paths/path'
import CustomLink from '@/components/atoms/CustomLink'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: (props) => props.align,
    maxWidth: 650,
    margin: '0 auto',
    width: (props) => (props.twoThirds ? '60%' : '100%'),
    marginLeft: (props) => props.twoThirds && 0,
    [theme.breakpoints.down('sm')]: {
      width: (props) => props.twoThirds && '100%',
    },
  },
  ctaContainer: {
    display: (props) => (props.align !== 'center' ? 'flex' : 'block'),
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      flexDirection: 'row',
      alignItems: 'unset',
    },
  },
  ctaBox: {
    width: '100%',
    '& a': {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'unset',
      '& a': {
        width: (props) => (props.ctaWidth ? props.ctaWidth : '100%'),
      },
    },
  },
  pipe: {
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  outlined: {
    backgroundColor: theme.palette.common.white,
  },
  shareBtns: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      height: 38,
    },
    '& button': {
      height: 38,
    },
  },
}))

export default function IssueBannerTitle({
  tag,
  issue,
  landing,
  ctaLabel,
  ctaLink,
  authors,
  featuredAuthors,
  extraLink,
  ...props
}) {
  const classes = useStyles(props)
  const router = useRouter()

  const dateFormat = require('dateformat')

  const dt = extraLink
    ? issue.metadata.datePosted &&
      new Date(issue.metadata.datePosted + 'T00:00:00').toString() ==
        'Invalid Date'
      ? new Date(issue.metadata.datePosted)
      : new Date(issue.metadata.datePosted + 'T00:00:00')
    : null

  return (
    <Box className={classes.root}>
      {tag && (
        <Chip
          label='Educational Leadership'
          variant='outlined'
          classes={{ outlined: classes.outlined }}
        />
      )}

      {landing && landing.title && (
        <Box mt={3}>
          <TextStyle variant='h1'>{landing.title}</TextStyle>
        </Box>
      )}
      {landing && landing.subtitle && (
        <Box
          mt={2}
          display='flex'
          justifyContent={props.align == 'center' ? 'center' : 'flex-start'}
        >
          <TextStyle variant='subtitle1'>{landing.subtitle}</TextStyle>
        </Box>
      )}

      {issue && issue.title && (
        <Box my={3}>
          <TextStyle variant='h2'>{issue.title}</TextStyle>
        </Box>
      )}

      {issue && issue.description && (
        <Box my={3}>
          <TextStyle variant='body2'>{issue.description}</TextStyle>
        </Box>
      )}

      {issue && issue.metadata && (
        <Box>
          {issue.metadata.datePosted && (
            <>
              <TextStyle component='span' variant='body3'>
                {dateFormat(
                  issue.metadata.datePosted + 'T00:00:00',
                  'mmmm d, yyyy'
                )}
              </TextStyle>
              <Typography
                component='span'
                variant='body2'
                className={classes.pipe}
              >
                |
              </Typography>
            </>
          )}
          {issue.metadata.volumeNo && (
            <>
              <TextStyle component='span' variant='body3'>
                Volume {issue.metadata.volumeNo}
              </TextStyle>
              <Typography
                component='span'
                variant='body2'
                className={classes.pipe}
              >
                |
              </Typography>
            </>
          )}
          {issue.metadata.issueNo && (
            <>
              <TextStyle component='span' variant='body3'>
                Number {issue.metadata.issueNo}
              </TextStyle>
            </>
          )}
        </Box>
      )}

      <Box mb={2} className={classes.ctaContainer}>
        {ctaLabel && (
          <Box mr={[0, 2]} my={[3, 0]} className={classes.ctaBox}>
            <CtaButton
              variant='contained'
              color='primary'
              width='100%'
              size='large'
              label={ctaLabel}
              href={ctaLink}
            />
          </Box>
        )}
        {issue && issue.title && issue.slug && (
          <Box className={classes.shareBtns}>
            <ShareButtons
              url={paths.el({ slug: issue.slug })}
              title={issue.title}
            />
          </Box>
        )}
        {authors && (
          <Box className={classes.ctaBox}>
            <AuthorGroup
              double
              authors={featuredAuthors}
              label={authors.ctaLabel}
              link={authors.ctaLink}
              onclick={() => router.push('/authors')}
            />
          </Box>
        )}
      </Box>
      {extraLink && dt.getFullYear() == '2021' && dt.getMonth() + 1 == '7' && (
        <Box my={5} px={[5, 0, 0]} textAlign={['center', 'left', 'left']}>
          <CustomLink
            href='https://share.hsforms.com/1KGJ1NHq1T5Og0HOn6HeZOA4rwbz?__hstc=258360661.7d073d228b90833ecab4fcc424388120.1608059657822.1626182273289.1626206955662.363&__hssc=258360661.2.1626206955662&__hsfp=1879013358'
            label='Download the Summer 2021 issue of EL'
            target='_blank'
            size='large'
          />
        </Box>
      )}
    </Box>
  )
}

IssueBannerTitle.propTypes = {
  tag: PropTypes.string,
  issue: PropTypes.shape({
    title: PropTypes.string,
    metadata: PropTypes.shape({
      datePosted: PropTypes.string,
      volumeNo: PropTypes.string,
      issueNo: PropTypes.string,
    }),
  }),
  landing: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }),
  ctaLabel: PropTypes.string,
  ctaLink: PropTypes.string,
  share: PropTypes.string,
  bookmark: PropTypes.string,
  authors: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    ctaLabel: PropTypes.string,
    ctaLink: PropTypes.string,
  }),
  align: PropTypes.string,
}
