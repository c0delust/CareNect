import { useState } from "react";
import Header from "./Header.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";
import UserRegistration from "./components/UserRegistration.jsx";

function App() {
  return (
    <>
      <Header />
      <UserRegistration />
      <PhotoCarousel />
    </>
  );
}

export default App;
