import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'context/AuthUserContext';
import {
    Box, Input, Flex, Button, Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Spinner
} from "@chakra-ui/react";


const SignUp = () => {
    const {loading} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [rePwd, setRePwd] = useState<string>("");
    const router = useRouter();
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] = useState(false)

    const { createUserWithEmailAndPassword } = useAuth();

    const onSubmit = event => {

        setError(null)

        if(pwd === rePwd){
            setShowLoader(true)
            createUserWithEmailAndPassword(email, pwd)
            .then(authUser => {
                console.log("Success. The user is created in Firebase")
                router.push("/");
                setShowLoader(false)
            })
            .catch(error => {
                setError(error.message)
                setShowLoader(false)
            });
        }            
        else
            setError("Password do not match")
        event.preventDefault();
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value)
    }
    const changeRePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePwd(e.target.value)
    }

    const onLogin = ()=>{
        router.replace("/login");
    }

    return (
        <Flex direction="column" justify="center" align="center" h="100vh">
        <Flex direction="row" justify="center" align="center">
            <Box w="500px" maxW="90%">
            <form             
                onSubmit={onSubmit}>
            
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={changeEmail}/>
                    <FormHelperText>Enter your correct email.</FormHelperText>
                </FormControl>
                <FormControl id="password" mt={3}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="pwd" onChange={changePwd}/>                
                </FormControl>            
                <FormControl id="password" mt={3}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" name="repwd" onChange={changeRePwd}/>                
                </FormControl>
                { error && <Text color="red" my={5}>{error}</Text>}
                {
                    showLoader ? <Box mx="auto" w="100%" textAlign="center" mt={5}>
                        <Spinner color="green.500" />
                    </Box> :<>
                        <Button type="submit" colorScheme="green" size="lg" w="100%" mt={5}>Sign Up</Button>
                        <Button color="blue.500" variant="link" size="lg" mt={8} w="100%" onClick={onLogin}>
                            I have already account! Login
                        </Button>
                    </>
                }                
                
            </form>
            </Box>
        </Flex>
        </Flex>
    )
}

export default SignUp;