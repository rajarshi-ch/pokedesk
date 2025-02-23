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

// Define the list of regions.
const regionCollection = createListCollection({
    items: [
        { label: "Kanto", value: "kanto" },
        { label: "Jhoto", value: "jhoto" },
        { label: "Hoenn", value: "hoenn" },
    ],
});

// Define a type for the possible region values
export type RegionValue = "kanto" | "jhoto" | "hoenn";

// Props for RegionSelector
interface RegionSelectorProps {

    //value: RegionValue;

    onChange?: (newValue: RegionValue) => void;

    variant?: string;
}

/**
 * A reusable region selector drop-down using Chakra’s Select components.
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({
    //value,
    onChange,
}) => {
    return (
        <SelectRoot
            variant={'subtle'}
            //value={[value]}
            onValueChange={(val) => {
                onChange?.(val.value[0] as RegionValue);
            }}
            collection={regionCollection}
        >
            {/* <SelectLabel>Select your region</SelectLabel> */}
            <SelectTrigger>
                <SelectValueText height={'56px'} placeholder="What's your starting region?"
                    display={'inline-flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontSize={'1rem'}
                    color={ThemeColors.gray99}
                />
            </SelectTrigger>
            <SelectContent>
                {regionCollection.items.map((region) => (
                    <SelectItem item={region} key={region.value}>
                        {region.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};
