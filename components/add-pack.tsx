'use client'

import {
    Box,
    DialogRootProvider,
    HStack, IconButton,
    Switch,
    UseDialogReturn,
    //useSlider
} from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io";
import { ThemeColors } from "@/utils/colors"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HeaderText, SectionHeaderText, SubHeaderText, SubtitleText } from "@/components/ui/custom-text"
import { CustomSelector } from "@/components/custom-selector";
import { Slider } from "@/components/ui/slider/slider";
import { PriceSummary } from "@/components/price-summary";
import { PrimaryButton } from "@/components/ui/primary-button";
import { bagItems, bagItemType } from "@/utils/collections";
import { useEffect, useState } from "react";
import { BagItem } from "@/utils/types";
import { generateRandomId } from "@/utils/utils";

export default function AddPack({ item, addItem, dialog }: { item?: BagItem, addItem: (item: BagItem) => void, dialog: UseDialogReturn }) {

    // Initialize the form state using your BagItem class
    const [bagItem, setBagItem] = useState<BagItem>(
        () => item ? item : new BagItem(undefined, 0, false, generateRandomId())
    );

    // For the item selector: update the `item` field
    const handleItemChange = (newItemValue: string) => {
        setBagItem(oldState => new BagItem(newItemValue as bagItemType, oldState.quantity, oldState.hasBag, oldState.id));
        if (error) setError(undefined);
    };

    // For the quantity slider: update the `quantity`
    const handleQuantityChange = (newQuantityArray: number[]) => {
        const newQuantity = newQuantityArray[0] ?? 1;
        setBagItem(oldState => new BagItem(oldState.item, newQuantity, oldState.hasBag, oldState.id));
    };

    // For the bag switch: update the `hasBag`
    const handleHasBagChange = (checked: boolean) => {
        setBagItem(oldState => new BagItem(oldState.item, oldState.quantity, checked, oldState.id));
    };

    const resetForm = () => {
        setBagItem(new BagItem(undefined, 0, false, generateRandomId()));
        setError(undefined);
    };

    const [error, setError] = useState<string>();

    const validateForm = () => {
        if (bagItem.item) {
            setError(undefined);
            return true;
        } else {
            setError('Please select an item');
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            //TODO: SUBMIT
            addItem(bagItem);
            dialog.setOpen(false);
        }
    };

    useEffect(() => {
        if (item) {
            setBagItem(item);
            handleQuantityChange([item.quantity]);
            handleHasBagChange(item.hasBag);
        }
    }, [item]);


    return (
        <DialogRootProvider size={'md'} onExitComplete={resetForm} value={dialog}>
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
                        <HeaderText mb='40px'>{item ? 'Edit' : 'Place'} Your Order</HeaderText>
                        <SubHeaderText>We'll use this info to pack your order! Muhahahahah</SubHeaderText>

                    </Box>
                    <CustomSelector
                        key={'add-pack'}
                        items={bagItems}
                        value={bagItem.item}               // selected item
                        onChange={handleItemChange}
                        placeholder="Choose Item"
                        error={error}
                    />
                    <Box h='40px' />

                    <Slider defaultValue={[bagItem.quantity]} onValueChangeEnd={(value) => handleQuantityChange(value.value)} min={1} max={10} showValue variant="solid" colorPalette={'red'} />
                    <SubtitleText marginBottom={'40px'} textAlign={'left'}>Select Quantity</SubtitleText>

                    <HStack justifyContent={'space-between'} marginBottom={'10px'} marginTop={'40px'} w='100%' >
                        <SectionHeaderText> I need a bag for that!</SectionHeaderText>
                        <Switch.Root variant='raised' key='want-bag'
                            checked={bagItem.hasBag}
                            onCheckedChange={(change) => handleHasBagChange(change.checked)}
                            disabled={bagItem.item ? false : true}
                        >
                            <Switch.HiddenInput />
                            <Switch.Control bg="gray.300"
                                // Transition for smooth color change
                                transition="background-color 0.2s ease"

                                // Checked state overrides
                                _checked={{
                                    bg: `${ThemeColors.red}29`, // red with some transparency, for example
                                }}
                            >
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
                    <PriceSummary label="Cost" value={bagItem.cost} />
                </DialogBody>
                <DialogFooter justifyContent={'center'}>

                    {/* <DialogActionTrigger asChild>
                        <PrimaryButton onClick={handleSubmit}>ADD TO CART</PrimaryButton>
                    </DialogActionTrigger> */}
                    <PrimaryButton onClick={handleSubmit}>{item ? 'UPDATE' : 'ADD TO CART'}</PrimaryButton>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRootProvider>
    );
}