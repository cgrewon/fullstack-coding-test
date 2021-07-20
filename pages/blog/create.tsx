
import React, {useState, useEffect} from 'react'
import { 
    Box, Flex , Image, Text, Button, Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Textarea,

} from '@chakra-ui/react'
import MainLayout from 'layout/MainLayout'
import { useCollection } from "react-firebase-hooks/firestore";

import Firebase from 'libs/firebase';
import BlogCard from 'components/BlogCard';
import { Blog } from 'types/types';
import router from 'next/router';


const storage = Firebase.storage();

const db = Firebase.firestore();


const CreateBlog = ()=>{
    
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')

    const [imageAsFile, setImageAsFile] = useState<any>()
    const [imageAsUrl, setImageAsUrl] = useState({imgUrl: ''})

    const [loading, setLoading] = useState(false)

    const createNewBlog = async ()=>{

        
        try{
            setLoading(true)
            const imgUrl = await handleFireBaseUpload() as string | null

       
            const blog : Blog = {
                title: title, 
                desc: desc,
                image: imgUrl,
                created_at:{seconds: Date.now(), nanoseconds:0}
            }
            
            
            await db.collection("blogs").doc().set(blog)
            setLoading(false)
            router.back()       
        }catch(ex){
            setLoading(false)
        }
        

    }
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image)
    }


    const handleFireBaseUpload = () =>{    

        return new Promise((resolve, reject)=>{

            if(!imageAsFile) {
                alert(`Not an image, the image file is a ${typeof(imageAsFile)}`)
                reject(null)
            }

            const seed = Number(Math.random().toFixed(6)) * 10**6;
    
            const uploadTask = storage.ref(`/images/${seed}_${imageAsFile.name}`).put(imageAsFile)
    
            uploadTask.on('state_changed', 
            (snapShot) => {
    
                console.log('snapShot: ', snapShot)
            }, (err) => {
                reject(null)

                console.log('err:', err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                .then(fireBaseUrl => {
                    setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                    resolve(fireBaseUrl)
                })
            })

        })
      
    }
  

    return <MainLayout>
        <Box w="60%"  h="100vh" pt="200px">
            <Box  boxShadow="md" p={3}>
                <Flex direction="row" justify="space-between">
                    <Text fontSize="2xl">Create New Blog</Text>                
                </Flex>
                <Flex
                    direction="column"
                    align="center"
                    p={2}
                
                >
                    
                    <Input placeholder="Enter title" my={3} onChange={e=>{setTitle(e.target.value) }}/>            
                    <Textarea placeholder="Enter Description" my={3} onChange={e=>{setDesc(e.target.value) }}/>            
                    <Input type="file" my={8} onChange={handleImageAsFile}/>
                    {
                        loading ? <Spinner color="green"/> : <Button w="200px" maxW="80%" borderRadius="md" mt="50px" colorScheme="green" boxShadow="md" onClick={()=>{createNewBlog()}}>Create</Button>
                    }                    

                    
                </Flex>
            </Box>
        </Box>    

    </MainLayout>    
}

export default CreateBlog;