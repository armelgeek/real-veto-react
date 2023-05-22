import { Box } from '@chakra-ui/layout'
import React from 'react'

export default function Content({children}) {
    return (
        <Box  px="5">
            {children}
        </Box>
    )
}
