import {
    Box,
    HStack, IconButton,
    Switch,
    //useSlider
} from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io";
import { ThemeColors } from "@/utils/colors"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogRoot,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HeaderText, SectionHeaderText, SubHeaderText, SubtitleText } from "@/components/ui/custom-text"
import { CustomSelector } from "@/components/custom-selector";
import { Slider } from "@/components/ui/slider/slider";
import { PriceSummary } from "@/components/price-summary";
import { PrimaryButton } from "@/components/ui/primary-button";
import { bagItems } from "@/utils/collections";

export default function AddPack() {

    return (
        <DialogRoot size={'md'}>
            <DialogTrigger asChild>
                <IconButton rounded='full' bg={ThemeColors.red} shadow='sm'
                    transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                    _hover={{
                        transform: "scale(1.1)",
                        boxShadow: "md",
                    }}
                >
                    <IoMdAdd color='white' />
                </IconButton>
            </DialogTrigger>
            <DialogContent w='488px' p='40px'>

                <DialogBody>
                    <Box w='full' textAlign='center' mb='40px'>
                        <HeaderText mb='40px'>Place Your Order</HeaderText>
                        <SubHeaderText>We'll use this info to pack your order! Muhahahahah</SubHeaderText>

                    </Box>
                    <CustomSelector
                        key={'add-pack'}
                        items={bagItems}
                        // value={region}
                        // onChange={(newValue) => {
                        //   console.log("New region selected: ", newValue);
                        //   setRegion(newValue);
                        // }}
                        placeholder="Choose Item"

                    />
                    <Box h='40px' />

                    <Slider defaultValue={[1]} min={1} max={10} showValue variant="solid" colorPalette={'red'} />
                    <SubtitleText marginBottom={'40px'} textAlign={'left'}>Select Quantity</SubtitleText>

                    <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
                        <SectionHeaderText> I need a bag for that!</SectionHeaderText>
                        <Switch.Root variant='raised' key='want-bag'>
                            <Switch.HiddenInput />
                            <Switch.Control bg="gray.300"
                                // Transition for smooth color change
                                transition="background-color 0.2s ease"

                                // Checked state overrides
                                _checked={{
                                    bg: `${ThemeColors.red}29`, // red with some transparency, for example
                                }} >
                                <Switch.Thumb
                                    bg="white"

                                    // Let the thumb color or transform also transition
                                    transition="background-color 0.2s ease, transform 0.2s ease"

                                    // Move thumb to the right and change color in checked state
                                    _checked={{
                                        bg: ThemeColors.red,

                                    }} />
                            </Switch.Control>
                            <Switch.Label />
                        </Switch.Root>
                    </HStack>
                    <PriceSummary label="Cost" value={0} />
                </DialogBody>
                <DialogFooter justifyContent={'center'}>

                    <DialogActionTrigger asChild>
                        <PrimaryButton>ADD TO CART</PrimaryButton>
                    </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}