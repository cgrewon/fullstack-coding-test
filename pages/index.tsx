import React from "react"

import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input, Box, Flex } from "@chakra-ui/react"



const Home = () => {

  const ref = React.useRef();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let val = e.target.value;    
    ref?.current?.changeValue(val);    
  };
 

  return (
      <Flex
        minH="100vh"
        p={"0 0.5rem"}
        direction="column"
        justify="center"
        align="center"        
      >

        <Head>
          <title>Coding Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex
          flex={1}
          p="5rem 0"
          direction="column"
          justify="center"
          align="center"
        >

        <DynamicText ref={ref}/>
          
        <Input
          placeholder="large size"
          size="lg"
          onChange={onChange}
          mt={6}
        />

        </Flex>
      </Flex>
    // </div>
  );
};

export default Home;
