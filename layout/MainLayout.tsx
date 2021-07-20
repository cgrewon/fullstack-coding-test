import React from 'react'
import {
    Flex
} from '@chakra-ui/react'
import Nav from "components/nav"


const MainLayout = ({children})=>{

    return <Flex
        minH="100vh"
        p={"0 0.5rem"}
        direction="column"
        justify="center"
        align="center"        
    >
    <Nav/>
    {children}
    </Flex>

}


export default MainLayout;