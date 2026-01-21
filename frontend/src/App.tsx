import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Profile, CampaignDetails, CreateCampaign } from "./pages";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/campaign/create" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;