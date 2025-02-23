import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react"
import * as React from "react"
import CustomThumb from "./custom-thumb";
import { ThemeColors } from "@/constants/colors";

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
  showValue?: boolean
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props
    const value = props.defaultValue ?? props.value

    const marks = marksProp?.map((mark) => {
      if (typeof mark === "number") return { value: mark, label: undefined }
      return mark
    })

    const hasMarkLabel = !!marks?.some((mark) => mark.label)

    return (
      <ChakraSlider.Root ref={ref} thumbAlignment="center" marginTop={'45px'} {...rest}>
        {label && !showValue && (
          <ChakraSlider.Label>{label}</ChakraSlider.Label>
        )}
        {label && showValue && (
          <HStack justify="space-between">
            <ChakraSlider.Label>{label}</ChakraSlider.Label>
            <ChakraSlider.ValueText />
          </HStack>
        )}
        <ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
          <ChakraSlider.Track bgColor={`${ThemeColors.red}29`} height={'2px'}>
            <ChakraSlider.Range bgColor={ThemeColors.red} />
          </ChakraSlider.Track>
          <SliderThumbs value={value} />
          <SliderMarks marks={marks} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    )
  },
)

function SliderThumbs(props: { value?: number[] }) {
  const { value } = props
  console.log(value);
  return (
    <For each={value}>
      {(_, index) => (
        <ChakraSlider.Thumb key={index} index={index}
          boxSize="0px"
          bg="transparent"
        // _focus={{ boxShadow: "none" }}
        // _hover={{ boxShadow: "none" }}
        // _active={{ boxShadow: "none" }}
        >
          <CustomThumb value={<ChakraSlider.ValueText />} />
          <ChakraSlider.HiddenInput />
        </ChakraSlider.Thumb>
      )}
    </For>
  )
}

interface SliderMarksProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks } = props
    if (!marks?.length) return null

    return (
      <ChakraSlider.MarkerGroup ref={ref}>
        {marks.map((mark, index) => {
          const value = typeof mark === "number" ? mark : mark.value
          const label = typeof mark === "number" ? undefined : mark.label
          return (
            <ChakraSlider.Marker key={index} value={value}>
              <ChakraSlider.MarkerIndicator />
              {label}
            </ChakraSlider.Marker>
          )
        })}
      </ChakraSlider.MarkerGroup>
    )
  },
)
