'use client'

import {
    Box,
    Image
} from "@chakra-ui/react"
import MainForm from "@/components/main-form"
import MovingShader from "@/components/moving-shader"
import { useEffect, useState } from "react";


export default function HomePage() {
    // State to track the mouse position
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Update state when the mouse moves
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        // Add mouse move listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    // Offsets
    const offsetX = 60;
    const offsetY = 60;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }} className='light'>
            {/* 1) The background shader fills the container absolutely */}
            <MovingShader
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0, // Behind everything else
                }}
            />

            {/* 2) Content goes above the background due to z-index */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Box
                    textAlign="center"
                    alignItems={"center"}
                    justifyContent={"center"}
                    justifyItems={"center"}
                    fontSize="xl"
                    width='100%'
                    height='100vh'
                    //bg='#00000050'
                    overflowY='scroll'
                    className='light'>
                    <MainForm />
                </Box>
            </div>
            {/* <div style={{ position: 'absolute', zIndex: 2, bottom: '10px', right: '10px' }}>
                <Image
                    src="/static/WnES.gif"
                    alt="WnES GIF"
                    maxW="150px"
                    mx="auto"
                />
            </div> */}
            <Box
                position="fixed"
                // Position the GIF where the pointer is, with optional offset
                left={`${position.x + offsetX}px`}
                top={`${position.y + offsetY}px`}
                // Center the GIF relative to the pointer (optional)
                transform="translate(-50%, -50%)"
                pointerEvents="none" // So it doesn’t block clicks
                zIndex={9999}        // Make sure it's on top
            >
                <Image
                    src="/static/WnES.gif"
                    alt="Following GIF"
                    boxSize="64px"       // Adjust size as needed
                />
            </Box>
        </div>

    )
}