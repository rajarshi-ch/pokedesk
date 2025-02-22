// components/HeaderText.tsx

import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { ThemeColors } from '@/constants/colors';

interface CustomTextProps extends TextProps {
    /**
     * The text content of the heading.
     */
    children: React.ReactNode;
    /**
     * Element type to render the text as, e.g., "h1", "h2". Defaults to "h1".
     */
    as?: React.ElementType;
}

export const HeaderText: React.FC<CustomTextProps> = ({ children, as = 'h1', ...props }) => {
    return (
        <Text
            as={as}
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize="32px"
            lineHeight="38px"
            color={ThemeColors.red}
            {...props}
        >
            {children}
        </Text>
    );
};

export const SubHeaderText: React.FC<CustomTextProps> = ({ children, as = 'h2', ...props }) => {
    return (
        <Text
            as={as}
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize="18px"
            lineHeight="22px"
            letterSpacing="0px"
            color={ThemeColors.gray96}
            {...props}
        >
            {children}
        </Text>
    );
};

