import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface CustomThumbProps {
    value: React.ReactNode;
}

const CustomThumb: React.FC<CustomThumbProps> = ({ value }) => {

    const width = 32;
    const svgAspectRatio = 249 / 128;
    const smallCircleRadius = (width / 2.6) / 2;
    return (
        <Box position="relative" width="40px" height="60px" bg="tomato">
            {/* 
        The viewBox is 0 0 40 60. 
        - The top circle has radius ~20px, centered near (20,20).
        - The bottom smaller circle has radius ~8px, centered near (20,48).
        - They meet at y=40 (the bottom of the top circle is the top of the smaller circle). 
      */}
            <svg
                width={width}
                //height="60"
                viewBox="0 0 128 249"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    position: "absolute",
                    top: `calc(50% - ${width * svgAspectRatio}px  + ${smallCircleRadius}px)`,
                    left: `calc(50% - ${width / 2}px)`,
                }}
            >
                <path d="M64 0C28.6538 0 0 28.6538 0 64C0 84.5221 9.65918 102.788 24.6792 114.5C24.6792 114.5 44.5 132.5 53 147C58.5615 156.487 59.5 163.5 60 174C60.0238 174.499 60 187.5 60 187.5C60 187.5 57.8074 197.894 53 201.5C47 206 44 209 41 216.5C39.5395 220.151 39.6628 221.985 39.9958 226.938L40 227C40.853 239.686 51.2861 248.87 64 249C76.8585 249.132 87.6388 239.83 88.5 227C88.7645 223.06 88.8566 220.855 88 217C86 208 78 202.4 76.5 201.5C71.5 198.5 68.5 189.5 68.5 187.5V174C68.5 162.328 71.9138 153.5 76.5 146.5C86 132 93.0465 124.727 106.333 113C119.62 101.273 128 83.1151 128 64C128 28.6538 99.3462 0 64 0Z" fill="#FE5454" />
            </svg>

            {/* Tooltip text in the top blob */}
            <Text
                position="absolute"
                // top="8px"
                // left="50%"
                transform="translateY(-90%) translateX(-50%)"
                color="white"
                fontSize="12px"
                fontWeight="bold"
            >
                {value}
            </Text>
        </Box>
    );
};

export default CustomThumb;
