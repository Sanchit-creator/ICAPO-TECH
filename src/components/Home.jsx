import React, { useRef, useState } from 'react'
import { Box, Button, Input } from '@mui/material'
import styled from '@emotion/styled'

const Main = styled(Box)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Btn = styled(Button)`
    height: 30px;
    width: 100px;
    background-color: #6376D2;
`

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const formRef = useRef(null);
    const pdfUpload = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedFile);
        setSelectedFile('');
        formRef.current.reset();
    };    
  return (
    <Main component='form' ref={formRef} onSubmit={handleSubmit}>
        <Input
         type="file" 
         inputProps={{ accept: 'application/pdf' }} 
         onChange={(e) => pdfUpload(e)} 
        />
        <Btn style={{color: 'white'}} type='submit'>Upload</Btn>
    </Main>
  )
}

export default Home