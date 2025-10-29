import render from './Generator/generator.js'
import { headerStruct } from './Structs/HeaderStruct.js'

const Header = headerStruct()
const parent = document.getElementById('container')

render(Header, parent)
