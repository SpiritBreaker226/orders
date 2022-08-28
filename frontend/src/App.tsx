import styled from 'styled-components'

import { Search } from './Search'
import { AppProvider } from './contexts'
import { AppBody } from './AppBody'

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`

const App = () => (
  <AppProvider>
    <AppContainer>
      <AppHeader>
        <h1>CloudKitchens</h1>

        <Search />
      </AppHeader>

      <AppBody />
    </AppContainer>
  </AppProvider>
)

export default App
