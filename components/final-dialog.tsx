
import {
    Box,
    DialogRootProvider,
    UseDialogReturn,
    Image,
    GridItem,
    Grid,
    Separator,
    Wrap,
    Badge
} from "@chakra-ui/react"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
} from "@/components/ui/dialog"
import { HeaderText, SectionHeaderText, SubHeaderText } from "@/components/ui/custom-text"
import { PriceSummary } from "@/components/price-summary";
import { PokemonName, RegionValue, starterPokemon } from "@/utils/collections";
import { BagItem } from "@/utils/types";

interface FinalDialogProps {
    fullName: string;
    codeName: string;
    distance: number;
    region?: RegionValue;
    pokemon?: PokemonName;
    bagItems: BagItem[];
    dialog: UseDialogReturn
}
export default function FinalDialog({ fullName, codeName, distance, region, pokemon, bagItems, dialog }: FinalDialogProps) {



    return (
        <DialogRootProvider size={'md'} value={dialog}
        >

            <DialogContent w='488px' p='40px' >

                <DialogBody spaceY={2} >

                    {/* Top Header */}
                    <Box textAlign="center" mb={4}>
                        <HeaderText fontSize="2xl">Order Summary</HeaderText>
                    </Box>

                    <Separator mb={4} />

                    {/* Use a Grid layout for the summary details */}
                    <Grid
                        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                        gap={4}
                    >
                        {/* Full Name */}
                        <GridItem colSpan={2}>
                            <SectionHeaderText>Full Name</SectionHeaderText>
                            <SubHeaderText>{fullName}</SubHeaderText>
                        </GridItem>

                        {/* Code Name */}
                        <GridItem>
                            <SectionHeaderText>Code Name</SectionHeaderText>
                            <SubHeaderText>{codeName}</SubHeaderText>
                        </GridItem>

                        {/* Distance */}
                        <GridItem>
                            <SectionHeaderText>Distance</SectionHeaderText>
                            <SubHeaderText>{distance}</SubHeaderText>
                        </GridItem>

                        {/* Region */}
                        <GridItem>
                            <SectionHeaderText>Region</SectionHeaderText>
                            <SubHeaderText>{region}</SubHeaderText>
                        </GridItem>

                        {/* Starter Pokemon + Image */}
                        <GridItem>
                            <SectionHeaderText>Starter Pokémon</SectionHeaderText>
                            <SubHeaderText>{pokemon}</SubHeaderText>

                            {region && pokemon && (
                                <Image
                                    mt={2}
                                    src={starterPokemon[region!.toLowerCase() as RegionValue].find((p) => p.name === pokemon)!.image}
                                    alt={pokemon}
                                    boxSize="60px"
                                    objectFit="contain"
                                />
                            )}
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Wrap w='100%' >
                                {bagItems.map((item) => <Badge size='md' colorPalette={item.hasBag ? 'cyan' : 'gray'} key={item.id}>{item.displayLabel}</Badge>)}
                            </Wrap>
                        </GridItem>

                        {/* Price Summary (entire row) */}
                        <GridItem colSpan={2} mt={4}>
                            <Separator mb={4} />
                            <PriceSummary
                                label="Total Cost"
                                value={bagItems.reduce((acc, item) => acc + item.cost, 0)}
                            />
                        </GridItem>
                    </Grid>

                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRootProvider>
    );
}