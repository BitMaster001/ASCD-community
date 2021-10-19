import React, { useEffect } from 'react'
import { Box, FormControl, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomLink from '@/components/atoms/CustomLink'
import paths from '@/paths/path'
import TextStyle from '@/components/atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  select: {
    display: 'flex',
    justifyContent: 'center',
    '& *': {
      textTransform: 'uppercase',
    },
    '& svg': {
      color: theme.palette.grey.medium,
    },
  },
  formControl: {
    margin: theme.spacing(0),
    marginLeft: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  subheading: {
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
}))

export default function BookBannerPrice({
  collection,
  version,
  versions,
  onchange,
  hasMemberBookPrice,
}) {
  const classes = useStyles()

  const [currentVersion, setCurrentVersion] = React.useState(null)
  const [options, setOptions] = React.useState([])

  const handleChange = (event) => {
    setCurrentVersion(event.target.value)
    onchange(event.target.value)
  }

  useEffect(() => {
    if (version) {
      setCurrentVersion(version.fields?.productNumber)
    }
  }, [version])

  useEffect(() => {
    if (versions) {
      const versionOptions = versions.map((v) => {
        return {
          label: v?.fields?.bookType.fields.title,
          value: v?.fields?.productNumber,
        }
      })
      setOptions(versionOptions)
    }
  }, [versions])

  return (
    <Box>
      <Box display='flex' alignItems='flex-end' mb={1}>
        {collection ? (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box mr={1}>
              <TextStyle variant='strikeThrough'>
                $
                {hasMemberBookPrice
                  ? collection?.fields?.memberOriginalPrice
                  : collection?.fields?.originalPrice}
              </TextStyle>
            </Box>
            <Box>
              <TextStyle variant='h3' color='#0C8671'>
                $
                {hasMemberBookPrice
                  ? collection?.fields?.memberDiscountedPrice
                  : collection?.fields?.discountedPrice}
              </TextStyle>
            </Box>
          </Box>
        ) : (
          <TextStyle variant='h3'>
            $
            {hasMemberBookPrice
              ? version?.fields?.priceMember
              : version?.fields?.priceNonMember}
          </TextStyle>
        )}
        {!collection && (
          <FormControl className={classes.formControl}>
            <Select
              labelId='select-book-version-label'
              id='select-book-version'
              value={currentVersion}
              onChange={handleChange}
              className={classes.select}
              disableUnderline
              autoWidth
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <TextStyle variant='buttonSmall'>{option.label}</TextStyle>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {!hasMemberBookPrice ? (
        collection ? (
          <Box display='flex' justifyContent='left' alignItems='center'>
            <Box mr={1}>
              <TextStyle variant='smallStrikeThrough'>
                ${collection?.fields?.memberOriginalPrice}
              </TextStyle>
            </Box>
            <Box mr={1}>
              <TextStyle variant='subtitle2' color='#0C8671'>
                ${collection?.fields?.memberDiscountedPrice}
              </TextStyle>
            </Box>
            <Box display='flex' justifyContent='left' alignItems='center'>
              <Box mr={1}>
                <TextStyle variant='subtitle2'> member price </TextStyle>
              </Box>
              <CustomLink
                href={paths.subscribe}
                color='#005E47'
                label='join now'
              />
            </Box>
          </Box>
        ) : (
          <TextStyle variant='subtitle2'>
            $ {version?.fields?.priceMember} member price{' '}
            <CustomLink
              href={paths.subscribe}
              color='#005E47'
              label='join now'
            />
          </TextStyle>
        )
      ) : collection ? (
        <Box display='flex' justifyContent='left' alignItems='center'>
          <Box mr={1}>
            <TextStyle variant='smallStrikeThrough'>
              ${collection?.fields?.originalPrice}
            </TextStyle>
          </Box>
          <Box mr={1}>
            <TextStyle variant='subtitle2' color='#0C8671'>
              ${collection?.fields?.discountedPrice}
            </TextStyle>
          </Box>
          <Box>
            <TextStyle variant='subtitle2'> non-member price </TextStyle>
          </Box>
        </Box>
      ) : (
        <TextStyle variant='subtitle2'>
          $ {version?.fields?.priceNonMember} non-member price
        </TextStyle>
      )}
    </Box>
  )
}
