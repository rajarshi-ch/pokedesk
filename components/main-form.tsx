import { Field } from "@/components/ui/field"
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"
import {
    Box,
    Button,
    Fieldset, Input, Stack,
    //useSlider
} from "@chakra-ui/react"
import { HeaderText, SubHeaderText } from "./ui/custom-text"
import CustomInput from "./ui/custom-input/custom-input"
import { Slider } from "./ui/slider/slider"
import { ThemeColors } from "@/constants/colors"

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
                <Slider defaultValue={[40]} showValue variant="solid" colorPalette={'red'} />
                <Field label="Email address">
                    <Input name="email" type="email" />
                </Field>

                <Field label="Country">
                    <NativeSelectRoot>
                        <NativeSelectField
                            name="country"
                            items={[
                                "United Kingdom (UK)",
                                "Canada (CA)",
                                "United States (US)",
                            ]}
                        />
                    </NativeSelectRoot>
                </Field>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
                Submit
            </Button>
        </Fieldset.Root>
    </Box>
}