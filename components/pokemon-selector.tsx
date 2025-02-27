"use client";

import React, { useEffect, useRef } from "react";
import { Box, Image, HStack } from "@chakra-ui/react";
import { ThemeColors } from "@/utils/colors";
import { PokemonName, Region, starterPokemon } from "@/utils/collections";



/** Map each region to its three starter Pokémon */


/** Props for the PokemonSelector */
interface PokemonSelectorProps {
    /** Which region's starters to display: "kanto" | "jhoto" | "hoenn" */
    region: Region;
    /** Which Pokémon is currently selected (if any) */
    selectedPokemon?: PokemonName;
    /** Called when the user picks a different Pokémon */
    onChange?: (pokemon: PokemonName) => void;
}

export const PokemonSelector: React.FC<PokemonSelectorProps> = ({
    region,
    selectedPokemon,
    onChange,
}) => {
    const starters = starterPokemon[region];

    // Create refs for our audio elements
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
    const selectSoundRef = useRef<HTMLAudioElement | null>(null);

    // Initialize the Audio objects once (on mount)
    useEffect(() => {
        hoverSoundRef.current = new Audio("/assets/menu-sound.mp3");
        selectSoundRef.current = new Audio("/assets/select-sound.mp3");

        if (selectSoundRef.current) {
            selectSoundRef.current.volume = 0.5;
        }
    }, []);

    // Helper to play the hover sound
    const handleHover = () => {
        if (hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0; // replay from start
            hoverSoundRef.current.play().catch(() => {
                /* ignore any play errors (e.g. user has not interacted yet) */
            });
        }
    };

    // Helper to handle the click sound & selection
    const handleSelect = (pokemonName: PokemonName) => {
        if (selectSoundRef.current) {
            selectSoundRef.current.currentTime = 0;
            selectSoundRef.current.play().catch(() => { });
        }
        onChange?.(pokemonName);
    };

    return (
        <HStack justifyContent={'space-between'}>
            {starters.map((poke) => {
                const isSelected = poke.name === selectedPokemon;

                return (
                    <Box
                        key={poke.name}
                        onClick={() => handleSelect(poke.name)}
                        onMouseEnter={handleHover}
                        cursor="pointer"
                        borderRadius="full"
                        overflow="hidden"
                        bg={ThemeColors.grayF0}
                        transition="transform 0.2s, box-shadow 0.2s"
                        transform={isSelected ? "scale(1.05)" : "scale(1.0)"}
                        boxShadow={isSelected ? "0 0 0 2px " + ThemeColors.red : "none"}
                        _hover={{
                            transform: "scale(1.1)",
                            //boxShadow: "0 0 0 2px " + ThemeColors.red,
                        }}
                        w='100px'
                        h='100px'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        scale={0.9}
                    >
                        <Image
                            src={poke.image}
                            alt={poke.name}
                            boxSize="60px"
                            objectFit="contain"
                        />
                    </Box>
                );
            })}
        </HStack>
    );
};
