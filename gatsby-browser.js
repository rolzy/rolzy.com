import React from "react"
import { LangProvider } from "./src/context/LangContext"

require("./src/components/prism.css")
require("./src/components/prism-command-line.css")

export const wrapRootElement = ({ element }) => (
  <LangProvider>{element}</LangProvider>
)
