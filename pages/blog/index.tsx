
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


const BlogPage = ()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const [blog, setBlog] = useState(undefined)
    
    const [blogs, blogsLoading, blogsError] = useCollection(
        db.collection("blogs"),
        {}
    );

    const onDelete = async ()=>{
        setIsRemoving(true)
        const res = await db.collection("blogs").doc(blog.id).delete()
        setIsRemoving(false)
    }



    return <MainLayout>
        <Box w="80%"  h="100vh" pt="100px">
            <Flex direction="row" justify="space-between">
                <Text fontSize="2xl">Blogs</Text>
                <Button borderRadius="md" colorScheme="green" boxShadow="md" onClick={()=>{router.push('/blog/create')}}>Create New</Button>
            </Flex>
            <Flex
                direction="column"
                align="center"
                p={2}
            >
                {
                    blogsLoading || isRemoving? <Spinner color="green"/> : null
                }
                {
                    blogs && blogs.docs.map((blog, index: number)=>{
                        return <BlogCard data={blog.data()} key={index} onClick={()=>{
                            onOpen();                            
                            setBlog({...blog.data(), id: blog.id});
                        }}/>
                    })
                }
                
            </Flex>
        </Box>
       
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{blog ? blog.title : ''}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Image
                    w="100%"
                    objectFit="cover"
                    src={blog ? blog.image : ''}
                    alt="Img"
                    ratio={1}
                />
                <Text my={5}>{blog ? blog.desc : ''}</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={()=>{
                    onDelete()
                    onClose()
                }}>
                    Delete
                </Button>                    
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                </Button>                    
            </ModalFooter>
            </ModalContent>
        </Modal> 

    

    </MainLayout>    
}

export default BlogPage;