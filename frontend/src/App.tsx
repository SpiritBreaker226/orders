import styled from 'styled-components'

import { AppProvider } from './contexts'
import { AppBody } from './AppBody'
import { AppHeader } from './AppHeader'

const AppContainer = styled.div`
  text-align: center;
`

const App = () => (
  <AppProvider>
    <AppContainer>
      <AppHeader />

      <AppBody />
    </AppContainer>
  </AppProvider>
)

export default App
