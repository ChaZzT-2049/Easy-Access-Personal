//Styles
import GlobalStyle from "./GlobalStyles";
//Pages
import RouteList from "./components/Routes/Index";

import { AppProvider } from "./context";

function App() {

  return (
    <AppProvider>
      <GlobalStyle />
      <RouteList />
    </AppProvider>
  );
}

export default App;
