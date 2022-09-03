import styled from 'styled-components'

import { AppProvider } from './contexts'
import { AppBody } from './AppBody'
import { AppHeader } from './AppHeader'
import { ThemeProvider } from './theme'

const AppContainer = styled.div`
  text-align: center;
`

const App = () => (
  <ThemeProvider>
    <AppProvider>
      <AppContainer>
        <AppHeader />

        <AppBody />
      </AppContainer>
    </AppProvider>
  </ThemeProvider>
)

export default App
