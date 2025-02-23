import {
    HStack
} from "@chakra-ui/react"
import { SubHeaderText } from "@/components/ui/custom-text"

export const PriceSummary = ({ label, value }: { label: string, value: number }) => {
    return (
        <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
            <SubHeaderText> {label}</SubHeaderText>
            <SubHeaderText color="#393B3B"> {`$${value}`}</SubHeaderText>
        </HStack>

    )
};