"use client";

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ThemeColors } from "@/utils/colors";


interface PrimaryButtonProps extends ButtonProps {
    /**
     * Button text or any other children (icons, etc.)
     */
    children: React.ReactNode;
}

/**
 * A reusable primary button with your specified styles.
 * Example usage:
 * <PrimaryButton onClick={...}>START MY JOURNEY</PrimaryButton>
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    ...rest
}) => {
    return (
        <Button
            type="button"
            alignSelf="center"
            bg={ThemeColors.red}
            shadow="xs"
            color="white"
            transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
            _hover={{
                transform: "scale(1.1)",
                boxShadow: "sm",
            }}
            font='roboto'
            fontSize='14px'
            lineHeight='17px'
            letterSpacing='1.25px'
            {...rest}
        >
            {children}
        </Button>
    );
};
