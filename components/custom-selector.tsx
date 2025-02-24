"use client";

import * as React from "react";
import { createListCollection } from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { ThemeColors } from "@/constants/colors";

type SelectorItem<TValue extends string> = {
    label: string;
    value: TValue;
};

interface CustomSelectorProps {
    /** The items to show in the dropdown */
    items: SelectorItem<string>[];
    /** Called when the user selects an item */
    onChange?: (newValue: string) => void;
    /**
     * A variant string if your select supports variants
     * (e.g., "subtle", "outline"). Optional, defaults to "subtle".
     */
    variant?: string;
    /** Placeholder text when nothing is selected */
    placeholder?: string;
    /**
     * Current selection (if you want to control it).
     * If you omit this, it can act uncontrolled.
     */
    value?: string;
    /** (Optional) Label shown above the trigger inside the SelectRoot */
    label?: string;
}

/**
 * A generic dropdown built on Chakra’s `SelectRoot` and `createListCollection`.
 * 
 * - Takes a list of `items` (label/value).
 * - Optional `onChange` to handle selection changes.
 * - Supports a placeholder, variant, label, etc.
 * - `value` can be controlled or left undefined.
 */
export function CustomSelector({
    items,
    onChange,
    placeholder = "Select an option",
    value,

}: CustomSelectorProps) {
    // Create a listCollection from the passed-in items
    const collection = createListCollection({
        items,
    });

    return (
        <SelectRoot
            variant={'subtle'}
            //value={[value]}
            onValueChange={(val) => {
                onChange?.(val.value[0] as string);
            }}
            collection={collection}
        >
            {/* <SelectLabel>Select your region</SelectLabel> */}
            <SelectTrigger>
                <SelectValueText height={'56px'} placeholder={placeholder}
                    display={'inline-flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontSize={'1rem'}
                    color={ThemeColors.gray99}
                />
            </SelectTrigger>
            <SelectContent zIndex={2000}>
                {collection.items.map((option) => (
                    <SelectItem item={option} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}
