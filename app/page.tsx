import {
  Box,
  ClientOnly,
  Skeleton
} from "@chakra-ui/react"
import { ColorModeToggle } from "../components/color-mode-toggle"
import MainForm from "@/components/main-form"


export default async function Page() {
  return (
    <Box textAlign="center" alignItems={"center"} justifyContent={"center"} justifyItems={"center"} fontSize="xl" pt="30vh" bg='tomato'>
      <MainForm />
      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}