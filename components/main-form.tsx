
import {
    Box,
    Button,
    Fieldset, Flex, HStack, IconButton, Input, Stack,
    Wrap,
    //useSlider
} from "@chakra-ui/react"
import { HeaderText, SectionHeaderText, SubHeaderText, SubtitleText } from "./ui/custom-text"
import CustomInput from "./ui/custom-input/custom-input"
import { Slider } from "./ui/slider/slider"
import { RegionSelector } from "./region-selector"
import { PokemonSelector } from "./ui/pokemon-selector"
import { Chip } from "./ui/chip/chip"
import { IoMdAdd } from "react-icons/io";
import { ThemeColors } from "@/constants/colors"
import { PrimaryButton } from "./ui/primary-button"

export default function MainForm() {
    // const slider = useSlider({
    //     defaultValue: [40],
    // });
    return <Box borderRadius={'16px'} bg='white' shadow='lg' w='488px' p='80px'>
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
                <Fieldset.Legend>
                    <HeaderText>Fill This Form</HeaderText>
                </Fieldset.Legend>
                <Fieldset.HelperText mt={'40px'}>
                    <SubHeaderText>We'll use this info to dominate the poke world! Muhahahahah</SubHeaderText>

                </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
                <CustomInput
                    label="Full Name"
                    name="name"
                    error="We know that's not your name"
                />
                <CustomInput
                    label="Code Name"
                    name="codeName"
                //error="We know that's not your name"
                />
                {/* <Box h='10px' /> */}
                <Slider defaultValue={[40]} showValue variant="solid" colorPalette={'red'} />
                <SubtitleText marginBottom={'40px'} textAlign={'left'}> How far is your nearest pokemon center? (In KMs)</SubtitleText>
                <RegionSelector />
                <SectionHeaderText marginBottom={'10px'} marginTop={'40px'} textAlign={'left'}>Choose your starter pokemon</SectionHeaderText>
                <PokemonSelector region="kanto" />
                <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
                    <SectionHeaderText >What do you want to pack ?</SectionHeaderText>
                    <IconButton rounded='full' bg={ThemeColors.red} shadow='sm'
                        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
                        _hover={{
                            transform: "scale(1.1)",
                            boxShadow: "md",
                        }}
                    >
                        <IoMdAdd color='white' />
                    </IconButton>
                </HStack>

                <Wrap>
                    <Chip isActive={true} label="6 Poke Balls" />
                    <Chip label="10 Great Balls" />
                    <Chip label="10 Super Potions" />
                </Wrap>

            </Fieldset.Content>

            <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
                <SubHeaderText> Total Cost</SubHeaderText>
                <SubHeaderText color="#393B3B"> $232</SubHeaderText>
            </HStack>
            <PrimaryButton>START MY JOURNEY</PrimaryButton>
        </Fieldset.Root>
    </Box>
}