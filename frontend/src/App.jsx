import React, { useState } from 'react';
import axios from 'axios';
import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Input, 
  Button, 
  Select, 
  Text, 
  Heading, 
  useToast,
  Spinner,
  Flex
} from '@chakra-ui/react';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('720p');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDownload = async () => {
    if (!url) {
      toast({
        title: 'Error',
        description: 'Please enter a YouTube URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/download`, {
        params: { url, format, quality },
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `video.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: 'Download successful',
        description: 'Your file has been downloaded',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Download failed',
        description: 'Please check the URL and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex 
        as="div"
        width="100%" 
        height="100vh" 
        bg="gray.100" 
        alignItems="center" 
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
      >
        <Box 
          maxWidth="600px" 
          width={{ base: "90%", md: "600px" }} 
          mx="auto" 
          bg="white" 
          p={8} 
          borderRadius="lg" 
          boxShadow="xl"
        >
          <VStack spacing={8} width="100%">
            <Heading as="h1" size="xl" color="purple.500">YouTube Downloader</Heading>
            <Input 
              placeholder="Enter YouTube URL" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              size="lg"
            />
            <Select value={format} onChange={(e) => setFormat(e.target.value)} size="lg">
              <option value="mp4">MP4</option>
              <option value="mp3">MP3</option>
            </Select>
            {format === 'mp4' && (
              <Select value={quality} onChange={(e) => setQuality(e.target.value)} size="lg">
                <option value="360p">360p</option>
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </Select>
            )}
            <Button 
              onClick={handleDownload} 
              colorScheme="purple" 
              size="lg" 
              width="full"
              isLoading={isLoading}
              loadingText="Downloading"
            >
              {isLoading ? <Spinner /> : 'Download'}
            </Button>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;