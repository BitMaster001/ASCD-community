import React from 'react'
import { Box, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AvatarGroup } from '@material-ui/lab'
import PropTypes from 'prop-types'
import CustomLink from '@/components/atoms/CustomLink'
import imageoptimization from '@/const/imageoptimization'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  button: {
    minWidth: '5px',
    padding: '6px 10px 6px 6px',
  },
}))

export default function AuthorGroup({ label, authors, link, ...props }) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <AvatarGroup max={4}>
        {authors &&
          authors
            .filter((author) => author.fields.thumbnail)
            .slice(0, 3)
            .map((author, key) => (
              <Avatar
                key={`author-avatar-${key}`}
                src={
                  author.fields?.thumbnail?.fields?.imageBynder
                    ? author.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                    : author.fields?.thumbnail?.fields?.imageContentful?.fields
                        ?.file?.url +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                }
                alt='circle icon'
              />
            ))}
      </AvatarGroup>

      <Box pl={2}>
        <CustomLink
          href={link ? link : ''}
          label={label}
          color='black'
          size='medium'
        />
      </Box>
    </Box>
  )
}

AuthorGroup.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        thumbnail: PropTypes.shape({
          fields: PropTypes.shape({
            imageBynder: PropTypes.arrayOf(
              PropTypes.shape({
                src: PropTypes.string,
              })
            ),
            imageContentful: PropTypes.shape({
              fields: PropTypes.shape({
                file: PropTypes.shape({
                  url: PropTypes.string,
                }),
              }),
            }),
          }),
        }),
      }),
    })
  ),
}
