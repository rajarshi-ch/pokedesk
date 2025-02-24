"use client";

import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { IoMdCloseCircle } from "react-icons/io";
import { ThemeColors } from "@/utils/colors";
import styles from "./chip.module.css";

interface ChipProps {
    /** The text to display in the chip. */
    label: string;
    /** Whether the chip is in "active" state or not. */
    isActive?: boolean;
    /** Called when the chip is clicked (if you need a click handler). */
    onClick?: () => void;
    /** Called when the cross (remove) button is clicked. */
    onRemove?: () => void;
}

/**
 * A reusable "Chip" component with:
 * - Fully rounded corners
 * - Text on the left
 * - A round cross button on the right
 * - Adaptive width based on text
 * - Active vs. inactive background color
 */
export const Chip: React.FC<ChipProps> = ({
    label,
    isActive = false,
    onClick,
    onRemove,
}) => {
    // Switch background color based on isActive
    const bgColor = isActive ? ThemeColors.lightBlue : ThemeColors.grayDF;

    return (
        <HStack
            spaceX={2}

            p={2}
            pl={6}
            bg={bgColor}
            borderRadius="full"
            cursor="pointer"
            onClick={onClick}
            transition="transform 0.2s ease-in-out"
            _hover={{
                transform: "scale(1.04)",

            }}
        // mr={2}
        // You can add additional styling as needed
        >
            {/* Chip label */}
            <Text color="black" fontSize="sm">
                {label}
            </Text>

            {/* Cross button on the right */}
            <IoMdCloseCircle className={styles.icon} size="25px"
                onClick={onRemove} />
        </HStack>
    );
};
