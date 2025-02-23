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
    color?: string;
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
            color={props.color ? props.color : ThemeColors.gray96}
            {...props}
        >
            {children}
        </Text>
    );
};

export const SubtitleText: React.FC<CustomTextProps> = ({ children, as = 'h2', ...props }) => {
    return (
        <Text
            as={as}
            fontFamily="Roboto"
            fontWeight="normal"
            fontSize="14px"
            lineHeight="17px"
            letterSpacing="0.46px"
            color={ThemeColors.grayDE}
            {...props}
        >
            {children}
        </Text>
    );
};

export const SectionHeaderText: React.FC<CustomTextProps> = ({ children, as = 'h2', ...props }) => {
    return (
        <Text
            as={as}
            fontFamily="Roboto"
            fontWeight="normal"
            fontSize="16px"
            lineHeight="19px"
            letterSpacing="0.15px"
            color={ThemeColors.gray99}
            {...props}
        >
            {children}
        </Text>
    );
};
