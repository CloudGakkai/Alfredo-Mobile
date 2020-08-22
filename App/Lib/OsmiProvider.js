import CustomTheme from "./CustomTheme"
import { OsmiProvider } from "osmicsx"

const provider = new OsmiProvider(CustomTheme)

const { apply, connect } = provider

export { apply, connect }