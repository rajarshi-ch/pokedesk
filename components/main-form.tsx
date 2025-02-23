
import {
    Box,
    Button,
    Fieldset, Input, Stack,
    //useSlider
} from "@chakra-ui/react"
import { HeaderText, SectionHeaderText, SubHeaderText, SubtitleText } from "./ui/custom-text"
import CustomInput from "./ui/custom-input/custom-input"
import { Slider } from "./ui/slider/slider"
import { RegionSelector } from "./region-selector"
import { PokemonSelector } from "./ui/pokemon-selector"

export default function MainForm() {
    // const slider = useSlider({
    //     defaultValue: [40],
    // });
    return <Box borderRadius={'16px'} bg='white' shadow='lg' minW='488px' p='80px'>
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
                <SectionHeaderText marginBottom={'10px'} marginTop={'40px'} textAlign={'left'}>What do you want to pack ?</SectionHeaderText>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
                Submit
            </Button>
        </Fieldset.Root>
    </Box>
}