import { Field } from "@/components/ui/field"
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"
import {
    Box,
    Button,
    Fieldset, Input, Stack
} from "@chakra-ui/react"

export default function MainForm() {
    return <Box borderRadius={'16px'} bg='white' shadow='lg' minW='488px' p='80px'>
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
                <Fieldset.Legend>Fill This Form</Fieldset.Legend>
                <Fieldset.HelperText>
                    We'll use this info to dominate the poke world! Muhahahahah
                </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
                <Field label="Name">
                    <Input name="name" />
                </Field>

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