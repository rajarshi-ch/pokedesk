'use client'

import {
    Box,
    Collapsible,
    Fieldset, HStack, Stack,
    useDialog,
    Wrap,
    //useSlider
} from "@chakra-ui/react"
import { HeaderText, SectionHeaderText, SubHeaderText, SubtitleText } from "./ui/custom-text"
import CustomInput from "./ui/custom-input/custom-input"
import { Slider } from "./ui/slider/slider"
import { CustomSelector } from "./custom-selector"
import { PokemonSelector } from "./pokemon-selector"
import { Chip } from "./ui/chip/chip"

import { PrimaryButton } from "./ui/primary-button"
import { PriceSummary } from "./price-summary"
import AddPack from "./add-pack"
import { defaultBagItems, PokemonName, regionItems, RegionValue } from "@/utils/collections"
import { useEffect, useState } from "react"
import { Field } from "./ui/field"
import { BagItem } from "@/utils/types"
import { generateRandomId } from "@/utils/utils"
import FinalDialog from "./final-dialog"

interface FormErrors { fullName?: string; codeName?: string, region?: string, pokemon?: string, items?: string }
export default function MainForm() {

    const [fullName, setFullName] = useState('');
    const [codeName, setCodeName] = useState('');
    const [distance, setDistance] = useState(0);
    const [region, setRegion] = useState<RegionValue | undefined>();
    const [pokemon, setPokemon] = useState<PokemonName | undefined>();
    const [errors, setErrors] = useState<FormErrors>({});
    const [bagItems, setBagItems] = useState<BagItem[]>([...defaultBagItems]);
    const [itemEdit, setItemEdit] = useState<BagItem | undefined>(undefined);
    useEffect(() => {
        // Debounce validation by 500ms
        const handler = setTimeout(() => {
            if (Boolean(fullName) || Boolean(codeName)) validateTextFields();
        }, 500);

        // Cleanup the old timeout if inputs change again before 500ms
        return () => {
            clearTimeout(handler);
        };
    }, [fullName, codeName]);

    const validateTextFields = () => {
        const newErrors: FormErrors = {};
        let isValid = true;
        // Validate Full Name (at least 3 chars)
        if (!Boolean(fullName) || fullName.length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters.";
            isValid = false;
        }

        // Validate Code Name (at least 3 chars)
        if (!Boolean(fullName) || codeName.length < 3) {
            newErrors.codeName = "Code name must be at least 3 characters.";
            isValid = false;
        }

        // Update errors
        setErrors(newErrors);
        return isValid;
    }

    const handleRegionChange = (newRegion: string) => {
        if (region == newRegion) return;

        setRegion(newRegion as RegionValue);
        setPokemon(undefined);
        setErrors((oldErrors) => { return { ...oldErrors, region: undefined } });
    };

    const validateForm = () => {
        let isValid = true;

        if (!validateTextFields()) isValid = false;
        if (!Boolean(region)) {
            setErrors((oldErrors) => { return { ...oldErrors, region: 'Please select a region' } });

            isValid = false;
        }

        if (!Boolean(pokemon)) {
            setErrors((oldErrors) => { return { ...oldErrors, pokemon: 'Please select a starter pokemon' } });
            isValid = false;
        }

        if (bagItems.length == 0) {
            setErrors((oldErrors) => { return { ...oldErrors, items: 'Please add at least one item' } });
            isValid = false;
        }

        // if (errors.codeName || errors.fullName || errors.region) {
        //     return false;
        // }

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            finalDialog.setOpen(true);


        }
    };

    const handlePokemonChange = (pkmn: PokemonName | undefined) => {
        setErrors((oldErrors) => { return { ...oldErrors, pokemon: undefined } });
        setPokemon(pkmn);
    }

    function addItem(newItem: BagItem) {
        setBagItems((prev) => {
            // Optionally ensure we have an ID. If BagItem.id is always present, skip this.
            if (!newItem.id) {
                newItem.id = generateRandomId() // or any ID generator you prefer
            }

            // Check if there's an existing item with the same ID
            const existingIndex = prev.findIndex((item) => item.id === newItem.id);

            if (existingIndex >= 0) {
                // Update existing item
                const updatedBagItems = [...prev];
                updatedBagItems[existingIndex] = newItem;
                return updatedBagItems;
            } else {
                // Add new item
                return [...prev, newItem];
            }
        });
        setErrors((oldErrors) => { return { ...oldErrors, items: undefined } });
    }

    const dialog = useDialog();
    const finalDialog = useDialog();

    // Cleanup edit modal
    useEffect(() => {
        if (!dialog.open) {
            setItemEdit(undefined);
        }
    }, [dialog.open]);

    return <Box borderRadius={'16px'} bg='white' shadow='xl' w='488px' p='80px' my={10}>
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

                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                />
                <CustomInput
                    label="Code Name"
                    name="codeName"
                    value={codeName}
                    onChange={(e) => setCodeName(e.target.value)}
                    error={errors.codeName}
                //error="We know that's not your name"
                />
                {/* <Box h='10px' /> */}
                <Slider defaultValue={[distance]} onValueChangeEnd={(value) => setDistance(value.value[0] ?? 0)} showValue variant="solid" colorPalette={'red'} />
                <SubtitleText marginBottom={'40px'} textAlign={'left'}> How far is your nearest pokemon center? (In KMs)</SubtitleText>
                <CustomSelector
                    items={regionItems}
                    key={'select-region'}
                    value={region}
                    onChange={handleRegionChange}
                    placeholder="What's your starting region?"
                    error={errors.region}
                />


                <Collapsible.Root open={Boolean(region)}>
                    <Collapsible.Content overflow='visible'>
                        <Field errorText={errors.pokemon} invalid={Boolean(errors.pokemon)}>
                            <SectionHeaderText marginBottom={'10px'} marginTop={'40px'} textAlign={'left'}>Choose your starter pokemon</SectionHeaderText>
                            {region && <PokemonSelector region={region} selectedPokemon={pokemon} onChange={handlePokemonChange} />}
                        </Field>
                    </Collapsible.Content>
                </Collapsible.Root>

                <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
                    <SectionHeaderText >What do you want to pack ?</SectionHeaderText>

                    <AddPack addItem={addItem} dialog={dialog} item={itemEdit} />
                </HStack>
                <Field errorText={errors.items} invalid={Boolean(errors.items)}>
                    <Wrap>
                        {bagItems.map((item) => <Chip item={item} key={item.id} onRemove={() => setBagItems(bagItems.filter((i) => i.id !== item.id))} onClick={() => {
                            setItemEdit(item);
                            dialog.setOpen(true);
                        }} />)}
                    </Wrap>
                </Field>
            </Fieldset.Content>
            <PriceSummary label="Total Cost" value={bagItems.reduce((acc, item) => acc + item.cost, 0)} />
            <PrimaryButton onClick={handleSubmit}>START MY JOURNEY</PrimaryButton>
        </Fieldset.Root>
        <FinalDialog fullName={fullName} codeName={codeName} distance={distance} region={region} pokemon={pokemon} bagItems={bagItems} dialog={finalDialog} />
    </Box>
}