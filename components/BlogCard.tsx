import React, {useState, useEffect} from 'react'
import { Box, Flex , Image, Text, Button} from '@chakra-ui/react'


const BlogCard = (props)=>{

    const {
        title,
        image,
        desc,
        created_at,
        index,
        
    } = props.data

    return <Box 
        boxShadow="md" 
        w="100%" 
        p={2}         
        my={5} 
        borderRadius="md" 
        cursor="pointer"
        _hover={{
            border:'2px solid',
            borderColor:'green.200',                                
        }}
        onClick={props.onClick}        
    >
        <Flex
            direction={{base:"column",  md:"row"}}
        >
            <Box w={{base:"100%",  md:"25%"}}>
                <Image
                    w="100%"
                    // maxW='300px'
                    objectFit="cover"
                    src={image}
                    alt="Img"
                    ratio={1}
                />
            </Box>
            <Box flex={1} textAlign="left" ml={3}>
            
                <Text fontSize="xl" mt={{md:0, base: 3}} mb={3}>{title}</Text>
                <Text fontSize="md" my={2}>{desc}</Text>
                
                <Text fontSize="xs" my={2}>{new Date(created_at.seconds).toLocaleDateString()}</Text>
            </Box>

        </Flex>
    </Box>
}


export default BlogCard;